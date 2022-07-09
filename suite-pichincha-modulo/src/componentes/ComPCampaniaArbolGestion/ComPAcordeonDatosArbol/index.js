import React from "react";
import { Form, Field } from "react-final-form";
import { useCatalogs } from "odc-configuration";
import { OnChange } from "react-final-form-listeners";
import MenuItem from "@material-ui/core/MenuItem";
import {
    IntlMessages,
    required,
    emptyItem,
    renderTextField,
    renderSelectField,
    renderDateField,
    composeValidators,
    maxLength,
    minLength,
    renderSwitch
} from "odc-common";

const AcordeonDatosArbol = (props) => {
    const {
        setOirPopupArbol
    } = props;
    const onSubmit = async values => { }
    const handleClose = () => {
        setOirPopupArbol(false);
    }
    const catalogsList = [
        "TipoArbolGestion"
    ];
    const { catalogs, isLoadingCatalogs } = useCatalogs(catalogsList.join(","));
    //catalogs !== null && console.log("AcordeonDatosArbol catalog:  ", catalogs.TipoArbolGestion)
    
    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            onSubmit={onSubmit}
            initialValues={{}} //trae de base de datos los árboles
            render={({ handleSubmit }) => (
                <div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                            <Field
                                name={"tipoarbol"}
                                defaultValue={catalogs !== null && Object.values(catalogs.TipoArbolGestion)[0].Code}
                                label={<IntlMessages id="campania.campaniaarbolgestion.tipoarbol" />}
                                validate={required}
                                component={renderSelectField}
                                isClearable
                                subscription={{ value: true, error: true, touched: true }}                                
                            >
                                {catalogs !== null && emptyItem
                                    .concat(catalogs["TipoArbolGestion"])
                                    .map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.code} primarytext={item.description}>
                                                {" "}
                                                {item.description}{" "}
                                            </MenuItem>
                                        );
                                    })}
                            </Field>                            
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                            <Field
                                name="nombrearbol"
                                label={<IntlMessages id="campania.campaniaarbolgestion.nombrearbol" />}
                                validate={required}
                                component={renderTextField}
                                subscription={{ value: true, error: true, touched: true }}
                                component={renderTextField}
                                validate={composeValidators(
                                    required,
                                    minLength(5),
                                    maxLength(16)
                                )}
                            />
                        </div>

                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-4">
                            <Field
                                name="descripcioncarga"
                                label={<IntlMessages id="campania.campaniaarbolgestion.descripcioncarga" />}
                                validate={required}
                                component={renderTextField}
                                subscription={{ value: true, error: true, touched: true }}
                                validate={composeValidators(
                                    required,
                                    minLength(5),
                                    maxLength(64)
                                )}
                                />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                            <Field
                                type="checkbox"
                                defaultValue={0}
                                name={'copiarplantilla'}
                                label={<IntlMessages id="campania.campaniaarbolgestion.copiarplantilla" />}
                                component={renderSwitch}
                                subscription={{ value: true, error: true, touched: true }}
                            />
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-3">
                            <Field
                                type="checkbox"
                                defaultValue={1}
                                name={'isActive'}
                                label={<IntlMessages id="campania.campaniaarbolgestion.esactivo" />}
                                component={renderSwitch}
                                subscription={{ value: true, error: true, touched: true }}
                            />
                        </div>
                    </div>
                </div>
            )}
        />
    );
}

export default AcordeonDatosArbol;


