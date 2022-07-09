import React from "react";
import SaveIcon from '@material-ui/icons/Save';
import ClearAllIcon from '@material-ui/icons/ClearAll';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import { ProgressBar, TransacitionalButtonGroup, Tooltip, ReturnButton, ApproveButton, CancelButton } from "odc-common";
import CampaniaNuevo from "../../componentes/ComPCampaniaEspecialNuevo"
import { Form, FormSpy } from 'react-final-form';
import { useEliminarArchivo, useGuardarArchivo } from "../../hooks/AdminCampania";
import { useDispatch } from 'react-redux';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
const MasterCampaniaNuevo = (props) => {
    const dispatch = useDispatch();
    const {
        //Variables initialValues
        variableProcesar, esAgregarArchivo,
        moduloCedente, fechaCarga, nombreCarga, fieldcodigoCampania, validarCampos, eliminarEnable, habilitarPlantilla,
        rutaArchivo, nombreArchivo, TipoArchivo, cargandoGrid, rows, dotJson,
        //Variables SET
        setcampaniaGuardada, setObjetoCampania, setdespliegueOperacion, setesAgregarArchivo,
        setnombreArchivoinfo, setfechaCargainfo, setestado, setvalidarCampos, seteliminarEnable, setHabilitarPlantilla,
        setrutaArchivo, setnombreArchivo, setTipoArchivo, setrows, setNoRender, setDotJson
    } = props;

    const onSubmit = () => {

    }
    const GuardarArchivo = (values, form) => {

        if (values.GrdCampaniaEspecialNuevoLista != null && values.TipoArchivo &&
            values.fechaCarga != null && values.moduloCedente && values.nombreArchivo
            && values.nombreCarga && values.moduloCedente) {

            if (values.rutaArchivo == 0 || values.rutaArchivo == null || dotJson.length == 0) {
                setdespliegueOperacion({
                    despliegue: true,
                    mensaje: "Subir el archivo con nombre: " + values.nombreArchivo,
                    tipo: "warning"
                });

            } else {
                values.dotJson = dotJson;
                setObjetoCampania(values);
                setcampaniaGuardada(false);

                setnombreArchivoinfo(values.nombreArchivo);
                setfechaCargainfo(values.fechaCarga);
                setestado("PENDIENTE");
                setHabilitarPlantilla(false);
            }

        }
        form.submit();
    }

    if (esAgregarArchivo) {
        setrutaArchivo(null);
        setnombreArchivo(null);
        setTipoArchivo(null);
    }

    const GuardarRegistros = (values, form) => {
        if (values.GrdCampaniaEspecialNuevoLista != null && values.TipoArchivo &&
            values.nombreArchivo) {

            if (values.rutaArchivo == 0 || dotJson.length == 0) {
                setdespliegueOperacion({
                    despliegue: true,
                    mensaje: "Seleccione el archivo a subir ",
                    tipo: "warning"
                });

            } else {
                setNoRender(1);
                useGuardarArchivo(
                    values,
                    { ...props },
                    dispatch,
                    fieldcodigoCampania
                );
            }

        }
        form.submit();
    }


    const eliminarArchivo = () => {
        useEliminarArchivo(
            { ...props },
            dispatch
        );
    }

    // cierra la ventana flotante
    const handleClose = () => {
        setcampaniaGuardada(false)
        setesAgregarArchivo(false);
        setObjetoCampania({});
        setHabilitarPlantilla(false);
    };


    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            onSubmit={onSubmit}
            render={({ handleSubmit, form, values }) => (
                <form onSubmit={handleSubmit}>
                    <div className="cap_form_control">

                        <TransacitionalButtonGroup
                            hidePrint
                            hideDelete
                            hideNew
                            hideEdit
                            style={{ "margin": "8px" }}
                            otherButtons={[
                                ...!variableProcesar ? [

                                    <Button key={1} onClick={() => {
                                        const newValues = {
                                            ...values,
                                            rows: undefined,
                                            fechaCarga: fechaCarga,
                                            moduloCedente: moduloCedente,
                                            nombreCarga: nombreCarga,

                                            TipoArchivo: undefined,
                                            rutaArchivo: undefined,
                                            nombreArchivo: undefined,
                                        };
                                        setrows([]);
                                        setTipoArchivo(null);
                                        setnombreArchivo(null);
                                        setrutaArchivo(null);
                                        setHabilitarPlantilla(false);
                                        setvalidarCampos(false);
                                        form.initialize(newValues);

                                    }} disabled={true} startIcon={<ClearAllIcon />}>
                                        {" "}
                                    </Button>

                                ] :
                                    [
                                        <Tooltip key={1} title={"Limpiar"} placement={"bottom"}>
                                            <Button onClick={() => {
                                                const newValues = {
                                                    ...values,
                                                    rows: undefined,
                                                    fechaCarga: fechaCarga,
                                                    moduloCedente: moduloCedente,
                                                    nombreCarga: nombreCarga,

                                                    TipoArchivo: undefined,
                                                    rutaArchivo: undefined,
                                                    nombreArchivo: undefined,
                                                };
                                                setrows([]);
                                                setDotJson([]);
                                                setTipoArchivo(null);
                                                setnombreArchivo(null);
                                                setrutaArchivo(null);
                                                setHabilitarPlantilla(false);
                                                setvalidarCampos(false);
                                                form.initialize(newValues);

                                            }} startIcon={<ClearAllIcon />}>
                                                {" "}
                                            </Button>
                                        </Tooltip>
                                    ],

                                ...!eliminarEnable || !variableProcesar ? [

                                    <Button key={2} disabled={true} onClick={eliminarArchivo} startIcon={<DeleteIcon />}>
                                        {" "}
                                    </Button>

                                ] :
                                    [
                                        <Tooltip key={2} title={"Eliminar Archivo"} placement={"bottom"}>
                                            <Button onClick={eliminarArchivo} startIcon={<DeleteIcon />}>
                                                {" "}
                                            </Button>
                                        </Tooltip>
                                    ],
                            ]}
                        />
                    </div>
                    <div className="cap_form_control">
                        <CampaniaNuevo

                            {...props}
                            rows={rows}
                            validarCampos={validarCampos}
                            eliminarEnable={eliminarEnable}
                            habilitarPlantilla={habilitarPlantilla}
                            rutaArchivo={rutaArchivo}
                            nombreArchivo={nombreArchivo}
                            TipoArchivo={TipoArchivo}

                            setrows={setrows}
                            setvalidarCampos={setvalidarCampos}
                            seteliminarEnable={seteliminarEnable}
                            setHabilitarPlantilla={setHabilitarPlantilla}
                            setrutaArchivo={setrutaArchivo}
                            setnombreArchivo={setnombreArchivo}
                            setTipoArchivo={setTipoArchivo}

                        />
                    </div>

                    <div style={{ "textAlign": "right" }}>
                        {!esAgregarArchivo &&
                            <FormSpy subscription={{ values: true }}>
                                {({ values }) => (
                                    <Button disabled={(!validarCampos || !variableProcesar)} startIcon={<ThumbUpIcon />} style={{ "margin": "8px" }} size="large"
                                        variant="contained" color="primary" onClick={() => GuardarArchivo(values, form)} >
                                        {"ACEPTAR"}
                                    </Button>
                                )}
                            </FormSpy>
                        }
                        {esAgregarArchivo &&
                            <FormSpy subscription={{ values: true }}>
                                {({ values }) => (

                                    <Button startIcon={<SaveIcon />} disabled={(!validarCampos || !variableProcesar) && !esAgregarArchivo} style={{ "margin": "8px" }} size="large"
                                        variant="contained" color="primary" onClick={() => GuardarRegistros(values, form)} >

                                        {"Guardar Registros"}
                                    </Button>


                                )}
                            </FormSpy>

                        }
                        <CancelButton
                            onClick={handleClose} />


                    </div>
                    {cargandoGrid &&
                        <ProgressBar />
                    }

                </form>
            )}
        />


    );

}

export default MasterCampaniaNuevo;

