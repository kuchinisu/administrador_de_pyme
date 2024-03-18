import FullWidthLayout from "hocs/layouts/FullWidthLayout";
import { connect } from "react-redux";
import PagoRealizado from "components/views/PagoRealizado";

function Pagado(){
    return(
        
        <PagoRealizado/>
        
    )
}

const mapStateToProps = state =>({
 
})

export default connect(mapStateToProps,{

})(Pagado)