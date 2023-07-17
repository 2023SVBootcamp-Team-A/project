# Generated by Django 4.0.3 on 2023-07-13 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('openapi', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='init_setting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.CharField(max_length=50)),
                ('time_period', models.CharField(max_length=100)),
                ('time_projection', models.CharField(max_length=100)),
                ('people', models.CharField(max_length=100)),
                ('situation', models.CharField(max_length=300)),
            ],
        ),
    ]
