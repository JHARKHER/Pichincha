import React from "react";
import { Field } from "react-final-form";
import { GenericGrid } from "odc-common";
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';

const GrdCampaniaArbolGestion = (props) => {
    const {
        ValoresArbolesCampania, enableSelection
    } = props;
    
    return (
        <Field
            name={"GrdCampaniaArbolGestion"}
            columns={[
                { name: "tipoArbol", title: "Tipo Arbol" },
                { name: "descripcion", title: "Descripción" },
            ]}
            stringColumns={["tipoArbol", "descripcion"]}
            component={GenericGrid}
            disableAdd
            disableEdit
            defaultFilters={[]}
            defaultCurrentPage={0}
            pageSize={10}
            subscription={{ value: true, error: true }}
            //handleSelection
            enableSelection={enableSelection}
            handleClickEdit={ValoresArbolesCampania}
            onSelectionChange={ValoresArbolesCampania}
            //onSelectionChange={(e) => ValoresArbolesCampania(e)}

        />
    );
}
export default GrdCampaniaArbolGestion;
