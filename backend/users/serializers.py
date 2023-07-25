from xml.dom import ValidationErr
from rest_framework import serializers
from users.models import MyUser
from django.contrib.auth import authenticate
from django.core.validators import EmailValidator, MinLengthValidator
from django.core.exceptions import ValidationError


class CustomEmailValidator(EmailValidator):
    message = "유효하지 않은 이메일 형식입니다. 올바른 이메일 주소를 입력해주세요."

    def __call__(self, value):
        try:
            super().__call__(value)
        except ValidationError as e:
            raise serializers.ValidationError(self.message)


class CustomMinLengthValidator(MinLengthValidator):
    def __init__(self, min_length):
        self.min_length = min_length
        # MinLengthValidator의 생성자 호출을 위해 super().__init__()를 사용합니다.
        super().__init__(limit_value=min_length)

    def __call__(self, value):
        try:
            super().__call__(value)
        except ValidationError as e:
            raise serializers.ValidationError(f"비밀번호는 {self.min_length}자 이상으로 입력해주세요.")


class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.CharField(
        max_length=255,
        validators=[CustomEmailValidator()],
        required=False,
    )
    password = serializers.CharField(
        max_length=128,
        validators=[CustomMinLengthValidator(8)],
        required=False,
    )
    nickname = serializers.CharField(
        max_length=20,
        required=False,
    )

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

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")
        nickname = data.get("nickname")

        if email is None:
            raise serializers.ValidationError("회원가입을 위해 이메일을 적어주세요.")

        if password is None:
            raise serializers.ValidationError("회원가입을 위해 비밀번호를 적어주세요.")

        if nickname is None:
            raise serializers.ValidationError("회원가입을 위해 닉네임을 적어주세요")

        # 이메일과 닉네임이 중복되는지 확인하여 오류 발생
        if MyUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("이미 등록된 이메일입니다.")

        if MyUser.objects.filter(nickname=nickname).exists():
            raise serializers.ValidationError("이미 사용 중인 닉네임입니다.")

        return data

    def create(self, validated_data):
        is_admin = validated_data.get("is_admin", False)

        if is_admin is True:
            return MyUser.objects.create_superuser(**validated_data)
        else:
            return MyUser.objects.create_user(**validated_data)


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField(
        max_length=255, error_messages={"required": "로그인을 위해 이메일을 적어주세요."}
    )
    password = serializers.CharField(
        max_length=128, error_messages={"required": "로그인을 위해 비밀번호를 적어주세요."}
    )

    def validate(self, data):
        email = data.get("email", None)
        password = data.get("password", None)

        if email is None:
            raise serializers.ValidationError("로그인을 위해 이메일을 적어주세요.")

        if password is None:
            raise serializers.ValidationError("로그인을 위해 비밀번호를 적어주세요.")

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError("등록된 회원이 아닙니다.")

        if not user.is_active:
            raise serializers.ValidationError("비활성화된 회원입니다. 관리자에게 문의하세요")

        return {
            "email": user.email,
            "password": user.password,
            "nickname": user.nickname,
        }


class UserSeriallizer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = "__all__"
