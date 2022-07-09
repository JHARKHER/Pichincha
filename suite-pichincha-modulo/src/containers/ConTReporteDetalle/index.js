import React, { useContext, useState, useEffect } from "react";
import { useCatalogs } from "odc-configuration";
import {useObtenerOficinas, useObtenerRegiones, useObtenerTipoCliente,
        useObtenerNombresCampanias, useObtenerReporteDetalleCampania
        } from "../../hooks/ReporteCampania";
import { useDispatch, useSelector } from 'react-redux';
import GridCampaniaConsumoDetalle from "../../componentes/ComPCampaniaReporte/ComPGridCampaniaConsumoDetalle";
import Paper from "@material-ui/core/Paper";
import { Form, Field, FormSpy } from 'react-final-form'
import { OnChange } from "react-final-form-listeners";
import DeleteIcon from '@material-ui/icons/Delete';
import MenuItem from "@material-ui/core/MenuItem";
import {ProgressBar, IntlMessages, required, emptyItem, renderTextField,
        renderSelectField, renderDateField, composeValidators, maxLength, minLength,
        renderSwitch, ActionButton
        } from "odc-common";
import { format } from "url";
//import { Moment } from 'moment';
//import { Context } from "../../context/ContextReporteDetalleCampania";

const onSubmit = async values => { }

const divStyle = {
    width: '100%',
    align: 'left',
    margen: '20px',
    padding: '20px',
}
//Catalogos
//LineaDeNegocio es para Segmento - Producto, TipoContacto es (directo, indirecto, no contacto)
const catalogsList = ["LineaDeNegocio", "TipoContacto"];

////CONTENEDOR DEL REPORTE
const MasterCampaniaReporteDetalle = ({ }) => {
    const { date } = useSelector(state => state.auth.authUser);
    const [dia, mes, año] = date.split('/')
    const [fecha] = useState(año + '-' + mes + '-' + dia)
    const dispatch = useDispatch();
    const { nombreCampania, isLoadingNombreCampania } = useObtenerNombresCampanias(dispatch);
    const { catalogs, isLoadingCatalogs } = useCatalogs(catalogsList.join(","));
    const { oficinas, errorOficinas, isLoadingOficinas } = useObtenerOficinas(dispatch);
    const { regiones, errorRegiones, isLoadingRegiones } = useObtenerRegiones(dispatch);
    const { tipoCliente, errorTipoCliente, isLoadingTipoCliente } = useObtenerTipoCliente(dispatch);
    const [idInstitucion, setIdInstitucion] = useState(0);
    const [idOficina, setIdOficina] = useState(0);
    const [idRegion, setIdRegion] = useState(0);
    const [segmento, setSegmento] = useState("");
    const [contacto, setContacto] = useState("");
    const [reportes, setReportes] = useState([]);

    const EjecutarReportes = (campos) => {
        //console.log("oficina:...: ",campos.oficinas);
        if (campos.nombreCampania==null) campos.nombreCampania="";
        if (campos.oficinas==null) campos.oficinas=0;
        if (campos.regiones==null) campos.regiones=0;
        if (campos.segmento==null) campos.segmento="";
        if (campos.contacto==null) campos.contacto="";
        if (campos.tipoCliente==null) campos.tipoCliente="";
        if (campos.fecha==null) campos.fecha=fecha;

        /* console.log("CAMPOS...",campos);
        console.log("====useObtenerReporteDetalleCampania===="); */
        const objeto = { setReportes, campos, dispatch }
        useObtenerReporteDetalleCampania(objeto);
    }
    if (isLoadingNombreCampania || isLoadingCatalogs || isLoadingOficinas ||
        isLoadingRegiones || isLoadingTipoCliente
    ) return (<ProgressBar />);

    ////CUERPO DEL CONTENEDOR    
    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            initialValues={{ GridCampaniaConsumoDetalle: reportes }}
            onSubmit={onSubmit}
            render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit}  >
                    <Paper>
                        <div style={divStyle}>
                        <div style={{ textAlign: "left" }} className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <FormSpy subscription={{ values: true }}>
                                            {({ values }) => (
                                                <ActionButton 
                                                    icon={<DeleteIcon />}
                                                    title="Limpiar"
                                                    text="Limpiar"
                                                    onClick={() => form.reset()}
                                                >
                                                </ActionButton>
                                            )}
                                        </FormSpy>
                                    </div>
                            <br></br>
                            <div >
                                <h2 >
                                    <b>{<IntlMessages id="campania.campaniareportedetalle.encabezadoreporte" />}</b>
                                </h2 >
                                <div className="row form-row">                                
                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <FormSpy subscription={{ values: true }}>
                                            {({ values }) => (
                                                <div>
                                                    <Field
                                                        name={"nombreCampania"}
                                                        defaultValue={""}                                                       
                                                        label={<IntlMessages id="campania.campaniareportedetalle.nombreCampania" />}
                                                        validate={
                                                            required
                                                        }
                                                        isClearable
                                                        component={renderSelectField}
                                                        subscription={{ value: true, error: true, touched: true }}
                                                    >
                                                        {emptyItem
                                                            .concat(nombreCampania)
                                                            .map((item, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={item.codigoCampania} primarytext={item.nombreCampania}>
                                                                        {" "}
                                                                        {item.nombreCampania}{" "}
                                                                    </MenuItem>

                                                                );
                                                            })}
                                                    </Field>
                                                </div>
                                            )}
                                        </FormSpy>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <FormSpy subscription={{ values: true }}>
                                            {({ values }) => (
                                                <div>
                                                    <Field
                                                        name={"regiones"}
                                                        defaultValue={0}                                                                                                              
                                                        label={<IntlMessages id="campania.campaniareportedetalle.region" />}
                                                        validate={
                                                            required
                                                        }
                                                        isClearable                                                        
                                                        component={renderSelectField}
                                                        subscription={{ value: true, error: true, touched: true }}
                                                    >
                                                        {emptyItem
                                                            .concat(regiones == null ? [] : regiones)
                                                            .map((item, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={item.idRegion} primarytext={item.nombre}>
                                                                        {" "}
                                                                        {item.nombre} {" "}
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                    </Field>
                                                </div>
                                            )}
                                        </FormSpy>
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <FormSpy subscription={{ values: true }}>
                                            {({ values }) => (
                                                <div>
                                                    <Field
                                                        name={"oficinas"}
                                                        defaultValue={0}                                                       
                                                        label={<IntlMessages id="campania.campaniareportedetalle.oficina" />}
                                                        validate={
                                                            required
                                                        }
                                                        isClearable
                                                        component={renderSelectField}
                                                        subscription={{ value: true, error: true, touched: true }}
                                                    >
                                                        {emptyItem
                                                            .concat(oficinas == null ? [] : oficinas)
                                                            .map((item, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={item.idOffice} primarytext={item.name}>
                                                                        {" "}
                                                                        {item.name} {" "}
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                    </Field>
                                                </div>
                                            )}
                                        </FormSpy>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <FormSpy subscription={{ values: true }}>
                                            {({ values }) => (
                                                <div>
                                                    <Field
                                                        name={"segmento"}
                                                        defaultValue={""}                                                        
                                                        label={<IntlMessages id="campania.campaniareportedetalle.segmento" />}
                                                        validate={
                                                            required
                                                        }
                                                        isClearable
                                                        component={renderSelectField}
                                                        subscription={{ value: true, error: true, touched: true }}
                                                    >
                                                        {emptyItem
                                                            .concat(catalogs["LineaDeNegocio"])
                                                            .map((item, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={item.code} primarytext={item.description}>
                                                                        {" "}
                                                                        {item.description} {" "}
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                    </Field>
                                                </div>
                                            )}
                                        </FormSpy>
                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <FormSpy subscription={{ values: true }}>
                                            {({ values }) => (
                                                <div>
                                                    <Field
                                                        name={"contacto"}
                                                        defaultValue={""}                                                        
                                                        label={<IntlMessages id="campania.campaniareportedetalle.tipoContacto" />}
                                                        validate={
                                                            required
                                                        }
                                                        isClearable
                                                        component={renderSelectField}
                                                        subscription={{ value: true, error: true, touched: true }}
                                                    >
                                                        {emptyItem
                                                            .concat(catalogs["TipoContacto"])
                                                            .map((item, index) => {
                                                                return (
                                                                    <MenuItem key={index} value={item.code} primarytext={item.description}>
                                                                        {" "}
                                                                        {item.description} {" "}
                                                                    </MenuItem>
                                                                );
                                                            })}
                                                    </Field>
                                                </div>
                                            )}
                                        </FormSpy>
                                    </div>
                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <Field
                                            name={"tipoCliente"}
                                            defaultValue={""}                                            
                                            label={<IntlMessages id="campania.campaniareportedetalle.tipoCliente" />}
                                            validate={
                                                required
                                            }
                                            isClearable
                                            component={renderSelectField}
                                            subscription={{ value: true, error: true, touched: true }}
                                        >
                                            {emptyItem
                                                .concat(tipoCliente == null ? [] : tipoCliente)
                                                .map((item, index) => {
                                                    return (
                                                        <MenuItem key={index} value={item.codigoMarcaComercial} primarytext={item.nombreMarcaComercial}>
                                                            {" "}
                                                            {item.nombreMarcaComercial}{" "}
                                                        </MenuItem>
                                                    );
                                                })}
                                        </Field>

                                    </div>
                                </div>
                                <div className="row form-row">
                                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <Field
                                            type={"fecha"}
                                            name={"fecha"}
                                            defaultValue={fecha}                                            
                                            dateFormat="dd-MM-yyyy"
                                            placeholder={fecha}
                                            label="Fecha del Reporte"
                                            component={renderDateField}
                                            validate={required}
                                            subscription={{ value: true, error: true, touched: true }}
                                        />
                                    </div>
                                    <div style={{ textAlign: "right" }} className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                        <FormSpy subscription={{ values: true }}>
                                            {({ values }) => (
                                                <ActionButton
                                                    title="Buscar"
                                                    text="Buscar"
                                                    onClick={() => EjecutarReportes(values)}
                                                >
                                                </ActionButton>
                                            )}
                                        </FormSpy>
                                    </div>

                                </div>

                            </div>
                            <br></br>
                            <div >
                                < GridCampaniaConsumoDetalle                                
                                />
                            </div>
                        </div>
                    </Paper>
                </form >
            )}
        />
    );
}

export default MasterCampaniaReporteDetalle;