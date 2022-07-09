import React from "react";
import { Field } from "react-final-form";
import { GenericGrid } from "odc-common";
function GrdFiltrosSeleccionados() {

    return (
        <Field
            name={"GrdFiltrosSeleccionados"}
            columns={[
                { name: "columnaArchivo", title: "Campo" },
                { name: "campoBdd", title: "Campo BDD" },
                { name: "filtroCampania", title: "Operador" },
                { name: "valor", title: "Valor" },
            ]}
            stringColumns={["columnaArchivo", "campoBdd", "filtroCampania"]}
            numberColumns={["valor"]}
            component={GenericGrid}
            disableAdd
            disableEdit
            defaultSorting={[{ columnName: 'columnaArchivo', direction: 'asc' }]}
            defaultFilters={[]}
            defaultCurrentPage={0}
            pageSize={10}
            disableInlineEditing
            subscription={{ value: true, error: true }}
        />
    );
}

export default GrdFiltrosSeleccionados;
