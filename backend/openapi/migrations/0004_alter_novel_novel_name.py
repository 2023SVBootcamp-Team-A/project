# Generated by Django 4.0.3 on 2023-07-18 17:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('openapi', '0003_alter_novel_novel_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='novel',
            name='novel_name',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
