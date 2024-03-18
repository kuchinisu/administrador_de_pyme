import FullWidthLayout from "hocs/layouts/FullWidthLayout";
import { connect } from "react-redux";
import Menu from '../../components/Menu';

function Home(){
    return(
        <FullWidthLayout>
            <Menu/>
        </FullWidthLayout>
    )
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps,{

})(Home)