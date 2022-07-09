import React, { useState } from "react";
import { Field, FormSpy, Form } from "react-final-form";
import MenuItem from "@material-ui/core/MenuItem";
import {
    required,
    renderTextField,
    renderDateField,
    renderSelectField,
    emptyItem,
    IntlMessages,
    composeValidators,
    Popup,
    minLength,
    maxLength,
    SaveButton,
    CancelButton,
} from "odc-common";


const ComPAgendamiento = (props) => {

    const { abrirAgendamiento, setAbrirAgendamiento, GuardarAgendamiento, esVenta, setEsAgendamiento,motivoAgendamiento } = props;

    const [deshabilitarGuardar, setDeshabilitarGuardar] = useState(true);

    const onSubmit = () => {

    }

    const agregarAgendamiento = () => {
        return (
            <Form
                subscription={{ valid: true, submitting: true }}
                onSubmit={onSubmit}
                validate={values => {
                    if (values.fechaAgendamiento && values.observacion) {
                        setDeshabilitarGuardar(false);
                    } else {
                        setDeshabilitarGuardar(true);
                    }
                }}
                render={({ handleSubmit, form }) => (
                    <form>
                        <div className="row" style={{ "minHeight": "330px" }}>

                        <div className="col-xs-4 col-sm-4 col-md-6 col-lg-4 col-xl-4">
                                <Field
                                    type={"date"}
                                    name={"fechaAgendamiento"}
                                    label="Fecha Agendamiento"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="Hora"
                                    dateFormat="dd-MM-yyyy HH:mm"
                                    component={renderDateField}
                                    validate={required}
                                    subscription={{ value: true, error: true, touched: true }}
                                />

                            </div>
                            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                                <Field
                                    name={"motivoAgendamiento"}
                                    label={<IntlMessages id="campania.campaniagestion.motivoAgendamiento" />}
                                    validate={
                                        required
                                    }
                                    isClearable
                                    component={renderSelectField}
                                    subscription={{ value: true, error: true, touched: true }}
                                >
                                    {emptyItem
                                        .concat(motivoAgendamiento)
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
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Field
                                    name="observacion"
                                    label={<IntlMessages id="campania.campaniagestion.observacion" />}
                                    validate={composeValidators(
                                        required,
                                        minLength(1),
                                        maxLength(256)
                                    )}
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />

                            </div>
                            <div style={{ "textAlign": "right" }} className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <FormSpy subscription={{ values: true }}>
                                    {({ values }) => (
                                        <SaveButton size="large" disabled={deshabilitarGuardar} style={{ "margin": "8px" }}
                                            variant="contained" color="primary" onClick={() => GuardarAgendamiento(values)}
                                        />
                                    )}
                                </FormSpy>
                                <CancelButton size="large" style={{ "margin": "8px" }}
                                    variant="contained"
                                    onClick={() => {
                                        setAbrirAgendamiento(false)
                                        if (esVenta)
                                            setEsAgendamiento(false)
                                    }}
                                />
                            </div>

                        </div >

                    </form>

                )}
            />
        );
    }

    return (
        <div>
            <Popup
                open={abrirAgendamiento} // popup
                title={"Agendamiento"}
                size={"md"}
                component={
                    agregarAgendamiento()
                }
            />
        </div>
    );

}


export default ComPAgendamiento;