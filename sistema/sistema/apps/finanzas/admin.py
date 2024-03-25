from django.contrib import admin
from .models import (Caja, CajaFuerte, CategoriaPasivosFijos, PasivosFijos, GananciasNetasPorDia)

admin.site.register(Caja)
admin.site.register(CajaFuerte)
admin.site.register(CategoriaPasivosFijos)
admin.site.register(PasivosFijos)
admin.site.register(GananciasNetasPorDia)