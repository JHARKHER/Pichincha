import React, { useState } from "react";
import InfoDatosArchivo from "../../componentes/ComPInfoDatosArchivo";
import InfoDatosCampania from "../../componentes/ComPInfoDatosCampania";
import ComPFechas from "../../componentes/ComPFechas";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";//contenedor de la forma
import { SaveButton, CancelButton, IntlMessages, Popup, PopUpAlert, Tooltip } from "odc-common";
import { FormSpy } from 'react-final-form';
import { useProcesarCampania, useActivarDesactivarCampaña, useObtenerCampoProcesadoCabecera, useConsultarErrores, useEliminarCampania } from "../../hooks/AdminCampania";
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import BlockIcon from '@material-ui/icons/Block';
import EventIcon from '@material-ui/icons/Event';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/Error';
import DeleteIcon from '@material-ui/icons/Delete';
import { VENTASESPECIAL, ENCUESTA, OTROS } from '../../Constantes'

const MasterInfoCampania = (props) => {

    const dispatch = useDispatch();
    const [mostrarFechas, setmostrarFechas] = useState(false);
    const [campaniaGuardada, setcampaniaGuardada] = useState(false);
    const [esAgregarArchivo, setesAgregarArchivo] = useState(false);
    const [dialogoConfirmacion, setDialogoConfirmacion] = useState(false);
    const [rows, setrows] = useState([]);
    const [nombreArchivo, setnombreArchivo] = useState(null);
    const [cargandoGrid, setCargandoGrid] = useState(false);

    let variableProcesar = true;
    const {
        //Variables SET
        setopenWindow, setsubCampaniaVisible, setObjetoCampania, setIdCabeceraArchivo, setshowProgressBarArchivo, setshowProgressBarArchivoExitoso,
        setshowProgressBarArchivoEliminado, setshowProgressBarArchivoEliminadoExitoso, setestadoCampania, setIdCampania, setdespliegueOperacion, setfieldcodigoCampania,
        setcedente, setnombre, setfechahorainicio, setfechahorafin, setarbol, setsubCampania, settipoCierreCampania, settipoCampania,
        setnombreArchivoinfo, setfechaCargainfo, setnumeroRegistro, setregistroError, setregistroClienteDuplicado, setreparteclientesotrascampañas, setclienteotracampania,
        setmailing, setsms, setwhatsapp, setcarta, setestado, setcampaniaComboMostrar, setEsNuevo, setestadoDeCampania, setDuplicadoError, setGuardando, dotJson,

        //Variables initialValues
        subCampaniaVisible, handleSubmit, estadoCampania, IdCampania, form, fechahorainicio, fechahorafin, esNuevo, estadoDeCampania, IdCabeceraArchivo, noRender, setDotJson
        ,bloqueoCampos
    } = props

    const cancelarOperacion = (values) => {

        // const CancelarOperacionFormulario = {
        //     GrdCampania: values.GrdCampania,

        // };
        setGuardando(false);
        setDuplicadoError(false);
        setDialogoConfirmacion(false);
        setsubCampaniaVisible(false);
        setcampaniaComboMostrar(false);
        setestadoCampania("");

        setdespliegueOperacion({
            despliegue: false,
            mensaje: "",
            tipo: "info"
        });
        setesAgregarArchivo(false);
        setIdCampania(null);
        setIdCabeceraArchivo(null);
        setopenWindow(false);
        setcedente("");
        setnombre("");
        setfechahorainicio("");
        setfechahorafin("");
        setarbol("");
        setsubCampania("");
        settipoCierreCampania("");
        settipoCampania("");
        setfieldcodigoCampania("");
        setestadoDeCampania("");
        setnombreArchivoinfo("");
        setfechaCargainfo("");
        setnumeroRegistro("");
        setregistroError("");
        setregistroClienteDuplicado("");
        setreparteclientesotrascampañas("");
        setclienteotracampania("");
        setestado("");
        setObjetoCampania({});

        setnombreArchivo("");

        setmailing(false);
        setsms(false);
        setwhatsapp(false);
        setcarta(false);

        setshowProgressBarArchivo(false);
        setshowProgressBarArchivoExitoso(false);
        setshowProgressBarArchivoEliminado(false);
        setshowProgressBarArchivoEliminadoExitoso(false);
        setEsNuevo(false);
        setDotJson([]);
        // form.initialize(CancelarOperacionFormulario);

    }

    const procesarCampania = (values) => {
        if (values.tipoCampania == ENCUESTA || values.tipoCampania == OTROS || values.tipoCampania == VENTASESPECIAL) {
            if (values.IdCabeceraArchivo == null) {
                setdespliegueOperacion({
                    despliegue: true,
                    mensaje: "Para este tipo de campaña se requiere subir un archivo",
                    tipo: "warning"
                });
            } else {
                useProcesarCampania(values, IdCampania, setestadoCampania, dispatch, setdespliegueOperacion, setGuardando, IdCabeceraArchivo);
                setDialogoConfirmacion(false);
            }
        } else {
            useProcesarCampania(values, IdCampania, setestadoCampania, dispatch, setdespliegueOperacion, setGuardando, IdCabeceraArchivo);
            setDialogoConfirmacion(false);
        }


    }

    const inactivarActivarCampaña = () => {

        useActivarDesactivarCampaña(IdCampania, setestadoDeCampania, true, setdespliegueOperacion, dispatch);
    }

    const cambiarFechas = () => {
        setmostrarFechas(true);

    }

    const AgregarRegistros = (values) => {

        setcampaniaGuardada(true);
        setesAgregarArchivo(true);

        const propiedades = {
            IdCabeceraArchivo,
            setrows,
            dispatch,
            setCargandoGrid
        };

        useObtenerCampoProcesadoCabecera(propiedades);

    }

    const ConsultarErrores = () => {
        const propiedades = {
            ...props,
            IdCabeceraArchivo,
            dispatch,
            setCargandoGrid
        };

        useConsultarErrores(propiedades);
    }

    const EliminarCampania = async (values) => {

        useEliminarCampania(IdCampania, setdespliegueOperacion, setGuardando, dispatch);


        return new Promise(() => {
            setTimeout(() => { cancelarOperacion(values); }, 1500)
        });


    }

    if (estadoCampania == true && IdCampania != null)
        variableProcesar = false;

    let variableNombreCambiar;

    if (estadoDeCampania == "INACTIVO") {
        variableNombreCambiar = "Activar";
    } else if (estadoDeCampania != "INACTIVO") {
        variableNombreCambiar = "Inactivar";
    }

    return (
        <Paper>
            <div>
                <div className="cap_principal">
                    <AppBar position="static">
                        <Toolbar variant="dense">
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <LibraryBooksIcon />
                            </IconButton>
                            <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
                                {<IntlMessages id="campania.datoscampania.continfocampania" />}
                            </Typography>
                        </Toolbar>
                    </AppBar>                   
                </div>
                <div>
                    {!variableProcesar || esNuevo ||
                        <Tooltip title={"Prepara información de la campaña para gestión"}>
                            <Button style={{ "margin": '8px', "backgroundColor": "#4caf50", "fontSize": "0.875rem" }} startIcon={<AssignmentTurnedInIcon />} variant="contained" size="large" color="primary" onClick={() => setDialogoConfirmacion(true)}>
                                {"Procesar"}
                            </Button>
                        </Tooltip>
                    }
                    {!variableProcesar && variableNombreCambiar == "Activar" &&
                        <Tooltip title={"Activa la campaña"}>
                            <Button style={{ "margin": '8px', "backgroundColor": "#4caf50", "fontSize": "0.875rem" }} startIcon={<CheckIcon />} variant="contained" size="large" color="primary" onClick={() => inactivarActivarCampaña()}>
                                {variableNombreCambiar}
                            </Button>
                        </Tooltip>
                    }
                    {!variableProcesar && variableNombreCambiar == "Inactivar" &&
                        <Tooltip title={"Inactiva la campaña"}>
                            <Button style={{ "margin": '8px', "backgroundColor": "#FEAD00", "fontSize": "0.875rem" }} startIcon={<BlockIcon />} variant="contained" size="large" color="primary" onClick={() => inactivarActivarCampaña()}>
                                {variableNombreCambiar}
                            </Button>
                        </Tooltip>
                    }
                    {!variableProcesar &&
                        <Tooltip title={"Permite cambiar las fechas de la campaña"}>
                            <Button style={{ "margin": '8px', "backgroundColor": "#1D98F8", "fontSize": "0.875rem" }} startIcon={<EventIcon />} variant="contained" size="large" color="primary" onClick={() => cambiarFechas()}>
                                {"Cambiar Fechas"}
                            </Button>
                        </Tooltip>
                    }
                    {!variableProcesar && IdCabeceraArchivo != null && IdCabeceraArchivo != "" &&
                        <FormSpy subscription={{ values: true }}>
                            {({ values }) => (
                                <Tooltip title={"Agregar un nuevo archivo a la campaña"}>
                                    <Button style={{ "margin": '8px', "backgroundColor": "#008080", "fontSize": "0.875rem" }} startIcon={<NoteAddIcon />} variant="contained" size="large" color="primary" onClick={() => AgregarRegistros(values)} >
                                        {"Agregar Registros"}
                                    </Button>
                                </Tooltip>
                            )}
                        </FormSpy>
                    }
                    {IdCabeceraArchivo != null && IdCabeceraArchivo != "" &&
                        <Tooltip title={"Errores de los archivos de la campaña"}>
                            <Button style={{ "margin": '8px', "backgroundColor": "red", "fontSize": "0.875rem" }} startIcon={<ErrorIcon />} variant="contained" size="large" color="primary" onClick={() => ConsultarErrores()} >
                                {"Errores Archivo"}
                            </Button>
                        </Tooltip>

                    }
                    {!variableProcesar || esNuevo ||
                        <FormSpy subscription={{ values: true }}>
                            {({ values }) => (
                                <Tooltip title={"Eliminar la campaña"}>
                                    <Button style={{ "margin": '8px', "backgroundColor": "#1d98f8", "fontSize": "0.875rem" }} startIcon={<DeleteIcon />}
                                        variant="contained" size="large" color="primary" onClick={() => EliminarCampania(values)}>
                                        {"Eliminar"}
                                    </Button>
                                </Tooltip>
                            )}
                        </FormSpy>


                    }
                </div>
                {/* <div className="cap_form_control">
                    <h2 >
                        <b>{<IntlMessages id="campania.datoscampania.contdatoscampania" />}</b>
                    </h2 >
                </div> */}
                <div>
                    < InfoDatosCampania
                        {...props}
                        variableProcesar={variableProcesar}
                        setfechahorainicio={setfechahorainicio}
                        setfechahorafin={setfechahorafin}
                    />
                </div>


                {subCampaniaVisible &&
                    <div>
                        <InfoDatosArchivo
                            {...props}
                            setcampaniaGuardada={setcampaniaGuardada}
                            campaniaGuardada={campaniaGuardada}
                            esAgregarArchivo={esAgregarArchivo}
                            setesAgregarArchivo={setesAgregarArchivo}
                            setCargandoGrid={setCargandoGrid}
                            cargandoGrid={cargandoGrid}
                            variableProcesar={variableProcesar}
                            rows={rows}
                            setrows={setrows}
                            nombreArchivo={nombreArchivo}
                            setnombreArchivo={setnombreArchivo}
                        />
                    </div>
                }

                <Popup
                    open={mostrarFechas} // popup
                    title={"CAMBIAR FECHAS"}
                    size={"md"}
                    component={
                        <ComPFechas
                            initialValuesInfoDatos={{
                                fechahorainicio, fechahorafin, IdCampania
                            }}
                            setmostrarFechas={setmostrarFechas}
                            setdespliegueOperacion={setdespliegueOperacion}
                            setfechahorainicio={setfechahorainicio}
                            setfechahorafin={setfechahorafin}
                        />
                    }
                />
                <FormSpy subscription={{ values: true }}>
                    {({ values }) => (
                        <div>
                            <PopUpAlert
                                type="info"
                                show={dialogoConfirmacion}
                                title={"¿Desea Procesar la Campaña?."}
                                message={"Esta acción no podrá revertirse"}
                                onConfirm={() => procesarCampania(values)}
                                onCancel={() => setDialogoConfirmacion(false)}
                            />

                        </div>
                    )}
                </FormSpy>


            </div>
            <div style={{ "textAlign": "right" }}>
                <SaveButton disabled={!variableProcesar || !bloqueoCampos} onClick={handleSubmit} type="submit"
                />
                <FormSpy subscription={{ values: true }}>
                    {({ values }) => (
                        <CancelButton onClick={() => cancelarOperacion(values)
                        } />
                    )}
                </FormSpy>
            </div>
        </Paper>
    );

}

export default MasterInfoCampania;