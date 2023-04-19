from django.db import models
from django.contrib.auth.models import User


# Create your models here.

class userProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=30, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    is_creator = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username


from django.db import models

class Bot(models.Model):
    name = models.CharField("Name", max_length=240)
    registrationDate = models.DateField("Registration Date", auto_now_add=True)
    photo = models.CharField("URL", max_length=512)

    def __str__(self):
        return self.name