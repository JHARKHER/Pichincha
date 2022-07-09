import { useState, useEffect } from "react";
import {
  obtenerCampania, obtenerArbolRespuesta, obtenerArbolCampania, addCampania, obtenerCodigoCampania, consultarCampaniaCRM, actualizarCampaniaEstado,
  cambiarFechaCampania, obtenerCampaniaProcesada, obtenerErrores, eliminarCampania
} from "../../comunicacion/ComUAdminCampania";
import { VENTASESPECIAL, ENCUESTA, OTROS } from '../../Constantes'
import {
  obtenerCedentes, addCampaniaEspecial, obtenerCabeceraArchivoCampo,
  eliminarArchivoCabecera, buscarPorParametroCampania
} from "../../comunicacion/ComUCampaniaEspecial";
import { showErrorMessage } from "odc-common";

const useGuardarArchivo = (values, props, dispatch, fieldcodigoCampania) => {

  const {
    setcampaniaGuardada, esAgregarArchivo, setesAgregarArchivo, IdCampania, IdCabeceraArchivo,
    setshowProgressBarArchivo, setshowProgressBarArchivoExitoso, setshowProgressBarArchivoEliminado, setshowProgressBarArchivoEliminadoExitoso,
    setnombreArchivoinfo, setfechaCargainfo, setestado, setnumeroRegistro, setregistroError, setregistroClienteDuplicado, setDuplicadoError,
    setobjetoDuplicado, setobjetoError, setHabilitarPlantilla, tipoCampania,setdespliegueOperacion
  } = props;

  const fetchData = async () => {
    setHabilitarPlantilla(false);
    setshowProgressBarArchivoExitoso(false);
    setshowProgressBarArchivoEliminado(false);
    setshowProgressBarArchivoEliminadoExitoso(false);
    setshowProgressBarArchivo(true);
    setcampaniaGuardada(false);
    values.fechaCarga = new Date;
    values.idCabeceraArchivo = IdCabeceraArchivo;
    try {
      const coreResponse = await addCampaniaEspecial(values, IdCampania, esAgregarArchivo);
      if (coreResponse.state) {
        if (sessionStorage.getItem('noRenderizar') == 1) {
          const response = coreResponse.data;
          setesAgregarArchivo(false);
          if (response.value.length > 0) {

            var objetoDuplicado = response.value.filter(function (x) {
              if (x.esDuplicado)
                return x;
            })
            var objetoError = response.value.filter(function (x) {
              if (x.esError)
                return x;

            })
            setDuplicadoError(true);
            if (tipoCampania != VENTASESPECIAL)
              setobjetoDuplicado(objetoDuplicado);
            setobjetoError(objetoError);
          }

          const busqueda = await buscarPorParametroCampania(response.key);

          if (busqueda.state) {
            if (busqueda.data != null) {

              setnombreArchivoinfo(busqueda.data.nombreArchivo);
              setfechaCargainfo(busqueda.data.fechaCarga);
              setestado(busqueda.data.estado);
              setnumeroRegistro(busqueda.data.registroCargado);
              setregistroError(busqueda.data.registroError);
              setregistroClienteDuplicado(busqueda.data.registroClienteDuplicado);

              const enviarProcesar = await consultarCampaniaCRM(fieldcodigoCampania, IdCampania, IdCabeceraArchivo);
              if (enviarProcesar.state) {
                if (enviarProcesar.data) {
                  setshowProgressBarArchivo(false);
                  setshowProgressBarArchivoExitoso(true);
                } else {
                  setdespliegueOperacion({
                    despliegue: true,
                    mensaje: "Debe Procesar la campaña no especial con el código de campaña asignado",
                    tipo: "warning"
                  });
                }
              }
            }


          } else {
            setshowProgressBarArchivoExitoso(false);
            setshowProgressBarArchivoEliminado(false);
            setshowProgressBarArchivoEliminadoExitoso(false);
            setshowProgressBarArchivo(true);
            setcampaniaGuardada(false);
            dispatch(showErrorMessage(busqueda.message));
          }
        }
      } else {
        setIdCabeceraArchivo([]);
        setcampaniaGuardada(false);
        setshowProgressBarArchivo(false);
        setshowProgressBarArchivoExitoso(false);
        dispatch(showErrorMessage(coreResponse.message));
      }
    } catch (error) {
    }
  };
  fetchData();
  return {};
};


const useCambiarFechas = (IdCampania, values, dispatch, setdespliegueOperacion, setfechahorafin, setfechahorainicio, setmostrarFechas) => {

  const fetchData = async () => {
    try {
      const coreResponse = await cambiarFechaCampania(IdCampania, values);
      if (coreResponse.state) {
        setfechahorainicio(values.fechahorainicioPop);
        setfechahorafin(values.fechahorafinPop);
        setmostrarFechas(false);
        setdespliegueOperacion({
          despliegue: true,
          mensaje: "",
          tipo: "success"
        });

      } else {
        dispatch(showErrorMessage(coreResponse.message));
      }
    } catch (error) {
    }
  };
  fetchData();
  return {};
};


const useEliminarCampania = async (IdCampania, setdespliegueOperacion, setGuardando, dispatch) => {
  setGuardando(true);
  const fetchData = async () => {
    try {
      const coreResponse = await eliminarCampania(IdCampania);
      if (coreResponse.state) {
        setdespliegueOperacion({
          despliegue: true,
          mensaje: "",
          tipo: "success"
        });

      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setGuardando(false);
      }
    } catch (error) {
    }
  };
  fetchData();
  return {};
};

const useActivarDesactivarCampaña = (IdCampania, setestadoDeCampania, bandera, setdespliegueOperacion, dispatch) => {

  const fetchData = async () => {
    try {
      const coreResponse = await actualizarCampaniaEstado(IdCampania, bandera);
      if (coreResponse.state) {

        setestadoDeCampania(coreResponse.data.estado);
        setdespliegueOperacion({
          despliegue: true,
          mensaje: "",
          tipo: "success"
        });
      } else {
        dispatch(showErrorMessage(coreResponse.message));
      }
    } catch (error) {
    }
  };
  fetchData();
  return {};
};


const useProcesarCampania = (values, IdCampania, setestadoCampania, dispatch, setdespliegueOperacion, setGuardando, IdCabeceraArchivo) => {

  const fetchData = async () => {
    try {
      setGuardando(true);
      const coreResponse = await consultarCampaniaCRM(values.codigoCampania, IdCampania, IdCabeceraArchivo);
      if (coreResponse.state) {
        if (coreResponse.data) {
          const coreResponseEstado = await actualizarCampaniaEstado(IdCampania, false);
          if (coreResponseEstado.state) {

            setestadoCampania(coreResponseEstado.data.seProceso)
            setdespliegueOperacion({
              despliegue: true,
              mensaje: "",
              tipo: "success"
            });
            setGuardando(false);
          } else {
            setGuardando(false);
            dispatch(showErrorMessage(coreResponseEstado.message));
          }
        } else {
          setdespliegueOperacion({
            despliegue: true,
            mensaje: "Debe Procesar la campaña no especial con el código de campaña asignado",
            tipo: "warning"
          });
          setGuardando(false);
        }

      } else {
        setGuardando(false);
        dispatch(showErrorMessage(coreResponse.message));
      }
    } catch (error) {
      setGuardando(false);
    }
  };
  fetchData();
  return {};
};




const useConsultarErrores = (props) => {
  const { IdCabeceraArchivo, setDuplicadoError, setobjetoDuplicado, setobjetoError, setGuardando, tipoCampania, dispatch } = props;

  const fetchData = async () => {

    try {
      setGuardando(true);
      const coreResponse = await obtenerErrores(IdCabeceraArchivo);
      if (coreResponse.state) {

        const response = coreResponse.data;
        if (response.length > 0) {

          var objetoDuplicado = response.filter(function (x) {
            if (x.esDuplicado)
              return x;
          })
          var objetoError = response.filter(function (x) {
            if (x.esError)
              return x;

          })

          setDuplicadoError(true);
          setGuardando(false);
          if (tipoCampania != VENTASESPECIAL)
            setobjetoDuplicado(objetoDuplicado);
          setobjetoError(objetoError);

        } else {
          setGuardando(false);
        }

      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setGuardando(false);
      }
    } catch (error) {
    }
  };
  fetchData();

  return {};
};

const useObtenerCampaniaProcesada = (banderaRefrescar, dispatch) => {

  const [campanias, setCampanias] = useState(null);
  const [errorCampanias, setErrorCampanias] = useState(null);
  const [isLoadingCampanias, setLoadingCampanias] = useState(true);



  useEffect(() => {
    const fetchData = async () => {

      try {
        const coreResponse = await obtenerCampaniaProcesada();
        if (coreResponse.state) {
          const campanias = coreResponse.data;
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

const useObtenerCampania = (banderaRefrescar, dispatch) => {

  const [campanias, setCampanias] = useState(null);
  const [errorCampanias, setErrorCampanias] = useState(null);
  const [isLoadingCampanias, setLoadingCampanias] = useState(true);



  useEffect(() => {
    const fetchData = async () => {

      try {
        const coreResponse = await obtenerCampania();
        if (coreResponse.state) {
          const campanias = coreResponse.data;
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



const useObtenerCedente = (dispatch) => {

  const [cedentes, setCedentes] = useState(null);
  const [errorCedentes, setErrorCedentes] = useState(null);
  const [isLoadingCedentes, setLoadingCedentes] = useState(true);


  useEffect(() => {
    const fetchData = async () => {

      try {
        const coreResponse = await obtenerCedentes();
        if (coreResponse.state) {
          const cedentes = coreResponse.data;

          setCedentes(cedentes);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setCedentes([]);
        }
        setLoadingCedentes(false);
      } catch (error) {
        setErrorCedentes(error);
        setLoadingCedentes(false);
      }
    };
    fetchData();
  }, []);
  return { cedentes, errorCedentes, isLoadingCedentes };
};

// Árbol Gestión Campaña
const useObtenerArbol = (dispatch) => {

  const [arboles, setArboles] = useState(null);
  const [errorArboles, setErrorArboles] = useState(null);
  const [isLoadingArboles, setLoadingArboles] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coreResponse = await obtenerArbolRespuesta();
        //console.log("Entró en useObtenerArbol: ***** :D ***** ", coreResponse);
        if (coreResponse.state) {
          var cont = 1;
          const arboles = coreResponse.data;
          arboles.forEach(element => {
            element.id = cont++;
          });
          //console.log("useObtenerArbol", arboles);
          setArboles(arboles);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setArboles([]);
        }
        setLoadingArboles(false);
      } catch (error) {
        setErrorArboles(error);
        setLoadingArboles(false);
      }
    };
    fetchData();
  }, []);
  return { arboles, errorArboles, isLoadingArboles };
};

const useObtenerArbolCampania = (props) => {
  const {
    IdArbolRespuesta, arbolesCampania, errorarbolesCampania, isLoadingarbolesCampania,
    setarbolesCampania, setErrorarbolesCampania, setLoadingarbolesCampania
  } = props;
  const fetchData = async () => {
    try {
      const coreResponse = await obtenerArbolCampania(IdArbolRespuesta);
      //debugger;
      if (coreResponse.state) {
        var cont = 1;
        const arbolesCampania = coreResponse.data;
        arbolesCampania.forEach(element => {
          element.id = cont++;
        });
        setarbolesCampania(arbolesCampania);
      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setarbolesCampania([]);
      }
      setLoadingarbolesCampania(false);
    } catch (error) {
      setErrorarbolesCampania(error);
      setLoadingarbolesCampania(false);
    }
  };
  fetchData();
  return { arbolesCampania, errorarbolesCampania, isLoadingarbolesCampania };
};

const useObtenerCodigoCampania = (dispatch) => {

  const [codigoCampania, setCodigoCampania] = useState(null);
  const [isLoadingCodigoCampania, setLoadingCodigoCampania] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const coreResponse = await obtenerCodigoCampania();
        if (coreResponse.state) {
          const codigoCampania = coreResponse.data;

          setCodigoCampania(codigoCampania);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setCodigoCampania([]);
        }

        setLoadingCodigoCampania(false);
      } catch (error) {
        setLoadingCodigoCampania(false);
      }
    };
    fetchData();
  }, []);
  return { codigoCampania, isLoadingCodigoCampania };
};


const useObtenerCampoCabecera = (props) => {

  const { IdCabeceraArchivo, setmoduloCedente, setnombreCarga, setTipoArchivo, setrows, setrutaArchivo, setnombreArchivo, setfechaCarga,
    seteliminarEnable, setvalidarCampos, esAgregarArchivo, dispatch, setCargandoGrid } = props

  const fetchData = async () => {

    try {

      setCargandoGrid(true);
      const coreResponse = await obtenerCabeceraArchivoCampo(IdCabeceraArchivo);
      if (coreResponse.state) {
        const datos = coreResponse.data;
        var i = 1;
        datos.campoCabeceraArchivo.forEach(element => {
          element.id = i;
          i++;

        });
        // setmoduloCedente(datos.codigoCedente);
        // setnombreCarga(datos.descripcion);
        if (!esAgregarArchivo) {
          setTipoArchivo(datos.tipoArchivo);
          setrutaArchivo(datos.registroError);
          setnombreArchivo(datos.nombreArchivo);
          setfechaCarga(datos.fechaCarga);
        }
        setrows(datos.campoCabeceraArchivo);
        seteliminarEnable(true);
        setvalidarCampos(true);
        setCargandoGrid(false);
      } else {
        dispatch(showErrorMessage(coreResponse.message));
        seteliminarEnable(false);
        setCargandoGrid(false);
      }

    } catch (error) {

    }
  };
  fetchData();

  return { IdCabeceraArchivo };
};

const useObtenerCampoProcesadoCabecera = (props) => {

  const { IdCabeceraArchivo, setrows, dispatch, setCargandoGrid } = props

  const fetchData = async () => {

    try {

      setCargandoGrid(true);
      const coreResponse = await obtenerCabeceraArchivoCampo(IdCabeceraArchivo);
      if (coreResponse.state) {
        const datos = coreResponse.data;
        var i = 1;
        datos.campoCabeceraArchivo.forEach(element => {
          element.id = i;
          i++;

        });

        setrows(datos.campoCabeceraArchivo);
        setCargandoGrid(false);
      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setCargandoGrid(false);
      }

    } catch (error) {

    }
  };
  fetchData();

  return { IdCabeceraArchivo };
};


const useEliminarArchivo = (props, dispatch) => {

  const {
    IdCabeceraArchivo, setcampaniaGuardada, IdCampania, setdespliegueOperacion, setObjetoCampania, setnombreArchivoinfo,
    setfechaCargainfo, setestado, setnumeroRegistro, setregistroError, setregistroClienteDuplicado, setIdCabeceraArchivo,
    setshowProgressBarArchivo, setshowProgressBarArchivoExitoso, setshowProgressBarArchivoEliminado, setshowProgressBarArchivoEliminadoExitoso,
    setGuardando } = props;

  const fetchData = async () => {
    setcampaniaGuardada(false);
    setshowProgressBarArchivo(false);
    setshowProgressBarArchivoExitoso(false);
    setGuardando(false);

    setshowProgressBarArchivoEliminado(true);

    try {
      setGuardando(true);
      const coreResponse = await eliminarArchivoCabecera(IdCabeceraArchivo, IdCampania);
      if (coreResponse.state) {
        setshowProgressBarArchivoEliminado(false);
        setshowProgressBarArchivoEliminadoExitoso(true);
        setObjetoCampania([]);
        setnombreArchivoinfo("");
        setfechaCargainfo("");
        setestado("");
        setnumeroRegistro("");
        setregistroError("");
        setregistroClienteDuplicado("");
        setIdCabeceraArchivo(null);

        setdespliegueOperacion({
          despliegue: true,
          mensaje: "",
          tipo: "success"
        });
        setGuardando(false);

      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setcampaniaGuardada(false);
        setshowProgressBarArchivoEliminado(false);
        setshowProgressBarArchivoEliminadoExitoso(false);
        setshowProgressBarArchivo(false);
        setshowProgressBarArchivoExitoso(false);
        setGuardando(false);

      }
    } catch (error) {

    }
  };
  fetchData();
  return {};
};



const useGuardarCampania = (
  values, objetoCampania, setIdCabeceraArchivo, IdCabeceraArchivo, setshowProgressBarArchivo, setshowProgressBarArchivoExitoso, setdespliegueOperacion,
  setestado, setIdCampania, IdCampania, productoCodigo, subProductoCodigo, noRender, setNoRender, setestadoCampania, setnumeroRegistro, setregistroError, setregistroClienteDuplicado, setEsNuevo, setestadoDeCampania,
  setshowProgressBarArchivoEliminado, setshowProgressBarArchivoEliminadoExitoso, setDuplicadoError, setobjetoDuplicado, setobjetoError, setGuardando, dispatch, tempIdCampania

) => {

  const fetchData = async () => {
    setshowProgressBarArchivoEliminado(false);
    setshowProgressBarArchivoEliminadoExitoso(false);
    setshowProgressBarArchivoExitoso(false);
    setshowProgressBarArchivo(false);
    setGuardando(false);
    setdespliegueOperacion({
      despliegue: false,
      mensaje: "",
      tipo: "info"
    });
    try {
      setGuardando(true);
      values.idCampania = IdCampania == null ? 0 : IdCampania;
      values.producto = productoCodigo;
      values.subProducto = subProductoCodigo;
      values.idCampaniaPadre = tempIdCampania;
      const coreResponse = await addCampania(values);

      if (coreResponse.state) {
        setIdCampania(coreResponse.data);
        setGuardando(false);
        if (values.tipoCampania == VENTASESPECIAL || values.tipoCampania == OTROS || values.tipoCampania == ENCUESTA) {

          setshowProgressBarArchivo(true);
          objetoCampania.idCabeceraArchivo = IdCabeceraArchivo == null ? 0 : IdCabeceraArchivo;
          const coreResponseArchivo = await addCampaniaEspecial(objetoCampania, coreResponse.data, false);

          if (coreResponseArchivo.state) {
            if (sessionStorage.getItem('noRenderizar') == 1) {
              setestadoCampania("ACTIVO");
              const response = coreResponseArchivo.data;
              setIdCabeceraArchivo(response.key);

              if (response.value.length > 0) {

                var objetoDuplicado = response.value.filter(function (x) {
                  if (x.esDuplicado)
                    return x;
                })
                var objetoError = response.value.filter(function (x) {
                  if (x.esError)
                    return x;

                })
                setDuplicadoError(true);
                if (values.tipoCampania != VENTASESPECIAL)
                  setobjetoDuplicado(objetoDuplicado);
                setobjetoError(objetoError);

              }

              const resultbusqueda = await buscarPorParametroCampania(response.key);

              if (resultbusqueda.state) {
                setshowProgressBarArchivo(false);
                setshowProgressBarArchivoExitoso(true);

                setestado(resultbusqueda.data.estado);

                setnumeroRegistro(resultbusqueda.data.registroCargado);
                setregistroError(resultbusqueda.data.registroError);
                setregistroClienteDuplicado(resultbusqueda.data.registroClienteDuplicado);
                setestadoDeCampania(resultbusqueda.data.estado);
                setdespliegueOperacion({
                  despliegue: true,
                  mensaje: "",
                  tipo: "success"
                });
                setEsNuevo(false);
              } else {
                dispatch(showErrorMessage(resultbusqueda.message));
                setshowProgressBarArchivoEliminado(false);
                setshowProgressBarArchivoEliminadoExitoso(false);
                setshowProgressBarArchivoExitoso(false);
                setshowProgressBarArchivo(false);

              }
            }
          } else {
            dispatch(showErrorMessage(coreResponseArchivo.message));
            setshowProgressBarArchivoEliminado(false);
            setshowProgressBarArchivoEliminadoExitoso(false);
            setshowProgressBarArchivoExitoso(false);
            setshowProgressBarArchivo(false);

          }

        } else {
          setestadoCampania("ACTIVO");
          setdespliegueOperacion({
            despliegue: true,
            mensaje: "",
            tipo: "success"
          });
          setEsNuevo(false);
        }



      } else {
        setshowProgressBarArchivoEliminado(false);
        setshowProgressBarArchivoEliminadoExitoso(false);
        setshowProgressBarArchivoExitoso(false);
        setshowProgressBarArchivo(false);
        setGuardando(false);
        dispatch(showErrorMessage(coreResponse.message));
      }
    } catch (error) {
      setshowProgressBarArchivoEliminado(false);
      setshowProgressBarArchivoEliminadoExitoso(false);
      setshowProgressBarArchivoExitoso(false);
      setshowProgressBarArchivo(false);
      setGuardando(false);

    }
  };
  fetchData();
  return {};
};

export {
  useObtenerCampania,
  useObtenerCedente,
  useObtenerArbol,
  useObtenerArbolCampania,
  useActivarDesactivarCampaña,
  useObtenerCampoCabecera,
  useEliminarArchivo,
  useGuardarCampania,
  useObtenerCodigoCampania,
  useProcesarCampania,
  useCambiarFechas,
  useGuardarArchivo,
  useObtenerCampaniaProcesada,
  useObtenerCampoProcesadoCabecera,
  useConsultarErrores,
  useEliminarCampania
};