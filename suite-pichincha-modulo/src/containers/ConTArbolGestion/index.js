import React, { useState } from "react";
import GrdCampaniaArbolGestion from "../../componentes/ComPCampaniaArbolGestion/ComPGridArbolGestion";
import PopupArbol from "../../componentes/ComPCampaniaArbolGestion/ComPPopupArbolGestion";
import PopupCampania from "../../componentes/ComPCampaniaArbolGestion/ComPPopupGridVerCampania";
import { withStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper"; //contenedor de la forma
import { IntlMessages, ActionButton, commonStyles, Popup } from "odc-common";
import SettingsIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/List';
import { Form } from 'react-final-form';
import { useObtenerArbol, useObtenerArbolCampania } from "../../hooks/AdminCampania";
import { useDispatch } from 'react-redux';

const PopupWrapped = withStyles(commonStyles)(Popup);

const MasterCampaniaArbolGestion = ({ }) => {
    const onSubmit = async values => { }
    const dispatch = useDispatch();

    const [errorArbolesCampania, isLoadingArbolesCampania] = useState(null);
    const [arbolesCampania, setarbolesCampania] = useState({});
    const [errorarbolesCampania, setErrorarbolesCampania] = useState(null);
    const [isLoadingarbolesCampania, setLoadingarbolesCampania] = useState(true);
    const { arboles, errorArboles, isLoadingArboles } = useObtenerArbol(dispatch);

    const divStyle = {
        width: '100%',
        align: 'left',
        margen: '20px',
        padding: '20px',
    }
    //Constantes para los Popus 
    const [oirPopupArbol, setOirPopupArbol] = useState(false);
    const [oirPopupCampania, setOirPopupCampania] = useState(false);
    const [IdArbolRespuesta, setIdArbolRespuesta] = useState(null);
    const [enableSelection, setenableSelection] = useState(true);

    const AbrirVentanaPopupAdmin = (event) => {
        setOirPopupArbol(true);
    }
    const AbrirVentanaPopupCampania = (event) => {
        setOirPopupCampania(true);
        useObtenerArbolCampania({
            IdArbolRespuesta,
            arbolesCampania,
            errorarbolesCampania,
            isLoadingarbolesCampania,
            setarbolesCampania,
            setErrorarbolesCampania,
            setLoadingarbolesCampania            
        });      
    }   

    const ValoresArbolesCampania = (e) => {
      
        if (enableSelection) {
            if (e.length > 0) {
                setIdArbolRespuesta(e[0].idArbolRespuesta);
               // let idArbolRes=e[0].idArbolRespuesta;
                useObtenerArbolCampania({
                    IdArbolRespuesta:e[0].idArbolRespuesta,
                    arbolesCampania,
                    errorarbolesCampania,
                    isLoadingarbolesCampania,
                    setarbolesCampania,
                    setErrorarbolesCampania,
                    setLoadingarbolesCampania
                });
            } else {
                setIdArbolRespuesta(null);
            }
            if(e.length ==0){
                setOirPopupCampania(true);
            }
        }
    }

    return (
        <Form
            subscription={{ valid: true, submitting: true }}
            onSubmit={onSubmit}
            initialValues={{ GrdCampaniaArbolGestion: arboles, PopupCampania: arbolesCampania }} //trae de base de datos los árboles
            render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit}>
                    <Paper>
                        <div style={divStyle}>
                            <div className="row">
                                <div className="cap_cabecera">
                                    <ActionButton size="large" style={{ "margin": "8px", "backgroundColor": "rgb(60, 141, 188)", "fontSize": "0.875rem" }}
                                        variant="contained" color="primary" type="submit"
                                        title={"Nuevo"}
                                        text={"Nuevo"}
                                        icon={<SettingsIcon />}
                                        onClick={event => AbrirVentanaPopupAdmin(event)} >
                                    </ActionButton>
                                    <PopupWrapped
                                        open={oirPopupArbol} // popup                                    
                                        title={" ADMINISTRACION DE ÁRBOL GESTIÓN"}
                                        size={"lg"}
                                        fullWidth={true}
                                        component={
                                            <PopupArbol
                                                setOirPopupArbol={setOirPopupArbol}
                                                oirPopupArbol={oirPopupArbol}
                                            />
                                        }
                                    />
                                </div>
                                <div className="cap_cabecera">
                                    <ActionButton size="large" style={{ "margin": "8px", "backgroundColor": "rgb(60, 141, 188)", "fontSize": "0.875rem" }}
                                        variant="contained" color="primary" type="submit"
                                        title={"Arbol Campania"}
                                        text={"Ver Árbol Campaña"}
                                        icon={<ListIcon />}
                                        onClick={event => AbrirVentanaPopupCampania(event)} >
                                    </ActionButton>
                                    <PopupWrapped
                                        open={oirPopupCampania} // popup                                         
                                        title={"ÁRBOL DE CAMPAÑA"}
                                        size={"lg"}
                                        component={
                                            <PopupCampania                                                                                         
                                                arbolesCampania={arbolesCampania}
                                                setOirPopupCampania={setOirPopupCampania}
                                            />
                                        }
                                    />
                                </div>
                            </div>
                            <br></br>
                            <div >
                                <h2 >
                                    <b>{<IntlMessages id="campania.campaniaarbolgestion.encabezadoarbolgestion" />}</b>
                                </h2 >
                            </div>
                            <div >
                                < GrdCampaniaArbolGestion
                                    enableSelection={enableSelection}
                                    ValoresArbolesCampania={ValoresArbolesCampania}
                                />
                            </div>
                        </div>
                    </Paper>
                </form>
            )}
        />
    );

}

export default MasterCampaniaArbolGestion;