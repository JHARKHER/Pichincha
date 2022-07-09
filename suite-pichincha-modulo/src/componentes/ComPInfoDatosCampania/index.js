import React from "react";
import { IntlMessages, ProgressBar } from "odc-common";
import { useCatalogs } from "odc-configuration";
import { Field, FormSpy } from 'react-final-form'
import { OnChange } from "react-final-form-listeners";
import FormLabel from "@material-ui/core/FormLabel";
import MenuItem from "@material-ui/core/MenuItem";
import { VENTASESPECIAL, ENCUESTA, OTROS, VENTASNOESPECIAL } from '../../Constantes'
import {
    required,
    emptyItem,
    renderTextField,
    renderSelectField,
    renderDateField,
    composeValidators,
    maxLength,
    minLength,
    renderSwitch
} from "odc-common";


const catalogsList = [
    "TipoCampania",
    "SubCampania",
    "TipoCierreCampania"
];


const InfoDatosCampania = (props) => {

    const {
        campaniaComboMostrar, nombre, fechahorainicio, fechahorafin, arbol, arboles, campanias, IdCampania,
        tipoCampania, fieldcodigoCampania, sms, mailing, carta, codigoCampania, cedentes, variableProcesar,
        setfechahorainicio, setfechahorafin,
        setsubCampaniaVisible, subCampaniaEditar, setSubCampaniaEditar, setcampaniaComboMostrar, settipoCampania, setfieldcodigoCampania, setarbol,
        setdespliegueOperacion

    } = props;

    const { catalogs, isLoadingCatalogs } = useCatalogs(catalogsList.join(","));

    const handleSubcampania = (e, values) => {
        settipoCampania(e);
        setfieldcodigoCampania(null);
        setarbol(null);
        values.arbol = undefined;
        values.codigoCampania = undefined;
        if (e == VENTASESPECIAL) {
            setsubCampaniaVisible(true);
            setcampaniaComboMostrar(false);
            setSubCampaniaEditar(true);
        }
        else if (e == OTROS || e == ENCUESTA) {
            setsubCampaniaVisible(true);
            setcampaniaComboMostrar(true);
            setSubCampaniaEditar(true);
        }
        else if (e != OTROS && e != ENCUESTA && e != "" && e != null) {

            setSubCampaniaEditar(true);
            setsubCampaniaVisible(false);
            setcampaniaComboMostrar(false);
        }
        else {
            setsubCampaniaVisible(false);
            setSubCampaniaEditar(false);
            setcampaniaComboMostrar(false);
        }
    };

    const validarDuplicados = (value, values) => {
        let valor = false;
        campanias.some(
            item => {
                if (item.codigoCampania == value && tipoCampania == VENTASNOESPECIAL && item.estado != "FINALIZADA" && item.idCampania != IdCampania) {
                    valor = true;
                }
            }
        );

        if (valor == true) {
            setdespliegueOperacion({
                despliegue: true,
                mensaje: "Ya existe una Campaña con ese código",
                tipo: "warning"
            });
            setfieldcodigoCampania(null);
            values.codigoCampania = undefined;
        }
    }



    if (isLoadingCatalogs) return (<ProgressBar />);

    return (
        <div>
            <div className="row form-row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <FormSpy subscription={{ values: true }}>
                        {({ values }) => (
                            <div>

                                <Field
                                    name={"tipoCampania"}
                                    defaultValue={tipoCampania}
                                    label={<IntlMessages id="campania.compcampania.tipoCampania" />}
                                    validate={
                                        required
                                    }
                                    // isClearable
                                    disabled={!variableProcesar}
                                    component={renderSelectField}
                                    subscription={{ value: true, error: true, touched: true }}
                                >

                                    {emptyItem
                                        .concat(catalogs["TipoCampania"])
                                        .map((item, index) => {
                                            return (
                                                <MenuItem key={index} value={item.code} primarytext={item.description}>
                                                    {" "}
                                                    {item.description}{" "}
                                                </MenuItem>

                                            );
                                        })}
                                </Field>
                                <OnChange name={"tipoCampania"}>
                                    {(value, previous) => {

                                        handleSubcampania(value, values);

                                    }}
                                </OnChange>
                            </div>
                        )}
                    </FormSpy>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <FormSpy subscription={{ values: true }}>
                        {({ values }) => (
                            <div>
                                <Field
                                    name={"codigoCampania"}
                                    defaultValue={fieldcodigoCampania}
                                    label={"Código Campaña:"}
                                    validate={
                                        required
                                    }
                                    // isClearable
                                    disabled={!subCampaniaEditar || !variableProcesar}
                                    component={renderSelectField}
                                    subscription={{ value: true, error: true, touched: true }}

                                >
                                    {!campaniaComboMostrar &&
                                        emptyItem
                                            .concat(codigoCampania)
                                            .map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.nombreCampaniaCarga} primarytext={item.nombreCampaniaCarga}>
                                                        {" "}
                                                        {item.producto} - {item.nombreCampaniaCarga}
                                                    </MenuItem>
                                                );
                                            })}
                                    {campaniaComboMostrar &&
                                        emptyItem
                                            .concat(catalogs["SubCampania"])
                                            .map((item, index) => {
                                                return (
                                                    <MenuItem key={index} value={item.code} primarytext={item.description}>
                                                        {" "}
                                                        {item.description}{" "}
                                                    </MenuItem>

                                                );
                                            })}

                                </Field>
                                <OnChange name={"codigoCampania"}>
                                    {(value, previous) => {

                                        validarDuplicados(value, values);

                                    }}
                                </OnChange>
                            </div>
                        )}
                    </FormSpy>
                </div>
            </div>
            <div className="row form-row">

                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <Field
                        name={"cedente"}
                        defaultValue={"BANCO DE ANTIGUA"}
                        label={<IntlMessages id="campania.compcampania.CodigoCedente" />}
                        validate={
                            required
                        }
                        // isClearable
                        disabled
                        component={renderSelectField}
                        subscription={{ value: true, error: true, touched: true }}
                    >
                        {emptyItem
                            .concat(cedentes)
                            .map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.codigoCedente} primarytext={item.nombreCedente}>
                                        {" "}
                                        {item.nombreCedente}{" "}
                                    </MenuItem>

                                );
                            })}
                    </Field>

                </div>


                <div className="col-xs-12 col-sm-6 col-md-6 ">
                    <Field
                        name={"nombre"}
                        defaultValue={nombre}
                        label={<IntlMessages id="campania.datoscampania.CodigoCampania" />}
                        disabled={!variableProcesar}
                        validate={composeValidators(
                            required,
                            minLength(5),
                            maxLength(64)
                        )}

                        component={renderTextField}
                        subscription={{ value: true, error: true, touched: true }}
                    />

                </div>

            </div>

            <div className="row form-row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <Field
                        type={"date"}
                        name={"fechahorainicio"}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Hora"
                        dateFormat="dd-MM-yyyy HH:mm"
                        defaultValue={fechahorainicio}
                        label="Fecha-Hora Inicio"
                        component={renderDateField}
                        validate={required}
                        disabled={!variableProcesar}
                        subscription={{ value: true, error: true, touched: true }}
                    />
                    <OnChange name={"fechahorainicio"}>
                        {(value, previous) => { setfechahorainicio(value) }}
                    </OnChange>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <Field
                        type={"date"}
                        name={"fechahorafin"}
                        defaultValue={fechahorafin}
                        label="Fecha-Hora Fin"
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        timeCaption="Hora"
                        dateFormat="dd-MM-yyyy HH:mm"
                        component={renderDateField}
                        validate={required}
                        disabled={!variableProcesar}
                        subscription={{ value: true, error: true, touched: true }}
                    />
                    <OnChange name={"fechahorafin"}>
                        {(value, previous) => { setfechahorafin(value) }}
                    </OnChange>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <Field
                        name={"arbol"}
                        defaultValue={arbol}
                        label={<IntlMessages id="campania.compcampania.descripcion" />}
                        validate={
                            required
                        }
                        // isClearable
                        disabled={!variableProcesar}
                        component={renderSelectField}
                        subscription={{ value: true, error: true, touched: true }}
                    >
                        {emptyItem
                            .concat(arboles.filter(element => element.tipoArbol == tipoCampania))
                            .map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.idArbolRespuesta} primarytext={item.descripcion}>
                                        {" "}
                                        {item.descripcion}{" "}
                                    </MenuItem>
                                );
                            })}
                    </Field>

                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                    <FormLabel component="legend">{"Tipo de Envio"}</FormLabel>
                    <Field
                        type="checkbox"
                        defaultValue={mailing}
                        name={'mailing'}
                        label={<IntlMessages id="campania.datoscampania.mailing" />}
                        component={renderSwitch}
                        subscription={{ value: true, error: true, touched: true }}
                    />
                    <Field
                        type="checkbox"
                        defaultValue={carta}
                        name={'carta'}
                        label={<IntlMessages id="campania.datoscampania.carta" />}
                        component={renderSwitch}
                        subscription={{ value: true, error: true, touched: true }}
                    />
                    <Field
                        type="checkbox"
                        defaultValue={sms}
                        name={'sms'}
                        label={<IntlMessages id="campania.datoscampania.sms" />}
                        component={renderSwitch}
                        subscription={{ value: true, error: true, touched: true }}
                    />
                    {/* <Field
                        type="checkbox"
                        initialValue={initialValuesInfoDatos.whatsapp}
                        name={'whatsapp'}
                        label={<IntlMessages id="campania.datoscampania.whatsapp" />}
                        component={renderSwitch}
                        subscription={{ value: true, error: true, touched: true }}
                    /> */}
                </div>

            </div>
        </div>
    );
}

export default InfoDatosCampania;
