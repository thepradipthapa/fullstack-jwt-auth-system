from django.conf import settings
from django.core.mail import EmailMessage


def send_password_reset_email(email, link):
    """
    Sends a password reset email to the given address.

    Args:
        email (str): The recipient's email address.
        link (str): The password reset link to include in the email.

    Returns:
        None
    """
    mail_subject = 'Reset your password'
    message = 'Please click the link below to reset your password:\n' + link
    from_email = settings.EMAIL_HOST_USER
    to_email = email
    mail = EmailMessage(mail_subject, message, from_email, to=[to_email])
    mail.send()
