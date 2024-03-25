from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator
import datetime
import uuid
def path_dir_admin(instance, filename):
    ext = filename.split('.')[-1]
    nombre_archivo = f"{uuid.uuid4()}.{ext}"
    ruta_completa = f"administracion/{instance.nombre}/{nombre_archivo}"
    print(ruta_completa)  
    return ruta_completa




#inventario