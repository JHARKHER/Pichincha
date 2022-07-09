import React, { useState, useContext } from "react";
import { Field, FormSpy } from 'react-final-form';
import { IntlMessages, ActionButton } from "odc-common";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import MenuItem from "@material-ui/core/MenuItem";
import { Context } from "../../context/ContextReparticionCampania";

import {
    required,
    emptyItem,
    renderNumberField,
    renderSelectField
} from "odc-common";


const ComPInfoFiltros = (props) => {
    const { form } = props;
    const {
        catalogs,
        columnaArchivo,
        setRowsFiltros,
        rowsFiltros
    } = useContext(Context);


    const [nombrePresentacion] = useState(null);
    const [filtroCampania] = useState(null);
    const [valor] = useState(null);

    const agregarCampo = (values, form) => {

        var id = 1;
        var arregloColumnas = new Array();

        rowsFiltros.forEach(element => {
            element.id = id;
            arregloColumnas.push(element);
            id++;
        });
        if (values.columnaArchivo != null && values.filtroCampania != null && values.valor != null) {
            let objeto = JSON.parse(values.columnaArchivo);
            var ComponentesGrid = new Object();
            ComponentesGrid.id = id;
            ComponentesGrid.columnaArchivo = objeto.valor;
            ComponentesGrid.campoBdd = objeto.valor;
            ComponentesGrid.filtroCampania = values.filtroCampania;
            ComponentesGrid.valor = values.valor;

            arregloColumnas.push(ComponentesGrid);

            setRowsFiltros(arregloColumnas);
        }

        const newValues = {
            ...values,
            GrdOrdenamientoReparticion: values.GrdOrdenamientoReparticion,
            GrdFiltrosSeleccionados: arregloColumnas,
            columnaArchivo: null,
            filtroCampania: null,
            valor: null
        };
        form.initialize(newValues);

    }

    return (
        <div className="row cap_form_control ">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">

                <Field
                    defaultValue={nombrePresentacion}
                    name={"columnaArchivo"}
                    label={<IntlMessages id="campania.campaniafiltros.columnaArchivo" />}
                    validate={
                        required
                    }
                    isClearable
                    component={renderSelectField}
                    subscription={{ value: true, error: true, touched: true }}
                >
                    {emptyItem
                        .concat((columnaArchivo))
                        .map((item, index) => {
                            return (
                                <MenuItem key={index} value={JSON.stringify(item)} primarytext={item.valor}>
                                    {" "}
                                    {item.valor}{" "}
                                </MenuItem>
                            );
                        })}
                </Field>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">

                <Field
                    defaultValue={filtroCampania}
                    name={"filtroCampania"}
                    label={<IntlMessages id="campania.campaniafiltros.filtroCampania" />}
                    validate={
                        required
                    }
                    isClearable
                    component={renderSelectField}
                    subscription={{ value: true, error: true, touched: true }}
                >
                    {emptyItem
                        .concat(catalogs["FiltroCampania"])
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
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                <Field
                    defaultValue={valor}
                    name="valor"
                    label={<IntlMessages id="campania.campaniafiltros.valor" />}
                    validate={
                        required
                    }
                    component={renderNumberField}
                    subscription={{ value: true, error: true, touched: true }}
                />

            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">

                <FormSpy subscription={{ values: true, error: true, touched: true }}>
                    {({ values }) => (
                        <ActionButton
                            icon={<AddCircleOutlineIcon />}
                            title="Agregar Filtro"
                            text="Agregar Filtro"
                            onClick={() => agregarCampo(values, form)}
                        >

                        </ActionButton>

                    )}
                </FormSpy>
            </div>
        </div>

    );
}

export default ComPInfoFiltros;
