import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { changeCurrentLocationLabel } from "odc-common";
import MasterCampaniaReporte from "./../../containers/ConTReporte";
import { Provider } from "../../context/ContextReporteCampania";

const CampaniaReporte = ({ }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(changeCurrentLocationLabel("Reporte Detallado de Desembolsos"));
    }, []);
    return (
        <Provider>
            <div className="app-wrapper">
                <MasterCampaniaReporte />
            </div>
        </Provider>
    );
}

export default CampaniaReporte;