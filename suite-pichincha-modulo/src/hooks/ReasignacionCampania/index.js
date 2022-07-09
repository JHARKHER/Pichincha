import { useState, useEffect } from "react";
import {
  obtenerCampaniaRepartida,
  guardarReasignacionA,
  guardarReasignacionD,
  obtenerAsesoresPorCampania
} from "../../comunicacion/ComUCampaniaReasignacion";

import {
  obtenerAgencias
} from "../../comunicacion/ComUCampaniaRepartir";

import { showErrorMessage } from "odc-common";


export const useGuardarReasignacion = (props) => {

  const {
    dispatch,
    setdespliegueOperacion,
    setAccionFormulario,
    inicializarVariables,
    checkTipoDA
  } = props

  const fetchData = async () => {
    setAccionFormulario(true);

    try {
      let coreResponse;
      if (checkTipoDA == "distribucion") {
        coreResponse = await guardarReasignacionD(props);

      } else if (checkTipoDA == "archivo") {
        coreResponse = await guardarReasignacionA(props);
      }
      if (coreResponse.state) {

        setdespliegueOperacion({
          despliegue: true,
          tipo: "success"
        });
        setAccionFormulario(false);
        inicializarVariables();
      } else {
        setAccionFormulario(false);
        dispatch(showErrorMessage(coreResponse.message));
      }
    } catch (error) {
      setAccionFormulario(false);
    }
  };
  fetchData();
  return {};
};


export const useObtenerCampaniaRepartida = (banderaRefrescar, dispatch) => {

  const [campanias, setCampanias] = useState(null);
  const [errorCampanias, setErrorCampanias] = useState(null);
  const [isLoadingCampanias, setLoadingCampanias] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const coreResponse = await obtenerCampaniaRepartida();
        if (coreResponse.state) {
          const campanias = coreResponse.data;
          let id = 1;
          campanias.forEach(element => {
            element.id = id++;
          });
          setLoadingCampanias(false);
          setCampanias(campanias);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setCampanias([]);
          setLoadingCampanias(false);
        }
      } catch (error) {
        setErrorCampanias(error);
        setLoadingCampanias(false);
      }
    };
    fetchData();
  }, [banderaRefrescar]);
  return { campanias, errorCampanias, isLoadingCampanias };
};


export const useobtenerAgencias = (id, dispatch) => {
  const [agencias, setAgencias] = useState(null);
  const [isLoadingInstitucion, setLoadingInstitucion] = useState(true);


  useEffect(() => {
    const fetchData = async () => {

      try {
        const coreResponse = await obtenerAgencias(parseInt(id));
        if (coreResponse.state) {
          const agencias = coreResponse.data;

          setAgencias(agencias);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setAgencias([]);
        }

        setLoadingInstitucion(false);
      } catch (element) {
        setLoadingInstitucion(false);
      }
    };
    fetchData();
  }, []);
  return { agencias, isLoadingInstitucion };
};


export const useObtenerAsesoresPorCampania = (idCampania, setAsesores, setAccionFormulario, dispatch) => {

  const fetchData = async () => {
    setAccionFormulario(true);
    try {
      const coreResponse = await obtenerAsesoresPorCampania(idCampania);
      if (coreResponse.state) {
        const asesores = coreResponse.data;
        let arregloObjeto = new Array();
       
        asesores.forEach(element => {
          let objeto = new Array();
          objeto.code = element.codigoRecursoLogico
          objeto.idAsesor = element.idAsesor
          objeto.color = element.color
          objeto.numeroRegistros = element.numeroRegistros
          objeto.clientesGestionado = element.clientesGestionado
          objeto.description = element.primerNombre + " " + element.segundoNombre + " " + element.primerApellido + " " + element.segundoApellido
          arregloObjeto.push(objeto);
        });
        setAsesores(arregloObjeto);
        setAccionFormulario(false);
      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setAsesores([]);
        setAccionFormulario(false);
      }
    } catch (element) {
      setAccionFormulario(false);
    }
  };
  fetchData();
  return {};
};
