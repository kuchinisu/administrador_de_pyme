from django.db import models
import uuid
import datetime

def path_dir_admin(instance ,filename):
    ext = filename.split('.')[-1]
    nombre_archivo = f"{uuid.uuid4()}.{ext}"
    ruta_completa = f"inventario/{instance.tipo_instancia}/{instance.nombre}/{nombre_archivo}"
    print(ruta_completa)  
    return ruta_completa



class Categoria(models.Model):
    nombre = models.CharField(default = "", max_length=50)
    def __str__(self):
        return str(self.nombre)
    
class Marca(models.Model):
    nombre = models.CharField(default="", max_length=50)
    imagen = models.ImageField(upload_to=path_dir_admin, default='defecto/1')
    tipo_instancia = models.CharField(default="marcas", max_length=20)
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
    tipo_instancia = models.CharField(default="productos", max_length=20)

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

