from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer, UserLoginSerializer


class UserRegistrationView(APIView):
    """
    API view to handle user registration.

    Accepts POST requests with user data, validates it, and creates a new user.
    Returns a success message or validation errors.
    """

    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)

        # Validate the data
        if serializer.is_valid():
            # Save the new user to the database
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )

        # Return validation errors if data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginView(APIView):
    """
    API view to handle user login.

    Accepts POST requests with user credentials, validates them, and returns a success message or errors.
    """

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        # Validate the data
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password')
            user = authenticate(email=email, password=password)
            if user:
                return Response(
                    {"message": "User logged in successfully"},
                    status=status.HTTP_200_OK
                )
            else:
                return Response(
                    {"error": {'non_field_errors': ['Invalid email or password']}},
                    status=status.HTTP_404_NOT_FOUND
                )
        # Return validation errors if data is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

