import React, { useState } from "react";
import Paper from "@material-ui/core/Paper"; //contenedor de la forma
import { Field, Form, FormSpy } from 'react-final-form';
import {
    GenericGrid,
    CancelButton
} from "odc-common";

const PopupCampania = (props) => {
    const {        
        arbolesCampania,        
        setOirPopupCampania
    } = props;
    const onSubmit = async values => { }
    
    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            onSubmit={onSubmit}
            render={({ handleSubmit, values, form }) => (
                <form onSubmit={handleSubmit}>
                    <div className="col-xl-12">
                        <div >
                            <Field
                                name={"PopupCampania"}
                                columns={[
                                    { name: "nombreCampania", title: "Carga" },
                                    { name: "nombreArchivo", title: "Árchivo" },
                                    { name: "fechaCarga", title: "Fecha Carga" },
                                    { name: "idUsuarioCreacion", title: "Usuario Creación" },
                                ]}
                                stringColumns={["nombreCampania","nombreArchivo"]}
                                numberColumns={["idUsuarioCreacion"]}
                                dateColumns={["fechaCarga"]}
                                component={GenericGrid}
                                disableAdd
                                disableEdit
                                defaultValue={arbolesCampania}
                                defaultFilters={[]}
                                defaultCurrentPage={0}
                                pageSize={10}
                                subscription={{ value: true, error: true }}
                            />
                        </div>

                        <div style={{ "textAlign": "right" }}>
                            <CancelButton size="large" style={{ "margin": "8px" }}
                                variant="contained"
                                onClick={() => setOirPopupCampania(false)}
                            />
                        </div>
                    </div>
                </form >
            )}
        />
    );
}

export default PopupCampania;