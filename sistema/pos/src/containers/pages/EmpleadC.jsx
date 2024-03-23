import { Link, useParams } from "react-router-dom";
import { connect,  useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";
import { get_emplead_codigo } from "../../redux/actions/empleadPorCodigo";

function EmpleadC () {
    const params = useParams();
    const codigo = params.codigo;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_emplead_codigo(codigo)); 
      }, [dispatch])
      const empleadao = useSelector((state) => state.empleadCod.emplead);


    return (
        <>
            <div data-theme="cupcake">
                {empleadao ? (
                    <div>
                        {empleadao.map((item) => 
                        <div>
                            
                            <form>
                            <div className="space-y-12">
                                <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-lg font-semibold leading-7 text-gray-900">Perfil</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Información en la base de datos local y online</p>


                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                        <label htmlFor="nombre-empleadao" className="block text-sm font-medium leading-6 text-gray-900">
                                            Nombre:
                                        </label>
                                        <div className="mt-2">
                                            <div>
                                                {item.nombre}
                                            </div>
                                        </div>
                                </div>
                                <div className="sm:col-span-3">
                                        <label htmlFor="edad-empleadao" className="block text-sm font-medium leading-6 text-gray-900">
                                            Edad
                                        </label>
                                        <div className="mt-2">
                                            {item.edad}
                                        </div>
                                </div>
                                

                                    <div className="col-span-full">
                                    
                                    
                                    </div>

                                    

                                    <div className="col-span-full">
                                    
                                    </div>
                                </div>
                                </div>

                                <div className="border-b border-gray-900/10 pb-12">

                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                    <div>Sexo: {item.sexo}</div>
                                    </div>

                                    <div className="sm:col-span-3">
                                    <label htmlFor="fecha-de-nacimiento" className="block text-sm font-medium leading-6 text-gray-900">
                                        Fecha de nacimiento:
                                    </label>
                                    <div className="mt-2">
                                        {item.cumple}
                                    </div>
                                    </div>

                                    <div className="sm:col-span-4">
                                    <label htmlFor="fecha-de-entrada" className="block text-sm font-medium leading-6 text-gray-900">
                                        fecha de entrada:
                                    </label>
                                    <div className="mt-2">
                                        {item.fecha_entrada}
                                        <div> dias trabajados: {item.dias_trabajados}</div>
                                    </div>
                                    </div>

                                    <div className="sm:col-span-3">
                                    <label htmlFor="puesto" className="block text-sm font-medium leading-6 text-gray-900">
                                        Puesto:
                                    </label>
                                    <div className="mt-2">
                                        {item.puesto}
                                    </div>
                                    </div>

                                    

                                    <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="salario" className="block text-sm font-medium leading-6 text-gray-900">
                                        salario
                                    </label>
                                    <div className="mt-2">
                                        {item.salario}
                                    </div>
                                    </div>

                                    <div className="sm:col-span-2 sm:col-start-1">
                                    <label htmlFor="codigo-empl" className="block text-sm font-medium leading-6 text-gray-900">
                                        Codigo:
                                    </label>
                                    <div className="mt-2">
                                        {item.codigo}
                                    </div>
                                    </div>

                                    

                                </div>
                                        Area: {item.area}
                                    
                                </div>

                                
                            </div>

                            
                            </form>
                            
                        </div>
                        )}
                    </div>
                ):(
                    <div>

                    </div>
                )}
            </div>
        </>
    )
}


const mapStateToProps = state =>({
 
})

export default connect(mapStateToProps,{

})(EmpleadC)