import { connect,  useSelector} from "react-redux";
import SociosP from './partes/SociosP'
import GananciasNetasP from "./partes/GananciasNetasP";
import PasivTabla from "./partes/PasivTabla"; 
function MenuBoard() {
    return(
        <>
            <SociosP/>
            <GananciasNetasP/>
            <PasivTabla/>
        </>

    )
}

const mapStateToProps = state => ({

})

export default connect(mapStateToProps,{
    
})(MenuBoard)

