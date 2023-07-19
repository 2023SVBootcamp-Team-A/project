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
        fields = ["user"]
