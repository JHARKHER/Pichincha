import { useState, useEffect } from "react";
import { consultarClientesSeguimiento } from "../../comunicacion/ComUSeguimiento";
import { consultarGestionIdentificacion } from "../../comunicacion/ComUPanelGestion";
import { showErrorMessage } from "odc-common";

const useClienteSeguimiento = (dispatch, IdUsuarioSeguimiento) => {
    const [state, setState] = useState(false);
    const [lista, setLista] = useState([]);
    const [estaCargando, setEstaCargando] = useState([]);
    const [error, setErrorConsulta] = useState([]);
    useEffect(() => {
        setEstaCargando(true);
        const fetchData = async () => {
            try {
                const _respuesta = await consultarClientesSeguimiento(IdUsuarioSeguimiento);
                if (_respuesta.state) {
                    setLista(_respuesta.data);
                }
                else {
                    dispatch(showErrorMessage(_respuesta.message));
                    setLista([]);
                }
                setEstaCargando(false);
            } catch (error) {
                setErrorConsulta(error);
                setEstaCargando(false);
            }
        };
        fetchData();
    }, [IdUsuarioSeguimiento]);
    return { state, setState, lista, estaCargando, error };
};

const usePanelGestion = (dispatch, identificacion) => {
    const [state, setState] = useState(false);
    const [lista, setLista] = useState([]);
    const [estaCargando, setEstaCargando] = useState([]);
    const [error, setErrorConsulta] = useState([]);
    useEffect(() => {
        setEstaCargando(true);
        const fetchData = async () => {
            try {
                const _respuesta = await consultarGestionIdentificacion(identificacion);
                if (_respuesta.state) {
                    setLista(_respuesta.data);
                }
                else {
                    dispatch(showErrorMessage(_respuesta.message));
                    setLista([]);
                }
                setEstaCargando(false);
            } catch (error) {
                setErrorConsulta(error);
                setEstaCargando(false);
            }
        };
        fetchData();
    }, [identificacion]);
    return { state, setState, lista, estaCargando, error };
};

export { useClienteSeguimiento, usePanelGestion };