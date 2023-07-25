from rest_framework import serializers
from users.models import MyUser
from django.contrib.auth import authenticate


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(
        max_length=128,
    )
    nickname = serializers.CharField(max_length=20)

    class Meta:
        model = MyUser
        fields = [
            "email",
            "password",
            "nickname",
            "created_at",
            "updated_at",
            "is_admin",
        ]

    def create(self, validated_data):
        is_admin = validated_data.get("is_admin", False)

        if is_admin is True:
            return MyUser.objects.create_superuser(**validated_data)
        else:
            return MyUser.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128)

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)

        if email is None:
            raise serializers.ValidationError("An email address is required to log in.")

        if password is None:
            raise serializers.ValidationError("A password is required to log in.")

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError(
                "A user with this email and password was not found"
            )

        if not user.is_active:
            raise serializers.ValidationError("This user has been deactivated.")

        user.save()

        return {
            "email": user.email,
            "password": user.password,
            "nickname": user.nickname,
        }
