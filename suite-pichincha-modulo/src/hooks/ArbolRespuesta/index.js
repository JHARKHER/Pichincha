import { showErrorMessage } from "odc-common";
import { obtenerRespuesta, obtenerRespuestaCatalogo } from "../../comunicacion/ComUArbolRespuesta";
import { useState, useEffect } from "react";

const useConsultaArbolRespuesta = (dispatch, codigoArbol, id) => {
    const [dataSource, setDataSource] = useState({});
    const [errorConsulta, setErrorConsulta] = useState(false);
    const [estaCargando, setEstaCargando] = useState(true);
    const [iniciar, setIniciar] = useState(false);
    useEffect(() => {
        setEstaCargando(true);
        const fetchData = async () => {
            try {
                var _dataSource = JSON.parse(sessionStorage['_rAR_' + codigoArbol] || '[]');
                var _catalogoDes = JSON.parse(sessionStorage._catalogoCallAR || 'null');
                if (_dataSource == undefined || _dataSource.length == 0) {
                    const _respuestaCall = await obtenerRespuesta(codigoArbol);
                    if (_respuestaCall.state) {
                        _dataSource = _respuestaCall.data||[];
                        sessionStorage['_rAR_' + codigoArbol] = JSON.stringify(_dataSource);
                    }
                    else {
                        dispatch(showErrorMessage(_respuestaCall.message));
                        setDataSource({});
                    }
                }
                if (_catalogoDes == undefined) {
                    _catalogoDes = {};
                    const _catalogoCall = await obtenerRespuestaCatalogo();
                    if (_catalogoCall.state) {
                        if (_catalogoCall.data.length > 0) {
                            _catalogoCall.data.map((itm, j) => {
                                _catalogoDes[itm.codigoCatalogoRespuesta] = itm.nombreRespuesta + '|' + itm.tipoConTacto;
                            });
                            sessionStorage._catalogoCallAR = JSON.stringify(_catalogoDes);
                        }
                    }
                }

                var _H = _dataSource.filter((value) => {
                    return value.idRespuestaPadre == 0
                })[0];
                if (_H != undefined) {
                    var catalogoRespuesta=_catalogoDes[_H.codigoRespuesta].split("|");
                    _H.descripcion = catalogoRespuesta[0] || _H.codigoRespuesta;
                    _H.tipoContacto = catalogoRespuesta[1] || _H.tipoContacto;
                    var _objRespuesta = { 'Home': _H };
                    _dataSource.map((item, i) => {                        
                        var catalogoRespuestaMap=_catalogoDes[item.codigoRespuesta].split("|");
                        item.id = item.idRespuesta + '';                        
                        item.descripcion = catalogoRespuestaMap[0] || item.codigoRespuesta;
                        item.tipoContacto = catalogoRespuestaMap[1] || item.tipoContacto;
                        if (item.idRespuestaPadre != 0) {
                            if (_objRespuesta[item.idRespuestaPadre + ''] == undefined) {
                                _objRespuesta[item.idRespuestaPadre + ''] = [];
                            }
                            _objRespuesta[item.idRespuestaPadre + ''].push(item);
                        }
                    });
                    setDataSource(_objRespuesta);
                }
                else {
                    setDataSource({});
                    setErrorConsulta({ code: 'AR0001', message: 'El arbol no contiene una pregunta inicial.' });
                }
                setEstaCargando(false);
            } catch (error) {
                setErrorConsulta(error);
                setEstaCargando(false);
            }
        };
        fetchData();
        setIniciar(true)
    }, [codigoArbol,id]);
    return { dataSource, errorConsulta, estaCargando, iniciar, setIniciar };
};

const useAdminArbolRespuesta = () => {
    const [respuesta, setRespuesta] = useState({ id: '0' });
    return { respuesta, setRespuesta }
}

const useKeyPres = () => {
    const [valor, setKeyPress] = useState('1');
    return { valor, setKeyPress }
}

const useInicializado = () => {
    const [inicializado, setInicializado] = useState(false);
    return { inicializado, setInicializado }
}

const useTextChange = () => {
    const [texto, setTexto] = useState('');
    return { texto, setTexto }
}



export { useConsultaArbolRespuesta, useAdminArbolRespuesta, useKeyPres, useInicializado, useTextChange };