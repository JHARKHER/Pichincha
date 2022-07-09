import React from 'react';
import { Field } from 'react-final-form';
import { CustomGrid } from "odc-common";
import { VENTASESPECIAL, ENCUESTA, OTROS, ES_TELEFONO, ES_PRODUCTO, ES_SUB_PRODUCTO, ES_CONTROL, TIPO_IDENTIFICACION, IDENTIFICACION, NOMBRE_CLIENTE, ES_MONTO, ES_TASA, ES_PLAZO,ES_DIRECCION } from '../../Constantes'
function GrdCampaniaEspecialNuevoLista(props) {

    const allItems = props.dataFindCatalogs["TipoDatoArchivo"];
    const allItemsChecks = props.dataFindCatalogs["TipoChecks"];
    const allItemsUbicacion = props.dataFindCatalogs["TipoTelefono"];
    const allItemsUbicacion2 = props.dataFindCatalogs["TipoUbicacionDipositivo"];

    const bloqueo = [
        { columnName: "columnaArchivo", editingEnabled: false },
        { columnName: 'id', editingEnabled: false }
    ]


    const catalogs = {
        campoBdd: allItems.map(item => {
            return {
                key: item.code,
                value: item.code,
                name: item.description
            }
        }),
        seleccionCatalogo: allItemsChecks.map(item => {
            return {
                key: item.code,
                value: item.code,
                name: item.description
            }
        }),
        esTelefono: allItemsUbicacion.map(item => {
            return {
                key: item.code,
                value: item.code,
                name: item.description
            }
        }),
        esDireccion: allItemsUbicacion2.map(item => {
            return {
                key: item.code,
                value: item.code,
                name: item.description
            }
        })
    };

    const defaultWidths = [
        { columnName: "id", width: 125 },
        { columnName: "esActivo", width: 125 },
        { columnName: "columnaArchivo", width: 300 },
        { columnName: "campoBdd", width: 300 },
        { columnName: "nombrePresentacion", width: 300 },
        { columnName: "seleccionCatalogo", width: 300 },
        { columnName: "tipoUbicacion", width: 300 }
    ];


    return (
        <Field
            defaultValue={props.rows}
            name={"GrdCampaniaEspecialNuevoLista"}
            columns={[
                { name: "id", title: "Orden", disabled: true },
                { name: "esActivo", title: "Se Carga" },
                { name: "columnaArchivo", title: "Cabecera Original", disabled: true },
                { name: "campoBdd", title: "Campo BDD", isFiltered: true },
                { name: "nombrePresentacion", title: "Encabezado Visualización" },
                { name: "seleccionCatalogo", title: "Seleccione" },
                { name: "tipoUbicacion", title: "Tipo Ubicación", dependsOnColumn: "seleccionCatalogo" },
            ]}
            tableColumnExtensions={defaultWidths}
            stringColumns={["nombrePresentacion", "id", "columnaArchivo"]}
            selectColumns={["campoBdd", "tipoUbicacion", "seleccionCatalogo"]}
            booleanColumns={["esActivo"]}
            component={CustomGrid}
            catalogs={catalogs}
            subscription={{ value: true, error: true }}
            defaultSorting={[{ columnName: 'id', direction: 'asc' }]}
            defaultFilters={[]}
            startEditAction={"doubleClick"}
            disableAdd
            disableEdit
            defaultCurrentPage={0}
            pageSize={10}
            enableColumnResizing
            defaultColumnWidths={defaultWidths}
            enableInlineEditing={!props.esAgregarArchivo && props.variableProcesar}
            commitValidate={rows => {

                let telefonoCarga = false;
                let direccion = false;
                let tipoIdentificacion = false;
                let identificacion = false;
                let nombreCliente = false;
                let bloqueoGeneral = true;

                let monto = false;
                let tasa = false;
                let plazo = false;
                let producto = false;
                let subProducto = false;
                rows.some(
                    item => {

                        if (props.tipoCampania == ENCUESTA || props.tipoCampania == OTROS) {
                            if (item.esActivo) {

                                if (item.seleccionCatalogo != null) {

                                    if (item.seleccionCatalogo == ES_TELEFONO) {

                                        item.campoBdd = null;
                                        if (item.tipoUbicacion != null) {
                                            telefonoCarga = true;
                                        }
                                    } else if (item.seleccionCatalogo == ES_DIRECCION) {

                                        item.campoBdd = null;
                                        if (item.tipoUbicacion != null) {
                                            direccion = true;
                                        }
                                    } else if (item.seleccionCatalogo == ES_PRODUCTO) {

                                        item.campoBdd = null;
                                        producto = true;

                                    } else if (item.seleccionCatalogo == ES_SUB_PRODUCTO) {

                                        item.campoBdd = null;
                                        subProducto = true;
                                    } else if (item.seleccionCatalogo == ES_CONTROL) {

                                        item.campoBdd = null;

                                    } else {
                                        item.campoBdd = null;
                                    }
                                } else if (item.campoBdd != null) {

                                    if (item.campoBdd == TIPO_IDENTIFICACION) {
                                        tipoIdentificacion = true;
                                    } else if (item.campoBdd == IDENTIFICACION) {
                                        identificacion = true;
                                    } else if (item.campoBdd == NOMBRE_CLIENTE) {
                                        nombreCliente = true;
                                    }
                                } else if (item.campoBdd == null) {
                                    bloqueoGeneral = false;
                                }
                            }
                        } else if (props.tipoCampania == VENTASESPECIAL) {

                            if (item.esActivo) {
                                if (item.seleccionCatalogo != null) {

                                    if (item.seleccionCatalogo == ES_TELEFONO) {

                                        item.campoBdd = null;
                                        if (item.tipoUbicacion != null) {
                                            telefonoCarga = true;
                                        }
                                    } else if (item.seleccionCatalogo == ES_DIRECCION) {

                                        item.campoBdd = null;
                                        if (item.tipoUbicacion != null) {
                                            direccion = true;
                                        }
                                    } else if (item.seleccionCatalogo == ES_MONTO) {

                                        item.campoBdd = null;
                                        monto = true;

                                    } else if (item.seleccionCatalogo == ES_CONTROL) {

                                        item.campoBdd = null;

                                    } else if (item.seleccionCatalogo == ES_TASA) {
                                        item.campoBdd = null;
                                        tasa = true;

                                    } else if (item.seleccionCatalogo == ES_PLAZO) {
                                        item.campoBdd = null;
                                        plazo = true;
                                    }
                                    else {
                                        item.campoBdd = null;
                                    }
                                }
                                else if (item.campoBdd != null) {

                                    if (item.campoBdd == TIPO_IDENTIFICACION) {
                                        tipoIdentificacion = true;
                                    } else if (item.campoBdd == IDENTIFICACION) {
                                        identificacion = true;
                                    } else if (item.campoBdd == NOMBRE_CLIENTE) {
                                        nombreCliente = true;
                                    }
                                } else if (item.campoBdd == null) {
                                    bloqueoGeneral = false;
                                }
                            }

                        }
                    }
                );

                ////VALIDACIONES DE BOTON DE GUARDAR(BLOQUEO) CUANDO NO SE ASIGNA IDENTIFICACION, NOMBRE CLIENTE, ES TELEFONO
                if (props.tipoCampania == VENTASESPECIAL) {
                    if (identificacion && nombreCliente && telefonoCarga && direccion && bloqueoGeneral && monto && tasa && plazo && tipoIdentificacion) {
                        props.setvalidarCampos(true);
                    } else {
                        props.setvalidarCampos(false);
                    }
                } else {
                    if (identificacion && nombreCliente && telefonoCarga && direccion && bloqueoGeneral && producto && tipoIdentificacion) {
                        props.setvalidarCampos(true);
                    } else {
                        props.setvalidarCampos(false);
                    }
                }

            }}
        />
    );

}

export default GrdCampaniaEspecialNuevoLista;
