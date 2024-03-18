from django.urls import path
from .views import *

urlpatterns = [
    path('cajera/', VistaCajera2.as_view()),
    path('realizar_pago/', realizar_pago), 
    path('cajera/<codigo>/', ProductoDetailView.as_view()),
    path('categorias/', ListaCategorias.as_view()),
    path('caja/', CajaView.as_view()),
    path('realizar_corte/', realizar_corte),

    path('socios/', SociosVista.as_view()),
    path('ganancias_por_dia/', GananciasNetasPorDiaView.as_view()),
    path('tabla_de_pasivos/', tabla_de_pasivos),
    path('inventario/', InventarioView.as_view()),
    path('inventario/<categoria>/<marca>/', ProductosDeMarca.as_view()),
]
#