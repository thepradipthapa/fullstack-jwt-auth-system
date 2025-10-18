from django.contrib import admin
from .models import User


# Register the User model with custom admin interface
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "name", "tc", "is_admin", "created_at", "updated_at")
    readonly_fields = ("created_at", "updated_at")
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name", "tc"]}),
        ("Permissions", {"fields": ["is_admin", "is_active"]}),
    ]