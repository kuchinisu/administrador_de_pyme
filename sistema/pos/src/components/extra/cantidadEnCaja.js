function cantidadEnCaja(){
    const recuest = () => {
        const data = {s:""};
        const span = document.getElementById("cantidad");
        fetch('http://127.0.0.1:8000/administracion/caja/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta del servidor:', data);
                span.innerText = data["cantidad"]
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error);
            });

    }

    return(
        <div>
            <span id="cantidad" className="font-bold text-lg"></span>
        </div>
    )

    }
    

export default cantidadEnCaja