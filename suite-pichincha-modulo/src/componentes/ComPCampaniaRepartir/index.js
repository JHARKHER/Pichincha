import React, { useState, useContext } from "react";
import { useSelector } from 'react-redux';
import Button from "@material-ui/core/Button";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { withStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import { commonStyles } from "odc-common";
const PopupWrapped = withStyles(commonStyles)(Popup);
import { IntlMessages, ProgressBar } from "odc-common";
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import WorkIcon from '@material-ui/icons/Work';
import { Field } from 'react-final-form'
import { OnChange } from "react-final-form-listeners";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
    required,
    emptyItem,
    renderTextField,
    renderSelectField,
    composeValidators,
    renderRadioButton,
    Popup
} from "odc-common";


import { useobtenerAgencias } from "../../hooks/ReasignacionCampania";
import { useDispatch } from 'react-redux';
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import MasterAsignacionAsesor from "../../containers/ConTAsignacionAsesor";
import { Context } from "../../context/ContextReasignacionCampania";
import { useObtenerAsesores, useObtenerPerfilCRM } from "../../hooks/FiltroCampania";

const useStyles = makeStyles(theme => ({
    shadowBox: {
        "box-shadow": "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
    }
}));

const ComPCampaniaRepartir = () => {

    const dispatch = useDispatch();

    const { reparticion, asesores, numeroRegistros, nombreCampania, accionFormulario, clientesGestionados,
        authUser, catalogs, codigoProducto, asesor, setColor, color, tipoReparticion, setTipoReparticion,
        esPerfilCRM, oficinasCRM, oficinaTexto, setOficinaTexto, rowsRecursos, setRowsRecursos, setCodigoRecurso,
        setreparticion, setClientesGestionados, setNumeroRegistros, setAccionFormulario,
        checkTipoDA, setCheckTipoDA } = useContext(Context);

    const [popUpRecursos, setPopUpRecursos] = useState(false);



    const { agencias, isLoadingInstitucion } = useobtenerAgencias(authUser.idInstitution, dispatch);

    const classes = useStyles();

    let oficinas = [];
    if (agencias != null) {
        oficinas = agencias.office.map(item => {
            return {
                code: item.idOffice,
                description: item.name
            }
        });
    }

    const CambiarValor = (valor) => {
        if (valor == "archivo") {
            setreparticion(false);
            setCheckTipoDA(valor);
        } else if (valor == "distribucion") {
            setreparticion(true);
            setCheckTipoDA(valor);
        }
    }

    const CambiarRegistros = (value) => {
        let validacion = false;
        let objetoSeleccionado;
        asesores.forEach(element => {
            if (element.idAsesor == value) {
                validacion = true;
                objetoSeleccionado = element;
            }
        });
        if (validacion) {
            setClientesGestionados(objetoSeleccionado.clientesGestionado);
            setNumeroRegistros(objetoSeleccionado.numeroRegistros);
            setCodigoRecurso(objetoSeleccionado.code);
            if (objetoSeleccionado.color == 'R')
                setColor("#F59895");

            if (objetoSeleccionado.color == 'A')
                setColor("#F7F999");

            if (objetoSeleccionado.color == 'V')
                setColor("#96F595");
        } else {
            setClientesGestionados(0);
            setNumeroRegistros(0);
            setColor("#FFFF");
            setCodigoRecurso(null);
        }
    }

    const CambiarAsesoresAsignacion = (value) => {
        useObtenerAsesores(setRowsRecursos, codigoProducto, value, setAccionFormulario, dispatch);
    }


    const cabeceraReparticion = () => {
        return (
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <SupervisorAccountIcon />
                    </IconButton>
                    <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
                        {<IntlMessages id="campania.repartircampania.reasignar" />}  {nombreCampania ? " - " + nombreCampania : null}
                    </Typography>
                </Toolbar>
            </AppBar>
        )
    }

    const cuerpoReparticion = () => {
        return (
            <div>
                <div className="row">

                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <FormLabel component="legend">{"Distribución"}</FormLabel>
                        <Field
                            name="reasignacion"
                            type="radio"
                            validate={
                                required
                            }
                            value="distribucion"
                            defaultValue={checkTipoDA}
                            component={renderRadioButton}

                        />
                    </div>
                    <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                        <FormLabel component="legend">{"Archivo"}</FormLabel>
                        <Field
                            name="reasignacion"

                            validate={
                                required
                            }
                            type="radio"
                            defaultValue={checkTipoDA}
                            value="archivo"
                            component={renderRadioButton}


                        />
                        <OnChange name={"reasignacion"}>
                            {(value, previous) => {
                                CambiarValor(value);
                            }}
                        </OnChange>
                    </div>
                </div>
                <div className="row ">

                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <Field
                            name="agencia"
                            label={<IntlMessages id="campania.campaniarepartirdatos.agencia" />}
                            disabled={true}
                            validate={
                                required
                            }
                            defaultValue={authUser.idOffice}
                            component={renderSelectField}
                            subscription={{ value: true, error: true, touched: true }}
                        >
                            {emptyItem
                                .concat(oficinas)
                                .map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.code} primarytext={item.description}>
                                            {" "}
                                            {item.description}{" "}
                                        </MenuItem>
                                    );
                                })}
                        </Field>

                    </div>
                    <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                        <Field
                            defaultValue={asesor}
                            name="asesor"
                            label={<IntlMessages id="campania.campaniarepartirdatos.asesor" />}
                            validate={
                                required
                            }
                            component={renderSelectField}
                            subscription={{ value: true, error: true, touched: true }}
                        >
                            {emptyItem
                                .concat(asesores)
                                .map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.idAsesor} primarytext={item.description}>
                                            {" "}
                                            {item.description}{" "}
                                        </MenuItem>

                                    );
                                })}
                        </Field>
                        <OnChange name={"asesor"}>
                            {(value, previous) => { CambiarRegistros(value) }}
                        </OnChange>
                    </div>
                </div>

                <div>
                    <List component="nav" dense={true} style={{ padding: "0px" }} aria-label="main mailbox folders">
                        <ListItem style={{ paddingTop: "0px", "paddingBottom": "0px" }} >
                            {/* NUMERO REGISTROS */}
                            <ListItemIcon>
                                <AssignmentIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.repartircampania.numeroRegistros" /></Typography>}
                                secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{numeroRegistros}</Typography>} />

                            {/* CLIENTES GESTIONADOS */}
                            <ListItemIcon>
                                <AssignmentTurnedInIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.repartircampania.clientesGestionados" /></Typography>}
                                secondary={<Typography type="body2" style={{ fontSize: "18px", fontWeight: 'bold' }}>{clientesGestionados}</Typography>} />

                            {/* PRODUCTIVIDAD */}
                            <ListItemIcon>
                                <WorkIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={<Typography type="body2" style={{ fontSize: "15px" }}><IntlMessages id="campania.repartircampania.productividad" /></Typography>}
                                secondary={<svg width="15" height="15"><rect width="15" height="15" style={{ "fill": color, "strokeWidth": 1, "stroke": "rgb(0,0,0)" }} /></svg>} />

                        </ListItem>
                    </List>
                </div >
                <div className="row">
                    {reparticion &&
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">

                            <Field
                                defaultValue={tipoReparticion}
                                name="tipoReparticion"
                                label={<IntlMessages id="campania.campaniarepartirdatos.tipoReparticion" />}
                                validate={
                                    required
                                }
                                component={renderSelectField}
                                subscription={{ value: true, error: true, touched: true }}
                            >
                                {emptyItem
                                    .concat(catalogs["TipoReparticion"])
                                    .map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.code} primarytext={item.description}>
                                                {" "}
                                                {item.description}{" "}
                                            </MenuItem>

                                        );
                                    })}
                            </Field>
                            <OnChange name={"tipoReparticion"}>
                                {(value, previous) => {
                                    setTipoReparticion(value);
                                }}
                            </OnChange>

                        </div>
                    }
                    {reparticion &&
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                            <br />
                            <Button variant="contained" size="large" color="primary" onClick={() => setPopUpRecursos(true)} >
                                <AddCircleIcon />
                            </Button>
                            <PopupWrapped
                                open={popUpRecursos} // popup
                                title={"RECURSOS - CLIENTES POR ASIGNAR: "}
                                size={"sm"}
                                component={
                                    <MasterAsignacionAsesor
                                        setPopUpRecursos={setPopUpRecursos}
                                        rowsRecursos={rowsRecursos}
                                        reasignacion={true}
                                        esPerfilCRM={esPerfilCRM}
                                        oficinasCRM={oficinasCRM}
                                        CambiarAsesoresAsignacion={CambiarAsesoresAsignacion}
                                        oficinaTexto={oficinaTexto}
                                        accionFormulario={accionFormulario}
                                        setRowsRecursos={setRowsRecursos}
                                        setOficinaTexto={setOficinaTexto}
                                    />
                                }
                            />
                        </div>
                    }


                </div>
            </div>
        )
    }

    if (isLoadingInstitucion) return (<ProgressBar />);

    return (
        <Paper className={classes.shadowBox} style={{ "minHeight": "450px", "maxHeight": "450px" }} >

            {cabeceraReparticion()}
            <div style={{ padding: "15px" }}>
                {cuerpoReparticion()}
            </div>
        </Paper>
    )

}

export default ComPCampaniaRepartir;
