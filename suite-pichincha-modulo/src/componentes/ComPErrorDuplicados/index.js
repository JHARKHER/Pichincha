import React from "react";
import { Field } from "react-final-form";
import { GenericGrid } from "odc-common";

const GrdErrorDuplicados = (props) => {
    var cont =1;
    var cont2 =1;
    props.objetoDuplicado.forEach(element => {
        element.id=cont;
        cont++;
    });
    props.objetoError.forEach(element => {
        element.id=cont2;
        cont2++;
    });
    return (
        <div>
            <h2 style={{"fontWeight":"bold"}}>DUPLICADOS</h2>
            <Field
                defaultValue={props.objetoDuplicado}
                name={"GrdDuplicados"}
                columns={[
                    { name: "identificacion", title: "Identificación" },
                    { name: "duplicados", title: "Veces Repetido" },
                    { name: "fechaCarga", title: "Fecha de Carga" },
                ]}
                dateColumns={["fechaCarga"]}
                component={GenericGrid}
                disableAdd
                disableEdit
                defaultFilters={[]}
                defaultCurrentPage={0}
                pageSize={10}
                disableInlineEditing
                subscription={{ value: true, error: true }}
            />
            <br></br>
            <h2 style={{"fontWeight":"bold"}}>ERRORES</h2>
            <Field
                defaultValue={props.objetoError}
                name={"GrdErrores"}
                columns={[
                    { name: "identificacion", title: "Identificación" },
                    { name: "fechaCarga", title: "Fecha de Carga" },
                    { name: "motivo", title: "Motivo Error" },
                ]}
                dateColumns={["fechaCarga"]}
                component={GenericGrid}
                disableAdd
                disableEdit
                defaultFilters={[]}
                defaultCurrentPage={0}
                pageSize={10}
                disableInlineEditing
                subscription={{ value: true, error: true }}
            />
        </div>
    );

}
export default GrdErrorDuplicados;
