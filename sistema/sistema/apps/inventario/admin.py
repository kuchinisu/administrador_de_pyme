from django.contrib import admin
from .models import (Categoria, Marca, Producto, ProductoTipo)

admin.site.register(Categoria)
admin.site.register(Marca)
admin.site.register(Producto)
admin.site.register(ProductoTipo)
