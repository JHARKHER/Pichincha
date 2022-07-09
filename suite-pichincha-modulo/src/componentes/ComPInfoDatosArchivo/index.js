
import React, { useState } from "react";
import DescriptionIcon from '@material-ui/icons/Description';
import { withStyles } from "@material-ui/core/styles";
import MasterCampaniaNuevo from '../../containers/ConTCampaniaNuevo'
import { commonStyles, ActionButton } from "odc-common";
import { useDispatch } from 'react-redux';
import { Field, FormSpy } from 'react-final-form';
import { useObtenerCampoCabecera } from "../../hooks/AdminCampania";
import {
    upper,
    renderTextField,
    renderNumberField,
    renderDateField,
    Popup
} from "odc-common";

const PopupWrapped = withStyles(commonStyles)(Popup);

const InfoDatosArchivo = (props) => {
    const {
        //Variables initialValues
        campaniaGuardada, nombreArchivoinfo, IdCabeceraArchivo, fechaCargainfo, estado, numeroRegistro,
        registroError, registroClienteDuplicado, objetoCampania,rows,cargandoGrid,nombreArchivo,
        //Variables SET
        setshowProgressBarArchivo, setshowProgressBarArchivoExitoso, setshowProgressBarArchivoEliminado, setshowProgressBarArchivoEliminadoExitoso,
        setdespliegueOperacion, setcampaniaGuardada,setrows,setCargandoGrid,setnombreArchivo

    } = props

    const [validarCampos, setvalidarCampos] = useState(false);
    const [eliminarEnable, seteliminarEnable] = useState(false);
    const [habilitarPlantilla, setHabilitarPlantilla] = useState(false);
    const [moduloCedente, setmoduloCedente] = useState(null);
    const [fechaCarga, setfechaCarga] = useState(null);
    const [nombreCarga, setnombreCarga] = useState(null);

    const [rutaArchivo, setrutaArchivo] = useState(null);
    const [TipoArchivo, setTipoArchivo] = useState(null);

    const dispatch = useDispatch();
    let variableArchivo;

    const validarCamposLlenosPopUp = (values) => {
        if (values.cedente != null && values.nombre != null && values.fechahorainicio != null && values.fechahorafin != null
            && values.arbol != null && values.tipoCampania != null && values.codigoCampania != null &&

            values.cedente != "" && values.nombre != "" && values.fechahorainicio != "" && values.fechahorafin != ""
            && values.arbol != "" && values.tipoCampania != "" && values.codigoCampania != ""
        ) {
            setfechaCarga(new Date());
            if (objetoCampania.rutaArchivo == null) {
                if (IdCabeceraArchivo != null && IdCabeceraArchivo != "") {

                    const propiedades = {
                        ...props,
                        setTipoArchivo,
                        setrows,
                        setrutaArchivo,
                        setnombreArchivo,
                        setfechaCarga,
                        seteliminarEnable,
                        setvalidarCampos,
                        dispatch,
                        setCargandoGrid
                    };
                    useObtenerCampoCabecera(
                        { ...propiedades }

                    );
                }else{
                    setrows([]);
                    setTipoArchivo(null);
                    setnombreArchivo(null);
                    setrutaArchivo(null);
                }
            } else {
                setnombreArchivo(objetoCampania.nombreArchivo)
                setTipoArchivo(objetoCampania.TipoArchivo);
                setrows(objetoCampania.GrdCampaniaEspecialNuevoLista);
                setrutaArchivo(objetoCampania.rutaArchivo);
                setHabilitarPlantilla(false);
                if(IdCabeceraArchivo != null || IdCabeceraArchivo !="")
                    seteliminarEnable(true);
            }


            setcampaniaGuardada(true);
            setmoduloCedente(values.cedente);
            setnombreCarga(values.nombre);

        } else {
            setdespliegueOperacion({
                despliegue: true,
                mensaje: "Valide que todos los campos se encuentren llenos",
                tipo: "warning"
            });

        }
    }


    if (IdCabeceraArchivo == "" || IdCabeceraArchivo == null) {
        variableArchivo = "Carga Archivo";
    } else if (IdCabeceraArchivo != "" && IdCabeceraArchivo != null) {
        variableArchivo = "Editar Archivo"
    }
    

    return (

        <div>
            <div className="row form-row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">

                    <Field
                        name={"nombreArchivoinfo"}
                        defaultValue={nombreArchivoinfo}
                        label={"Nombre Archivo"}
                        disabled
                        parse={upper}
                        component={renderTextField}
                        subscription={{ value: true, error: true, touched: true }}
                    />

                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <br>
                    </br>

                    <Field
                        name={"IdCabeceraArchivo"}
                        defaultValue={IdCabeceraArchivo}
                        label="IdCabeceraArchivo"
                        hidden
                        component={renderTextField}
                        subscription={{ value: true, error: true, touched: true }}
                    />

                    <FormSpy subscription={{ values: true }}>
                        {({ values }) => (

                            <ActionButton
                                title={variableArchivo}
                                text={variableArchivo}
                                icon={<DescriptionIcon />}
                                onClick={() => validarCamposLlenosPopUp(values)}
                            >

                            </ActionButton>

                        )}
                    </FormSpy>




                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <Field
                        type={"date"}
                        name={"fechaCargainfo"}
                        defaultValue={fechaCargainfo}
                        label={"Fecha Carga"}
                        disabled
                        component={renderDateField}
                        subscription={{ value: true, error: true, touched: true }}
                    />

                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                    <Field
                        name={"estado"}
                        defaultValue={estado}
                        label={"Estado:"}
                        disabled
                        component={renderTextField}
                        subscription={{ value: true, error: true, touched: true }}
                    />

                </div>
            </div>
            {(IdCabeceraArchivo != "" && IdCabeceraArchivo != null) &&

                <div className="row form-row">

                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                        <Field
                            name={"numeroRegistro"}
                            defaultValue={numeroRegistro}
                            label={"Número de Registro:"}
                            disabled
                            component={renderNumberField}
                            subscription={{ value: true, error: true, touched: true }}
                        />

                    </div>

                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                        <Field
                            name={"registroError"}
                            defaultValue={registroError}
                            label={"Número de Errores:"}
                            disabled
                            component={renderNumberField}
                            subscription={{ value: true, error: true, touched: true }}
                        />

                    </div>
                    <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3col-xl-3">
                        <Field
                            name={"registroClienteDuplicado"}
                            defaultValue={registroClienteDuplicado}
                            label={"Número Duplicados:"}
                            disabled
                            component={renderNumberField}
                            subscription={{ value: true, error: true, touched: true }}
                        />

                    </div>
                </div>
            }
            {/* <div className="row">
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                    <Field
                        type="checkbox"
                        name={"reparteclientesotrascampañas"}
                        initialValue={reparteclientesotrascampañas}
                        label={"Reparte Clientes otras Campañas:"}
                        component={renderSwitch}
                        subscription={{ value: true, error: true, touched: true }}
                    />
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                    <Field
                        name={"clienteotracampania"}
                        initialValue={clienteotracampania}
                        label={"Clientes en Otras Campañas:"}
                        disabled
                        component={renderTextField}
                        subscription={{ value: true, error: true, touched: true }}
                    />
                </div>
            </div> */}
            <div className="row form-row">
                <PopupWrapped
                    open={campaniaGuardada} // popup
                    title={"Cargar Archivo"}
                    size={"xl"}
                    component={
                        <MasterCampaniaNuevo

                            {...props}

                            variablesProgress={{
                                setshowProgressBarArchivo, setshowProgressBarArchivoExitoso,
                                setshowProgressBarArchivoEliminado, setshowProgressBarArchivoEliminadoExitoso
                            }}

                            setmoduloCedente={setmoduloCedente}
                            setfechaCarga={setfechaCarga}
                            setnombreCarga={setnombreCarga}
                            setvalidarCampos={setvalidarCampos}
                            seteliminarEnable={seteliminarEnable}
                            setHabilitarPlantilla={setHabilitarPlantilla}
                            setrutaArchivo={setrutaArchivo}
                            setnombreArchivo={setnombreArchivo}
                            setTipoArchivo={setTipoArchivo}
                            setCargandoGrid={setCargandoGrid}
                            setrows={setrows}

                            moduloCedente={moduloCedente}
                            fechaCarga={fechaCarga}
                            nombreCarga={nombreCarga}
                            validarCampos={validarCampos}
                            eliminarEnable={eliminarEnable}
                            habilitarPlantilla={habilitarPlantilla}
                            rutaArchivo={rutaArchivo}
                            nombreArchivo={nombreArchivo}
                            TipoArchivo={TipoArchivo}
                            cargandoGrid={cargandoGrid}
                            rows={rows}


                        />
                    }
                />


            </div>


        </div>
    );
}

export default InfoDatosArchivo;