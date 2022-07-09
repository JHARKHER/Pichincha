import React, { useContext, useState } from "react";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Form } from 'react-final-form'
import { PROSPECCION, AGENDAMIENTO, NEGOCIACION, CONTACTO_DIRECTO, CONTACTO_INDIRECTO, NO_CONTACTO } from '../../Constantes'
import { makeStyles } from "@material-ui/core/styles";
import ArbolRespuesta from '../ConTArbolRespuesta';
import { ComPClienteNegociacion, MasterNegociacion, MasterDocumentosHabilitantes } from 'suite-venta-modulo';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from "@material-ui/core/Paper";//contenedor de la forma
import IconButton from '@material-ui/core/IconButton';
import RoomIcon from '@material-ui/icons/Room';
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ChatIcon from '@material-ui/icons/Chat';
import CancelPresentationIcon from '@material-ui/icons/CancelPresentation';
import ComPDatosCliente from "../../componentes/ComPDatosCliente";
import { IntlMessages, Popup } from "odc-common";
import ComPDatosUbicacion from "../../componentes/ComPDatosUbicacion";
import ComPCorreo from "../../componentes/ComPCorreo";
import { useTimer } from 'use-timer';
import { useGestionarCampania, useGestionarAgendamientoCampania, useDocumentosHabiltiantes } from "../../hooks/GestionCampania";
import { useSelector } from "react-redux"
import { useDispatch } from 'react-redux';
import ComPAgendamiento from "../../componentes/ComPAgendamiento";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TimelineIcon from '@material-ui/icons/Timeline';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import TimerIcon from '@material-ui/icons/Timer';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Divider from '@material-ui/core/Divider';
const onSubmit = async values => {

}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box style={{ paddingTop: "5px" }} p={3}>{children}</Box>}
        </Typography>
    );
}

function TabPanelCampaniaComercial(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box style={{ padding: "2px" }} p={3}>{children}</Box>}
        </Typography>
    );
}

function a11yPropsV(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}



const useStyles = makeStyles(theme => ({
    root: {
        background: "radial-gradient(circle, rgba(159,215,244,1) 0%, rgba(116,160,210,1) 100%)",
        position: "fixed",
        width: "100%",
        "z-index": 1101,
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

    rootTab: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: 250
    }

}));


const MasterGestionAsesor = (props) => {

    const {
        idCampania, setOpenWindow, unaCampaniaNormal, tipoCampania, identificacionCliente, tipoIdentificacion, camundaVariables, rowsRubros, setRowsRubros,
        primerNombre, segundoNombre, primerApellido, segundoApellido, saldoMontoLiquido, idCliente, setAccionFormulario, setValue,catalogs,
        setHabilitarProspectar, objetoArbol, setObjetoArbol, setdespliegueOperacion, setSiguienteCliente, rows, setRowsPrecedente,
        tipoGestion, setRegistrosTotales, setRegistrosGestionEfectiva, setRows, setCodigoProducto, setCampaniasResumen, setHabilitarTab, setHabilitarTabGestion,
        setHabilitarTabLlamada, plazoMontosSubproductoinfo, abrirNegociacion, setAbrirNegociacion, unaCampaniaComercial
    } = props;

    /**************** DECLARACION VARIABLES ****************/

    const classes = useStyles();
    const { authUser } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const { time, start, pause, reset } = useTimer();

    const [respuestaInicial, setRespuestaInicial] = useState(null);
    const [rowsSeguros, setRowsSeguros] = useState([]);
    const [variablesDemograficasCampania, setVariablesDemograficasCampania] = useState(null);
    const [valores, setValores] = useState(0);
    const [abrirAgendamiento, setAbrirAgendamiento] = useState(false);
    const [variableRes, setVariableRes] = useState(null);
    const [habilitarNegociacion, setHabilitarNegociacion] = useState(false);
    const [pasoSeleccionado, setPasoSeleccionado] = useState();
    const [acordion2Expandido, setAcordion2Expandido] = useState(false);
    const [acordion2Desactivado, setAcordion2Desactivado] = useState(false);
    const [negocioDetallePop, setNegocioDetallePop] = useState(true);
    const [datosOfertaSolicitada, setDatosOfertaSolicitada] = useState();
    const [respuesta, setRespuesta] = useState();
    const [loadingBuroFallido, setLoadingBuroFallido] = useState(false);

    let respuestaCamunda = {
        data: {
            grupoAgenciaConsumo:[],
            perfilConsumo:[],
            tipoCliente:[]
        },
    }

    if (variablesDemograficasCampania != null) {
        sessionStorage.setItem("objetoVariablesDemograficas", JSON.stringify(variablesDemograficasCampania));
    }
    let objetoVariableDemograficas = JSON.parse(sessionStorage.getItem("objetoVariablesDemograficas"));
    let openWindowOperaciones = camundaVariables.operacionesInfo.length > 0 ? true : false;
    let objetoProducto_SubProducto = JSON.parse(sessionStorage.getItem("ultimoObjetoG"));

    const datosSeleccionados = {
        perfil: "Normal",
        perfilComercial: "Normal",
        producto: objetoProducto_SubProducto == null ? null : objetoProducto_SubProducto.codigoProducto,
        subProducto: objetoProducto_SubProducto == null ? null : objetoProducto_SubProducto.codigoSubProducto,
        monto: unaCampaniaNormal.monto,
        montoCalcular: unaCampaniaNormal.monto,
        periodos: unaCampaniaNormal.plazo
    }

    const clienteOfertaConsumo = {
        fechaNacimiento: new Date(),
        identificacion: identificacionCliente,
        tipoIdentificacion: tipoIdentificacion,
        celular: objetoArbol ? objetoArbol.telefonoGestionado : '',
        proceso: "ONLINE",
        idCliente: idCliente,
        esCampania: true,
        CodigoProducto: objetoProducto_SubProducto == null ? null : objetoProducto_SubProducto.codigoProducto,
        idAsesor: objetoArbol ? objetoArbol.idAsesor : '',
        EsTransaccionCampania: true,
        primerNombre: primerNombre,
        segundoNombre: segundoNombre,
        primerApellido: primerApellido,
        segundoApellido: segundoApellido,
        nit: "445-4",
        ingresos: 0 

    }
    let validacionCerrarNegociacionFinal = sessionStorage.getItem("guardarNegociacionCerrar");
    let validacionCerrarNegociacion = sessionStorage.getItem("guardarGestionCerrar");
    let unObjetoNegociacion = JSON.parse(sessionStorage.getItem("unObjetoNegociacion"));

    let aceptarNegociacion = false;
    let datosOfertaSolici;
    if (unObjetoNegociacion != null) {
        if (unObjetoNegociacion.datosOfertaSolicitada != null)
            unObjetoNegociacion.datosOfertaSolicitada.fechaVencimiento = new Date(unObjetoNegociacion.datosOfertaSolicitada.fechaVencimiento)

        aceptarNegociacion = unObjetoNegociacion.boolAceptaNegociacion;
        datosOfertaSolici = unObjetoNegociacion.datosOfertaSolicitada;

    }

    /**************** FUNCTIONES ****************/

    React.useEffect(() => {
        if (habilitarNegociacion == false && aceptarNegociacion == true) {
            let unObjetoNegociacion = {};
            unObjetoNegociacion.boolAceptaNegociacion = false;
            unObjetoNegociacion.datosOfertaSolicitada = datosOfertaSolici;
            unObjetoNegociacion.GestionarNegociacion = GestionarNegociacion;
            sessionStorage.setItem("unObjetoNegociacion", JSON.stringify(unObjetoNegociacion))
            
            useDocumentosHabiltiantes(unObjetoNegociacion, dispatch);
        }

        if (validacionCerrarNegociacion == "true") {
            sessionStorage.removeItem("guardarGestionCerrar");
            GestionarCerrarCampania()
        }
        if (validacionCerrarNegociacionFinal == "true") {
            sessionStorage.removeItem("guardarNegociacionCerrar");
            setSiguienteCliente(true);
            setObjetoArbol(null);
            setdespliegueOperacion({
                despliegue: true,
                tipo: "success"
            });
        }

    }, [habilitarNegociacion]);

    const handleChange = (event, newValue) => {
        setValores(newValue);
    };

    const GuardarAgendamiento = (values) => {
        var objetoCampania = JSON.parse(sessionStorage.getItem('ultimoObjetoGestion'));
        const objeto = {
            variableRes, authUser, pause, reset, setAccionFormulario,
            idCliente, setdespliegueOperacion, dispatch, time, idCampania, tipoCampania,
            identificacionCliente, objetoArbol, tipoIdentificacion, values,
            objetoCampania, tipoGestion, setRegistrosTotales, setRegistrosGestionEfectiva
            , setRows, setCodigoProducto, cambiaEstadoDeterminado: 'GestionAgendar', rows, setRowsPrecedente,

            setCampaniasResumen, setHabilitarTab, setHabilitarTabGestion, setHabilitarTabLlamada,
            setObjetoArbol, setSiguienteCliente
        }
        useGestionarAgendamientoCampania(objeto);
    }

    const GestionarNegociacion = () => {

        var objetoCampania = JSON.parse(sessionStorage.getItem('ultimoObjetoGestion'));

        const objeto = {
            res: respuesta, authUser, pause, reset, setAccionFormulario,
            idCliente, setdespliegueOperacion, dispatch, time, idCampania, tipoCampania,
            identificacionCliente, objetoArbol, tipoIdentificacion, objetoCampania, tipoGestion, setRegistrosTotales,
            setRegistrosGestionEfectiva, setRows, setCodigoProducto, cambiaEstadoDeterminado: 'GestionNegociacion', rows, setRowsPrecedente,

            setCampaniasResumen, setHabilitarTab, setHabilitarTabGestion, setHabilitarTabLlamada, setAbrirNegociacion
        }
        useGestionarCampania(objeto);
    }

    const GestionarCampania = (res) => {
        var objetoCampania = JSON.parse(sessionStorage.getItem('ultimoObjetoGestion'));

        const objeto = {
            res, authUser, pause, reset, setAccionFormulario,
            idCliente, setdespliegueOperacion, dispatch, time, idCampania, tipoCampania,
            identificacionCliente, objetoArbol, tipoIdentificacion, objetoCampania, tipoGestion, setRegistrosTotales,
            setRegistrosGestionEfectiva, setRows, setCodigoProducto, cambiaEstadoDeterminado: 'GestionProspectar', rows, setRowsPrecedente,

            setCampaniasResumen, setOpenWindow, setHabilitarTab, setHabilitarTabGestion, setHabilitarTabLlamada, setHabilitarProspectar, setValue
        }
        useGestionarCampania(objeto);
    }

    const GestionarCerrarCampania = (res) => {
        var objetoCampania = JSON.parse(sessionStorage.getItem('ultimoObjetoGestion'));

        const objeto = {
            res: res != null ? res : respuesta, authUser, pause, reset, setAccionFormulario,
            idCliente, setdespliegueOperacion, dispatch, time, idCampania, tipoCampania,
            identificacionCliente, objetoArbol, tipoIdentificacion, objetoCampania, tipoGestion, setRegistrosTotales,
            setRegistrosGestionEfectiva, setRows, setCodigoProducto, cambiaEstadoDeterminado: 'GestionCerrar', rows, setRowsPrecedente,

            setCampaniasResumen, setHabilitarTab, setHabilitarTabGestion, setHabilitarTabLlamada, setObjetoArbol, setSiguienteCliente,

        }
        useGestionarCampania(objeto);
    }


    /**************** COMPONENTES ****************/
    const operacionesVigentes = () => {
        return (
            <Paper className={classes.shadowBox} >
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <AccountBalanceIcon />
                        </IconButton>
                        <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
                            Operaciones Vigentes
                </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{ minHeight: "240px", padding: "15px" }}>
                    <ComPClienteNegociacion
                        operacionesInfo={camundaVariables.operacionesInfo}
                    />
                </div>
            </Paper>
        )
    }

    const datosCliente = () => {
        return (
            <Paper className={classes.shadowBox}  >
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <PersonIcon />
                        </IconButton>
                        <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
                            Datos Cliente
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Paper className={`${classes.rootTab}`} style={{ maxHeight: "240px" }}>

                    <Tabs
                        style={{ "backgroundColor": "#3C8CBB" }}
                        orientation="vertical"
                        value={valores}
                        onChange={handleChange}
                        className={classes.tabs}
                    >
                        <Tab style={{ "color": "#FFFF" }} icon={<PhoneIcon />} {...a11yPropsV(0)} />
                        <Tab style={{ "color": "#FFFF" }} icon={<RoomIcon />} {...a11yPropsV(1)} />
                        <Tab style={{ "color": "#FFFF" }} icon={<EmailIcon />} {...a11yPropsV(2)} />

                    </Tabs>

                    <TabPanel value={valores} index={0}>
                        <ComPDatosCliente
                            {...props}
                            start={start}
                        />
                    </TabPanel>
                    <TabPanel value={valores} index={1}>
                        <ComPDatosUbicacion
                            {...props}
                        />
                    </TabPanel>
                    <TabPanel value={valores} index={2}>
                        <ComPCorreo
                            {...props}
                        />
                    </TabPanel>
                </Paper>
            </Paper>
        )
    }

    const detalleCondiciones = () => {
        return (
            <div style={{ "boxShadow": "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)" }}>
                <List component="nav" dense={true} style={{ padding: "0px" }} aria-label="main mailbox folders">
                    <ListItem style={{ paddingTop: "0px", "paddingBottom": "0px" }} >
                        {/* MONTO */}
                        <ListItemIcon>
                            <MonetizationOnIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.campaniagestion.monto" /></Typography>}
                            secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{unaCampaniaNormal.monto}</Typography>} />
                        {/* PLAZO */}
                        <ListItemIcon>
                            <TimerIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.campaniagestion.plazo" /></Typography>}
                            secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{unaCampaniaNormal.plazo}</Typography>} />

                        {/* SALDO */}
                        <ListItemIcon>
                            <LocalAtmIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.campaniagestion.saldo" /></Typography>}
                            secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{saldoMontoLiquido.saldo}</Typography>} />
                    </ListItem>
                    <Divider style={{ backgroundColor: "#3C8DBC" }} />
                    <ListItem style={{ paddingTop: "0px", "paddingBottom": "0px" }} >
                        {/* MONTO LIQUIDO */}
                        <ListItemIcon>
                            <MonetizationOnIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.campaniagestion.montoLiquido" /></Typography>}
                            secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{saldoMontoLiquido.montoLiquido}</Typography>} />
                        {/* CUOTA */}
                        <ListItemIcon>
                            <TimelineIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.campaniagestion.cuota" /></Typography>}
                            secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{unaCampaniaNormal.cuota}</Typography>} />
                    </ListItem>
                </List>
            </div >
        )

    }

    const detalleCampaniaComercial = () => {
        return (
            <Paper className={`${classes.rootTab}`} style={{ "boxShadow": "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)" }} >
                <Tabs
                    style={{ "backgroundColor": "#3C8CBB", maxWidth: "60px" }}
                    orientation="vertical"
                    value={0}

                >
                    <Tab style={{ "color": "#FFFF" }} icon={<PhoneIcon />} />

                </Tabs>

                <TabPanelCampaniaComercial value={0} index={0}>

                    <List component="nav" dense={true} style={{ padding: "0px" }} aria-label="main mailbox folders">

                        <ListItem style={{ paddingTop: "0px", "paddingBottom": "0px" }} >
                            {/* MONTO LIQUIDO FINAL */}
                            <ListItemIcon>
                                <LocalAtmIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.campaniagestion.montoLiquidoFinal" /></Typography>}
                                secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{unaCampaniaComercial.montoLiquidoFinal}</Typography>} />
                            {/* SALDO EXTERNO */}
                            <ListItemIcon>
                                <MonetizationOnIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.campaniagestion.saldoExterno" /></Typography>}
                                secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{unaCampaniaComercial.saldoExterno}</Typography>} />
                            {/* CLIENTE CROSS CRM */}
                            <ListItemIcon>
                                <AssignmentIndIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.campaniagestion.clienteCrossCrm" /></Typography>}
                                secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{unaCampaniaComercial.clienteCrossCrm}</Typography>} />
                        </ListItem>
                        <Divider style={{ backgroundColor: "#3C8DBC" }} />
                        <ListItem style={{ paddingTop: "0px", "paddingBottom": "0px" }} >
                            {/* TIPO CANCELACION */}
                            <ListItemIcon>
                                <CancelPresentationIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.campaniagestion.tipoCancelacion" /></Typography>}
                                secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{unaCampaniaComercial.tipoCancelacion}</Typography>} />
                            {/* MOTIVO CANCELACION */}
                            <ListItemIcon>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.campaniagestion.motivoCancelacion" /></Typography>}
                                secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{unaCampaniaComercial.motivoCancelacion}</Typography>} />

                        </ListItem>
                    </List>

                </TabPanelCampaniaComercial>

            </Paper>
        )

    }

    const arbolRespuesta = () => {
        return (

            <div className={`${classes.shadowBox}`}>
                {objetoArbol &&
                    <ArbolRespuesta
                        codigoArbol={objetoArbol.codigoArbolRespuesta}
                        setRespuestaInicial={setRespuestaInicial}
                        titulo={objetoArbol ? objetoArbol.telefonoGestionado : ''}
                        id={idCliente}
                        onFinish={(res) => {
                            if (res.valor == AGENDAMIENTO) {
                                setAbrirAgendamiento(true);
                                setVariableRes(res);
                            } else if (res.valor == PROSPECCION) {
                                GestionarCampania(res);
                            } else if (res.valor == NEGOCIACION) {
                                setHabilitarNegociacion(true);
                                setRespuesta(res)
                            } else {
                                GestionarCerrarCampania(res);
                            }
                        }} />
                }
                {abrirAgendamiento &&
                    <ComPAgendamiento
                        motivoAgendamiento={
                            (respuestaInicial == CONTACTO_DIRECTO ? catalogs["MOTIVOAGENDIREC"] :
                                (respuestaInicial == CONTACTO_INDIRECTO ? catalogs["MOTIVOAGENINDIREC"] :
                                    (respuestaInicial == NO_CONTACTO ? catalogs["MOTIVOAGENNOCONT"] : "")
                                ))}
                        GuardarAgendamiento={GuardarAgendamiento}
                        abrirAgendamiento={abrirAgendamiento}
                        setAbrirAgendamiento={setAbrirAgendamiento}
                    />
                }
            </div>

        )
    }

    const clienteNegociacion = () => {
        return (
            <Popup
                open={habilitarNegociacion} // popup
                title={"Cotizador"}
                size={"lg"}
                component={
                    <div>
                        <MasterNegociacion
                            operacionesInfo={camundaVariables.operacionesInfo}
                            setVariablesDemograficasCampania={setVariablesDemograficasCampania}
                            datosSeleccionados={datosSeleccionados}
                            productoFormaDesembolso={camundaVariables.productoFormaDesembolso}
                            plazoMontosSubproductoinfo={plazoMontosSubproductoinfo}
                            rowsSeguros={rowsRubros}
                            setRowsSeguros={setRowsSeguros}
                            esCampania={true}
                            setHabilitarNegociacion={setHabilitarNegociacion}
                            setPasoSeleccionado={setPasoSeleccionado}
                            setAcordion2Expandido={setAcordion2Expandido}
                            setAcordion2Desactivado={setAcordion2Desactivado}
                            setNegocioDetallePop={setNegocioDetallePop}
                            setDatosOfertaSolicitada={setDatosOfertaSolicitada}
                            openWindowOperaciones={openWindowOperaciones}
                        />
                    </div>
                }
            />
        )
    }

    const negociacionFinal = () => {
        return (
            <Popup
                open={abrirNegociacion} // popup
                title={"Negociación"}
                size={"lg"}
                component={
                    <div>
                        <MasterDocumentosHabilitantes
                            rowsBloqueos={[]}
                            rowsSeguros={rowsRubros}
                            respuestaCamunda={respuestaCamunda}
                            documentosHabilitantes={camundaVariables.documentosHabilitantes}
                            setRowsSeguros={setRowsRubros}
                            esCampania={true}
                            setLoadingBuroExitoso={setLoadingBuroFallido}
                            setLoadingBuroFallido={setLoadingBuroFallido}
                            setopenWindow={setLoadingBuroFallido}
                            setopenWindow2={setLoadingBuroFallido}
                            setDesabilitarCampos={setLoadingBuroFallido}
                            setDesabilitarCampos1={setLoadingBuroFallido}
                            datosOfertaSolicitada={datosOfertaSolici}
                            datosSeleccionados={datosSeleccionados}
                            clienteOfertaConsumo={clienteOfertaConsumo}

                            setLimpiarCampos={setLoadingBuroFallido}
                            setvalidacion={setLoadingBuroFallido}
                            setPasoSeleccionado={setLoadingBuroFallido}
                            setAcordion1Desactivado={setLoadingBuroFallido}
                            setAcordion2Desactivado={setLoadingBuroFallido}
                            setAcordion1Expandido={setLoadingBuroFallido}
                            setAcordion2Expandido={setLoadingBuroFallido}
                            setDatosSeleccionados={setLoadingBuroFallido}
                            setDatosOfertaSolicitada={setLoadingBuroFallido}
                            setBanderaDDatosClienteAsesor={setLoadingBuroFallido}
                            setIdAsesor={setLoadingBuroFallido}
                            setAbrirNegociacion={setAbrirNegociacion}
                            variablesDemograficasCampania={objetoVariableDemograficas}

                        />
                    </div>
                }
            />
        )
    }

    return (

        <Form
            subscription={{}}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            {operacionesVigentes()}
                            <br />
                            {detalleCondiciones()}
                        </div>
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6" >
                            {datosCliente()}
                            <br />
                            {detalleCampaniaComercial()}
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-xs-6 col-sm-6 col-md-8 col-lg-6 col-xl-6">
                            {arbolRespuesta()}
                        </div>
                    </div>
                    <div className="row">
                        {clienteNegociacion()}
                        {negociacionFinal()}
                    </div>

                    <br />

                </form>

            )}
        />

    );

}


export default MasterGestionAsesor;