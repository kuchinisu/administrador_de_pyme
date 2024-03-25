from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('administracion/', include('administracion.urls')),
    path('cajera/', include('sistema.apps.cajera.urls')),
    path('rh/', include('sistema.apps.rh.urls')),
    path('inventario/', include('sistema.apps.inventario.urls')),
    path('finanzas/', include('sistema.apps.finanzas.urls')),
    path('media/', include('servidorimg.urls')),

] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',
                        TemplateView.as_view(template_name='index.html'))]
