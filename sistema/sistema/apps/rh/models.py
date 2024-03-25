from django.db import models
 

class Socios(models.Model):
    nombre = models.CharField(default=" ", max_length=50)
    dinero = models.DecimalField(max_digits=10, decimal_places=2)
    porcentaje_correspondido = models.DecimalField(max_digits=5, decimal_places=2)

    codigo_empleado = models.IntegerField(default=0)
    foto = models.ImageField(upload_to=path_dir_admin, default='defecto/1')

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

    codigo = models.IntegerField(default=0, unique = True)

    area = models.ForeignKey(Areas, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.nombre)
    
    def get_area(self):
        if self.nombre:
            return str(self.area.nombre)
        return ''
    