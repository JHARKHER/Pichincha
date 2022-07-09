import React, { useContext } from "react";
import { Field } from "react-final-form";
import { GenericGrid } from "odc-common";
import { Context } from "../../context/ContextReasignacionCampania";

const ComPAsesoresArchivo = () => {

  let { enablePlaceholder, enableSelection, rows } = useContext(Context);

  const defaultWidths = [
    { columnName: "identificacion" },
    { columnName: "usernameAsignar" },

  ];

  return (
    <Field
      defaultValue={rows}
      name={"ComPAsesoresArchivo"}
      columns={[
        { name: "identificacion", title: "Identificación" },
        { name: "usernameAsignar", title: "Username Asignar" }
      ]}
      tableColumnExtensions={defaultWidths}
      stringColumns={["identificacion", "usernameAsignar"]}
      enablePlaceholder={enablePlaceholder}
      component={GenericGrid}
      disableAdd
      disableEdit
      defaultFilters={[]}
      defaultCurrentPage={0}
      pageSize={5}
      disableInlineEditing
      subscription={{ value: true, error: true }}
      enableSelection={false}
    />
  );
}
export default ComPAsesoresArchivo;
