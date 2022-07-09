import React, { useContext, useState } from "react";
import ComPCampania from "../../componentes/ComPCampania";
import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { makeStyles } from "@material-ui/core/styles";
import { Field, FormSpy } from 'react-final-form'
import XLSX from "xlsx";
import { useDispatch } from 'react-redux';
import { OnChange } from "react-final-form-listeners";

import {
    SaveButton,
    ProgressBar,
    IntlMessages,
    PopUpAlert,
    required,
    FileInput
} from "odc-common";

import { Form } from 'react-final-form'
import { Context } from "../../context/ContextReasignacionCampania";
import ComPAsesoresArchivo from "../../componentes/ComPAsesoresArchivo";
import { useGuardarReasignacion } from "../../hooks/ReasignacionCampania";
import ComPCampaniaRepartir from "../../componentes/ComPCampaniaRepartir";
import { useSelector } from "react-redux"

const onSubmit = async values => {

}

const useStyles = makeStyles(theme => ({
    shadowBox: {
        "box-shadow": "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
    }
}));
const MasterReasignacionCampania = (props) => {

    let { isConnected, hubConnection } = props;

    const { campanias, enableSelection, CambioValor, isLoadingCampanias, setdespliegueOperacion, despliegueOperacion, nombreCampania, idCampania, tipoReparticion,
        accionFormulario, setAccionFormulario, reparticion, setRows, rutaArchivo, setRutaArchivo, procesoReasignacion, inicializarVariables, codigoRecurso, rowsRecursos,
        checkTipoDA, banderaRefrescar, setbanderaRefrescar
    } = useContext(Context);

    const dispatch = useDispatch();
    const classes = useStyles();
    const { authUser } = useSelector(state => state.auth);
    const [deshabilitarGuardar, setDeshabilitarGuardar] = useState(true);

    /*************** FUNCIONES ***************/

    React.useEffect(() => {

        const subscribeEvents = async () => {
            hubConnection.on("CAMPAIGN_File_Loaded", () => {
                setbanderaRefrescar(!banderaRefrescar);
            });
        };

        if (isConnected) subscribeEvents();

        return () => {
            if (hubConnection) {
                hubConnection.off("CAMPAIGN_File_Loaded");

            }
        };
    }, [isConnected, hubConnection, banderaRefrescar, setbanderaRefrescar]);


    const handleFileChange = (file) => {
        const reader = new FileReader();

        reader.onload = () => {
            const binaryStr = reader.result;
            setRutaArchivo(file)
            excelCSVJSON(binaryStr, file.name);
        };
        try {
            reader.readAsBinaryString(file);
        } catch (e) {

        }
    };

    const excelCSVJSON = (csv, nombre) => {
        /* CONVERTIR EN EXCEL, csv, texto */
        var busqueda = nombre.search(/.text/i)
        var headersFinal;
        var data;
        if (busqueda > 0) {

            var nstr = csv.split(/\r\n/);
            headersFinal = nstr[0].split(/\|/);
        } else {
            var workbook = XLSX.read(csv, {
                type: 'binary'
            });
            var firstSheet = workbook.SheetNames[0];
            var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { header: 1, raw: true });

            headersFinal = excelRows[0];
            data = excelRows.slice(1);
        }
        var arreglo = new Array();
        let validacionArchivo = false;
        var cont = 1;
        if (headersFinal.length == 2) {
            if (headersFinal[0] == 'Identificacion' && headersFinal[1] == 'UsernameAsignar')
                validacionArchivo = true;
        }
        if (validacionArchivo) {
            data.forEach(element => {
                var componentesRows = new Object();
                componentesRows.id = cont;
                componentesRows.identificacion = element[0];
                componentesRows.usernameAsignar = element[1];

                arreglo.push(componentesRows);
                cont++;
            });
            setRows(arreglo);
        } else {
            setdespliegueOperacion({
                despliegue: true,
                mensaje: "El Archivo seleccionado no contiene la estructura deseada",
                tipo: "warning"
            });
        }
    }

    const GuardarReasignacion = (form) => {

        let idOffice = parseInt(authUser.idOffice);
        const inicializaValores = {
            reasignacion: "distribucion"
        };
        if (checkTipoDA == "archivo") {

            useGuardarReasignacion(
                {
                    rutaArchivo,
                    idCampania,
                    idOffice,
                    dispatch,
                    setdespliegueOperacion,
                    setAccionFormulario,
                    inicializarVariables,
                    checkTipoDA
                });
            form.initialize(inicializaValores)

        } else if (checkTipoDA == "distribucion") {
            useGuardarReasignacion(
                {
                    rutaArchivo,
                    idCampania,
                    codigoRecurso,
                    tipoReparticion,
                    rowsRecursos,
                    dispatch,
                    setdespliegueOperacion,
                    setAccionFormulario,
                    inicializarVariables,
                    checkTipoDA
                });
            form.initialize(inicializaValores)
        }
    }


    if (isLoadingCampanias) return (<ProgressBar />);


    /**************** COMPONENTES *******************/

    const listadoCampanias = (form) => {
        return (
            <Paper className={classes.shadowBox} >
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <ListAltIcon />
                        </IconButton>
                        <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
                            {<IntlMessages id="campania.repartircampania.contheadcampania" />}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{ padding: "15px" }}>
                    <ComPCampania
                        enableSelection={enableSelection}
                        CambioValor={CambioValor}
                        form={form}
                        campanias={campanias}
                    />
                </div>
            </Paper>
        )
    }

    const archivoReasignacion = () => {

        return (
            <Paper className={classes.shadowBox} style={{ "minHeight": "450px", "maxHeight": "450px" }}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <FileCopyIcon />
                        </IconButton>
                        <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
                            Archivo {nombreCampania ? " - " + nombreCampania : null}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div style={{ padding: "15px", paddingTop: "initial" }}>
                    <div className="row form-row">
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <Typography style={{ "padding": "30px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
                                Ruta Archivo
                            </Typography>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4" >
                            <Field
                                type="file"
                                initialValue={rutaArchivo}
                                component={FileInput}
                                name="rutaArchivo"
                                label="Abrir"
                                validate={required}
                                subscription={{ value: true, error: true, touched: true }}
                            />
                            <OnChange name={"rutaArchivo"}>
                                {(value, previous) => {
                                    handleFileChange(value);
                                }}
                            </OnChange>
                        </div>
                    </div>
                    <div style={{ padding: "15px", paddingTop: "20px" }}>
                        <ComPAsesoresArchivo />
                    </div>
                </div>
            </Paper>
        )
    }

    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            onSubmit={onSubmit}
            // initialValues={{ GrdCampania: campanias }}
            validate={values => {
                if (values.reasignacion == "archivo") {
                    if (rutaArchivo && idCampania) {
                        setDeshabilitarGuardar(false);
                    } else {
                        setDeshabilitarGuardar(true);
                    }
                } else if (values.reasignacion == "distribucion") {
                    if (codigoRecurso && tipoReparticion && rowsRecursos.length > 0) {
                        setDeshabilitarGuardar(false);
                    } else {
                        setDeshabilitarGuardar(true);
                    }
                }
                else {
                    setDeshabilitarGuardar(true);
                }
            }}
            render={({ handleSubmit, form }) => (

                <Paper>
                    <div>
                        <div>
                            {listadoCampanias(form)}
                            <br />
                            {procesoReasignacion &&
                                <div className="row">
                                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                        <ComPCampaniaRepartir />
                                    </div>
                                    {!reparticion &&
                                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                            {archivoReasignacion()}
                                        </div>
                                    }
                                    <div style={{ "textAlign": "right" }} className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                        <FormSpy subscription={{ values: true }}>
                                            {({ values }) => (
                                                <SaveButton size="large" disabled={deshabilitarGuardar} style={{ "margin": "8px" }}
                                                    variant="contained" color="primary" onClick={() => GuardarReasignacion(form)}
                                                />
                                            )}
                                        </FormSpy>

                                    </div>
                                </div>
                            }

                        </div>
                    </div>
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
                                mensaje: "",
                                tipo: "warning"
                            })}
                    />
                </Paper>

            )}
        />
    );

}


export default MasterReasignacionCampania;