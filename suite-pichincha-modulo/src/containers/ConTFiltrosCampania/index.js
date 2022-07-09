import React, { useEffect, useContext } from "react";
import ComPCampania from "../../componentes/ComPCampania";
import Paper from "@material-ui/core/Paper";//contenedor de la forma
import { Form } from 'react-final-form';
import { Popup, ProgressBar, CustomAppBar, PopUpAlert } from "odc-common";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { useObtenerPerfilCRM } from "../../hooks/FiltroCampania";
import { commonStyles } from "odc-common";
import { withStyles } from "@material-ui/core/styles";
const PopupWrapped = withStyles(commonStyles)(Popup);
import MasterAsignacionAsesor from "../../containers/ConTAsignacionAsesor";
import MasterAgrupacionFiltros from "../../containers/ConTAgrupacionFiltros";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import StorageIcon from '@material-ui/icons/Storage';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Context } from "../../context/ContextReparticionCampania";
import { useDispatch } from 'react-redux';

const onSubmit = async values => {

}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}
const TabPanel = props => {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            <Box p={3}>{children}</Box>
        </Typography>
    );
};

const MasterFiltrosCampania = (props) => {

    let {isConnected, hubConnection} = props;
    
    const { profileCode, idInstitution,
        value, setValue,
        popUpRecursos,
        numeroClientes,
        setEsPerfilCRM,
        setOficinasCRM,
        accionFormulario, setAccionFormulario,
        despliegueOperacion, setdespliegueOperacion,
        campanias, isLoadingCampanias,
        banderaRefrescar, setbanderaRefrescar,
        isLoadingCatalogs } = useContext(Context);


    const dispatch = useDispatch();

    React.useEffect(() => {

        const subscribeEvents = async () => {
            hubConnection.on("CAMPAIGN_File_Loaded", () => {
                setbanderaRefrescar(!banderaRefrescar);
            });
        };

        if (isConnected) subscribeEvents();

        return () => {
            if (hubConnection) {
                hubConnection.off("CAMPAIGN_File_Loaded");

            }
        };
    }, [isConnected, hubConnection, banderaRefrescar, setbanderaRefrescar]);

    function handleChange(event, newValue) {
        sessionStorage.setItem("_tabSeleccionada", String(newValue));
        setValue(newValue);
    }

    useEffect(() => {
        useObtenerPerfilCRM(profileCode, idInstitution, setEsPerfilCRM, setOficinasCRM, setAccionFormulario, dispatch);

    }, [0]);

    if (isLoadingCatalogs || isLoadingCampanias) return (<ProgressBar />);

    return (
        <Form
        subscription={{ valid: true, submitting: true }}
            onSubmit={onSubmit}
            initialValues={{ reparticion: "distribucion" }}
            render={({ form, handleSubmit }) => (
                <form onSubmit={handleSubmit}>                   
                    <Paper>

                        <CustomAppBar>
                            <div className="row form-row" >
                                <div>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        aria-label="Reparticion"
                                    >
                                        <Tab label="Campaña" icon={<StorageIcon />} {...a11yProps(0)} />
                                        <Tab label="Repartición" icon={<SupervisorAccountIcon />} {...a11yProps(1)} />
                                    </Tabs>
                                </div>

                            </div>
                        </CustomAppBar>



                        <TabPanel value={value} index={0}>
                            <ComPCampania
                                campanias={campanias}
                                form={form}
                            />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <MasterAgrupacionFiltros />
                        </TabPanel>


                        <PopupWrapped
                            open={popUpRecursos} // popup
                            title={"RECURSOS - CLIENTES POR ASIGNAR: " + (numeroClientes == null ? 0 : numeroClientes)}
                            size={"sm"}
                            component={
                                <MasterAsignacionAsesor />
                            }
                        />

                        <PopUpAlert
                            type={despliegueOperacion.tipo}
                            show={despliegueOperacion.despliegue}
                            title={despliegueOperacion.titulo}
                            message={despliegueOperacion.mensaje}
                            onConfirm={() =>
                                setdespliegueOperacion({
                                    despliegue: false,
                                    mensaje: " ",
                                    tipo: "warning"
                                })}
                        />
                        
                        {accionFormulario &&
                        <ProgressBar />
                        }

                    </Paper>
                </form >
            )}
        />
    );

}

export default MasterFiltrosCampania;