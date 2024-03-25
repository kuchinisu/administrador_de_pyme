from django.urls import path
from .views import *

urlpatterns = [
    path('ganancias_por_dia', GananciasNetasPorDiaView.as_view())
]
 