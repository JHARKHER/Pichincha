import React, { useContext, useEffect } from "react";
import { Field } from "react-final-form";
import { GenericGrid } from "odc-common";
import { Context } from "../../context/ContextReparticionCampania";

const GrdCampania = (props) => {

  const { form, campanias } = props;
  let { enablePlaceholder, enableSelection, CambioValor } = useContext(Context);

  if (enableSelection == undefined, CambioValor == undefined) {
    enableSelection = props.enableSelection;
    CambioValor = props.CambioValor;
  }


  const defaultWidths = [
    { columnName: "nombreCampania", width: 300 },
    { columnName: "tipoCampania", width: 200 },
    { columnName: "numeroRegistros", width: 120 },
    { columnName: "numeroRecursoAsignados", width: 120 },
    { columnName: "estado", width: 200 },
    { columnName: "fechaInicio", width: 200 },
    { columnName: "fechaFin", width: 200 },
    { columnName: "fechaActualizacion", width: 200 },
    { columnName: "nombreUsuarioCreacion", width: 200 }
  ];

  return (
    <Field
      name={"GrdCampania"}
      defaultValue={campanias}
      columns={[
        { name: "nombreCampania", title: "Campaña" },
        { name: "tipoCampania", title: "Tipo Campaña" },
        { name: "numeroRegistros", title: "N° Registros" },
        { name: "numeroRecursoAsignados", title: "Recursos Asignados" },
        { name: "estado", title: "Estado" },
        { name: "fechaInicio", title: "Fecha Inicio" },
        { name: "fechaFin", title: "Fecha Fin" },
        { name: "fechaActualizacion", title: "Fecha Actualización" },
        { name: "nombreUsuarioCreacion", title: "Usuario Creación" },
      ]}
      tableColumnExtensions={defaultWidths}
      stringColumns={["nombreCampania", "tipoCampania", "estado"]}
      numberColumns={["numeroRegistros", "numeroRecursoAsignados"]}
      dateColumns={["fechaInicio", "fechaFin", "fechaActualizacion"]}
      enablePlaceholder={enablePlaceholder}
      component={GenericGrid}
      disableAdd
      disableEdit
      defaultFilters={[]}
      defaultCurrentPage={0}
      pageSize={10}
      disableInlineEditing
      subscription={{ value: true, error: true }}
      enableSelection={enableSelection}
      onSelectionChange={(e) => CambioValor(e, form)}
      enableColumnResizing
      defaultColumnWidths={defaultWidths}
    />

  );

}



export default GrdCampania;
