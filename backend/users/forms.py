from users.models import MyUser
from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField


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
