import { useState, useEffect } from "react";
import {
  obtenerCampaniaRecurso,
  obtenerGestionCampania,
  obtenerRegistrosClientesResumen,
  obtenerDatosClientes,
  guardarTelefono,
  guardarDireccion,
  guardarCorreo,
  guardarGestion,
  guardarGestionAgendamiento
} from "../../comunicacion/ComUCampaniaGestion";

import { showErrorMessage } from "odc-common";

export const useObtenerRegistrosClientesResumen = (
  objetoCampania, tipoGestion, setRegistrosTotales,
  setRegistrosGestionEfectiva, setRows, setAccionFormulario, setCodigoProducto, dispatch) => {
  const fetchData = async () => {
    setAccionFormulario(true);
    try {
      const coreResponse = await obtenerRegistrosClientesResumen(objetoCampania.idCampania, objetoCampania.codigoRecursoLogico, objetoCampania.tipoCampania, tipoGestion);
      if (coreResponse.state) {
        if (coreResponse.data.key) {
          setRegistrosTotales(coreResponse.data.key.key);
          setRegistrosGestionEfectiva(coreResponse.data.key.value);
        }
        if (coreResponse.data.value) {
          let id = 1;
          coreResponse.data.value.forEach(element => {
            element.id = id++;
          });
          setCodigoProducto(coreResponse.data.value.length > 0 ? coreResponse.data.value[0].codigoProducto : '');
          setRows(coreResponse.data.value);
        }
        setAccionFormulario(false);

      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setRows([]);
        setAccionFormulario(false);
      }
    } catch (error) {
      setRows([]);
      setAccionFormulario(false);
    }
  };
  fetchData();

  return {};
};

export const useObtenerCampaniaRepartida = (banderaRefrescar, setGraficoDos, setGraficoUno, dispatch) => {

  const [campanias, setCampanias] = useState(null);
  const [errorCampanias, setErrorCampanias] = useState(null);
  const [isLoadingCampanias, setLoadingCampanias] = useState(true);

  useEffect(() => {
    const fetchData = async () => {

      try {
        const coreResponse = await obtenerCampaniaRecurso();
        if (coreResponse.state) {
          const campanias = coreResponse.data.key;
          const listaGrafico = coreResponse.data.value;

          if (campanias.length > 0)
            sessionStorage.setItem('ultimoObjetoGestion', JSON.stringify(campanias[0]));


          if (listaGrafico.length > 0) {
            if (listaGrafico[0].graficoInicial != null) {
              setGraficoUno(listaGrafico[0].graficoInicial);
            }
          }

          setGraficoDos(listaGrafico);
          let id = 1;
          campanias.forEach(element => {
            element.id = id++;
          });
          setLoadingCampanias(false);
          setCampanias(campanias);
        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setCampanias([]);
          setGraficoDos([])
          setLoadingCampanias(false);
        }
      } catch (error) {
        setErrorCampanias(error);
        setLoadingCampanias(false);
      }
    };
    fetchData();
  }, []);
  return { campanias, errorCampanias, isLoadingCampanias };
};

export const useGraficarCampania = (objeto, setVisualizarGraficos, setGraficoUno, setAccionFormulario, dispatch) => {

  const fetchData = async () => {

    try {
      setAccionFormulario(true);
      const coreResponse = await obtenerGestionCampania(objeto.idCampania, objeto.codigoRecursoLogico);
      if (coreResponse.state) {
        const grafico = coreResponse.data;
        setGraficoUno(grafico);
        setVisualizarGraficos(true);
        setAccionFormulario(false);
      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setVisualizarGraficos(false);
        setAccionFormulario(false);
      }
    } catch (error) {

    }
  };
  fetchData();
  return {};
};


export const useObtenerDatosClientes = (
  identificacion, tipoIdentificacion, codigoSubProducto, setCamundaVariables,
  setAccionFormulario, idCliente, setDispositivos, setSaldoMontoLiquido, monto, setDirecciones,
  setCorreos, codigoProducto, setRowsRubros, setPlazoMontosSubproductoinfo,
  tipoControl, codigoCampania, dispatch) => {

  let sumaSaldo = 0;
  const fetchData = async () => {
    try {
      setAccionFormulario(true);
      const coreResponse = await obtenerDatosClientes(identificacion, tipoIdentificacion, codigoSubProducto, codigoProducto, idCliente, tipoControl, codigoCampania);
      if (coreResponse.state) {

        coreResponse.data.credito.forEach(element => {
          sumaSaldo += element.saldo
        });

        let id = 1;
        coreResponse.data.credito.forEach(element => {
          element.id = id++;
        });

        const segurosInfo = coreResponse.data.rubros
        const plazoMontosSubproductoinfo = coreResponse.data.plazoMontosSubproducto
        const desembolso = coreResponse.data.desembolso;

        if (coreResponse.data.campaniaComercial != null)
          setUnaCampaniaComercial(coreResponse.data.campaniaComercial);


        if (plazoMontosSubproductoinfo != null) {
          setPlazoMontosSubproductoinfo(plazoMontosSubproductoinfo)
          segurosInfo.rubrosPlanes.forEach(element => {
            element.beneficiarios = [];
          });
          setRowsRubros(segurosInfo.rubrosPlanes);
        }

        setCamundaVariables({
          documentosHabilitantes: [],
          operacionesInfo: coreResponse.data.credito,
          productoFormaDesembolso: desembolso
        })

        setDispositivos(coreResponse.data.dispositivo);
        setDirecciones(coreResponse.data.direccion);
        setCorreos(coreResponse.data.correo);
        setSaldoMontoLiquido({
          saldo: sumaSaldo,
          montoLiquido: (monto - sumaSaldo).toFixed(2)
        })
        setAccionFormulario(false)

      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setAccionFormulario(false)
        setMontoLiquido(sumaSaldo);
      }
    } catch (error) {

    }
  };
  fetchData();

  return { sumaSaldo };
};

export const useDocumentosHabiltiantes = (props) => {
  debugger;
  let { unObjetoNegociacion } = props;
  let sumaSaldo = 0;
  const fetchData = async () => {
    try {

    } catch (error) {

    }
  };
  fetchData();

  return { sumaSaldo };
};

export const useGuardarTelefono = (objeto, setDispositivos, setAccionFormulario, idCliente, setdespliegueOperacion, dispatch) => {

  const fetchData = async () => {
    try {
      setAccionFormulario(true);
      const coreResponse = await guardarTelefono(objeto.tipoTelefono, objeto.valor, objeto.tipoDispositivo, objeto.operadora, objeto.esWhatsapp, idCliente);
      if (coreResponse.state) {
        const datos = coreResponse.data;
        setDispositivos(datos);
        setAccionFormulario(false);
        setdespliegueOperacion({
          despliegue: true,
          tipo: "success"
        });
      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setAccionFormulario(false);
      }
    } catch (error) {

    }
  };
  fetchData();
  return {};
};

export const useGuardarDireccion = (objeto, setDirecciones, setAccionFormulario, idCliente, setdespliegueOperacion, dispatch) => {

  const fetchData = async () => {
    try {
      setAccionFormulario(true);
      const coreResponse = await guardarDireccion(objeto, idCliente);
      if (coreResponse.state) {
        const datos = coreResponse.data;
        setDirecciones(datos);
        setAccionFormulario(false);
        setdespliegueOperacion({
          despliegue: true,
          tipo: "success"
        });
      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setAccionFormulario(false);
      }
    } catch (error) {

    }
  };
  fetchData();
  return {};
};


export const useGuardarCorreo = (objeto, setCorreos, setAccionFormulario, idCliente, setdespliegueOperacion, dispatch) => {

  const fetchData = async () => {
    try {
      setAccionFormulario(true);
      const coreResponse = await guardarCorreo(objeto, idCliente);
      if (coreResponse.state) {
        const datos = coreResponse.data;
        setCorreos(datos);
        setAccionFormulario(false);
        setdespliegueOperacion({
          despliegue: true,
          tipo: "success"
        });
      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setAccionFormulario(false);
      }
    } catch (error) {

    }
  };
  fetchData();
  return {};
};


export const useGestionarCampania = async (valores) => {

  const {
    pause, reset, setAccionFormulario, dispatch,
    objetoCampania, tipoGestion, setRegistrosTotales, setRegistrosGestionEfectiva,
    setRows, setCodigoProducto, setdespliegueOperacion, cambiaEstadoDeterminado,

    setCampaniasResumen, setHabilitarTab, setHabilitarTabGestion, setHabilitarTabLlamada, setAbrirNegociacion,
    setObjetoArbol, setSiguienteCliente, rows, setRowsPrecedente,
    setOpenWindow, setHabilitarProspectar, setValue
  } = valores;

  const fetchData = async () => {
    try {
      var arreglo = new Array();
      pause();
      setAccionFormulario(true);
      const coreResponse = await guardarGestion(valores);
      if (coreResponse.state) {

        const coreResponseBusqueda = await obtenerRegistrosClientesResumen(objetoCampania.idCampania, objetoCampania.codigoRecursoLogico, objetoCampania.tipoCampania, tipoGestion);
        if (coreResponseBusqueda.state) {
          if (coreResponseBusqueda.data.key) {
            setRegistrosTotales(coreResponseBusqueda.data.key.key);
            setRegistrosGestionEfectiva(coreResponseBusqueda.data.key.value);
          }
          if (coreResponseBusqueda.data.value) {
            let id = 1;
            coreResponseBusqueda.data.value.forEach(element => {
              element.id = id++;
            });
            setCodigoProducto(coreResponseBusqueda.data.value.length > 0 ? coreResponseBusqueda.data.value[0].codigoProducto : '');
            setRows(coreResponseBusqueda.data.value);
          }
          setAccionFormulario(false);
          reset();
          arreglo.push(objetoCampania);

          if (cambiaEstadoDeterminado == "GestionNegociacion") {

            setCampaniasResumen(arreglo);
            setHabilitarTab(false);
            setHabilitarTabGestion(true);
            setHabilitarTabLlamada(false);
            setAbrirNegociacion(true);
            setRowsPrecedente(rows);
          } else if (cambiaEstadoDeterminado == "GestionProspectar") {

            setCampaniasResumen(arreglo);
            setOpenWindow(false)
            setHabilitarTab(false);
            setHabilitarTabGestion(true);
            setHabilitarTabLlamada(false);
            setHabilitarProspectar(true);
            setValue(3);
            setRowsPrecedente(rows);

          } else if (cambiaEstadoDeterminado == "GestionCerrar") {
            setCampaniasResumen(arreglo);
            setHabilitarTab(false);
            setHabilitarTabGestion(true);
            setHabilitarTabLlamada(false);
            setObjetoArbol(null)
            setRowsPrecedente(rows);

          }

        } else {
          dispatch(showErrorMessage(coreResponseBusqueda.message));
          setRows([]);
          setAccionFormulario(false);
        }

      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setAccionFormulario(false);
        reset();
      }
    } catch (error) {

    }
  };
  fetchData();
  return {};
};

export const useGestionarAgendamientoCampania = (valores) => {

  const {
    pause, reset, setAccionFormulario, dispatch, rows,
    setCampaniasResumen, setHabilitarTab, setHabilitarTabGestion, setHabilitarTabLlamada, setObjetoArbol, setSiguienteCliente,
    setdespliegueOperacion, objetoCampania, tipoGestion, setRegistrosTotales, setRegistrosGestionEfectiva
    , setRows, setCodigoProducto, setRowsPrecedente

  } = valores;
  var arreglo = new Array();
  const fetchData = async () => {
    try {
      pause();
      setAccionFormulario(true);
      const coreResponse = await guardarGestionAgendamiento(valores);
      if (coreResponse.state) {

        const coreResponseBusqueda = await obtenerRegistrosClientesResumen(objetoCampania.idCampania, objetoCampania.codigoRecursoLogico, objetoCampania.tipoCampania, tipoGestion);
        if (coreResponseBusqueda.state) {
          if (coreResponseBusqueda.data.key) {
            setRegistrosTotales(coreResponseBusqueda.data.key.key);
            setRegistrosGestionEfectiva(coreResponseBusqueda.data.key.value);
          }
          if (coreResponseBusqueda.data.value) {
            let id = 1;
            coreResponseBusqueda.data.value.forEach(element => {
              element.id = id++;
            });
            setCodigoProducto(coreResponseBusqueda.data.value.length > 0 ? coreResponseBusqueda.data.value[0].codigoProducto : '');
            setRows(coreResponseBusqueda.data.value);
          }
          setAccionFormulario(false);
          reset();

          arreglo.push(objetoCampania);
          setCampaniasResumen(arreglo);
          setHabilitarTab(false);
          setHabilitarTabGestion(false);
          setHabilitarTabLlamada(false);
          setObjetoArbol(null);
          setRowsPrecedente(rows);
          setSiguienteCliente(true);


        } else {
          dispatch(showErrorMessage(coreResponseBusqueda.message));
          setRows([]);
          setAccionFormulario(false);
        }

      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setAccionFormulario(false);
        reset();
      }
    } catch (error) {

    }
  };
  fetchData();
  return {};
};

