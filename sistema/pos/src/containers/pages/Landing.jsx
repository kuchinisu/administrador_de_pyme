import { connect } from "react-redux";
import  LandingPage  from "../../components/views/LandingPage"



function Landing() {
    return (
        <>
        <LandingPage/>
        </>
    )
}


const mapStateToProps = state =>({

})

export default connect(mapStateToProps,{

})(Landing)