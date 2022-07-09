import React, { useState, createContext } from "react";
import  { useDispatch } from "react-redux";
import { useObtenerReporte, useObtenerReportePDF  } from "../../hooks/ReporteCampania";

export const Context = createContext({});

export const Provider = (props) => {   
    const {children} = props;
    const dispatch = useDispatch();  
    const { reportes, errorReportes, isLoadingReportes} = useObtenerReporte(dispatch);
   
    const camposContext = {        
        reportes, errorReportes, isLoadingReportes
    };

    return <Context.Provider value={camposContext}>{children}</Context.Provider>;
};

