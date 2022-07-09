
import React, { useState, createContext } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useObtenerCampaniaRepartida, useObtenerAsesoresPorCampania } from "../../hooks/ReasignacionCampania";
import { useCatalogs } from "odc-configuration";
import { useObtenerPerfilCRM, useObtenerAsesores } from "../../hooks/FiltroCampania";
export const Context = createContext({});

export const Provider = (props) => {
    const {
        children
    } = props;

    const dispatch = useDispatch();

    const catalogsList = [
        "TipoReparticion"
    ];

    const { catalogs, isLoadingCatalogs } = useCatalogs(catalogsList.join(","));
    const [enableSelection, setenableSelection] = useState(true);
    const [banderaRefrescar, setbanderaRefrescar] = useState(false);
    const [idCampania, setIdCampania] = useState(null);
    const [nombreCampania, setNombreCampania] = useState(null);
    const [accionFormulario, setAccionFormulario] = useState(false);
    const [asesores, setAsesores] = useState([]);
    const [reparticion, setreparticion] = useState(true);
    const [rows, setRows] = useState([]);
    const [rutaArchivo, setRutaArchivo] = useState(null);
    const [clientesGestionados, setClientesGestionados] = useState(0);
    const [numeroRegistros, setNumeroRegistros] = useState(0);
    const [procesoReasignacion, setProcesoReasignacion] = useState(false);
    const [codigoProducto, setCodigoProducto] = useState(null);
    const [esPerfilCRM, setEsPerfilCRM] = useState(false);
    const [oficinasCRM, setOficinasCRM] = useState(null);
    const [oficinaTexto, setOficinaTexto] = useState(null);
    const [rowsRecursos, setRowsRecursos] = useState([]);
    const [asesor, setAsesor] = useState(null);
    const [color, setColor] = useState('#FFFF');
    const [codigoRecurso, setCodigoRecurso] = useState(null);
    const [tipoReparticion, setTipoReparticion] = useState(null);
    const [checkTipoDA, setCheckTipoDA] = useState("distribucion");

    React.useEffect(() => {
        useObtenerPerfilCRM(authUser.profileCode, authUser.idInstitution, setEsPerfilCRM, setOficinasCRM, setAccionFormulario, dispatch);

    }, [0]);


    const [despliegueOperacion, setdespliegueOperacion] = useState({
        despliegue: false,
        mensaje: "",
        tipo: "info",
        titulo: ""
    })
    const { authUser } = useSelector(state => state.auth);

    const { campanias, errorCampanias, isLoadingCampanias } = useObtenerCampaniaRepartida(banderaRefrescar, dispatch);

    const inicializarVariables = () => {
        setTipoReparticion(null)
        setNombreCampania(null);
        setIdCampania(null);
        setClientesGestionados(0);
        setNumeroRegistros(0);
        setProcesoReasignacion(false);
        setCodigoProducto(null);
        setAsesor(null);
        setRutaArchivo(null);
        setreparticion(true);
        setRows([]);
    }

    const CambioValor = (e,form) => {

        if (e.length > 0)
            sessionStorage.setItem('ultimoObjetoReasignacion', JSON.stringify(e[0]));

        if (JSON.parse(sessionStorage.getItem('ultimoObjetoReasignacion')) && e.length == 0) {
            var jsonObjeto = JSON.parse(sessionStorage.getItem('ultimoObjetoReasignacion'));

            const inicializaValores = {
                GrdCampania: campanias,
                reasignacion: "distribucion",
                agencia:authUser.idOffice
            };
            form.initialize(inicializaValores)
            setColor("#FFFF")
            setProcesoReasignacion(true);
            setAsesor(null);
            setClientesGestionados(0);
            setNumeroRegistros(0);
            setIdCampania(jsonObjeto.idCampania);
            setNombreCampania(jsonObjeto.nombreCampania);
            setCodigoProducto(jsonObjeto.producto);
            useObtenerAsesoresPorCampania(jsonObjeto.idCampania, setAsesores, setAccionFormulario, dispatch);
            if (!esPerfilCRM)
                useObtenerAsesores(setRowsRecursos, jsonObjeto.producto, authUser.idOffice, setAccionFormulario, dispatch);
        }
    }

    const usersContext = {
        enableSelection, setenableSelection,
        banderaRefrescar, setbanderaRefrescar,
        idCampania, setIdCampania,
        accionFormulario, setAccionFormulario,
        despliegueOperacion, setdespliegueOperacion,
        campanias, errorCampanias, isLoadingCampanias,
        CambioValor,
        nombreCampania, setNombreCampania,
        asesores, setAsesores,
        reparticion, setreparticion,
        rows, setRows,
        rutaArchivo, setRutaArchivo,
        clientesGestionados, setClientesGestionados,
        numeroRegistros, setNumeroRegistros,
        procesoReasignacion, setProcesoReasignacion,
        authUser,
        catalogs, isLoadingCatalogs,
        codigoProducto, setCodigoProducto,
        asesor, setAsesor,
        esPerfilCRM, setEsPerfilCRM,
        oficinasCRM, setOficinasCRM,
        oficinaTexto, setOficinaTexto,
        rowsRecursos, setRowsRecursos,
        color, setColor,
        inicializarVariables,
        codigoRecurso, setCodigoRecurso,
        tipoReparticion, setTipoReparticion,
        checkTipoDA, setCheckTipoDA
    };

    return <Context.Provider value={usersContext}>{children}</Context.Provider>;
};
