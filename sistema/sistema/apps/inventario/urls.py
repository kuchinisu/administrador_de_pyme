from django.urls import path
from .views import *

urlpatterns = [
    path('inventario/', InventarioView.as_view()),
    path('categorias/', ListaCategorias.as_view()),
    path('productos_de_marca_unidad/<categoria>/<marca>/<producto>/', ProductosDeMarcaUnidades.as_view()),
    path('productos_de_marca/<categoria>/<marca>/', ProductosDeMarca.as_view()),
    

    path('add_categoria/', add_categoria),
    path('add_marca/', add_marca),
    path('add_producto/', add_producto),
    path('add_unidad', add_unidad),
    ] 