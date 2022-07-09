import React, { useContext } from "react";
import { OnChange } from "react-final-form-listeners";
import { IntlMessages } from "odc-common";
import { Field } from 'react-final-form'
import MenuItem from "@material-ui/core/MenuItem";
import { CancelButton, SaveButton, ProgressBar } from "odc-common";
import GrdRecursos from "../../componentes/ComPRecursos";
import { FormSpy } from 'react-final-form';
import { Context } from "../../context/ContextReparticionCampania";
import {
    emptyItem,
    renderSelectField
} from "odc-common";

const MasterAsignacionAsesor = (props) => {
    let { reasignacion } = props
    let {
        esPerfilCRM, oficinasCRM,
        CambiarAsesoresAsignacion,
        oficinaTexto, accionFormulario,
        setPopUpRecursos, setRowsRecursos,
        rowsRecursos,
        setOficinaTexto
    } = reasignacion ? props : useContext(Context);

    const aceptarCambiosAsesor = (values) => {
        setRowsRecursos(values.GrdRecursos);
        setOficinaTexto(values.oficinas);
        setPopUpRecursos(false);
    }

    const CerrarVentana = () => {
        setRowsRecursos([]);
        setOficinaTexto(null);
        setPopUpRecursos(false);
    }

    return (

        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
            <div>
                {esPerfilCRM &&
                    <Field
                        defaultValue={oficinaTexto}
                        name={"oficinas"}
                        label={<IntlMessages id="campania.campaniafiltros.oficinas" />}
                        isClearable
                        component={renderSelectField}
                        subscription={{ value: true, error: true, touched: true }}
                    >
                        {emptyItem
                            .concat(oficinasCRM)
                            .map((item, index) => {
                                return (
                                    <MenuItem key={index} value={item.idOffice} primarytext={item.name}>
                                        {" "}
                                        {item.name}{" "}
                                    </MenuItem>
                                );
                            })}
                    </Field>

                }
                <OnChange name={"oficinas"}>
                    {(value, previous) => { CambiarAsesoresAsignacion(value) }}
                </OnChange>
            </div>
            <GrdRecursos
                reasignacion={reasignacion}
                rowsRecursos={rowsRecursos}
            />
            <div style={{ "textAlign": "right" }}>
                <FormSpy subscription={{ values: true }}>
                    {({ values }) => (
                        <SaveButton onClick={() => aceptarCambiosAsesor(values)} />
                    )}
                </FormSpy>

                <CancelButton onClick={() => CerrarVentana()} />
            </div>
            {accionFormulario &&
                <ProgressBar />
            }
        </div>
    )
}

export default MasterAsignacionAsesor;