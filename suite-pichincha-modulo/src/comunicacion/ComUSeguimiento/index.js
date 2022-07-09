import { fetchPostService } from "odc-common";

export async function consultarClientesSeguimiento(id) {
    return await fetchPostService("get", process.env.REACT_APP_API_SALES_ROOT + "ConsultarClientesSeguimiento", { IdUsuarioSeguimiento: id })
        .then(result => result)
        .catch(error => error);
}