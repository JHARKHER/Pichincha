import React, { useContext, useState } from "react";
import { WFGeoLocation } from "odc-configuration";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from "../../context/ContextGestionCampania";
import { Field,Form,FormSpy } from "react-final-form";
import Fab from '@material-ui/core/Fab';
import { useDispatch } from 'react-redux';
import { commonStyles } from "odc-common";
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from "@material-ui/core/styles";
import {
    required,
    renderTextField,
    IntlMessages,
    composeValidators,
    Popup,
    SaveButton,
    CancelButton,
} from "odc-common";
import { useGuardarDireccion } from "../../hooks/GestionCampania";

const PopupWrapped = withStyles(commonStyles)(Popup);
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,

    },
    margin: {
        margin: theme.spacing(1),
    },
    flujo: {
        overflow: 'auto',
        maxHeight: 170,
    }

}));


const ComPDatosUbicacion = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const { direcciones, idCliente, setAccionFormulario, setDirecciones,setdespliegueOperacion } = props;

    const [openDirecciones, setOpenDirecciones] = useState(false);
    const [deshabilitarGuardar, setDeshabilitarGuardar] = useState(true);
 

    const CancelarOperacion = (values) => {
        values.geographicLocation1Code = null;
        values.geographicLocation2Code = null;
        values.geographicLocation3Code = null;
        values.callePrincipal = null;
        values.numero = null;
        values.calleSecundaria = null;
        values.ubicacionReferencia = null

        setOpenDirecciones(false)
    }
    const GuardarDireccion = (values) => {

        if (values.callePrincipal && values.calleSecundaria && values.numero && values.ubicacionReferencia
            && values.geographicLocation1Code && values.geographicLocation2Code && values.geographicLocation3Code) {

            useGuardarDireccion(values, setDirecciones, setAccionFormulario, idCliente, setdespliegueOperacion, dispatch);

        } else {
            setdespliegueOperacion({
                despliegue: true,
                mensaje: "Verifique que los datos se encuentren llenos",
                tipo: "warning"
            });
        }
    }
    const onSubmit=()=>{
        
    }

    const agregarDirecciones = () => {
        return (
            <Form
                subscription={{ valid: true, submitting: true }}
                onSubmit={onSubmit}
                validate={values => {
                    
                    if (values.callePrincipal && values.calleSecundaria && values.numero && values.ubicacionReferencia
                        && values.geographicLocation1Code && values.geographicLocation2Code && values.geographicLocation3Code) {

                            setDeshabilitarGuardar(false)
                       
                    } else {
                        setDeshabilitarGuardar(true)
                    }
                    

                }}
                render={({ handleSubmit, form }) => (
                    <form>
                        <div style={{ width: "700px" }} className="row">

                            <WFGeoLocation
                                maxGeographicLocation={3}
                                geographicLocation1ClassName={
                                    "col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                                }

                                geographicLocation2ClassName={
                                    "col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                                }

                                geographicLocation3ClassName={
                                    "col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                                }

                                geographicLocation4ClassName={
                                    "col-xs-4 col-sm-4 col-md-4 col-lg-4 col-xl-4"
                                }

                            />
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Field
                                    name="callePrincipal"
                                    label={<IntlMessages id="campania.campaniagestion.callePrincipal" />}
                                    validate={composeValidators(
                                        required
                                    )}
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Field
                                    name="numero"
                                    label={<IntlMessages id="campania.campaniagestion.numero" />}
                                    validate={composeValidators(
                                        required
                                    )}
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Field
                                    name="calleSecundaria"
                                    label={<IntlMessages id="campania.campaniagestion.calleSecundaria" />}
                                    validate={composeValidators(
                                        required
                                    )}
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Field
                                    name="ubicacionReferencia"
                                    label={<IntlMessages id="campania.campaniagestion.ubicacionReferencia" />}
                                    validate={composeValidators(
                                        required
                                    )}
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                            </div>
                            <div style={{ "textAlign": "right" }} className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                <FormSpy subscription={{ values: true }}>
                                    {({ values }) => (

                                        <SaveButton size="large" disabled={deshabilitarGuardar} style={{ "margin": "8px" }}
                                            variant="contained" color="primary" onClick={() => GuardarDireccion(values)}
                                        />

                                    )}
                                </FormSpy>
                                <FormSpy subscription={{ values: true }}>
                                    {({ values }) => (
                                        <CancelButton size="large" style={{ "margin": "8px" }}
                                            variant="contained"
                                            onClick={() => CancelarOperacion(values)}
                                        />
                                    )}
                                </FormSpy>
                            </div>

                        </div >
                    </form>

                )}
            />
        );
    }

    return (
        <div style={{ "minHeight": "270px", "width": "440px" }}>

            <div className={`${classes.flujo} ` + "row"}>
                {direcciones != null &&

                    direcciones.map((item, index) => {
                        return (

                            <List dense={true} style={{ "padding": "inherit" }} className={classes.root} key={JSON.stringify(item)} >
                                <ListItem >
                                    <ListItemIcon>
                                        <HomeWorkIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.direccionCompleta}
                                    />

                                </ListItem>
                                <Divider style={{ backgroundColor: "#3C8DBC" }} />

                            </List>

                        );
                    })}
            </div>
            <div className="row">
                <Fab size="medium" color="primary" aria-label="add" className={classes.margin} onClick={() => {
                    setOpenDirecciones(true)
                }}>
                    <AddIcon />
                </Fab>
            </div>
            <PopupWrapped
                open={openDirecciones} // popup
                title={"Agregar Dirección"}
                size={"xl"}
                component={
                    agregarDirecciones()
                }
            />

        </div>
    );

}


export default ComPDatosUbicacion;