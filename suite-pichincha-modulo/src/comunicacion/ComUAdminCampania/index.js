import { fetchPostService, convertDateToTimestamp, convertTimestampToDate } from "odc-common"; // abstraer la comunicacion del fetch para las apis. Maneja la comunicacion con el servidor

export async function obtenerCampaniaProcesada() {
  //// campañias

  return await fetchPostService(
    "get", process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCampaniasProcesadas", null)
    .then(result => {

      if (result.state) {
        let i = 0;
        result.data = result.data.map(function (item) {//conversion de fecha0

          if (item.cabeceraArchivo != null) {
            item.cabeceraArchivo.fechaCarga = convertTimestampToDate(item.cabeceraArchivo.fechaCarga)
          }
          return {
            ...item,
            fechaInicio: convertTimestampToDate(item.fechaInicio),//conversion de fecha
            fechaFin: convertTimestampToDate(item.fechaFin),//conversion de fecha
            fechaCreacion: convertTimestampToDate(item.fechaCreacion),

            id: i++
          }//conversion de fecha

        })

        return result;
      } else {
        return result;
      }
    })
}


export async function obtenerErrores(idCabeceraArchivo) {
  //// campañias
  let body = {};
  body.idCabeceraArchivo = idCabeceraArchivo;
  return await fetchPostService(
    "get", process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarErrores", body)
    .then(result => result)
    .catch(error => error);
}
export async function obtenerCampania() {
  //// campañias

  return await fetchPostService(
    "get", process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCampanias", null)
    .then(result => {

      if (result.state) {
        let i = 0;
        result.data = result.data.map(function (item) {//conversion de fecha0

          if (item.cabeceraArchivo != null) {
            item.cabeceraArchivo.fechaCarga = convertTimestampToDate(item.cabeceraArchivo.fechaCarga)
          }
          return {
            ...item,
            fechaInicio: convertTimestampToDate(item.fechaInicio),//conversion de fecha
            fechaFin: convertTimestampToDate(item.fechaFin),//conversion de fecha
            fechaCreacion: convertTimestampToDate(item.fechaCreacion),

            id: i++
          }//conversion de fecha

        })

        return result;
      } else {
        return result;
      }
    })
}


export async function eliminarCampania(idCampania) {
  let body = {};
  body.IdCampania = idCampania;

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/EliminarCampania",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function actualizarCampaniaEstado(idCampania, bandera) {
  let body = {};
  body.IdCampania = idCampania;
  body.bandera = bandera;

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ActualizarCampaniaEstado",
    body)
    .then(result => result)
    .catch(error => error);
}


export async function obtenerCodigoCampania() {

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCodigoCampania",
    null)
    .then(result => result)
    .catch(error => error);
}

//Árbol de Respuesta
export async function obtenerArbolRespuesta() {

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultaArbol",
    null)
    .then(result => result)
    .catch(error => error);
}
//Árbol de Campaña
export async function obtenerArbolCampania(IdArbolRespuesta) {   
  let body = {};
  body.IdArbolRespuesta=parseInt(IdArbolRespuesta);
  
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCampaniaPorIdArbolRespuesta",
    body)
    .then(result => result)
    .catch(error => error);      
}

///Cedente Archivo 
export async function obtenerCedenteArchivo(codigocedente) {
  let body = {};
  body.CodigoCedente = codigocedente; // esta funcion se le pasa una lista de codigos y retorna la busqueda de la lista

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCedenteCabeceraArchivo",
    body)
    .then(result => result)
    .catch(error => error);
}



//PARAMETRIZACION FILTROS Y ORDEN
export async function obtenerParametrizacionFiltroOrden(idCampania) {

  let body = {};
  body.idCampania = parseInt(idCampania);
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarParametrizacionFiltroOrden",
    body)
    .then(result => result)
    .catch(error => error);
}

//CAMPO CABECERA ARCHIVO 
export async function obtenerCampoCabeceraArchivo(idCabeceraArchivo) {

  let body = {};
  body.IdCabeceraArchivo = parseInt(idCabeceraArchivo);
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCampoCabeceraCodigo",
    body)
    .then(result => result)
    .catch(error => error);
}



export async function addCampania(campania) { //donde yo hago mapeos centralizados es en la capa de communication 

  let body = Object.assign({}, {
    idCampania: campania.idCampania, codigoCedente: campania.cedente, nombreCampania: campania.nombre,
    fechaInicio: convertDateToTimestamp(campania.fechahorainicio), fechaFin: convertDateToTimestamp(campania.fechahorafin),
    esActivo: true, moneda: 'USD', tipoCampania: campania.tipoCampania,
    estado: "ACTIVO", mailing: campania.mailing, carta: campania.carta, sms: campania.sms, whatsapp: campania.whatsapp, 
    idArbolRespuesta: campania.arbol, codigoCampania: campania.codigoCampania, producto: campania.producto, subProducto: campania.subProducto,
    idCampaniaPadre: campania.idCampaniaPadre
  }); //  significa un unico objeto mapea el objeto original al objeto body para que la interfaz no mande error

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/GuardarCampania",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function cambiarFechaCampania(IdCampania, campania) { //donde yo hago mapeos centralizados es en la capa de communication 

  let body = Object.assign({}, {
    idCampania: IdCampania,
    fechaInicio: convertDateToTimestamp(campania.fechahorainicioPop), fechaFin: convertDateToTimestamp(campania.fechahorafinPop),

  });


  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/CambiarFechaCampania",
    body)
    .then(result => result)
    .catch(error => error);
}



//CONSULTA CRM
export async function consultarCampaniaCRM(codigoCampania, idCampania, idCabeceraArchivo) {

  let body = {};
  body.NombreCampana = codigoCampania;
  body.IdCampania = idCampania;
  body.idCabeceraArchivo = idCabeceraArchivo == null ? 0 : idCabeceraArchivo;
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCampaniaCRMyArchivo",
    body)
    .then(result => result)
    .catch(error => error);
}





