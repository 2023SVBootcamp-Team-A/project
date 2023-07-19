from django.db import models
from users.models import MyUser


class Novel(models.Model):
    user = models.ForeignKey(
        MyUser, on_delete=models.CASCADE, related_name="user_novel"
    )
    novel_name = models.CharField(max_length=100, null=True)
    novel_image = models.CharField(max_length=255, null=True)
    status = models.BooleanField(default=True)
    create_at = models.DateTimeField(auto_now_add=True)
    udate_at = models.DateTimeField(auto_now=True)
    delete_at = models.DateTimeField(null=True)

    def __str__(self):
        return self.novel_name


class ChatLog(models.Model):
    novel = models.ForeignKey(
        Novel,
        on_delete=models.CASCADE,
        related_name="novel_chatlog",
        unique=True,
    )
    chat_log = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
    udate_at = models.DateTimeField(auto_now=True)
    delete_at = models.DateTimeField(null=True)


class Character(models.Model):
    novel = models.ForeignKey(
        Novel, on_delete=models.CASCADE, related_name="novel_character"
    )
    name = models.CharField(max_length=20)
    personality = models.CharField(max_length=100)
    create_at = models.DateTimeField(auto_now_add=True)
    udate_at = models.DateTimeField(auto_now=True)
    delete_at = models.DateTimeField(null=True)


class NovelStory(models.Model):
    novel = models.ForeignKey(
        Novel, on_delete=models.CASCADE, related_name="novel_story"
    )
    page = models.IntegerField()
    content = models.TextField()
    image = models.CharField(max_length=100)
    create_at = models.DateTimeField(auto_now_add=True)
    udate_at = models.DateTimeField(auto_now=True)
    delete_at = models.DateTimeField(null=True)


class Background(models.Model):
    novel = models.ForeignKey(
        Novel, on_delete=models.CASCADE, related_name="novel_background"
    )
    genre = models.CharField(max_length=100)
    time_period = models.CharField(max_length=100)
    time_projection = models.CharField(max_length=100)
    summary = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
    udate_at = models.DateTimeField(auto_now=True)
    delete_at = models.DateTimeField(null=True)
