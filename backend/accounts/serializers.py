from rest_framework import serializers
from accounts.models import User

class UserRegistrationSerializer(serializers.ModelSerializer):
    """ Serializer for new user registration."""

    # Additional field for confirm password input
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password2', 'tc']
        extra_kwargs = {'password': {'write_only': True}}  # Hide password from response

    def validate(self, attrs):
        """
        Validates that the password and confirm password fields match.

        Args:
            attrs (dict): Dictionary of serializer input data.

        Raises:
            serializers.ValidationError: If passwords do not match.

        Returns:
            dict: The validated data if passwords match.
        """
        # Extract password fields from input data
        password = attrs.get('password')
        password2 = attrs.get('password2')

        # Check if both passwords match
        if password != password2:
            raise serializers.ValidationError("Passwords and confirm passwords do not match")

        return attrs


    def create(self, validated_data):
        """
        Creates and returns a new User instance using the validated data.

        Args:
            validated_data (dict): Dictionary containing validated user fields.

        Returns:
            User: The newly created user instance.
        """
        user = User.objects.create_user(**validated_data)
        return user
    
class UserLoginSerializer(serializers.ModelSerializer):
    """ Serializer for user login."""

    email = serializers.EmailField(max_length=255)
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','email', 'name']