# Generated by Django 4.0.3 on 2023-07-18 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('openapi', '0002_alter_chatlog_novel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='novel',
            name='novel_image',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
