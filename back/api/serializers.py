from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from djoser.serializers import TokenSerializer
from rest_framework import serializers

from api.models import *

UserModel = get_user_model()


class BotDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bot
        fields = '__all__'  # явно указываем все поля модели


class BotsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bot
        fields = ("id", 'app_name', 'token', 'url', 'name', 'launch_status', 'login_id')


class CommandDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Command
        fields = '__all__'


class CommandsListView(serializers.ModelSerializer):
    class Meta:
        model = Command
        fields = ("id", "command_name", "link_status", "media_status", "bot_id_id", "type_id_id")


class CommandLinkDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link_command
        fields = '__all__'


class CommandLinksListView(serializers.ModelSerializer):
    class Meta:
        model = Link_command
        fields = "__all__"


class CommandTypeDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Type_command
        fields = "__all__"


class CommandTypesListView(serializers.ModelSerializer):
    class Meta:
        model = Type_command
        fields = "__all__"


User = get_user_model()


class CustomUserCreateSerializer(UserCreateSerializer):
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email already exists')
        return value

    class Meta:
        model = User
        fields = ('id', 'email', 'password','username')

class CustomTokenSerializer(TokenSerializer):
    user_id = serializers.IntegerField(source='user.id')

    class Meta(TokenSerializer.Meta):
        fields = TokenSerializer.Meta.fields + ('user_id',)


