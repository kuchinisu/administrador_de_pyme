import { connect,  useSelector} from "react-redux";

function PasivTabla () {

    const solicitarTabla = () => {
        const selectorDeModo = document.getElementById("selector_modo");
        const boton = document.getElementById("boton_tabla");
        boton.innerText = "Actualizar tabla"
        const data = {
            metodo:selectorDeModo.value,
        }

        var datosServer = {}
        fetch('http://127.0.0.1:8000/finanzas/tabla_de_pasivos/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            datosServer=data

        
        const divTabla = document.getElementById("div_tabla");
        const tabla = document.createElement("table");
        tabla.className="table";

        const encabezado = document.createElement("thead");
        const trEncabezado = document.createElement("tr");
        const thEncabezadoGasto = document.createElement("th");
        const thEncabezadoValor = document.createElement("th");

        thEncabezadoGasto.innerText="Tipo";
        thEncabezadoValor.innerText="Valor";
 
        trEncabezado.appendChild(thEncabezadoGasto);
        trEncabezado.appendChild(thEncabezadoValor);
        encabezado.appendChild(trEncabezado);

        tabla.appendChild(encabezado)
        const tbody = document.createElement("tbody");

        for (let key in datosServer) {
          

            try {
                const jsonObject = JSON.parse(datosServer[key]);
                const tr = document.createElement("tr");
                const th = document.createElement("th");
                const th2 = document.createElement("th");
                th.innerText = key;
                th2.innerText = '$' + datosServer[key];
        
                tr.appendChild(th);
                tr.appendChild(th2);
        
                tbody.appendChild(tr);
              } catch (error) {
                //window.alert("No es un objeto JSON" + datosServer[key]);

                try{
                    for(let key2 in datosServer[key]){
                        try{
                        const jsonObject = JSON.parse(datosServer[key][key2]);
                        const tr = document.createElement("tr");
                        const th = document.createElement("th");
                        const th2 = document.createElement("th");

                        th.innerText = key2;
                        th2.innerText = '$' + datosServer[key][key2];
                        tr.appendChild(th);
                        tr.appendChild(th2);
                
                        tbody.appendChild(tr);
                    }catch{
                        for(let key3 in datosServer[key][key2]) {
                            const tr = document.createElement("tr");
                            const th = document.createElement("th");
                            const th2 = document.createElement("th");

                            th.innerText = key2;
                            th2.innerText = '$' + datosServer[key][key2][key3];
                            tr.appendChild(th);
                            tr.appendChild(th2);
                    
                            tbody.appendChild(tr);
                        }
                        }
                    }
                }catch{

                }

              }
          }

        
        
       
        tabla.appendChild(tbody);
        
        if (divTabla.childElementCount > 0) {
            // Eliminar todos los hijos de tablaDiv
            while (divTabla.firstChild) {
                divTabla.removeChild(divTabla.firstChild);
            }
        }
        
        divTabla.appendChild(tabla);
        
        })
        .catch(error => {
            console.error('Error al realizar la solicitud:', error);
        });

        

        
    }

 return (
    <>
    <div data-theme="cupcake">
    <h1 className="text-2xl text-center my-4">Tabla de Pasivos</h1>
    <div id="div_tabla" className="overflow-x-auto max-w-screen-lg mx-auto">

    </div>

    <ul className="menu bg-base-200 w-56 rounded-box mt-4">
        <li className="menu-title">Configuración de la tabla</li>
        <select className="select select-ghost w-full max-w-xs" id="selector_modo">
            <option disabled selected>Pick the best JS framework</option>
            <option value="mensual">mensual</option>
            <option value="diario">diario</option>
        </select>

        <div className="mt-4">
            <button className="btn btn-primary w-full" id="boton_tabla" onClick={solicitarTabla}>Mostrar tabla</button>
        </div>
    </ul>
</div>

    </>
 )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{
    
})(PasivTabla)