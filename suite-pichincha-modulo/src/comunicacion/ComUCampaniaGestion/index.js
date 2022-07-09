import { fetchPostService, convertDateToTimestamp, convertTimestampToDate } from "odc-common"; // abstraer la comunicacion del fetch para las apis. Maneja la comunicacion con el servidor


export async function obtenerCampaniaRecurso() {
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCampaniaRecurso",
    null)
    .then(result => result)
    .catch(error => error);
}
export async function obtenerGestionCampania(idCampania, codigoRecursoLogico) {
  let body = {};
  body.idCampania = idCampania;
  body.codigoRecursoLogico = codigoRecursoLogico;
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarGestionCampania",
    body)
    .then(result => result)
    .catch(error => error);
}
export async function obtenerRegistrosClientesResumen(idCampania, codigoRecursoLogico, tipoCampania, tipoGestion) {
  let body = {};
  body.idCampania = idCampania;
  body.codigoRecursoLogico = codigoRecursoLogico;
  body.tipoGestion = tipoGestion;
  body.tipoCampania = tipoCampania;
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarRegistrosClientesResumen",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function obtenerDatosClientes(identificacion, tipoIdentificacion, codigoSubProducto, codigoProducto, idCliente, tipoControl, codigoCampania) {

  let body = {};
  body.identificacion = identificacion;
  body.codigoSubProducto = codigoSubProducto;
  body.codigoProducto = codigoProducto;
  body.tipoIdentificacion = tipoIdentificacion;
  body.idcliente = idCliente;
  body.control = tipoControl;
  body.codigoCampania = codigoCampania;
  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultaDatosCliente",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function guardarTelefono(tipoTelefono, valor, tipoDispositivo, operadora, esWhatsapp, idCliente) {
  let body = {};
  body.tipoUbicacion = tipoTelefono;
  body.Valor = valor;
  body.operadora = operadora;
  body.esWhatsapp = esWhatsapp;
  body.tipoDispositivo = tipoDispositivo;
  body.tipoCarga = 'ONLINE';
  body.idCliente = idCliente;
  body.esActivo = true;

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/GuardarDispositivo",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function guardarDireccion(objeto, idCliente) {
  let body = {};
  body.CallePrincipal = objeto.callePrincipal;
  body.CalleSecundaria = objeto.calleSecundaria;
  body.Numero = objeto.numero;
  body.Referencia = objeto.ubicacionReferencia;
  body.UbicacionGeografica1 = objeto.geographicLocation1Code;
  body.UbicacionGeografica2 = objeto.geographicLocation2Code;
  body.UbicacionGeografica3 = objeto.geographicLocation3Code;
  body.tipoCarga = 'ONLINE';
  body.idCliente = idCliente;
  body.esActivo = true;

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/GuardarDireccion",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function guardarCorreo(objeto, idCliente) {
  let body = {};
  body.valor = objeto.correoCliente;
  body.tipoDispositivo = 'EMAIL';
  body.tipoUbicacion = 'TIPUBIGEN';
  body.tipoCarga = 'ONLINE';
  body.idCliente = idCliente;
  body.esActivo = true;

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/GuardarDispositivo",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function guardarGestion(objeto) {
  let body = {};

  body.CodigoCedente = objeto.objetoCampania.codigoCedente;
  body.CodigoCanal = objeto.authUser.profileCode;
  body.CodigoCampania = objeto.tipoCampania;
  body.IdCampania = objeto.idCampania;
  body.IdCliente = objeto.idCliente;
  body.Identificacion = objeto.identificacionCliente;
  body.TipoIdentificacion = objeto.tipoIdentificacion;
  body.CodigoArbolRespuesta = objeto.objetoArbol.codigoArbolRespuesta;
  body.IdRespuesta = objeto.res.respuetas[objeto.res.respuetas.length - 1].idRespuesta;
  body.CodigoRespuesta = objeto.res.respuetas[objeto.res.respuetas.length - 1].codigoRespuesta;
  body.TipoContacto = objeto.res.respuetas[objeto.res.respuetas.length - 1].tipoContacto;
  body.EsEfectivo = true;
  body.IdAsesor = objeto.objetoArbol.idAsesor;
  body.IdAsesorGestion = objeto.objetoArbol.idAsesor;
  body.UserName = objeto.authUser.userCode;
  body.UserNameGestion = objeto.authUser.userCode;
  body.TiempoGestion = objeto.time;
  body.Comentario = objeto.res.texto;

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/GuardarGestion",
    body)
    .then(result => result)
    .catch(error => error);
}

export async function guardarGestionAgendamiento(objeto) {
  let bodyGestion = {};
  let bodyAgendamiento = {};
  let agrupador = {};
  bodyGestion.CodigoCedente = objeto.objetoCampania.codigoCedente;
  bodyGestion.CodigoCanal = objeto.authUser.profileCode;
  bodyGestion.CodigoCampania = objeto.tipoCampania;
  bodyGestion.IdCampania = objeto.idCampania;
  bodyGestion.IdCliente = objeto.idCliente;
  bodyGestion.Identificacion = objeto.identificacionCliente;
  bodyGestion.TipoIdentificacion = objeto.tipoIdentificacion;
  bodyGestion.CodigoArbolRespuesta = objeto.objetoArbol.codigoArbolRespuesta;
  bodyGestion.IdRespuesta = objeto.variableRes.respuetas[objeto.variableRes.respuetas.length - 1].idRespuesta;
  bodyGestion.CodigoRespuesta = objeto.variableRes.respuetas[objeto.variableRes.respuetas.length - 1].codigoRespuesta;
  bodyGestion.TipoContacto = objeto.variableRes.respuetas[objeto.variableRes.respuetas.length - 1].tipoContacto;
  bodyGestion.EsEfectivo = true;
  bodyGestion.IdAsesor = objeto.objetoArbol.idAsesor;
  bodyGestion.IdAsesorGestion = objeto.objetoArbol.idAsesor;
  bodyGestion.UserName = objeto.authUser.userCode;
  bodyGestion.UserNameGestion = objeto.authUser.userCode;
  bodyGestion.TiempoGestion = objeto.time;
  bodyGestion.Comentario = objeto.variableRes.texto;

  bodyAgendamiento.CodigoCedente = objeto.objetoCampania.codigoCedente;
  bodyAgendamiento.IdCampania = objeto.idCampania;
  bodyAgendamiento.IdCliente = objeto.idCliente;
  bodyAgendamiento.IdDispositivoUbicacion = objeto.objetoArbol.idDispositivoUbicacion;
  bodyAgendamiento.FechaAgendamiento = objeto.values.fechaAgendamiento;
  bodyAgendamiento.Observacion = objeto.values.observacion;
  bodyAgendamiento.TipoAgendamiento = 'GestionCampaña';
  bodyAgendamiento.MotivoAgendamiento = objeto.values.motivoAgendamiento;

  agrupador.Gestion = bodyGestion;
  agrupador.Agendamiento = bodyAgendamiento;

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/GuardarGestionAgendamiento",
    agrupador)
    .then(result => result)
    .catch(error => error);
}



