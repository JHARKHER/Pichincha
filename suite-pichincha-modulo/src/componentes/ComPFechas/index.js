import React, { useState } from "react";
import { Field, Form } from 'react-final-form'
import {
    required,
    renderDateField,
    CancelButton,
    SaveButton
} from "odc-common";
import { useDispatch } from 'react-redux';
import { FormSpy } from 'react-final-form';

import { useCambiarFechas } from "../../hooks/AdminCampania";

const ComPFechas = (props) => {

    const dispatch = useDispatch();
    const {
        initialValuesInfoDatos,
        setmostrarFechas,
        setdespliegueOperacion,
        setfechahorafin,
        setfechahorainicio
    } = props;

    const onSubmit = (values) => {
        useCambiarFechas(initialValuesInfoDatos.IdCampania, values, dispatch, setdespliegueOperacion, setfechahorafin, setfechahorainicio, setmostrarFechas);
    }



    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            onSubmit={onSubmit}
            validate={values => {
                const errors = {};

                if (
                    Date.parse(values.fechahorafinPop) <
                    Date.parse(values.fechahorainicioPop)
                )
                    errors["fechahorafinPop"] =
                    "La fecha final debe ser mayor que fecha inicial";

                return errors;
            }}
            render={({ handleSubmit, form, values }) => (
                <form onSubmit={handleSubmit}>

                    <div className="cap_form_control" style={{"minHeight":"250px"}}>
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Field
                                    type={"date"}
                                    name={"fechahorainicioPop"}
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={15}
                                    timeCaption="Hora"
                                    dateFormat="dd-MM-yyyy HH:mm"
                                    defaultValue={initialValuesInfoDatos.fechahorainicio}
                                    label="Fecha-Hora Inicio"
                                    component={renderDateField}
                                    validate={required}
                                    disabled
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                                 <br/>
                            </div>
                           
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                <Field
                                    type={"date"}
                                    name={"fechahorafinPop"}
                                    defaultValue={initialValuesInfoDatos.fechahorafin}
                                    label="Fecha-Hora Fin"
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
                        </div>

                    </div>
                    <div style={{ "textAlign": "right" }}>
                        <FormSpy subscription={{ values: true }}>
                            {({ values }) => (
                                <SaveButton type="submit"
                                />
                            )}
                        </FormSpy>
                        <CancelButton onClick={() => setmostrarFechas(false)
                        } />
                    </div>
                </form>
            )}
        />


    );

}

export default ComPFechas;
