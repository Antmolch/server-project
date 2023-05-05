from datetime import datetime

from django.contrib.auth.models import User
from django.db import models


# Create your models here.


class Bot(models.Model):
    login_id = models.ForeignKey(User, verbose_name='Login id', on_delete=models.CASCADE)
    app_name = models.CharField(verbose_name='App name', max_length=512)
    token = models.CharField(verbose_name='token', max_length=512)
    url = models.CharField(verbose_name='Url', max_length=512)
    name = models.CharField(verbose_name='Name', max_length=255)
    launch_status = models.BooleanField(verbose_name='Status', default=0)


class Bot_chat(models.Model):
    bot_id = models.ForeignKey(Bot, on_delete=models.CASCADE)
    chat_id = models.IntegerField()


class Type_command(models.Model):
    type_name = models.CharField(max_length=255)


class Command(models.Model):
    bot_id = models.ForeignKey(Bot, on_delete=models.CASCADE)
    command_name = models.CharField(max_length=255)
    type_id = models.ForeignKey(Type_command, on_delete=models.CASCADE)
    link_status = models.BooleanField(default=0)
    media_status = models.BooleanField(default=0)


class Link_command(models.Model):
    current_command = models.ForeignKey(Command, verbose_name='curCmd', related_name='linkcommands_current',
                                        on_delete=models.CASCADE)
    following_command = models.ForeignKey(Command, verbose_name='flwCmd', related_name='linkcommands_following',
                                          on_delete=models.CASCADE)


class Media(models.Model):
    command_id = models.ForeignKey(Command, verbose_name='cmdId', on_delete=models.CASCADE)
    media = models.TextField(verbose_name="media")


class Question_command(models.Model):
    command_id = models.ForeignKey(Command, verbose_name='cmdId', on_delete=models.CASCADE)
    answer = models.TextField(verbose_name="answer")


class Mail_command(models.Model):
    command_id = models.ForeignKey(Command, verbose_name='cmdId', on_delete=models.CASCADE)
    mail = models.TextField(verbose_name="mail")
    date = models.DateField(default=datetime.now)
