from django.urls import path
from .views import *

urlpatterns = [
    path('areas/', AreasView.as_view()),
    path('socios/', SociosVista.as_view()),
    path('empleades', EmpleadesView.as_view()),
    path('empleade/', EmpleadeView.as_view()),    
    path('add_empleade', add_empleades)
    ]