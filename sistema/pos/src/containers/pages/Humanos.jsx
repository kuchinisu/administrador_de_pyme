import { connect } from "react-redux";
import Empleade from '../../components/views/partes/Emplead'
import NavbarRH from "../../components/navigation/NavbarRH";
import Footer from '../../components/navigation/Footer'

function Humanos() {
    return(
        <>  
            <NavbarRH/>
            <Empleade/>
            <Footer/>
        </>
    )
}


const mapStateToProps = state =>({

})

export default connect(mapStateToProps,{

})(Humanos)