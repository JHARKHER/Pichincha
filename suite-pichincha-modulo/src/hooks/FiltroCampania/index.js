
import { obtenerCampoCabeceraArchivo, obtenerParametrizacionFiltroOrden } from "../../comunicacion/ComUAdminCampania";
import { guardarReparticion, ObtenerAsesores, ObtenerParametroByCode, obtenerAgencias } from "../../comunicacion/ComUCampaniaRepartir";
import { showErrorMessage } from "odc-common";


const useObtenerPerfilCRM = async (profileCode, idInstitution, setEsPerfilCRM, setOficinasCRM, setAccionFormulario, dispatch) => {
  setAccionFormulario(true);
  const fetchData = async () => {

    try {
      const coreResponse = await ObtenerParametroByCode("PERFILCRM");
      if (coreResponse.state) {
        if (profileCode == coreResponse.data.textValue) {
          const coreResponseOfiCRM = await ObtenerParametroByCode("OFICINASASIGNACIONCRM");

          if (coreResponseOfiCRM.state) {

            const coreResponseInstitucion = await obtenerAgencias(idInstitution);

            if (coreResponseInstitucion.state) {
              let respuestaOficinas = coreResponseInstitucion.data.office;

              let respuesta = coreResponseOfiCRM.data.textValue.split("|");
              const arreglo = [];

              respuestaOficinas.forEach(element1 => {
                respuesta.forEach(element2 => {
                  if (element1.idOffice == element2) {
                    arreglo.push(element1);
                  }
                });
              });
              setOficinasCRM(arreglo);
              setEsPerfilCRM(true);
              setAccionFormulario(false);
            } else {
              dispatch(showErrorMessage(coreResponse.message));
              setAccionFormulario(false);
            }
          } else {
            dispatch(showErrorMessage(coreResponse.message));
            setAccionFormulario(false);
          }
        } else {
          setAccionFormulario(false);
        }
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

const useObtenerAsesores = (setRowsRecursos, codigoProducto, idOffice, setAccionFormulario, dispatch) => {
  let pivoteArreglo;
  const fetchData = async () => {
    setAccionFormulario(true);
    try {
      if (idOffice != null && idOffice != "") {
        debugger;
        const coreResponse = await ObtenerAsesores(codigoProducto, idOffice);
        if (coreResponse.state) {
          pivoteArreglo = coreResponse.data;

          var arreglo = new Array();
          var cont = 1;

          pivoteArreglo.forEach(element => {

            var componentesRows = new Object();
            componentesRows.id = cont;
            componentesRows.nombreRecurso = element.primerNombre + " " + element.segundoNombre + " " + element.primerApellido + " " + element.segundoApellido;
            componentesRows.esActivo = false;
            componentesRows.codigoRecursoLogico = element.codigoRecursoLogico;
            componentesRows.codigoArbolVenta = element.codigoArbolVenta;
            arreglo.push(componentesRows)
            cont++;
          });
          setAccionFormulario(false);
          setRowsRecursos(arreglo);

        } else {
          dispatch(showErrorMessage(coreResponse.message));
          setAccionFormulario(false);
        }
      } else {
        setAccionFormulario(false);
      }
    } catch (error) {

    }

  };
  fetchData();

  return {};
};

const useObtenerParametrizacionFiltroOrden = (idCampania, setcolumnaArchivo, setColumnaOrdenamiento, dispatch) => {

  const fetchData = async () => {

    try {
      const coreResponse = await obtenerParametrizacionFiltroOrden(idCampania);
      if (coreResponse.state) {
        const columnaArchivo = coreResponse.data.key;
        const columnaOrden = coreResponse.data.value;

        setcolumnaArchivo(columnaArchivo);
        setColumnaOrdenamiento(columnaOrden);
      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setcolumnaArchivo([]);
        setColumnaOrdenamiento([]);
      }

    } catch (error) {

    }
  };
  fetchData();

  return {};
};
const useObtenerCampoCabeceraArchivo = (idCabeceraArchivo, setcolumnaArchivo, dispatch) => {

  const fetchData = async () => {

    try {
      const coreResponse = await obtenerCampoCabeceraArchivo(idCabeceraArchivo);
      if (coreResponse.state) {
        const columnaArchivo = coreResponse.data;

        setcolumnaArchivo(columnaArchivo);
      } else {
        dispatch(showErrorMessage(coreResponse.message));
        setcolumnaArchivo([]);
      }

    } catch (error) {

    }
  };
  fetchData();

  return {};
};

const useGuardarReparticion = (values, idCampania, rowsRecursos, setdespliegueOperacion,setAccionFormulario,ConcluirTransaccion, dispatch) => {
  const fetchData = async () => {

    try {
      setAccionFormulario(true);
      const coreResponse = await guardarReparticion(values, idCampania, rowsRecursos);
      if (coreResponse.state) {
        setdespliegueOperacion({
          despliegue: true,
          mensaje: "",
          tipo: "success"
        });
        setAccionFormulario(false);
        ConcluirTransaccion();
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



export { useObtenerCampoCabeceraArchivo, useGuardarReparticion, useObtenerAsesores, useObtenerPerfilCRM, useObtenerParametrizacionFiltroOrden };