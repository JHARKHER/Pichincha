import React, { useContext } from "react";
import { Field } from "react-final-form";
import { GenericGrid, checkDuplicates } from "odc-common";
import { Context } from "../../context/ContextReparticionCampania";

const GrdOrdenamientoReparticion = () => {
    const {
        columnaOrdenamiento, 
        setRowsOrdenamiento, 
        setdespliegueOperacion
    } = useContext(Context);
    var arregloOrden = new Array();
    let cont = 1;

    for (var i = 0; i < columnaOrdenamiento.length; i++) {
        var componentesRows = new Object();
        componentesRows.id = cont;
        arregloOrden.push(componentesRows);
        cont++;
    }

    const catalogs = {

        columnaArchivo: columnaOrdenamiento.map(item => {
            return {
                key: JSON.stringify(item),
                value: item.valor,
                name: item.valor
            }
        }),
        ordenPresentacion: arregloOrden.map(item => {
            return {
                key: item.id,
                value: item.id,
                name: item.id
            }
        }),
        presentacion: [{
            key: 1,
            value: "ascendente",
            name: "Ascendente"
        },
        {
            key: 2,
            value: "descendente",
            name: "Descendente"
        }]

    };

    return (
        <Field
            name={"GrdOrdenamientoReparticion"}
            columns={[
                { name: "columnaArchivo", title: "Columna Archivo" },
                { name: "ordenPresentacion", title: "Orden Presentación" },
                { name: "presentacion", title: "Presentación" },
            ]}

            selectColumns={["columnaArchivo", "ordenPresentacion", "presentacion"]}
            component={GenericGrid}
            defaultSorting={[{ columnName: 'columnaArchivo', direction: 'asc' }]}

            gridValidate={row => {
                const errors = {};
                if (!row.columnaArchivo) errors.columnaArchivo = "Requerido";

                if (!row.ordenPresentacion) errors.ordenPresentacion = "Requerido";

                if (!row.presentacion) errors.presentacion = "Requerido";

                return errors;
            }}
            commitValidate={e => {
                const isValid = checkDuplicates(
                    e.map(row => {
                        var arreglo = JSON.parse(row.columnaArchivo);
                        return arreglo.valor;
                    })
                );

                if (isValid) {
                    setdespliegueOperacion({
                        despliegue: true,
                        mensaje: "Ya ha ingresado un registro con el mismo nombre de columna",
                        tipo: "warning"
                    })
                    return isValid;
                } else {

                    setRowsOrdenamiento(e);
                    return isValid;
                }
            }}
            defaultFilters={[]}
            defaultCurrentPage={0}
            pageSize={10}
            catalogs={catalogs}
            subscription={{ value: true, error: true }}
        />
    );
}

export default GrdOrdenamientoReparticion;
