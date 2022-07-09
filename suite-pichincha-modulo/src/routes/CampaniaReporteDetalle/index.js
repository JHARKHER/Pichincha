import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import MasterCampaniaReporteDetalle from "./../../containers/ConTReporteDetalle";
import { Provider } from "../../context/ContextReporteDetalleCampania";

const CampaniaReporteDetalle = ({ }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeCurrentLocationLabel("Reportes Detallados de Campañas"));
    }, []);
    return (
        <Provider>
            <div className="app-wrapper">
                <MasterCampaniaReporteDetalle />
            </div>
        </Provider>
    );
}

export default CampaniaReporteDetalle; 