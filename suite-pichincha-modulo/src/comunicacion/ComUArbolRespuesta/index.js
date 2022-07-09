import { fetchPostService } from "odc-common";

export async function obtenerArbolRespuesta(tipoArbol) {
    return await fetchPostService("get", process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarArbolPorTipo", {TipoArbol:tipoArbol})
        .then(result => result)
        .catch(error => error);
}

export async function obtenerRespuesta(codigoArbol) {
    return await fetchPostService("get", process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarRespuesta", {CodigoArbol:codigoArbol})
        .then(result => result)
        .catch(error => error);
}

export async function obtenerRespuestaCatalogo() {
    return await fetchPostService("get", process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarRespuestaCatalogo", {})
        .then(result => result)
        .catch(error => error);
}
