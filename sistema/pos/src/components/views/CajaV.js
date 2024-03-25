import { connect,  useSelector} from "react-redux";
import {  useEffect, useState } from "react";
import { actualizarCaja } from "./function/actualizarCaja";


// class
function CajaV({ get_cajera_list, cajera_list }) {
    const [codigoProducto, setCodigoProducto] = useState('');
  
    const cajeraList = useSelector((state) => state.cajera.cajera_list);


    const pagar = () => {
        const carrito = document.getElementById("carrito");
        const data = {};
        const len = carrito.children.length;
        console.log("len"+len)
        for(let i=0; i<len; i++){
            const children = carrito.children[i]
            if(children.id==="cardP"){
                const nombre = children.querySelector("#nombre");
                const codigo = children.querySelector("#codigo")
                
                if (data.hasOwnProperty(nombre.innerText)) {
                    data[nombre.innerText].push(codigo.innerText);
                } else {
                    data[nombre.innerText] = [codigo.innerText];
                }
                //carrito.removeChild(children);
            }
        
        //actualizarCaja()
        

            
        }
        

        console.log(data);

        fetch('http://127.0.0.1:8000/cajera/realizar_pago/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });
    };

    const agregar = (item, num) => {
        const carrito = document.getElementById("carrito");
        const div = document.createElement("div");
        div.id="cardP"
    
        const escondido = document.createElement("block");
        escondido.style.display = "none";
    
        //const divCodigo = document.createElement()
    
        const img = document.createElement("img");
        img.src = 'http://127.0.0.1:8000' + item.imagen
        img.className="w-full h-48 object-cover rounded-md"
    
        const figure = document.createElement("figure");
        figure.appendChild(img);
    
        const h2 =document.createElement("h2");
        h2.innerText = item.nombre;
        h2.id = "nombre"
        h2.className="card-title text-lg font-semibold";
        
        const h3 = document.createElement("h3");
        h3.innerText = "$"+item.precio;
        h3.className = "text-green-500";
    
        const p = document.createElement("p");
        p.innerText = item.descripcion;

        //////
        const inputCodigo = document.createElement("input");
        inputCodigo.type = "text";
        inputCodigo.value = codigoProducto; // Usar el estado aquí
        inputCodigo.placeholder = "Ingresa código";
        inputCodigo.className = "input input-ghost w-full max-w-xs";
        inputCodigo.onChange = (e) => setCodigoProducto(e.target.value); // Actualizar el estado al cambiar
      
        //////
    
        const botonDelete = document.createElement("button");
        botonDelete.innerText = "eliminar";
        botonDelete.className="btn btn-primary";
        botonDelete.onclick=eliminar
    
    
        const divActions = document.createElement("div");
        divActions.appendChild(botonDelete);
        divActions.className="card-actions mt-2";
    
        const divCodigo = document.createElement("div");

        const codigo = document.createElement("div");
        codigo.innerText = num
        codigo.id = "codigo";

        const divBody = document.createElement("div");
        
        divBody.className="card-body p-4";
        divBody.appendChild(h2);
        divBody.appendChild(h3);
        divBody.appendChild(codigo);
        
        div.appendChild(figure);
        div.appendChild(divBody);
        div.appendChild(divActions);
        
        div.className="card w-full bg-base-100 shadow-xl";
        
        const block = document.createElement("block");
        block.id="bloque";
        
    
        
    
        block.appendChild(divCodigo);
    
        carrito.appendChild(div);
        carrito.appendChild(block)

       
    
    }
 

    useEffect(() => {
        get_cajera_list();
        
    }, [get_cajera_list]);

    return(
        <>
            <div className="flex">
                
                {/* Contenido principal */}
                <div className="w-3/4 p-4">
                    <div data-theme="cupcake">
                        {cajeraList ? (
                        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {cajeraList.map((item) => ( 
                            <li key={item.codigo}>

                                {/* carta */}
                                <div className="card w-full bg-base-100 shadow-xl">
                                    <figure>
                                        <img src={`http://127.0.0.1:8000${item.imagen}`} alt={item.nombre} className="w-full h-full object-cover rounded-md"/>
                                    </figure>

                                    <div className="card-body p-4">
                                        <h2 className="card-title text-lg font-semibold">{item.nombre}</h2>
                                        <h3 className="text-green-500"> ${item.precio} </h3>
                                        <p className="text-sm">{item.descripcion}</p>
                                        <input
                                            id="codigo_de_producto"
                                            type="text"
                                            placeholder="ingresa codigo"
                                            className="input input-ghost w-full max-w-xs"
                                            value={codigoProducto}
                                            onChange={(e) => setCodigoProducto(e.target.value)}
                        />              <div className="card-actions mt-2">
                                            <button className="btn btn-primary" onClick={() => agregar(item, codigoProducto)}>
                                                Agregar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* carta fin*/}

                            </li>
                            ))}
                        </ul>
                    ) : (
                    <p>
                        <span className="loading loading-infinity loading-xs"></span>
                        <span className="loading loading-infinity loading-sm"></span>
                        <span className="loading loading-infinity loading-md"></span>
                        <span className="loading loading-infinity loading-lg"></span>
                    </p>
                    )}
                </div>
                
                
                </div>
                {/* Contenido principal fin */}

                <div id="carrito" className="w-1/4 bg-gray-200 p-4">
                
                    <p>carrito de compras</p>
                    
                    <button onClick={pagar} id="realizarPago" type="submit" className="btn">Pagar</button>
                </div>
                <script>
                
                
                </script>
            </div>
        </>

    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{
    
})(CajaV)



function eliminar(){
    let div = document.getElementById("cardP");
    div.remove();
    
}

