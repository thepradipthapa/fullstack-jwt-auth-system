from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import (
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserProfileSerializer, 
    ChangePasswordSerializer, 
    SendPasswordResetEmailSerializer,
    ResetPasswordSerializer
 )
from accounts.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from accounts.models import User
from .utils import send_password_reset_email
from rest_framework.exceptions import AuthenticationFailed


# Utility function to generate JWT tokens for a user
def get_tokens_for_user(user):
    if not user.is_active:
      raise AuthenticationFailed("User is not active")

    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    """
    API view to handle user registration.

    Accepts POST requests with user data, validates it, and creates a new user.
    Returns a success message or validation errors.
    """
    renderer_classes = [UserRenderer]
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        # Validate the data
        if serializer.is_valid():
            # Save the new user to the database
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response(
                {"message": "User registered successfully", "tokens": tokens},
                status=status.HTTP_201_CREATED
            )

        # Return validation errors if data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginView(APIView):
    """
    API view to handle user login.

    Accepts POST requests with user credentials, validates them, and returns a success message or errors.
    """
    renderer_classes = [UserRenderer]
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        # Validate the data
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            user = authenticate(email=email, password=password)
            if user:
                tokens = get_tokens_for_user(user)
                return Response(
                    {"message": "User logged in successfully", "tokens": tokens},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"error": {'non_field_errors': ['Invalid email or password']}},
                    status=status.HTTP_401_UNAUTHORIZED
                )
        # Return validation errors if data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserProfileView(APIView):
    """ 
    API view to handle user profile.

    Accepts GET requests and returns the Authenticated user's profile information.

    """
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ChangeUserPasswordView(APIView):
    """
    API view to handle password change for authenticated users.

    Accepts POST requests with old and new passwords, validates them, and updates the user's password.
    """
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        user = request.user
        serializer = ChangePasswordSerializer(data=request.data, context={'user': user})
        
        # validate the data
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"message": "Password changed successfully."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SendPasswordResetEmailView(APIView):
    """
    API view to handle sending password reset email.

    Accepts POST requests with user email, validates it, and sends a password reset email.
    """
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)

        # Validate the data(Email)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')
            user = User.objects.get(email=email)
            user_id = urlsafe_base64_encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)

            link = "http://localhost:5173/api/user/reset-password/" + user_id + "/" + token + "/"
            print("Password reset link:", link)
            
            send_password_reset_email(email, link)
            
            return Response(
                {"message": "Password reset email sent successfully."},
                status=status.HTTP_200_OK
            )
            
            
class ResetPasswordView(APIView):
    """
    API view to handle password reset.

    Accepts POST requests with new password, user ID, and token, validates them, and resets the user's password.
    """
    renderer_classes = [UserRenderer]

    def post(self, request, uidb64, token, format=None):
        serializer = ResetPasswordSerializer(data=request.data)

        # Validate the data
        if serializer.is_valid(raise_exception=True):
            try:
                user_id = force_bytes(urlsafe_base64_decode(uidb64))
                user = User.objects.get(id=user_id)

                if not PasswordResetTokenGenerator().check_token(user, token):
                    return Response(
                        {"error": "Invalid or expired token."},
                        status=status.HTTP_400_BAD_REQUEST
                    )

                new_password = serializer.validated_data.get('password')
                user.set_password(new_password)
                user.save()
                return Response(
                    {"message": "Password reset successfully."},
                    status=status.HTTP_200_OK
                )
            except Exception as e:
                return Response(
                    {"error": "Something went wrong."},
                    status=status.HTTP_400_BAD_REQUEST
                )