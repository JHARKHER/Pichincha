import React, { useState, useContext } from "react";
import ComPInfoFiltros from "../../componentes/ComPInfoFiltros";
import GrdFiltrosSeleccionados from "../../componentes/ComPFiltrosSeleccionados";
import GrdOrdenamientoReparticion from "../../componentes/ComPOrdenamientoReparticion";
import { IntlMessages, ActionButton } from "odc-common";
import { Form, Field } from 'react-final-form'
import MenuItem from "@material-ui/core/MenuItem";
import { ControlledAcordeon } from "odc-common";
import Button from "@material-ui/core/Button";
import { FormSpy } from 'react-final-form';
import SaveIcon from '@material-ui/icons/Save';
import { Context } from "../../context/ContextReparticionCampania";
import {
    required,
    emptyItem,
    renderSelectField
} from "odc-common";

const MasterAgrupacionFlitros = () => {

    const { catalogs, rowsFiltros,
        rowsOrdenamiento,
        GuardarReparticion, setPopUpRecursos,
    } = useContext(Context);

    const [tipoReparticion, settipoReparticion] = useState(null);
    const [acordion1Expandido, setAcordion1Expandido] = useState(false);
    const [acordion2Expandido, setAcordion2Expandido] = useState(false);
    const [acordion3Expandido, setAcordion3Expandido] = useState(false);
    const onSubmit = () => {

    }
    const ForzarCambio = (value) => {
        settipoReparticion(value);
    }

    // Para controlar las funciones de expandir cada uno de los acordiones de forma independiente
    const id = "Filtros"
    const id1 = "Ordenamiento"
    const id2 = "Reparticion"
    const [expanded, setExpanded] = useState(id);
    const [expanded1, setExpanded1] = useState(id1);
    const [expanded2, setExpanded2] = useState(id2);


    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setAcordion1Expandido(isExpanded ? true : false);
    };

    const handleChange1 = panel => (event, isExpanded) => {
        setExpanded1(isExpanded ? panel : false);
        setAcordion2Expandido(isExpanded ? true : false);
    };

    const handleChange2 = panel => (event, isExpanded) => {
        setExpanded2(isExpanded ? panel : false);
        setAcordion3Expandido(isExpanded ? true : false);
    };

    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            onSubmit={onSubmit}
            initialValues={{ GrdFiltrosSeleccionados: rowsFiltros, GrdOrdenamientoReparticion: rowsOrdenamiento, tipoReparticion: tipoReparticion }}
            render={({ form, handleSubmit }) => (
                <form onSubmit={handleSubmit}>

                    <ControlledAcordeon
                        id={`Filtros`}
                        titulo={"Filtros"}
                        desactivado={false}
                        onChange={handleChange(id)}
                        padding={"0px"}
                        expandido={expanded === id && acordion1Expandido}//negado de true 
                        detalle={

                            <div>
                                <ComPInfoFiltros
                                    form={form}
                                />
                                <GrdFiltrosSeleccionados />
                            </div>

                        }
                    />
                    <ControlledAcordeon
                        id={`Ordenamiento`}
                        titulo={"Ordenamiento"}
                        desactivado={false}
                        padding={"0px"}
                        onChange={handleChange1(id1)}
                        expandido={expanded1 === id1 && acordion2Expandido}
                        detalle={
                            <GrdOrdenamientoReparticion />
                        }
                    />
                    <ControlledAcordeon
                        id={`Reparticion`}
                        titulo={"Repartición"}
                        desactivado={false}
                        padding={"0px"}
                        onChange={handleChange2(id2)}
                        expandido={expanded2 === id2 && acordion3Expandido}
                        detalle={
                            <div className="row row-form">
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <Field
                                        defaultValue={tipoReparticion}
                                        name={"tiporeparticion"}
                                        label={<IntlMessages id="campania.campaniarepartirdatos.tipoReparticion" />}
                                        validate={
                                            required
                                        }
                                        isClearable
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
                                </div>
                                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                                    <ActionButton
                                        title="Recursos"
                                        text="Recursos"
                                        onClick={() => setPopUpRecursos(true)}
                                    >

                                    </ActionButton>
                                </div>
                            </div>
                        }
                    />
                    <div style={{ "textAlign": "right" }}>
                        <FormSpy subscription={{ values: true }}>
                            {({ values }) => (

                                <Button startIcon={<SaveIcon />} style={{ "margin": "8px" }} size="large"
                                    variant="contained" color="primary" onClick={() => GuardarReparticion(values)} >

                                    {"Guardar Repartición"}
                                </Button>
                            )}
                        </FormSpy>
                    </div>
                </form >
            )}
        />
    )
}

export default MasterAgrupacionFlitros;
