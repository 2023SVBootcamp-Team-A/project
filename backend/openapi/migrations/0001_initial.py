# Generated by Django 4.0.3 on 2023-07-25 05:12
# Generated by Django 4.0.3 on 2023-07-23 17:22
# Generated by Django 4.0.3 on 2023-07-26 12:48


from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Novel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('novel_name', models.CharField(max_length=100, null=True)),
                ('novel_image', models.CharField(max_length=255, null=True)),
                ('status', models.BooleanField(default=True)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('udate_at', models.DateTimeField(auto_now=True)),
                ('delete_at', models.DateTimeField(null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_novel', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='NovelStory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('page', models.IntegerField()),
                ('content', models.TextField()),
                ('image', models.CharField(max_length=100)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('udate_at', models.DateTimeField(auto_now=True)),
                ('delete_at', models.DateTimeField(null=True)),
                ('novel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='novel_story', to='openapi.novel')),
            ],
        ),
        migrations.CreateModel(
            name='ChatLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('chat_log', models.TextField()),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('udate_at', models.DateTimeField(auto_now=True)),
                ('delete_at', models.DateTimeField(null=True)),
                ('role', models.CharField(choices=[('user', 'User'), ('assistant', 'Assistant')], default='user', max_length=10)),
                ('novel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='novel_chatlog', to='openapi.novel')),
            ],
            options={
                'ordering': ['novel', 'create_at'],
            },
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('personality', models.CharField(max_length=100)),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('udate_at', models.DateTimeField(auto_now=True)),
                ('delete_at', models.DateTimeField(null=True)),
                ('novel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='novel_character', to='openapi.novel')),
            ],
        ),
        migrations.CreateModel(
            name='Background',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.CharField(max_length=100)),
                ('time_period', models.CharField(max_length=100)),
                ('time_projection', models.CharField(max_length=100)),
                ('summary', models.TextField()),
                ('create_at', models.DateTimeField(auto_now_add=True)),
                ('udate_at', models.DateTimeField(auto_now=True)),
                ('delete_at', models.DateTimeField(null=True)),
                ('novel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='novel_background', to='openapi.novel')),
            ],
        ),
    ]
