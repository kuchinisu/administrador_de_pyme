import { useParams } from "react-router-dom";
import { connect,  useSelector, useDispatch} from "react-redux";
import { useEffect } from "react";

import { get_marca } from "../../redux/actions/producosDeMarca";


function ProductoDeMarca() {

    const params = useParams()
    const marca = params.marca
    const categoria = params.categoria

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(get_marca(categoria,marca)); 
      }, [dispatch]);

    return(
        <>
            <div>
                {marca}
            </div>
        </>
    
    )
}

const mapStateToProps = state =>({
 
})

export default connect(mapStateToProps,{

})(ProductoDeMarca)