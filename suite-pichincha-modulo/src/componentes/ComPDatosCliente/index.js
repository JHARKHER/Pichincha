import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import PhoneInTalkIcon from '@material-ui/icons/PhoneInTalk';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from "../../context/ContextGestionCampania";
import { Form, Field } from 'react-final-form'
import MenuItem from "@material-ui/core/MenuItem";
import { FormSpy } from 'react-final-form';
import Fab from '@material-ui/core/Fab';
import { useDispatch } from 'react-redux';
import { commonStyles } from "odc-common";
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from "@material-ui/core/styles";
import { ValidaLongitudCaracteresNumeros } from "suite-otorgamiento-comun";
import {
    required,
    emptyItem,
    renderTextField,
    IntlMessages,
    renderSelectField,
    minLength,
    maxLength,
    phoneNumberCell,
    composeValidators,
    Popup,
    SaveButton,
    CancelButton,
    renderSwitch
} from "odc-common";
import { useGuardarTelefono } from "../../hooks/GestionCampania";

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


const ComPDatosCliente = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const { dispositivos, catalogs, idCliente, setAccionFormulario, setDispositivos, setObjetoArbol, setdespliegueOperacion
    ,setHabilitarTab,setHabilitarTabGestion,setHabilitarTabLlamada , start} = props;
    
    const [openDispositivos, setOpenDispositivos] = useState(false);
    const [deshabilitarGuardar, setDeshabilitarGuardar] = useState(true);

    const ContactarCliente = (value, index) => {
        sessionStorage.setItem('valorRenderTiempo', true);

        var respuesta = JSON.parse(sessionStorage.getItem('ultimoObjetoGestion'));
        respuesta.id = index;
        respuesta.telefonoGestionado = value.valor;
        respuesta.idDispositivoUbicacion = value.idDispositivoUbicacion;
        setObjetoArbol(respuesta);
        setHabilitarTab(true);
        setHabilitarTabGestion(true);
        setHabilitarTabLlamada(true);

    }


    React.useEffect(() => {
        const verificacion=sessionStorage.getItem('valorRenderTiempo');
        sessionStorage.removeItem("valorRenderTiempo");
        if(verificacion=="true"){
            start();
        }
    },[])



    const CancelarOperacion = (values) => {

        values.tipoDispositivo = null;
        values.esWhatsapp = false;
        values.tipoTelefono = null;
        values.valor = null;
        values.operadora = null
        setOpenDispositivos(false)
    }
    const GuardarTelefono = (values, form) => {

        useGuardarTelefono(values, setDispositivos, setAccionFormulario, idCliente, setdespliegueOperacion, dispatch);

    }

    const onSubmit = () => {

    }

    const agregarDispositivo = () => {


        return (
            <Form
                subscription={{ valid: true, submitting: true }}
                onSubmit={onSubmit}
                validate={values => {
                    let validacionRepetido = false;
                    dispositivos.some(
                        item => {

                            if (item.valor == values.valor) {
                                validacionRepetido = true;
                            }
                        }
                    );


                    if (values.tipoTelefono && values.tipoDispositivo && values.valor && values.operadora && !validacionRepetido) {

                        let variable = phoneNumberCell(values.valor);
                        if (variable == undefined) {
                            setDeshabilitarGuardar(false)
                        } else {
                            setDeshabilitarGuardar(true)
                        }
                    } else {
                        setDeshabilitarGuardar(true)
                    }
                    const errors = {};

                    if (validacionRepetido)
                        errors["valor"] =
                            "El número esta repetido";

                    return errors;

                }}
                render={({ handleSubmit, form }) => (
                    <form>
                        <div className="row">
                            <div style={{ width: "180px" }} className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <Field

                                    name={"tipoTelefono"}
                                    label={<IntlMessages id="campania.campaniagestion.tipoTelefono" />}
                                    validate={
                                        required
                                    }
                                    isClearable
                                    component={renderSelectField}
                                    subscription={{ value: true, error: true, touched: true }}
                                >
                                    {emptyItem
                                        .concat(catalogs["TipoTelefono"])
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
                            <div style={{ width: "180px" }} className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <Field

                                    name={"tipoDispositivo"}
                                    label={<IntlMessages id="campania.campaniagestion.tipoDispositivo" />}
                                    validate={
                                        required
                                    }
                                    isClearable
                                    component={renderSelectField}
                                    subscription={{ value: true, error: true, touched: true }}
                                >
                                    {emptyItem
                                        .concat(catalogs["TipoDispositivoUbi"])
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
                            <div style={{ width: "180px" }} className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <Field
                                    name="valor"
                                    label={<IntlMessages id="campania.campaniagestion.valor" />}
                                    validate={composeValidators(
                                        required,
                                        minLength(5),
                                        maxLength(8),
                                        phoneNumberCell
                                    )}
                                    parse={e => ValidaLongitudCaracteresNumeros(e, 8)}
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                            </div>
                            <div style={{ width: "180px" }} className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <Field

                                    name={"operadora"}
                                    label={<IntlMessages id="campania.campaniagestion.operadora" />}
                                    validate={
                                        required
                                    }
                                    isClearable
                                    component={renderSelectField}
                                    subscription={{ value: true, error: true, touched: true }}
                                >
                                    {emptyItem
                                        .concat(catalogs["Operadoras"])
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
                                    type="checkbox"
                                    defaultValue={0}
                                    name={'esWhatsapp'}
                                    label={<IntlMessages id="campania.campaniagestion.esWhatsapp" />}
                                    component={renderSwitch}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                            </div>

                            <div style={{ "textAlign": "right" }} className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                <FormSpy subscription={{ values: true }}>
                                    {({ values }) => (

                                        <SaveButton disabled={deshabilitarGuardar}
                                            size="large" style={{ "margin": "8px" }} variant="contained" color="primary" onClick={() => GuardarTelefono(values, form)}
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

                        </div>

                    </form>

                )}
            />
        );
    }

    return (
        <div style={{ "minHeight": "270px", "width": "440px" }}>

            <div className={`${classes.flujo} ` + "row"}>
                {dispositivos != null &&

                    dispositivos.map((item, index) => {
                        return (

                            <List dense={true} style={{ "padding": "inherit" }} className={classes.root} key={JSON.stringify(item)} >
                                <ListItem >
                                    <ListItemText
                                        secondary={(item.descripcionDispositivo == null ? 'TELEFONO CONVENCIONAL' : item.descripcionDispositivo)}
                                        primary={item.valor}

                                    />
                                    <ListItemSecondaryAction>
                                        <React.Fragment>
                                            <Button startIcon={<PhoneInTalkIcon />} style={{ "margin": "8px" }} size="small"
                                                variant="contained" color="primary" onClick={() => ContactarCliente(item, index)}>

                                            </Button>

                                        </React.Fragment>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider style={{ backgroundColor: "#3C8DBC" }} />

                            </List>

                        );
                    })}
            </div>
            <div className="row">
                <Fab size="medium" color="primary" aria-label="add" className={classes.margin} onClick={() => setOpenDispositivos(true)}>
                    <AddIcon />
                </Fab>
            </div>
            <PopupWrapped
                open={openDispositivos} // popup
                title={"Agregar Dispositivo"}
                size={"sm"}
                component={
                    agregarDispositivo()
                }
            />

        </div>
    );

}


export default ComPDatosCliente;