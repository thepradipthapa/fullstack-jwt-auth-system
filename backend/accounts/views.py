from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer, UserLoginSerializer, UserProfileSerializer, ChangePasswordSerializer
from accounts.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated


# Utility function to generate JWT tokens for a user
def get_tokens_for_user(user):

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
                    status=status.HTTP_404_NOT_FOUND
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