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


const AcordeonNodosArbol = (props) => {
    const {
        setOirPopupArbol 
    } = props;
    const onSubmit = async values => { }
    const handleClose = () => {
        setOirPopupArbol(false);
    }
    
    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            onSubmit={onSubmit}
            initialValues={{}} //trae de base de datos los árboles
            render={({ handleSubmit }) => (
                <form>
                    
                </form>
            )}
        />
    );
}

export default AcordeonNodosArbol;


