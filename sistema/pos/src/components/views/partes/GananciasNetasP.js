import { connect,  useSelector, useDispatch} from "react-redux";
import {  useEffect, useState , useRef} from "react";
import { get_ganancias_netas_list } from '../../../redux/actions/gananciasNetasP'

import ChartComponent from './plugins/graficas'
import { ColorType, createChart } from "lightweight-charts";

function GananciasNetasP () {

 
    const dispatch = useDispatch();
    const gananciasNetasList = useSelector((state) => state.gananciasNetas.ganancias_netas_list);
    const chartContainerRef = useRef()


    useEffect(() => {
        
        dispatch(get_ganancias_netas_list());  


        const initialData = [
            //{ time: '2018-12-22', value: 32.51 },
            //{ time: '2018-12-23', value: 31.11 },
        ];
        //let len = gananciasNetasList.length;
        if(!gananciasNetasList){
            console.log("lsita de ganancias netas vacía")

        }else {
            for(let i=2; i>-1; i--){
                initialData.push({ time: '' + gananciasNetasList[i].fecha, value: parseInt(gananciasNetasList[i].ganancias_netas_totales) },)
                //window.alert(i+': ' + gananciasNetasList[i].fecha + ' ' + gananciasNetasList[i].ganancias_netas_totales)
            }
        }
        
 

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "white" },

            },

            width: chartContainerRef.current.clientWidth,
            height:300,
            
        });
        const newSeries = chart.addAreaSeries({
            lineColor: "#2962FF",
            topColor: "#2962FF",
            bottomColor: "rgba(41, 98, 255, 0.28)",
        });
        

        newSeries.setData(initialData)

        return () => {
            chart.remove()
        }


      }, [dispatch]);
    
     
    return(
        <>
        <div data-theme="cupcake">
    <div className="section">
        <h2 className="card-title h-46 p-30 relative">Ganancias netas por día</h2>
        <hr className="absolute left-0 w-full border-gray-300 mt-4" />
    </div>

    <div className="mt-8">
        {/* área de los elementos */}
        {gananciasNetasList ? (
            <div>
                {/* Área de la tabla */}
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* Encabezado */}
                        <thead>
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Ganancias Brutas</th>
                                <th className="px-4 py-2">Ganancias Netas</th>
                                <th className="px-4 py-2">Fecha</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {gananciasNetasList.map((item, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">1000</td> {/* Esto debería ser reemplazado con los datos reales de ganancias brutas */}
                                    <td className="border px-4 py-2">{item.ganancias_netas_totales}</td>
                                    <td className="border px-4 py-2">{item.fecha}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Fin del área de la tabla */}
            </div>
        ) : (
            <div></div>
        )}

        {/* final del área de los elementos */}
    </div>

    <div ref={chartContainerRef} style={{ width: '100%', height: '300px'}}></div>
</div>

        </>
    )

} 

const mapStateToProps = state => ({ 

})

export default connect(mapStateToProps,{
    
})(GananciasNetasP)
 