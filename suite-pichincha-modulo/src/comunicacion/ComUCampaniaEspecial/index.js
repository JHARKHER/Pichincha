import { fetchPostService,convertDateToTimestamp,convertTimestampToDate } from "odc-common"; // abstraer la comunicacion del fetch para las apis. Maneja la comunicacion con el servidor


export async function obtenerCampaniasEspeciales() {
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCabeceraArchivo",
    null)
    .then(result => result)
    .catch(error => error);
}
export async function obtenerCedentes() { 
  
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultaCedentes",
    null)
    .then(result => result)
    .catch(error => error);
}


export async function obtenerCatalogosPorCodigo(catalogs) {
  // genera un json

  let body = {};
  body.query = catalogs; // esta funcion se le pasa una lista de codigos y retorna la busqueda de la lista

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CONFIGURATION_ROOT + "getcatalogsbycodes",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function buscarPorParametroCampania(IdCabeceraArchivo) {
  // genera un json

  let body = {};
  body.IdCabeceraArchivo = IdCabeceraArchivo; // esta funcion se le pasa una lista de codigos y retorna la busqueda de la lista

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultaCampaniaParametro",
    body)
    .then(resultbusqueda => {
     
      if(resultbusqueda.state){
        
        resultbusqueda.data.fechaCarga= convertTimestampToDate(resultbusqueda.data.fechaCarga);//conversion de fecha
        
      }
      return resultbusqueda;
    })
    
}

export async function obtenerCabeceraArchivoCampo(IdCabeceraArchivo) {
  // genera un json

  let body = {};
  body.IdCabeceraArchivo = IdCabeceraArchivo; 

  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultaCabeceraCampoArchivo",
    body)
    .then(resultbusqueda => {
     
      if(resultbusqueda.state){
        
        resultbusqueda.data.fechaCarga= convertTimestampToDate(resultbusqueda.data.fechaCarga);//conversion de fecha
        
      }
      return resultbusqueda;
    })
    
}

export async function eliminarArchivoCabecera(IdCabeceraArchivo,IdCampania) {
  // genera un json
  let body = {};
  body.IdCabeceraArchivo = IdCabeceraArchivo; 
  body.IdCampania=IdCampania;
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/EliminarArchivoCabecera",
    body)
    .then(result => result)
    .catch(error => error);
    
}



export async function addCampaniaEspecial(campania,idCampania,banderaRegistro) { //donde yo hago mapeos centralizados es en la capa de communication 
  // genera un json
 if(campania.rutaArchivo!=null){
  var busqueda=campania.rutaArchivo.name.search(/.csv/i);
  var busquedaTexto=campania.rutaArchivo.name.search(/.txt/i);
    if( busqueda != -1){
      campania.TipoArchivo="CSV";
    }else if(busquedaTexto != -1){
      campania.TipoArchivo="TEXTO";
    }
    else {
      campania.TipoArchivo="EXCEL";
    }
 }

 let body = Object.assign({}, {
    
  tipoarchivo:campania.TipoArchivo,fechacarga: convertDateToTimestamp(campania.fechaCarga),
  descripcion:campania.nombreCarga,nombrearchivo:campania.nombreArchivo,
  campocabeceraarchivo:campania.GrdCampaniaEspecialNuevoLista,codigocedente:campania.moduloCedente,idCabeceraArchivo:campania.idCabeceraArchivo});

  const formData = new FormData();
  formData.append('banderaRegistro',banderaRegistro);
  formData.append('idCampania',idCampania);
  formData.append('json',JSON.stringify(body));
  formData.append('file',campania.rutaArchivo);

  let jwtToken = "";
  if (sessionStorage.jwtToken !== undefined)
    jwtToken = "Bearer " + sessionStorage.jwtToken;

return await fetch(process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/archivoInfo",{
  method: 'POST',
  headers: new Headers({
    Authorization: jwtToken
  }),
  body: formData
 })
  .then(function(response) {
    if(response.ok) {
        return response.json()
    } else {
        throw "Error en la llamada Ajax";
    }
 
 })
 .then(function(texto) {
    return texto;
 })
 .catch(function(err) {
    console.log(err);
 }); 
}
