import React, { useEffect } from "react";
import FullWidthLayout from "hocs/layouts/FullWidthLayout";
import { connect } from "react-redux";
import CajaV from "../../components/views/CajaV";
import { get_cajera_list } from "../../redux/actions/cajera";

function Caja({ get_cajera_list } ) {
    useEffect(() => {
        get_cajera_list();  
    }, [get_cajera_list]);
    

    console.log("lo q contiene es: ", get_cajera_list)
    return (
        <FullWidthLayout>
            <CajaV get_cajera_list={get_cajera_list} />
        </FullWidthLayout>
    );
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {
    get_cajera_list,
})(Caja);
