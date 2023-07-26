from rest_framework import serializers
from openapi.models import Background, Character, Novel


# Background모델을 연동시켜 BackgroundSerailzer를 생성할 class
class BackgroundSerializer(serializers.ModelSerializer):
    class Meta:
        model = Background
        fields = ["genre", "time_period", "time_projection", "summary"]


# Charater모델을 연동시켜 CharacterSerailzer를 생성할 class
class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ["name", "personality"]


class NovelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novel
        fields = ["user", "novel_name", "novel_image"]


class BackgroundResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Novel
        fields = ["id"]


class NovelBackgroundRequestSerializer(serializers.Serializer):
    genre = serializers.CharField(help_text="장르")
    time_period = serializers.CharField(help_text="시간 배경")
    time_projection = serializers.CharField(help_text="공간 배경")
    summary = serializers.CharField(help_text="발생 사건")
    character = CharacterSerializer(many=True)
