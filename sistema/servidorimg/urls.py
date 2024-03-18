from django.urls import path
from .views import *

urlpatterns = [
    path('<imagen>/', vista_img),
]
#