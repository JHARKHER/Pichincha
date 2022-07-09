import React, { useContext } from "react";
import { Context } from "../../context/ContextGestionCampania";
import { IntlMessages } from "odc-common";
import { Field } from 'react-final-form'
import { makeStyles } from "@material-ui/core/styles";

const ComPCampaniaResumen = (props) => {

    const useStyles = makeStyles(theme => ({
        derecha: {
            float: "right"
        },

    }));
    const classes = useStyles();
    const {
        tipoGestion, habilitarGestion, tipoCampania, registrosGestionEfectiva, codigoProducto,
        registrosTotales, nombreCampania, fechaInicio, fechaFin, nombreCliente, identificacionCliente, tipoIdentificacion } = props;

    const EtiquetaPresentaTextoFijo = ({ nombre, input, texto }) => {

        return <Field name={nombre}>
            {({ input, meta, name = nombre }) => (

                <label name={name} style={{ "color": "white", "fontSize": "16px", fontWeight: "bold", textAlign: "left", paddingLeft: "15px" }}> {texto !== "" ? texto : ""}</label>

            )}
        </Field>;
    }



    let colorGestion;
    if (tipoGestion == "No Gestionado") {
        colorGestion = '#F59895';
    } else if (tipoGestion == "Gestionado") {
        colorGestion = '#96F595';
    } else if (tipoGestion == "Regestión") {
        colorGestion = '#F7F999';
    }

    return (

        <div>
            <div>
                {habilitarGestion &&
                    <div className={habilitarGestion == false ? " " : classes.derecha} >
                        <EtiquetaPresentaTextoFijo
                            nombre={"etiquetaNombreCliente"}
                            texto={nombreCliente == null ? null : nombreCliente.toUpperCase()} />
                        <EtiquetaPresentaTextoFijo

                            texto={'─'} />
                        <EtiquetaPresentaTextoFijo

                            texto={tipoIdentificacion + ' :'} />
                        <EtiquetaPresentaTextoFijo
                            nombre={"etiquetaNombreClienteDetalle"}
                            texto={identificacionCliente} />
                    </div>
                }
                <div>
                    <EtiquetaPresentaTextoFijo
                        nombre={"etiquetaNombreCampania"}
                        texto={<IntlMessages id="campania.campaniagestion.nombreCampania" />} />
                    <EtiquetaPresentaTextoFijo

                        texto={tipoCampania} />
                    <EtiquetaPresentaTextoFijo

                        texto={'─'} />
                    <EtiquetaPresentaTextoFijo
                        nombre={"etiquetaNombreCampaniaDetalle"}
                        texto={nombreCampania} />
                </div>

            </div>
            <div>
                <div>
                    <EtiquetaPresentaTextoFijo
                        nombre={"etiquetaTipoSeleccionDetalle"}
                        texto={tipoGestion == null ? null : tipoGestion.toUpperCase()} />
                    &nbsp;&nbsp;
                    <svg width="15" height="15">
                        <rect width="15" height="15" style={{ "fill": colorGestion, "strokeWidth": 1, "stroke": "rgb(0,0,0)" }} />
                    </svg>

                    <EtiquetaPresentaTextoFijo
                        nombre={"etiquetaFechaInicioDetalle"}
                        texto={fechaInicio.toLocaleString()} />

                    <EtiquetaPresentaTextoFijo

                        texto={'─'} />

                    <EtiquetaPresentaTextoFijo
                        nombre={"etiquetaFechaFinDetalle"}
                        texto={fechaFin.toLocaleString()} />
                </div>
                <div>
                    <EtiquetaPresentaTextoFijo
                        nombre={"etiquetaProducto"}
                        texto={<IntlMessages id="campania.campaniagestion.producto" />} />

                    <EtiquetaPresentaTextoFijo
                        nombre={"etiquetaProductoDetalle"}
                        texto={codigoProducto} />

                    {!habilitarGestion &&
                        <span>
                            <EtiquetaPresentaTextoFijo

                                texto={'─'} />

                            <EtiquetaPresentaTextoFijo
                                nombre={"etiquetaRegistrosTotales"}
                                texto={<IntlMessages id="campania.campaniagestion.registrosTotales" />} />
                            <EtiquetaPresentaTextoFijo
                                nombre={"etiquetaRegistrosTotalesDetalle"}
                                texto={registrosTotales} />

                            {tipoGestion != 'No Gestionado' &&
                                <span>
                                    <EtiquetaPresentaTextoFijo

                                        texto={'─'} />

                                    <EtiquetaPresentaTextoFijo
                                        nombre={"etiquetaRegistrosGestionEfectiva"}
                                        texto={<IntlMessages id="campania.campaniagestion.registrosGestionEfectiva" />} />
                                    <EtiquetaPresentaTextoFijo
                                        nombre={"etiquetaRegistrosGestionEfectivaDetalle"}
                                        texto={registrosGestionEfectiva} />
                                </span>
                            }
                        </span>
                    }

                </div>

            </div>
        </div>

    );

}



export default ComPCampaniaResumen;