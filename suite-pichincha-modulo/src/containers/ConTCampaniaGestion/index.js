import React, { useContext, useState, useEffect } from "react";
import ComPCampaniaAsesor from "../../componentes/ComPCampaniaAsesor";
import ComPCampaniaResumen from "../../componentes/ComPCampaniaResumen";
import ComPGraficoBarras from "../../componentes/ComPGraficoBarras";
import { ProgressBar, CustomAppBar, PopUpAlert } from "odc-common";
import Tabs from "@material-ui/core/Tabs";
import StorageIcon from '@material-ui/icons/Storage';
import PeopleIcon from '@material-ui/icons/People';
import PhoneCallbackIcon from '@material-ui/icons/PhoneCallback';
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import { Form } from 'react-final-form'
import { Context } from "../../context/ContextGestionCampania";
import { makeStyles } from "@material-ui/core/styles";
import ComPCampaniaResumenGrid from "../../componentes/ComPCampaniaResumenGrid";
import ComPGraficoPie from "../../componentes/ComPGraficoPie";
import Typography from "@material-ui/core/Typography";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MasterGestionAsesor from "../ConTGestionAsesor";
import Box from "@material-ui/core/Box";
import { MasterClienteOfertaPrincipal } from "suite-venta-modulo";
import { useDispatch } from 'react-redux';
import { useObtenerCampaniaRepartida, useGraficarCampania } from "../../hooks/GestionCampania";
import { useCatalogs } from "odc-configuration";
const onSubmit = async values => {

}

////CLASES PARA DAR FORM A LA PANTALLA
const useStyles = makeStyles(theme => ({
    root: {
        padding: "15px",
        background: "radial-gradient(circle, rgba(159,215,244,1) 0%, rgba(116,160,210,1) 100%)",
        position: "fixed",
        width: "100%",
        "z-index": 1101,
    },

    panelExpand: {
        "padding-top": "100px",

    },
    panelExpandProspectar: {
        "padding-top": "180px",
    },

    heading: {
        flexBasis: "100%",
        flexShrink: 0,
        color: "white"
    },

    secondaryHeading: {
        color: theme.palette.text.secondary
    },

    secondaryExpa: {
        color: "white !important",
        backgroundColor: "#f0f0f5 !important",
    },

    divPadd: {
        margin: "10px",
        padding: "60px",

        align: 'left',
        flexBasis: "100%",
        flexShrink: 0,
    },
    shadowBox: {
        "box-shadow": "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
    },

}));

////CONTENEDOR DE TODO GESTION CAMPAÑAS
const MasterGestionCampania = ({ }) => {

    const CambioValor = (e, index) => {

        sessionStorage.setItem('ultimoObjetoGestion', JSON.stringify(e));
        setSelectedIndex(index);
        var jsonObjeto = sessionStorage.getItem('ultimoObjetoGestion');
        var objeto = JSON.parse(jsonObjeto);
        useGraficarCampania(objeto, setVisualizarGraficos, setGraficoUno, setAccionFormulario, dispatch);
    }

    const dispatch = useDispatch();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [habilitarTab, setHabilitarTab] = useState(true);

    const [habilitarTabLlamada, setHabilitarTabLlamada] = useState(false);
    const [habilitarTabGestion, setHabilitarTabGestion] = useState(true);
    const [enableSelection, setenableSelection] = useState(true);
    const [visualizarGraficos, setVisualizarGraficos] = useState(false);
    const [utlimoObjeto, setUtlimoObjeto] = useState(null);

    const [codigoCampania, setCodigoCampania] = useState(null);


    const [graficoUno, setGraficoUno] = useState([]);
    const [graficoDos, setGraficoDos] = useState([]);
    const [campaniasResumen, setCampaniasResumen] = useState([]);

    const [accionFormulario, setAccionFormulario] = useState(false);
    const [openWindow, setOpenWindow] = useState(false);
    ///
    const [tipoGestion, setTipoGestion] = useState(null);
    const [nombreCampania, setNombreCampania] = useState(null);
    const [tipoCampania, setTipoCampania] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [registrosTotales, setRegistrosTotales] = useState(0);
    const [registrosGestionEfectiva, setRegistrosGestionEfectiva] = useState(0);
    const [rows, setRows] = useState([]);

    const [nombreCliente, setNombreCliente] = useState(null);
    const [primerNombre, setPrimerNombre] = useState(null);
    const [segundoNombre, setSegundoNombre] = useState(null);
    const [primerApellido, setPrimerApellido] = useState(null);
    const [segundoApellido, setSegundoApellido] = useState(null);
    const [tipoIdentificacion, setTipoIdentificacion] = useState(null);
    const [identificacionCliente, setIdentificacionCliente] = useState(null);
    const [habilitarGestion, setHabilitarGestion] = useState(false);

    const [codigoSubProducto, setCodigoSubProducto] = useState(null);
    const [codigoProducto, setCodigoProducto] = useState(null);
    const [dispositivos, setDispositivos] = useState([]);
    const [direcciones, setDirecciones] = useState([]);
    const [correos, setCorreos] = useState([]);
    const [idDispositivoUbicacion, setIdDispositivoUbicacion] = useState(null);

    const [saldoMontoLiquido, setSaldoMontoLiquido] = useState({
        saldo: 0,
        montoLiquido: 0,
    })

    const [unaCampaniaNormal, setUnaCampaniaNormal] = useState({
        monto: 0,
        plazo: 0,
        cuota: 0
    })

    const [objetoArbol, setObjetoArbol] = useState(null);
    const [idCliente, setIdCliente] = useState(null);
    const [idCampania, setIdCampania] = useState(null);

    const [camundaVariables, setCamundaVariables] = useState({
        documentosHabilitantes: [],
        operacionesInfo: [],
        productoFormaDesembolso: []
    });

    const [siguienteCliente, setSiguienteCliente] = useState(false)

    const [unaCampaniaComercial, setUnaCampaniaComercial] = useState({
        montoLiquidoFinal: 0,
        saldoExterno: 0,
        clienteCrossCrm: "-",
        tipoCancelacion: "-",
        motivoCancelacion: "-"

    })
    const [rowsRubros, setRowsRubros] = useState([]);
    const [plazoMontosSubproductoinfo, setPlazoMontosSubproductoinfo] = useState();

    const [habilitarProspectar, setHabilitarProspectar] = useState(false);
    const [abrirNegociacion, setAbrirNegociacion] = useState(false);
    const [rowsPrecedente, setRowsPrecedente] = useState([]);
    const [despliegueOperacion, setdespliegueOperacion] = useState({
        despliegue: false,
        mensaje: "",
        tipo: "info",
        titulo: ""
    })


    const catalogsList = [
        "TipoTelefono",
        "TipoDispositivoUbi",
        "Operadoras",
        "MOTIVOAGENDIREC",
        "MOTIVOAGENINDIREC",
        "MOTIVOAGENNOCONT"
    ];
    const { catalogs } = useCatalogs(catalogsList.join(","));

    //    
    const { campanias, errorCampanias, isLoadingCampanias } = useObtenerCampaniaRepartida(null, setGraficoDos, setGraficoUno, dispatch);


    const props = {
        nombreCampania, setNombreCampania,
        fechaInicio, setFechaInicio,
        fechaFin, setFechaFin,
        registrosTotales, setRegistrosTotales,
        registrosGestionEfectiva, setRegistrosGestionEfectiva,
        accionFormulario,
        enableSelection,
        campanias,
        utlimoObjeto,
        setenableSelection,
        isLoadingCampanias,
        errorCampanias,
        CambioValor,
        visualizarGraficos, setVisualizarGraficos,
        setUtlimoObjeto,
        graficoUno, setGraficoUno,
        graficoDos, setGraficoDos,
        habilitarTab, setHabilitarTab,
        campaniasResumen, setCampaniasResumen,
        setAccionFormulario,
        tipoGestion, setTipoGestion,
        rows, setRows,
        openWindow, setOpenWindow,
        selectedIndex, setSelectedIndex,
        tipoCampania, setTipoCampania,
        unaCampaniaNormal, setUnaCampaniaNormal,
        habilitarGestion, setHabilitarGestion,
        nombreCliente, setNombreCliente,
        primerNombre, setPrimerNombre,
        segundoNombre, setSegundoNombre,
        primerApellido, setPrimerApellido,
        segundoApellido, setSegundoApellido,
        identificacionCliente, setIdentificacionCliente,
        habilitarTabGestion, setHabilitarTabGestion,
        tipoIdentificacion, setTipoIdentificacion,
        codigoSubProducto, setCodigoSubProducto,
        idCliente, setIdCliente,
        dispositivos, setDispositivos,
        codigoProducto, setCodigoProducto,
        catalogs,
        saldoMontoLiquido, setSaldoMontoLiquido,
        direcciones, setDirecciones,
        correos, setCorreos,
        idCampania, setIdCampania,
        habilitarTabLlamada, setHabilitarTabLlamada,
        idDispositivoUbicacion, setIdDispositivoUbicacion,
        habilitarProspectar, setHabilitarProspectar,
        objetoArbol, setObjetoArbol,
        despliegueOperacion, setdespliegueOperacion,
        rowsRubros, setRowsRubros,
        plazoMontosSubproductoinfo, setPlazoMontosSubproductoinfo,
        abrirNegociacion, setAbrirNegociacion,
        camundaVariables, setCamundaVariables,
        siguienteCliente, setSiguienteCliente,
        codigoCampania, setCodigoCampania,
        unaCampaniaComercial, setUnaCampaniaComercial,
        rowsPrecedente, setRowsPrecedente
    };



    ////FUNCION REQUERIDA PARA DAR ESTILOS A LOS TABS
    function a11yProps(index) {

        return {
            id: `simple-tab-${index}`,
            "aria-controls": `simple-tabpanel-${index}`
        };
    }
    ////FUNCION PARA EL ESTILO DEL TAB EN CUANTO AL TIPO DE LETRA
    const TabPanel = props => {
        const { children, value, index, ...other } = props;

        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                <Box p={3}>{children}</Box>
            </Typography>
        );
    };

    function handleChange(event, newValue) {

        sessionStorage.setItem("_tabSeleccionada", String(newValue));
        setValue(newValue);
        if (newValue == 0) {
            setOpenWindow(false);
            setHabilitarGestion(false);
            setHabilitarTab(true);
            setHabilitarProspectar(false);
            setObjetoArbol(null);

        } else if (newValue == 1) {
            setOpenWindow(true);
            setHabilitarProspectar(false);
            setObjetoArbol(null);

        } else {
            setHabilitarGestion(false);
            setHabilitarTab(false);
            setHabilitarProspectar(false);
        }


    }

    const classes = useStyles();

    const [value, setValue] = useState(0);
    //////
    let objeto = JSON.parse(sessionStorage.getItem("ultimoObjetoGestion"));

    let objetoProducto_SubProducto = JSON.parse(sessionStorage.getItem("ultimoObjetoG"));


    let idAsesor;
    let codigoProducto_SubProducto;

    if (objeto != null)
        idAsesor = objeto.idAsesor;

    if (objetoProducto_SubProducto != null) {
        codigoProducto_SubProducto = objetoProducto_SubProducto.codigoProducto + " ─ " + objetoProducto_SubProducto.codigoSubProducto;
        sessionStorage.setItem('codigoProductoCampania', codigoProducto_SubProducto);
    }

    ////DAR COLORES RANDOMICOS AL GRAFICO DE BARRAS 
    let bgColor = [];
    if (campanias != null) {

        campanias.forEach(element => {

            var x = Math.floor(Math.random() * 256);
            var y = Math.floor(Math.random() * 256);
            var z = Math.floor(Math.random() * 256);

            bgColor.push("rgb(" + x + "," + y + "," + z + ")");
        });
    }

    if (isLoadingCampanias) return (<ProgressBar />);

    ////FUNCION QUE CONTIENE A LOS TABS (CABECERA)
    const gestionCampaniaTabs = () => {
        return (
            <CustomAppBar>
                <div className="row form-row" >
                    <div>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="Reparticion"
                        >
                            <Tab label="Campañas" icon={<StorageIcon />} {...a11yProps(0)} disabled={habilitarTabLlamada} />
                            <Tab label="Resumen Clientes" icon={<PeopleIcon />} {...a11yProps(1)} disabled={habilitarTab} />
                            <Tab label="Gestión" icon={<PhoneCallbackIcon />} {...a11yProps(2)} disabled={habilitarTabGestion} />
                            <Tab label="Prospección" icon={<AccountBalanceWalletIcon />} {...a11yProps(3)} disabled={!habilitarProspectar} />
                        </Tabs>
                    </div>
                </div>
            </CustomAppBar>
        )
    }

    ////CUERPO DEL CONTENEDOR
    return (
        <Form
            subscription={{}}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    {openWindow &&
                        <div className={classes.root}>
                            <ComPCampaniaResumen
                                {...props}
                            />
                        </div>
                    }
                    <div id="cabecera_Campania" className={habilitarProspectar == false ? (openWindow == false ? "app-wrapper" : classes.panelExpand) : classes.panelExpandProspectar}>
                        <Paper>
                            {gestionCampaniaTabs()}
                            <TabPanel value={value} index={0}>
                                <div className="row">
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 col-xl-5">
                                        <ComPCampaniaAsesor
                                            {...props}
                                            bgColor={bgColor}
                                        />
                                    </div>
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7 col-xl-7">

                                        <ComPGraficoPie
                                            {...props}
                                            setValue={setValue}
                                        />
                                        <br />
                                        <ComPGraficoBarras
                                            {...props}
                                            bgColor={bgColor}
                                        />
                                    </div>

                                </div>
                            </TabPanel>
                            <TabPanel value={value} index={1}>

                                <ComPCampaniaResumenGrid
                                    {...props}
                                    setValue={setValue}
                                />

                            </TabPanel>
                            <TabPanel value={value} index={2}>

                                <MasterGestionAsesor
                                    {...props}
                                    setValue={setValue}
                                />

                            </TabPanel>
                            <TabPanel value={value} index={3}>
                                {habilitarProspectar &&
                                    <MasterClienteOfertaPrincipal
                                        tipoIdentificacion={tipoIdentificacion}
                                        identificacionCliente={identificacionCliente}
                                        idAsesorCampania={idAsesor}
                                        telefonoGestionado={objetoArbol ? objetoArbol.telefonoGestionado : ''}
                                        esCampania={true}
                                        codigoCampania={codigoCampania}
                                    />
                                }
                            </TabPanel>

                        </Paper>

                        {accionFormulario &&
                            <ProgressBar />
                        }

                        <PopUpAlert
                            type={despliegueOperacion.tipo}
                            show={despliegueOperacion.despliegue}
                            title={despliegueOperacion.titulo}
                            message={despliegueOperacion.mensaje}
                            onConfirm={() =>
                                setdespliegueOperacion({
                                    despliegue: false,
                                    mensaje: " ",
                                    tipo: "warning"
                                })}
                        />
                    </div>
                </form>

            )}
        />
    );

}


export default MasterGestionCampania;