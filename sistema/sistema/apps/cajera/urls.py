from django.urls import path
from .views import *

urlpatterns = [
    path('caja/', VistaCajera2.as_view()),
    path('caja_view', CajaView.as_view()),

    path('realizar_pago', realizar_pago),
    path('realizar_corte', realizar_corte)
    ] 