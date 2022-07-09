import { useState, useEffect } from "react";
import { obtenerNombresCampanias, obtenerCreditoConsumoAgencias, obtenerReporteDetalleCampania,
         obtenerOficinas, obtenerRegiones, obtenerTipoCliente } from "../../comunicacion/ComUReporte";

export const useObtenerReporte = (dispatch) => {
  const [reportes, setReportes] = useState([]);
  const [errorReportes, setErrorReportes] = useState(null);
  const [isLoadingReportes, setLoadingReportes] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coreResponse = await obtenerCreditoConsumoAgencias();
        if (coreResponse.state) {       
          var cont = 1;
          const reportes = coreResponse.data;
          reportes.forEach(element => {
            element.id = cont++;
          });   
          setReportes(coreResponse.data);
          setLoadingReportes(false);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setReportes([]);
          setLoadingReportes(false);
        }
      } catch (error) {
        setErrorReportes(error);
        setLoadingReportes(false);
      }
    };
    fetchData();
  }, []);
  return { reportes, errorReportes, isLoadingReportes };
};

export const useObtenerReporteDetalleCampania = (props) => {
 let {setReportes,campos,dispatch} = props;
    const fetchData = async () => {
      try {       
        const coreResponse = await obtenerReporteDetalleCampania(campos);
        //console.log(coreResponse.data);
        if (coreResponse.state) {     
          var cont = 1;
          const reportes = coreResponse.data;
          reportes.forEach(element => {
            element.id = cont++;
          });   
          setReportes(coreResponse.data);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
        }
      } catch (error) {
      }
    };
    fetchData();
  return {};
};

export const useObtenerNombresCampanias = (dispatch) => {
  const [nombreCampania, setNombreCampania] = useState(null);
  const [errorNombreCampania, setErrorNombreCampania] = useState(null);
  const [isLoadingNombreCampania, setLoadingNombreCampania] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const coreResponse = await obtenerNombresCampanias();
        if (coreResponse.state) {          
          const nombreCampania = coreResponse.data;
          setNombreCampania(nombreCampania);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setNombreCampania([]);
        }
        setLoadingNombreCampania(false);
      } catch (error) {
        setErrorNombreCampania(error);
        setLoadingNombreCampania(false);
      }
    };
    fetchData();
  }, []);
  return { nombreCampania, errorNombreCampania, isLoadingNombreCampania };
};

export const useObtenerOficinas = (dispatch) => {
  const [oficinas, setOficinas] = useState(null);
  const [errorOficinas, setErrorOficinas] = useState(null);
  const [isLoadingOficinas, setLoadingOficinas] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {        
        const coreResponse = await obtenerOficinas();
        //console.log("useObtenerOficinas", coreResponse)
        if (coreResponse.state) {          
          const oficinas = coreResponse.data;
          setOficinas(oficinas);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setOficinas([]);
        }
        setLoadingOficinas(false);
      } catch (error) {
        setErrorOficinas(error);
        setLoadingOficinas(false);
      }
    };
    fetchData();
  }, []);
  return { oficinas, errorOficinas, isLoadingOficinas };
};

export const useObtenerRegiones = (dispatch) => {

  const [regiones, setRegiones] = useState(null);
  const [errorRegiones, setErrorRegiones] = useState(null);
  const [isLoadingRegiones, setLoadingRegiones] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coreResponse = await obtenerRegiones();
        if (coreResponse.state) {          
          const regiones = coreResponse.data;
          setRegiones(regiones);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setRegiones([]);
        }
        setLoadingRegiones(false);
      } catch (error) {
        setErrorRegiones(error);
        setLoadingRegiones(false);
      }
    };
    fetchData();
  }, []);
  return { regiones, errorRegiones, isLoadingRegiones };
};


export const useObtenerTipoCliente = (dispatch) => {
  const [tipoCliente, setTipoCliente] = useState(null);
  const [errorTipoCliente, setErrorTipoCliente] = useState(null);
  const [isLoadingTipoCliente, setLoadingTipoCliente] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coreResponse = await obtenerTipoCliente();
        if (coreResponse.state) {  
          const tipoCliente = coreResponse.data;
          setTipoCliente(tipoCliente);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setTipoCliente([]);
        }
        setLoadingTipoCliente(false);
      } catch (error) {
        setErrorTipoCliente(error);
        setLoadingTipoCliente(false);
      }
    };
    fetchData();
  }, []);
  return { tipoCliente, errorTipoCliente, isLoadingTipoCliente };
};
