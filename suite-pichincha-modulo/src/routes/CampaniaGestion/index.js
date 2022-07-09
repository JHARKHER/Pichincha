
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import MasterGestionCampania from "../../containers/ConTCampaniaGestion";

const CampaniaGestion = ({ }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeCurrentLocationLabel("Gestión Campaña"));
    }, []);
    return (

        <MasterGestionCampania />
    );
}

export default CampaniaGestion;