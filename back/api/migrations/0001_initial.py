# Generated by Django 4.2.1 on 2023-05-12 16:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Bot',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('unique_name', models.CharField(default=None, max_length=255)),
                ('name', models.CharField(default=None, max_length=255)),
                ('token', models.CharField(default=None, max_length=255)),
                ('url', models.CharField(default=None, max_length=255)),
                ('launch_status', models.BooleanField(default=None, max_length=255)),
                ('login_id', models.ForeignKey(default=None, max_length=255, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
