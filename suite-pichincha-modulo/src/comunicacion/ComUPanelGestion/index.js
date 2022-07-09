import { fetchPostService } from "odc-common";

export async function consultarGestionIdentificacion(Identificacion) {
    return await fetchPostService("get", process.env.REACT_APP_API_CAMPANIAESPECIAL_ROOT + "campania/ConsultarGestionPorIdentificacion", {Identificacion:Identificacion})
        .then(result => result)
        .catch(error => error);
}