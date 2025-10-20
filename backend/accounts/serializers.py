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

class ChangePasswordSerializer(serializers.Serializer): 
    """
    Serializer for password change endpoint.    
    """
    password = serializers.CharField(required=True, write_only=True)
    password2 = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        """
        Validates that the new password and confirm password fields match.

        Args:
            attrs (dict): Dictionary of serializer input data.

        Returns:
            dict: The validated data if passwords match.

        Raises:
            serializers.ValidationError: If passwords do not match.
        """
        password = attrs.get('password')
        password2 = attrs.get('password2')

        if password != password2:
            raise serializers.ValidationError("New password and confirm password do not match.")
        
        return attrs
    

    def save(self, **kwargs):
        user = self.context.get('user')
        password = self.validated_data['password']
        user.set_password(password) # hashes the password
        user.save() 
        return user


class SendPasswordResetEmailSerializer(serializers.Serializer):
    """ Serializer for sending password reset email."""

    email = serializers.EmailField(max_length=255)


    def validate_email(self, email):
        """
        Validates that the provided email exists in the system.

        Args:
            value (str): The email address to validate.

        Returns:
            str: The validated email address.

        Raises:
            serializers.ValidationError: If the email does not exist in the system.
        """

        if not User.objects.filter(email=email).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return email

class ResetPasswordSerializer(serializers.Serializer):
    """ Serializer for resetting user password."""

    new_password = serializers.CharField(required=True, write_only=True)
    new_password2 = serializers.CharField(required=True, write_only=True)

    def validate(self, attrs):
        """
        Validates that the new password and confirm password fields match.

        Args:
            attrs (dict): Dictionary of serializer input data.

        Returns:
            dict: The validated data if passwords match.

        Raises:
            serializers.ValidationError: If passwords do not match.
        """
        new_password = attrs.get('new_password')
        new_password2 = attrs.get('new_password2')

        if new_password != new_password2:
            raise serializers.ValidationError("New password and confirm password do not match.")

        return attrs
