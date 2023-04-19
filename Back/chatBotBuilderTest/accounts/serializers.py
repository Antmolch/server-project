from rest_framework import serializers
from .models import userProfile
class userProfileSerializer(serializers.ModelSerializer):
    user=serializers.StringRelatedField(read_only=True)
    class Meta:
        model=userProfile
        fields='__all__'

from rest_framework import serializers
from .models import Bot

class StudentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Bot
        fields = ('pk', 'name', 'photo')