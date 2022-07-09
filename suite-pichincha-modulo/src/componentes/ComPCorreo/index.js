import React, { useContext, useState } from "react";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { makeStyles } from '@material-ui/core/styles';
import { Context } from "../../context/ContextGestionCampania";
import { Field, FormSpy, Form } from "react-final-form";
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
    email,
    minLength,
    maxLength,
    SaveButton,
    CancelButton,
} from "odc-common";
import { useGuardarCorreo } from "../../hooks/GestionCampania";

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


const ComPCorreo = (props) => {

    const dispatch = useDispatch();
    const classes = useStyles();
    const { correos, idCliente, setAccionFormulario, setCorreos,setdespliegueOperacion } = props;
    const [openCorreo, setOpenCorreo] = useState(false);
    const [deshabilitarGuardar, setDeshabilitarGuardar] = useState(true);

    const CancelarOperacion = (values) => {
        setOpenCorreo(false)
    }
    const GuardarCorreo = (values) => {

        useGuardarCorreo(values, setCorreos, setAccionFormulario, idCliente, setdespliegueOperacion, dispatch);

    }
    const onSubmit = () => {

    }
    
    const agregarCorreo = () => {
        return (
            <Form
                subscription={{ valid: true, submitting: true }}
                onSubmit={onSubmit}
                validate={values => {

                    if (values.correoCliente) {
                        let variable = email(values.correoCliente);
                        if (variable == undefined) {
                            setDeshabilitarGuardar(false)
                        } else {
                            setDeshabilitarGuardar(true)
                        }

                    } else {
                        setDeshabilitarGuardar(true)
                    }


                }}
                render={({ handleSubmit, form }) => (
                    <form>
                        <div style={{ "width": "440px" }} className="row">

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Field
                                    name="correoCliente"
                                    label={<IntlMessages id="campania.campaniagestion.correoCliente" />}
                                    validate={composeValidators(
                                        required,
                                        email,
                                        minLength(1),
                                        maxLength(128)
                                    )}
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                            </div>
                            <div style={{ "textAlign": "right" }} className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                                <FormSpy subscription={{ values: true }}>
                                    {({ values }) => (

                                        <SaveButton size="large" disabled={deshabilitarGuardar} style={{ "margin": "8px" }}
                                            variant="contained" color="primary" onClick={() => GuardarCorreo(values)}
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
                {correos != null &&

                    correos.map((item, index) => {
                        return (

                            <List dense={true} style={{ "padding": "inherit" }} className={classes.root} key={JSON.stringify(item)} >
                                <ListItem >
                                    <ListItemIcon>
                                        <MailOutlineIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.valor}
                                    />

                                </ListItem>
                                <Divider style={{ backgroundColor: "#3C8DBC" }} />

                            </List>

                        );
                    })}
            </div>
            <div className="row">
                <Fab size="medium" color="primary" aria-label="add" className={classes.margin} onClick={() => setOpenCorreo(true)}>
                    <AddIcon />
                </Fab>
            </div>
            <PopupWrapped
                open={openCorreo} // popup
                title={"Agregar E-Mail"}
                size={"sm"}
                component={
                    agregarCorreo()
                }
            />

        </div>
    );

}


export default ComPCorreo;