from django.contrib import admin
from .models import(Socios, Empleade, CajaFuerte, CategoriaPasivosFijos, PasivosFijos, Categoria,
                    Marca, Producto, Merma, Caja,ProductoTipo, HistorialDeVentas, ProductoVendido,
                    GananciasNetasPorDia)

admin.site.register(Socios)
admin.site.register(Empleade)
admin.site.register(Caja)
admin.site.register(CajaFuerte)
admin.site.register(CategoriaPasivosFijos)
admin.site.register(PasivosFijos)
admin.site.register(Categoria)
admin.site.register(Marca)
admin.site.register(Merma)
admin.site.register(Producto)
admin.site.register(ProductoTipo)
admin.site.register(ProductoVendido)
admin.site.register(HistorialDeVentas)
admin.site.register(GananciasNetasPorDia)