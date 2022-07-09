
import React, { useState, createContext } from "react";
import { useObtenerCampaniaProcesada } from "../../hooks/AdminCampania";
import { useGuardarReparticion, useObtenerAsesores } from "../../hooks/FiltroCampania";
import { useObtenerParametrizacionFiltroOrden } from "../../hooks/FiltroCampania";
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import { useCatalogs } from "odc-configuration";
export const Context = createContext({});

export const Provider = (props) => {
    const {
        children
    } = props;
    const catalogsList = [
        "TipoReparticion",
        "FiltroCampania"
    ];
    const dispatch = useDispatch();
    const { profileCode, idInstitution,idOffice } = useSelector(
        state => state.auth.authUser
    );
    const [value, setValue] = React.useState(0);
    const [enableSelection, setenableSelection] = useState(true);
    const [banderaRefrescar, setbanderaRefrescar] = useState(false);

    const [columnaArchivo, setcolumnaArchivo] = useState([]);
    const [columnaOrdenamiento, setColumnaOrdenamiento] = useState([]);
    const [tipoCampania, setTipoCampania] = useState(null);
    const [idCampania, setIdCampania] = useState(null);
    const [popUpRecursos, setPopUpRecursos] = useState(false);
    const [numeroClientes, setNumeroClientes] = useState(null);
    const [rowsRecursos, setRowsRecursos] = useState([]);
    const [codigoProducto, setCodigoProducto] = useState(null);
    const [esPerfilCRM, setEsPerfilCRM] = useState(false);
    const [oficinasCRM, setOficinasCRM] = useState(null);
    const [accionFormulario, setAccionFormulario] = useState(false);
    const [rowsFiltros, setRowsFiltros] = useState([]);
    const [rowsOrdenamiento, setRowsOrdenamiento] = useState([]);


    const [oficinaTexto, setOficinaTexto] = useState(null);
    const [despliegueOperacion, setdespliegueOperacion] = useState({
        despliegue: false,
        mensaje: "",
        tipo: "info",
        titulo: ""
    })



    const { campanias, errorCampanias, isLoadingCampanias } = useObtenerCampaniaProcesada(banderaRefrescar, dispatch);

    const { catalogs, isLoadingCatalogs } = useCatalogs(catalogsList.join(","));


    function cambiartab(valor) {
        sessionStorage.setItem("_tabSeleccionada", String(valor));
        setValue(valor);
    }

    const handleClose = () => {
        setRowsRecursos([]);
        setRowsFiltros([]);
        setRowsOrdenamiento([]);
        setIdCampania(null);
        setbanderaRefrescar(!banderaRefrescar);
    }

    const ConcluirTransaccion = () => {
        setRowsRecursos([]);
        setRowsFiltros([]);
        setRowsOrdenamiento([]);
        setOficinaTexto(null);

        cambiartab(0);
    }
    const CambioValor = (e) => {

        if (e.length > 0) {
            setTipoCampania(e[0].tipoCampania);
            setIdCampania(e[0].idCampania);
            setNumeroClientes(e[0].numeroRegistros);
            if (e[0].campaniaArchivo.length > 0) {

                handleClose();
                useObtenerParametrizacionFiltroOrden(e[0].idCampania, setcolumnaArchivo, setColumnaOrdenamiento, dispatch);
                setIdCampania(e[0].idCampania);
                // setNumeroClientes(e[0].cabeceraArchivo.registroCargado);
                setCodigoProducto(e[0].producto);
            }
            if (!esPerfilCRM)
                useObtenerAsesores(setRowsRecursos, e[0].producto, idOffice, setAccionFormulario, dispatch);
        }

        if (e.length === 0) {
            cambiartab(1);

        }
    }

    const CambiarAsesoresAsignacion = (value) => {
        useObtenerAsesores(setRowsRecursos, codigoProducto, value, setAccionFormulario, dispatch);

    }

    const GuardarReparticion = (values) => {
        let pivote = false;

        rowsRecursos.some(
            item => {
                if (item.esActivo == true) {
                    pivote = true;
                }
            }
        );
        if (values.tiporeparticion != null && idCampania != null && pivote) {
            useGuardarReparticion(values, idCampania, rowsRecursos, setdespliegueOperacion, setAccionFormulario, ConcluirTransaccion, dispatch);

        } else {
            setdespliegueOperacion({
                despliegue: true,
                mensaje: "Debe asignar al menos un recurso y seleccionar el tipo de repartición",
                tipo: "warning"
            })
        }
    }


    const usersContext = {
        profileCode, idInstitution,
        value, setValue,
        enableSelection, setenableSelection,
        banderaRefrescar, setbanderaRefrescar,
        columnaArchivo, setcolumnaArchivo,
        columnaOrdenamiento, setColumnaOrdenamiento,
        tipoCampania, setTipoCampania,
        idCampania, setIdCampania,
        popUpRecursos, setPopUpRecursos,
        numeroClientes, setNumeroClientes,
        rowsRecursos, setRowsRecursos,
        codigoProducto, setCodigoProducto,
        esPerfilCRM, setEsPerfilCRM,
        oficinasCRM, setOficinasCRM,
        accionFormulario, setAccionFormulario,
        rowsFiltros, setRowsFiltros,
        rowsOrdenamiento, setRowsOrdenamiento,
        oficinaTexto, setOficinaTexto,
        despliegueOperacion, setdespliegueOperacion,
        campanias, errorCampanias, isLoadingCampanias,
        catalogs, isLoadingCatalogs,
        CambioValor,
        CambiarAsesoresAsignacion,
        GuardarReparticion
    };

    return <Context.Provider value={usersContext}>{children}</Context.Provider>;
};
