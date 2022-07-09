import React, { useContext, useState, useEffect } from "react";
import GrdCreditoConsumoAgencias from "../../componentes/ComPCampaniaReporte/ComPGridCreditoConsumoAgencias";
import { useDispatch } from 'react-redux';
import { ProgressBar, IntlMessages } from "odc-common";
import Paper from "@material-ui/core/Paper";
import { Form } from 'react-final-form'
import { Context } from "../../context/ContextReporteCampania";
import { useObtenerReporte } from "../../hooks/ReporteCampania";

const onSubmit = async values => { }

const divStyle = {
    width: '100%',
    align: 'left',
    margen: '20px',
    padding: '20px',
}

////CONTENEDOR DEL REPORTE
const MasterCampaniaReporte = ({ }) => {
    const { reportes, errorReportes, isLoadingReportes } = useContext(Context);
    const dispatch = useDispatch();

    if (isLoadingReportes) return (<ProgressBar />);    

    const ValoresCreditoConsumoAgencias = (e) => {
        useObtenerReporte(dispatch);
    }

    ////CUERPO DEL CONTENEDOR
    //console.log(reportes); 
    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            initialValues={{ GridCreditoConsumoAgencias: reportes }}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Paper>
                        <div style={divStyle}>
                            <br></br>
                            <div >
                                <h2 >
                                    <b>{<IntlMessages id="campania.campaniareporte.encabezadoreporte" />}</b>
                                </h2 >
                            </div>
                            <div >
                                < GrdCreditoConsumoAgencias
                                    ValoresCreditoConsumoAgencias={ValoresCreditoConsumoAgencias}
                                />
                            </div>                                                   
                        </div>
                    </Paper>
                </form >

            )}
        />
    );
}

export default MasterCampaniaReporte;