import { connect } from "react-redux";
import  Inventario  from "../../components/views/partes/Inventario"


function DashBoard(){
    return(
            <Inventario/>
    )
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps,{

})(DashBoard)