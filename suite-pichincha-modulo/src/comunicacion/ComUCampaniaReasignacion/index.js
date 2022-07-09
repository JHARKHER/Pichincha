import { fetchPostService, convertDateToTimestamp, convertTimestampToDate } from "odc-common"; // abstraer la comunicacion del fetch para las apis. Maneja la comunicacion con el servidor

export async function guardarReasignacionD(props) {

  const { idCampania, codigoRecurso, tipoReparticion, rowsRecursos } = props;

  var recursos = new Array();
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

  let objeto = {};
  objeto.codigoRecursoLogico = codigoRecurso;
  objeto.recursos = recursos;
  objeto.idCampania = idCampania;
  objeto.tipoReparticion = tipoReparticion;

  return await fetchPostService(
    "post",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ReasignarCampania",
    objeto)
    .then(result => result)
    .catch(error => error);
}

export async function guardarReasignacionA(props) {
  const { rutaArchivo, idCampania, idOffice } = props

  let body = Object.assign({}, { idOffice: idOffice });

  const formData = new FormData();
  formData.append('idCampania', idCampania);
  formData.append('json', JSON.stringify(body));
  formData.append('file', rutaArchivo);

  let jwtToken = "";
  if (sessionStorage.jwtToken !== undefined)
    jwtToken = "Bearer " + sessionStorage.jwtToken;

  return await fetch(process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/GuardarReasignacion", {
    method: 'POST',
    headers: new Headers({
      Authorization: jwtToken
    }),
    body: formData
  })
    .then(function (response) {
      if (response.ok) {
        return response.json()
      } else {
        throw "Error en la llamada Ajax";
      }

    })
    .then(function (texto) {
      return texto;
    })
    .catch(function (err) {
      console.log(err);
    });
}

export async function useGuardarReasignacion() {
  //// campañias

  return await fetchPostService(
    "post", process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCampaniasRepartidas", null)
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
export async function obtenerCampaniaRepartida() {
  //// campañias

  return await fetchPostService(
    "get", process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarCampaniasRepartidas", null)
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


export async function obtenerAsesoresPorCampania(idCampania) {

  let body = {};
  body.idCampania = idCampania;
  return await fetchPostService(
    "get",
    process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarAsesoresPorCampania",
    body)
    .then(result => result)
    .catch(error => error);
}

