import { fetchPostService, convertDateToTimestamp, convertTimestampToDate } from "odc-common"; // abstraer la comunicacion del fetch para las apis. Maneja la comunicacion con el servidor

export async function obtenerCreditoConsumoAgencias() {
   
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultaCreditoConsumoAgencias",
    null)
    .then(result => result)
    .catch(error => error);
}

export async function obtenerReporteDetalleCampania(campos) { 
  let body = Object.assign({}, {
    idInstitucion:sessionStorage.idInstitution, 
    nombreCampania:campos.nombreCampania, 
    idOficina:campos.oficinas, 
    idRegion:campos.regiones,
    segmento:campos.segmento, 
    tipoCliente:campos.tipoCliente, 
    fecha:campos.fecha,
    contacto: campos.contacto
  });  
  //debugger;
  //console.log("ENVIANDO...", body);
  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultaReporteDetalleCampania", 
    body)
    .then(result => result)
    .catch(error => error);
}

export async function obtenerNombresCampanias() {   
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarNombresCampanias",
    null)
    .then(result => result)
    .catch(error => error);
}

export async function obtenerOficinas() {   
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarOficinas",
    null)
    .then(result => result)
    .catch(error => error);
}

export async function obtenerRegiones() {   
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarRegiones",
    null)
    .then(result => result)
    .catch(error => error);
}

export async function obtenerTipoCliente() {  
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarTipoCliente",
    null)
    .then(result => result)
    .catch(error => error);
}