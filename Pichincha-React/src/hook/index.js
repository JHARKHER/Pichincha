import { useState, useEffect } from "react";
import { obtenerReporteDetalleCampania} from "../comunication";

export const useObtenerReporteDetalleCampania = (props) => {
 let {setReportes,campos,dispatch} = props;
    const fetchData = async () => {
      try {       
        const coreResponse = await obtenerReporteDetalleCampania(campos);
        //console.log(coreResponse.data);
        if (coreResponse.state) {    
          setReportes(coreResponse.data);
        } else {
          dispatch(coreResponse.message);
        }
      } catch (error) {
      }
    };
    fetchData();
  return {};
};

