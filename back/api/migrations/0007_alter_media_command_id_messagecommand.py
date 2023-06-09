# Generated by Django 4.2.1 on 2023-05-15 08:41

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_media'),
    ]

    operations = [
        migrations.AlterField(
            model_name='media',
            name='command_id',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='media', to='api.command'),
        ),
        migrations.CreateModel(
            name='MessageCommand',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('message', models.TextField()),
                ('command_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='messageCommand', to='api.command')),
            ],
        ),
    ]
