import React, { createContext } from "react";
import  { useDispatch } from "react-redux";
import { useObtenerReporteDetalleCampania  } from "../hook";

export const Context = createContext({});

export const Provider = (props) => {   
    const {children} = props;
    const dispatch=useDispatch();    
    const { reportes, errorReportes, isLoadingReportes
          } = useObtenerReporteDetalleCampania(dispatch);
   
    const camposContext = {        
        reportes, errorReportes, isLoadingReportes
    };

    return <Context.Provider value={camposContext}>{children}</Context.Provider>;
};

