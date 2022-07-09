import { fetchPostService, convertDateToTimestamp, convertTimestampToDate } from "odc-common"; // abstraer la comunicacion del fetch para las apis. Maneja la comunicacion con el servidor



export async function ObtenerParametroByCode(code) {
  let body = {};
  body.code = code;
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CONFIGURATION_ROOT + "getparameterbycode",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function ObtenerAsesores(codigoProducto, idOffice) {
  let body = {};
  body.codigoProducto = codigoProducto;
  body.idOffice = idOffice;
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ObtenerAsesores",
    body)
    .then(result => result)
    .catch(error => error);
}


export async function obtenerAgencias(id) {

  let body = {};
  body.id = id; // esta funcion se le pasa una lista de codigos y retorna la busqueda de la lista

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CONFIGURATION_ROOT + "getinstitutionbyid",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function guardarReparticion(valores, idCampania, rowsRecursos) { //donde yo hago mapeos centralizados es en la capa de communication 

  var filtro = new Array();
  var recursos = new Array();
  var ordenamiento = new Array();

  valores.GrdFiltrosSeleccionados.forEach(element => {

    let body = Object.assign({}, {
      idCampania: idCampania,
      campo: element.campoBdd,
      condicionante: element.filtroCampania,
      valor: element.valor,
      esActivo: true
    });
    filtro.push(body);

  });

  rowsRecursos.forEach(element => {

    if (element.esActivo) {
      let body = Object.assign({}, {
        codigoRecursoLogico: element.codigoRecursoLogico,
        codigoArbolVenta: element.codigoArbolVenta,
        idCampania: idCampania,
      });
      recursos.push(body);
    }
  });

  valores.GrdOrdenamientoReparticion.forEach(element => {
    var objeto = JSON.parse(element.columnaArchivo);

    let body = Object.assign({}, {
      columnaArchivo: objeto.valor,
      ordenPresentacion: element.ordenPresentacion,
      presentacion: element.presentacion,
    });
    ordenamiento.push(body);

  });

  let objeto = {};
  objeto.filtro = filtro
  objeto.recursos = recursos;
  objeto.idCampania = idCampania;
  objeto.tipoReparticion = valores.tiporeparticion;
  objeto.ordenamiento = ordenamiento;

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/RepartirCampania",
    objeto)
    .then(result => result)
    .catch(error => error);
}
