import React, { useContext } from 'react';
import { Field } from 'react-final-form';
import { GenericGrid } from "odc-common";
import { Context } from "../../context/ContextReparticionCampania";

function GrdRecursos(props) {
    const { reasignacion } = props

    const { rowsRecursos } =  reasignacion ? props : useContext(Context);
    return (
        <Field
            defaultValue={rowsRecursos}
            name={"GrdRecursos"}
            columns={[
                { name: "esActivo", title: "Seleccionar" },
                { name: "nombreRecurso", title: "Nombre", disabled: true }
            ]}
            tableColumnExtensions={[
                { columnName: "esActivo", width: 150 },
                { columnName: "nombreRecurso", width: 350 },
            ]}
            booleanColumns={["esActivo"]}
            stringColumns={["nombreRecurso"]}
            component={GenericGrid}
            subscription={{ value: true, error: true }}
            defaultSorting={[{ columnName: 'id', direction: 'asc' }]}
            defaultFilters={[]}
            disableAdd
            disableEdit
            defaultCurrentPage={0}
            pageSize={10}
            enableInlineEditing
        />
    );

}

export default GrdRecursos;
