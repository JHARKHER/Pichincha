import { fetchPostService} from "odc-common"; 

export async function obtenerReporteDetalleCampania(campos) { 
    let body = Object.assign({}, {      
        cuentaOrigen:campos.cuentaOrigen, 
        beneficiario:campos.beneficiario, 
        cuentaDestino:campos.cuentaDestino,
        concepto:campos.concepto, 
        monto:campos.monto, 
        emailDestino: campos.emailDestino
    });  
    //debugger;
    //console.log("ENVIANDO...", body);
    return await fetchPostService(
      "post",
      process.env."http://192.168.1.5:7000/Movimiento/Movimiento" , 
      body)
      .then(result => result)
      .catch(error => error);
  }