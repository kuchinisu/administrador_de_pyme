from django.db import models
import uuid
import datetime

from django.core.validators import MaxValueValidator, MinValueValidator

 
def path_dir_admin(instance, filename):
    ext = filename.split('.')[-1]
    nombre_archivo = f"{uuid.uuid4()}.{ext}"
    ruta_completa = f"rh/{instance.tipo}/{instance.nombre}/{nombre_archivo}"
    print(ruta_completa)  
    return ruta_completa

 
class Socios(models.Model):
    nombre = models.CharField(default=" ", max_length=50)
    dinero = models.DecimalField(max_digits=10, decimal_places=2)
    porcentaje_correspondido = models.DecimalField(max_digits=5, decimal_places=2)

    codigo_empleado = models.IntegerField(default=0)
    foto = models.ImageField(upload_to=path_dir_admin, default='defecto/1')
    tipo = models.CharField(default="socio", max_length=10)
    def __str__(self):
        return str(self.nombre)
    def get_imagen(self):
        if self.foto:
            return self.foto.url
        return ''
    


class Areas(models.Model):
    nombre = models.CharField(default="", max_length=50)

    def __str__(self):
        return str(self.nombre)

class Puestos(models.Model):
    nombre = models.CharField(default="", max_length=50)

    def __str__(self):
        return str(self.nombre)

class Empleade(models.Model):
    nombre = models.CharField(default=" ", max_length=50)
    edad = models.IntegerField(
        default = 18,
        validators=[
            MaxValueValidator(99999),
            MinValueValidator(0)
        ]
    )

    OPCIONES =(
        ("mujer","mujer"),
        ("hombre","hombre")
    )

    sexo = models.CharField(
        max_length = 20,
        choices=OPCIONES,
        default="sin especificar",
    )

    puesto = models.ForeignKey(Puestos, on_delete=models.CASCADE)

    cumple = models.DateTimeField(default = datetime.datetime.now())
    fecha_entrada = models.DateTimeField(default = datetime.datetime.now())
    

    dias_trabajados = models.IntegerField(
        default = 0,
        validators=[
            MaxValueValidator(99999),
            MinValueValidator(0)
        ]
    )

    puesto = models.CharField(default="", max_length=50)
    salario = models.DecimalField(max_digits=10, decimal_places=2)

    OPCIONES_PAGO = (
        ("semanal","semanal"),
        ("quincenal","quincenal"),
        ("mensual","mensual"),
        ("diario","diaro"),
    )
    modo_pago = models.CharField(choices = OPCIONES_PAGO, default = "semanal", max_length=50)
    a_partir_de = models.DateField(default = datetime.date.today(), auto_now=False, auto_now_add=False)
    codigo = models.IntegerField(default=0, unique = True)

    area = models.ForeignKey(Areas, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.nombre)
    
    def get_area(self):
        if self.nombre:
            return str(self.area.nombre)
        return ''
    

class GaffetDeEmpleade(models.Model):
    emplead = models.ForeignKey(Empleade, on_delete=models.CASCADE)
    foto = models.ImageField(upload_to=path_dir_admin, default="default/def")
    tipo = models.CharField(default="emplead", max_length=10)

    def __str__(self):
        return str(f"gaffet de {self.emplead.nombre}-{self.emplead.codigo}")