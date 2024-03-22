import { get_emplead_list } from "../../../redux/actions/emplead";
import { connect,  useSelector, useDispatch} from "react-redux";
import {  useEffect,} from "react";

function Emplead() {

    

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_emplead_list()); 
      }, [dispatch]);

    const empleadsList = useSelector((state) => state.emplead.emplead_list);

    return (
        <div data-theme="cupcake">
            {empleadsList ? ( 
                <div>
                {empleadsList.map((item) => 
                    <div>
                        {item.nombre}
                    </div>
                    )}
                    
                </div>

            ):(
                <div>
                    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                        <div className="text-center">
                        <p className="text-base font-semibold text-indigo-600">404</p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Sin emplead@s registrad@s</h1>
                        <p className="mt-6 text-base leading-7 text-gray-600">ocurrio un error al intentar acceder a l@s emplead@s o no hay ninguno en la base de datos</p>
                        
                        </div>
                    </main>
                </div>
            )}
        </div>
    )
}


const mapStateToProps = state => ({ 

})

export default connect(mapStateToProps,{
    
})(Emplead)
 