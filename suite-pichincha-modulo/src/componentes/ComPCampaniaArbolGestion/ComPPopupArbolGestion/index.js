import React, { useState } from "react";
import AcordeonDatosArbol from "../ComPAcordeonDatosArbol";
import AcordeonNodosArbol from "../ComPAcordeonNodosArbol";
import Paper from "@material-ui/core/Paper"; //contenedor de la forma
import { Form, FormSpy } from 'react-final-form';
import {
    CancelButton,
    ControlledAcordeon,
    SaveButton
} from "odc-common";

const PopupArbol = (props) => {
    const {
        setOirPopupArbol, oirPopupArbol
    } = props;
    const onSubmit = async values => { }
    // Para controlar las funciones de expandir cada uno de los acordiones de forma independiente
    const id1 = "DatosArbol"
    const id2 = "NodosArbol"
    const [expanded1, setExpanded1] = useState(id1);
    const [expanded2, setExpanded2] = useState(id2);
    const [acordion1Expandido, setAcordion1Expandido] = useState(true);
    const [acordion2Expandido, setAcordion2Expandido] = useState(false);

    const handleChange1 = panel => (event, isExpanded) => {
        setExpanded1(isExpanded ? panel : false);
        setAcordion1Expandido(isExpanded ? true : false);
    };

    const handleChange2 = panel => (event, isExpanded) => {
        setExpanded2(isExpanded ? panel : false);
        setAcordion2Expandido(isExpanded ? true : false);
    };

    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            onSubmit={onSubmit}
            render={({ handleSubmit, values, form }) => (
                <form onSubmit={handleSubmit}>
                    <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <ControlledAcordeon
                                id={`DatosArbol`}
                                titulo={"Datos del Árbol"}
                                desactivado={false}
                                onChange={handleChange1(id1)  }
                                expandido={expanded1 === id1 && acordion1Expandido}
                                detalle={
                                    <AcordeonDatosArbol
                                        {...props}
                                    />
                                }
                            />
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            <ControlledAcordeon
                                id={`NodosArbol`}
                                titulo={"Nodos del Árbol"}
                                desactivado={false}
                                onChange={handleChange2(id2)}
                                expandido={expanded2 === id2 && acordion2Expandido}
                                detalle={
                                    <AcordeonNodosArbol
                                        {...props}
                                    />
                                }
                            />
                        </div>
                        </div>
                        <div className={"float-right"}>
                            <FormSpy subscription={{ values: true }}>
                                {({ values }) => (
                                    <SaveButton size="large" style={{ "margin": "8px" }}
                                        variant="contained" color="primary" type="submit"
                                    />
                                )}
                            </FormSpy>
                            <CancelButton size="large" style={{ "margin": "8px" }}
                                variant="contained"
                                onClick={() => setOirPopupArbol(false)}
                            />
                        </div>
                    
                    </div>
                </form >
            )}
        />
    );
}

export default PopupArbol;