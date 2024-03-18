import { connect,  useSelector, useDispatch} from "react-redux";
import {  useEffect, useState } from "react";
import { get_socios_list } from '../../../redux/actions/socios'


function SociosP() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_socios_list()); 
      }, [dispatch]);
    const sociosList = useSelector((state) => state.socios.socios_list);

      return(
      <>
      <div data-theme="cupcake" className="border-bottom">
    {sociosList ? (
        <div>
            {sociosList.map((item, index) => (
                <div key={index} className="mb-8"> {/* Añadí la clase "mb-8" para agregar margen inferior entre los elementos generados */}
                    <div className="stats shadow">

                        <div className="stat">
                            <div className="stat-title">Total Likes</div>
                            <div className="stat-value text-primary">{item.nombre}</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div className="stat-title">Page Views</div>
                            <div className="stat-value text-secondary">{item.dinero}</div>
                            <div className="stat-desc">valor de sus ganancias</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 rounded-full">
                                        <img src={`http://127.0.0.1:8000${item.foto}`} />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-value">{item.porcentaje_correspondido}%</div>
                            <div className="stat-title">del negocio</div>
                            <div className="stat-desc text-secondary">31 tasks remaining</div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div>
            falso
        </div>
    )}
</div>

      </>
    )   
  }
const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{
    
})(SociosP)