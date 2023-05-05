
from django.contrib import admin
from django.shortcuts import render
from django.urls import path, include
from api.views import *

urlpatterns = [
    path('bot/create', BotCreateView.as_view()),
    path('bot/all', BotsListView.as_view()),
    path('bot/<int:pk>', BotDetailView.as_view()),

    path('command/create', CommandCreateView.as_view()),
    path('command/all', CommandsListView.as_view()),
    path('command/<int:pk>', CommandDetailView.as_view()),

    path('command/link/create', CommandLinkCreateView.as_view()),
    path('command/link/all', CommandLinksListView.as_view()),
    path('command/link/<int:pk>', CommandLinkDetailView.as_view()),

    path('command/type/create', CommandTypeCreateView.as_view()),
    path('command/type/all', CommandTypesListView.as_view()),
    path('command/type/<int:pk>', CommandTypeDetailView.as_view()),




]
