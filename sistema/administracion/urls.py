from django.urls import path
from .views import *

urlpatterns = [
    #accion sin template
    path('add_unidad/', add_unidad),
    path('realizar_pago/', realizar_pago),
    path('tabla_de_pasivos/', tabla_de_pasivos),
    path('realizar_corte/', realizar_corte),
    path('add_categoria/', add_categoria),
    path('add_marca/', add_marca),
    path('add_producto/', add_producto),

    #accion con template 
    path('cajera/', VistaCajera2.as_view()),
    path('cajera/<codigo>/', ProductoDetailView.as_view()),
    path('categorias/', ListaCategorias.as_view()),
    path('caja/', CajaView.as_view()),
    path('socios/', SociosVista.as_view()),
    path('ganancias_por_dia/', GananciasNetasPorDiaView.as_view()),
    path('inventario/', InventarioView.as_view()),
    path('inventario/<categoria>/<marca>/<producto>/', ProductosDeMarcaUnidades.as_view()),
    path('inventario/<categoria>/<marca>/', ProductosDeMarca.as_view()),
]
#