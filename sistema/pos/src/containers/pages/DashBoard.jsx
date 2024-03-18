import FullWidthLayout from "hocs/layouts/FullWidthLayout";
import { connect } from "react-redux";
import  MenuBoard  from "../../components/views/MenuBoard"


function DashBoard(){
    return(
        <FullWidthLayout>
            <MenuBoard/>
        </FullWidthLayout>
    )
}

const mapStateToProps = state =>({

})

export default connect(mapStateToProps,{

})(DashBoard)