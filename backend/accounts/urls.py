from django.urls import path
from .views import (
    UserRegistrationView, 
    UserLoginView, 
    UserProfileView, 
    ChangeUserPasswordView, 
    SendPasswordResetEmailView,
    ResetPasswordView
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('changepassword/', ChangeUserPasswordView.as_view(), name='change-password'),
    path('send-password-reset-email/', SendPasswordResetEmailView.as_view(), name='send-password-reset-email'),
    path('reset-password/<uidb64>/<token>/', ResetPasswordView.as_view(), name='reset-password'),
]