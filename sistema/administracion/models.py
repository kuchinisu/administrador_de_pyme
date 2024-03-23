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
    

    
class CajaFuerte(models.Model):
    nombre = models.CharField(default="cajafuerte", max_length=11)
    dinero = models.DecimalField(max_digits=10, decimal_places=2)
    destinado = models.DecimalField(max_digits=5, decimal_places=2)
    def __str__(self):
        return str(self.nombre)
    

class CategoriaPasivosFijos(models.Model):
    nombre = models.CharField(default=" ", max_length=50)
    destinado = models.IntegerField(default=30)

    def __str__(self):
        return str(self.nombre)
    
class PasivosFijos(models.Model):
    nombre = models.CharField(default = "", max_length=50)
    meta = models.DecimalField(max_digits=10, decimal_places=2)
    acumulado = models.DecimalField(max_digits = 10, decimal_places = 2)

    cada_cuanto = models.IntegerField(default = 0)
    a_partir = models.DateTimeField()
    
    destinado = models.DecimalField(max_digits=5, decimal_places=2)

    categoria = models.ForeignKey(CategoriaPasivosFijos, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.nombre)

#inventario
class Categoria(models.Model):
    nombre = models.CharField(default = "", max_length=50)
    def __str__(self):
        return str(self.nombre)
    
class Marca(models.Model):
    nombre = models.CharField(default="", max_length=50)
    imagen = models.ImageField(upload_to=path_dir_admin, default='defecto/1')
    def __str__(self):
        return str(self.nombre)
    def get_imagen(self):
        if self.imagen:
            return self.imagen.url
        return ''
    def get_imagen(self):
        if self.imagen:
            return self.imagen.url
        return ''

class ProductoTipo(models.Model):
    nombre = models.CharField(default = " ", max_length=50)
    descripcion = models.CharField(default = " ",max_length=300)
    imagen = models.ImageField(upload_to=path_dir_admin, default='defecto/1')
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    costo = models.DecimalField(max_digits=10, decimal_places=2)
    perecedero = models.BooleanField(default=False)
    MODO_INVENTARIO = (
        ('JIT', 'JIT'),
        ('contabilizado', 'contabilizado'),
    )
    mod_inventario = models.CharField(
        max_length=20,
        choices=MODO_INVENTARIO,
        default='contabilizado',  
    )

    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)

    def __str__(self): 
        return str(self.nombre)
    
    def get_imagen(self):
        if self.imagen:
            img_path = self.imagen
            return img_path
        return ''
    
    def get_categoria_str(self):
        if self.categoria:
            return str(self.categoria.nombre)

    def get_marca_str(self):
        if self.marca:
            return str(self.marca.nombre)
    

class Producto(models.Model):

    producto = models.ForeignKey(ProductoTipo, on_delete = models.CASCADE)

    
    codigo = models.IntegerField(unique = False, default=1)
    
    
    fecha_de_caducidad = models.DateTimeField(default=datetime.datetime.now())

    

    def __str__(self):
        return str(f'{self.producto.nombre} codigo: {self.codigo}')
    
    
    

class Merma(models.Model):
    nombre = models.CharField(default = "", max_length=50)
    descripcion = models.CharField(default = " ", max_length=50)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    costo = models.DecimalField(max_digits=10, decimal_places=2)
    imagen = models.ImageField(path_dir_admin, default='defecto/1')
    codigo = models.IntegerField(unique = True, default=1)

    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    marca = models.ForeignKey(Marca, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.nombre)
    
    def get_imagen(self):
        if self.imagen:
            return self.imagen.url
        return ''

#cajera
    
class Caja(models.Model):
    nombre = models.CharField(default = "A", max_length=50)
    cantidad = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad_neta = models.DecimalField(default = 0, max_digits=10, decimal_places=2)
    
    def __str__(self):
        return str(self.nombre)
    

class HistorialDeVentas(models.Model):
    fecha = models.DateField(default=datetime.date.today())

    def __str__(self):
        return str(f"dia de ventas {self.fecha}")


class ProductoVendido(models.Model):
    del_dia = models.ForeignKey(HistorialDeVentas, on_delete=models.CASCADE)
    tipo_de_producto = models.ForeignKey(ProductoTipo, on_delete=models.CASCADE)
    hora_de_venta = models.DateTimeField(default=datetime.datetime.now())
    codigo = models.IntegerField(default = 0)
    numero_de_venta = models.IntegerField(default = 0)

    def __str__(self):
        return f'{self.tipo_de_producto.nombre} - Código: {self.codigo}'



class GananciasNetasPorDia(models.Model):
    fecha = models.DateField(default=datetime.date.today())
    ganancias_netas_totales = models.DecimalField(default=0.00, max_digits=10, decimal_places=2)

    def __str__(self):
        return str(f'ganancias del dia: {self.fecha}')
    
class Tiket(models.Model):
    fecha = models.DateField(default=datetime.date.today())
    numero_de_tiket = models.IntegerField(default=0)
    cuenta = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)
    
    def __str__(self):
        return str(f'{self.fecha} numero de tiket: {self.numero_de_tiket} cuenta: {self.cuenta}')

class ProductosEnTikets(models.Model):
    tipo_de_producto = models.ForeignKey(ProductoTipo, on_delete=models.CASCADE)
    codigo = models.IntegerField(default = 0)
    precio = models.DecimalField(default=0.00, max_digits=9, decimal_places=2)

    en_tiket = models.ForeignKey(Tiket, on_delete=models.CASCADE)
    
    def __str__(self):
        return str(f'{self.tipo_de_producto}-{self.codigo}:   {self.precio}')

class Turno(models.Model):
    fecha = models.DateField(default=datetime.date.today())
    
class Corte(models.Model):
    fecha = models.DateField(default=datetime.date.today())
    documento = models.CharField(default=" ", max_length=50)

    def __str__(self):
        return str(f'corte del {self.fecha}')