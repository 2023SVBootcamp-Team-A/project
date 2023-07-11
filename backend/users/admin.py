from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from users.models import MyUser


class UserCreationForm(forms.ModelForm):
    email = forms.CharField(label="email", max_length=255)
    password = forms.CharField(label="password", widget=forms.PasswordInput)
    nickname = forms.CharField(label="nickname", max_length=20)

    class Meta:
        model = MyUser
        fields = ["email", "password", "nickname"]

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = MyUser
        fields = [
            "email",
            "password",
            "nickname",
            "is_active",
            "is_admin",
        ]


class UserAdmin(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    list_display = ["email", "nickname", "is_admin", "created_at", "updated_at"]
    list_filter = ["is_admin"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal Info", {"fields": ["nickname", "created_at", "updated_at"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]

    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "nickname", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["email"]
    ordering = ["email"]
    filter_horizontal = []


admin.site.register(MyUser, UserAdmin)
admin.site.unregister(Group)
