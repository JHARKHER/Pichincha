import React, { useState } from "react";
import GrdCampania from "../../componentes/ComPCampania";
import GrdErrorDuplicados from "../../componentes/ComPErrorDuplicados"
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Alert } from 'reactstrap';
import { IntlMessages, ProgressBar, TransacitionalButtonGroup, Tooltip, PopUpAlert, Popup, commonStyles, CancelButton } from "odc-common";
import Paper from "@material-ui/core/Paper";//contenedor de la forma
import { Form } from 'react-final-form'
import { useObtenerCampania, useObtenerCedente, useObtenerArbol, useGuardarCampania, useObtenerCodigoCampania } from "../../hooks/AdminCampania";
import MasterInfoCampania from '../ConTInfoCampania';
import { useDispatch } from 'react-redux';
import { withStyles } from "@material-ui/core/styles";
import { VENTASESPECIAL, ENCUESTA, OTROS, VENTASNOESPECIAL } from '../../Constantes'
const PopupWrapped = withStyles(commonStyles)(Popup);

const MasterCampania = (props) => {

  let { isConnected, hubConnection } = props;

  const dispatch = useDispatch();

  const divStyle = {
    width: '100%',
    align: 'left',    
  }

  const [despliegueOperacion, setdespliegueOperacion] = useState({
    despliegue: false,
    mensaje: "",
    tipo: "info",
    titulo: ""
  })
  const [bloqueoCampos, setBloqueoCampos] = useState(false);
  const [openWindow, setopenWindow] = useState(false);
  const [subCampaniaVisible, setsubCampaniaVisible] = useState(false);
  const [campaniaComboMostrar, setcampaniaComboMostrar] = useState(false);
  const [enableSelection, setenableSelection] = useState(true);
  const [objetoCampania, setObjetoCampania] = useState({});
  const [IdCabeceraArchivo, setIdCabeceraArchivo] = useState(null);
  const [IdCampania, setIdCampania] = useState(null);
  const [estadoCampania, setestadoCampania] = useState(false);

  const [banderaRefrescar, setbanderaRefrescar] = useState(false);

  const { campanias, isLoadingCampanias } = useObtenerCampania(banderaRefrescar, dispatch);
  const { cedentes, errorCedentes, isLoadingCedentes } = useObtenerCedente(dispatch);
  const { arboles, errorArbol, isLoadingArbol } = useObtenerArbol(dispatch);
  const { codigoCampania, isLoadingCodigoCampania } = useObtenerCodigoCampania(dispatch);

  const [showProgressBarArchivo, setshowProgressBarArchivo] = useState(false);
  const [showProgressBarArchivoExitoso, setshowProgressBarArchivoExitoso] = useState(false);
  const [showProgressBarArchivoEliminado, setshowProgressBarArchivoEliminado] = useState(false);
  const [showProgressBarArchivoEliminadoExitoso, setshowProgressBarArchivoEliminadoExitoso] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [noRender, setNoRender] = useState(0);
  const [utlimoObjeto, setUtlimoObjeto] = useState(null);
  const [estado, setestado] = useState(null);
  const [dotJson, setDotJson] = useState([]);

  React.useEffect(() => {
    sessionStorage.setItem('noRenderizar', noRender);
  }, [noRender]);

  React.useEffect(() => {
    sessionStorage.setItem('ultimoObjeto', utlimoObjeto);
  }, [utlimoObjeto]);


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
  /////
  //VARIABLES DE INFORMACION DE CAMPAÑA
  const [cedente, setcedente] = useState(null);
  const [nombre, setnombre] = useState(null);
  const [fechahorainicio, setfechahorainicio] = useState(null);
  const [fechahorafin, setfechahorafin] = useState(null);
  const [arbol, setarbol] = useState(null);
  const [subCampania, setsubCampania] = useState(null);
  const [tipoCierreCampania, settipoCierreCampania] = useState(null);
  const [tipoCampania, settipoCampania] = useState(null);
  const [fieldcodigoCampania, setfieldcodigoCampania] = useState(null);

  const [sms, setsms] = useState(false);
  const [carta, setcarta] = useState(false);
  const [whatsapp, setwhatsapp] = useState(false);
  const [mailing, setmailing] = useState(false);

  const [subCampaniaEditar, setSubCampaniaEditar] = useState(false);
  const [esNuevo, setEsNuevo] = useState(false);
  const [estadoDeCampania, setestadoDeCampania] = useState("");

  //VARIABLES DE INFORMACION DE ARCHIVO
  const [nombreArchivoinfo, setnombreArchivoinfo] = useState(null);
  const [fechaCargainfo, setfechaCargainfo] = useState(null);
  const [numeroRegistro, setnumeroRegistro] = useState(null);
  const [registroError, setregistroError] = useState(null);
  const [registroClienteDuplicado, setregistroClienteDuplicado] = useState(null);
  const [reparteclientesotrascampañas, setreparteclientesotrascampañas] = useState(null);
  const [clienteotracampania, setclienteotracampania] = useState(null);
  const [duplicadoError, setDuplicadoError] = useState(false);
  const [objetoDuplicado, setobjetoDuplicado] = useState([]);
  const [objetoError, setobjetoError] = useState([]);

  const [productoCodigo, setProductoCodigo] = useState(null);
  const [subProductoCodigo, setSubProductoCodigo] = useState(null);

  const onSubmit = async values => {

    let producto;
    let subProducto;



    codigoCampania.some(
      item => {
        if (item.nombreCampaniaCarga == values.codigoCampania) {
          setProductoCodigo(item.producto);
          producto = item.producto;
          subProducto = item.subProducto;
          setSubProductoCodigo(item.subProducto);
        }
      }
    );

    if (values.tipoCampania == ENCUESTA || values.tipoCampania == VENTASESPECIAL || values.tipoCampania == OTROS) {



      if (objetoCampania.rutaArchivo != undefined && objetoCampania.dotJson.length > 0) {
        let tempIdCampania;
        if (values.tipoCampania == VENTASESPECIAL) {
          campanias.some(
            item => {

              if (item.codigoCampania == values.codigoCampania && item.tipoCampania == VENTASNOESPECIAL && item.estado != "FINALIZADA") {
                tempIdCampania = item.idCampania;
              }
            }
          );
        }
        setNoRender(1);
        useGuardarCampania(
          values,
          objetoCampania,
          setIdCabeceraArchivo,
          IdCabeceraArchivo,
          setshowProgressBarArchivo,
          setshowProgressBarArchivoExitoso,
          setdespliegueOperacion,
          setestado,
          setIdCampania,
          IdCampania,
          productoCodigo == null ? producto : productoCodigo,
          subProductoCodigo == null ? subProducto : subProductoCodigo,
          noRender,
          setNoRender,
          setestadoCampania,
          setnumeroRegistro,
          setregistroError,
          setregistroClienteDuplicado,
          setEsNuevo,
          setestadoDeCampania,
          setshowProgressBarArchivoEliminado,
          setshowProgressBarArchivoEliminadoExitoso,
          setDuplicadoError,
          setobjetoDuplicado,
          setobjetoError,
          setGuardando,
          dispatch,
          tempIdCampania

        );
      } else {
        setdespliegueOperacion({
          despliegue: true,
          mensaje: "Para este tipo de campaña se requiere subir un archivo ",
          tipo: "warning"
        });
      }
    } else {
      useGuardarCampania(
        values,
        objetoCampania,
        setIdCabeceraArchivo,
        IdCabeceraArchivo,
        setshowProgressBarArchivo,
        setshowProgressBarArchivoExitoso,
        setdespliegueOperacion,
        setestado,
        setIdCampania,
        IdCampania,
        productoCodigo == null ? producto : productoCodigo,
        subProductoCodigo == null ? subProducto : subProductoCodigo,
        noRender,
        setNoRender,
        setestadoCampania,
        setnumeroRegistro,
        setregistroError,
        setregistroClienteDuplicado,
        setEsNuevo,
        setestadoDeCampania,
        setshowProgressBarArchivoEliminado,
        setshowProgressBarArchivoEliminadoExitoso,
        setDuplicadoError,
        setobjetoDuplicado,
        setobjetoError,
        setGuardando,
        dispatch,

      );
    }

  }

  const NuevaCampania = () => {
    setopenWindow(true);
    setEsNuevo(true);
    setNoRender(0);
  }
  const CambioValor = (e) => {
    setNoRender(0);
    if (e.length > 0)
      setUtlimoObjeto(JSON.stringify(e[0]));

    if (JSON.parse(sessionStorage.getItem('ultimoObjeto')) && e.length == 0) {
      var jsonObjeto = sessionStorage.getItem('ultimoObjeto');
      var objeto = JSON.parse(jsonObjeto);
      if (objeto.tipoCampania == VENTASESPECIAL) {
        setsubCampaniaVisible(true);
        setSubCampaniaEditar(true);
        setcampaniaComboMostrar(false);
      }
      else if (objeto.tipoCampania == OTROS || objeto.tipoCampania == ENCUESTA) {
        setsubCampaniaVisible(true);
        setcampaniaComboMostrar(true);
        setSubCampaniaEditar(true);
      }
      else if (objeto.tipoCampania != OTROS && objeto.tipoCampania != ENCUESTA &&
        objeto.tipoCampania != "" && objeto.tipoCampania != null) {
        setSubCampaniaEditar(true);
        setsubCampaniaVisible(false);
        setcampaniaComboMostrar(false);
      }
      else {
        setsubCampaniaVisible(false);
        setSubCampaniaEditar(false);
        setcampaniaComboMostrar(false);
      }
      setIdCampania(objeto.idCampania);

      setcedente(objeto.codigoCedente);
      setnombre(objeto.nombreCampania);
      setfechahorainicio(new Date(objeto.fechaInicio));
      setfechahorafin(new Date(objeto.fechaFin));
      setarbol(objeto.idArbolRespuesta);
      settipoCierreCampania(objeto.tipoCierreCampania);
      settipoCampania(objeto.tipoCampania);
      setfieldcodigoCampania(objeto.codigoCampania);
      setsms(objeto.sms);
      setcarta(objeto.carta);
      setwhatsapp(objeto.whatsapp);
      setmailing(objeto.mailing);
      setestadoCampania(objeto.seProceso);
      setestadoDeCampania(objeto.estado);
      if (objeto.campaniaArchivo.length > 0)
        setIdCabeceraArchivo(objeto.campaniaArchivo[0].idCabeceraArchivo);

      if (objeto.cabeceraArchivo != null) {
        setnombreArchivoinfo(objeto.cabeceraArchivo.nombreArchivo);
        setfechaCargainfo(objeto.cabeceraArchivo.fechaCarga == null ? null : new Date(objeto.cabeceraArchivo.fechaCarga));
        setnumeroRegistro(objeto.cabeceraArchivo.registroCargado);
        setregistroError(objeto.cabeceraArchivo.registroError);
        setregistroClienteDuplicado(objeto.cabeceraArchivo.registroClienteDuplicado);
        setestado(objeto.cabeceraArchivo.estado);
      }
      setopenWindow(true);
    }

  }
  const estilo = {
    display: openWindow == true ? "none" : "block"
  }

  if (isLoadingCampanias || isLoadingCedentes || isLoadingArbol || isLoadingCodigoCampania) return (<ProgressBar />);


  const listadoCampania = () => {

    return (
      <Paper style={divStyle}>
        <AppBar style={estilo} position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <ListAltIcon />
            </IconButton>
            <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
              {<IntlMessages id="campania.datoscampania.contcreacioncampania" />}
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={estilo}>

          <TransacitionalButtonGroup
            onClickNew={() => NuevaCampania()}
            hidePrint
            hideDelete
            hideEdit
            style={{ "margin": "8px" }}
          />
        </div>

        <div style={estilo} className="cap_form_control">
          <GrdCampania
            campanias={campanias}
            enableSelection={enableSelection}
            CambioValor={CambioValor}
            banderaRefrescar={banderaRefrescar}
            setbanderaRefrescar={setbanderaRefrescar}
            {...props}
          />
        </div>
      </Paper>
    )
  }


  return (


    <Form
      subscription={{ valid: true, submitting: true }}
      onSubmit={onSubmit}
      validate={values => {
        const errors = {};
        if (values.tipoCampania && values.codigoCampania && values.nombre && values.fechahorainicio && values.fechahorafin && values.arbol) {
          setBloqueoCampos(true);
        }else{
          setBloqueoCampos(false);
        }
        if (
          Date.parse(values.fechahorafin) <
          Date.parse(values.fechahorainicio)
        )
          errors["fechahorafin"] =
            "La fecha final debe ser mayor que fecha inicial";

        return errors;
      }}
      render={({ form, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>

            {listadoCampania()}

            {openWindow &&
              <div className="cap_form_control">
                <MasterInfoCampania
                  bloqueoCampos={bloqueoCampos}
                  cedentes={cedentes}
                  arboles={arboles}
                  codigoCampania={codigoCampania}
                  subCampaniaVisible={subCampaniaVisible}
                  handleSubmit={handleSubmit}
                  IdCabeceraArchivo={IdCabeceraArchivo}
                  estado={estado}
                  estadoCampania={estadoCampania}
                  IdCampania={IdCampania}
                  form={form}
                  cedente={cedente}
                  nombre={nombre}
                  fechahorainicio={fechahorainicio}
                  fechahorafin={fechahorafin}
                  arbol={arbol}
                  subCampania={subCampania}
                  tipoCierreCampania={tipoCierreCampania}
                  tipoCampania={tipoCampania}
                  fieldcodigoCampania={fieldcodigoCampania}
                  sms={sms}
                  carta={carta}
                  whatsapp={whatsapp}
                  mailing={mailing}
                  subCampaniaEditar={subCampaniaEditar}
                  nombreArchivoinfo={nombreArchivoinfo}
                  fechaCargainfo={fechaCargainfo}
                  numeroRegistro={numeroRegistro}
                  registroError={registroError}
                  registroClienteDuplicado={registroClienteDuplicado}
                  reparteclientesotrascampañas={reparteclientesotrascampañas}
                  clienteotracampania={clienteotracampania}
                  campaniaComboMostrar={campaniaComboMostrar}
                  esNuevo={esNuevo}
                  campanias={campanias}
                  estadoDeCampania={estadoDeCampania}
                  guardando={guardando}
                  objetoCampania={objetoCampania}
                  noRender={noRender}
                  dotJson={dotJson}

                  setDotJson={setDotJson}
                  setestadoDeCampania={setestadoDeCampania}
                  setcedente={setcedente}
                  setnombre={setnombre}
                  setfechahorainicio={setfechahorainicio}
                  setfechahorafin={setfechahorafin}
                  setarbol={setarbol}
                  setsubCampania={setsubCampania}
                  settipoCierreCampania={settipoCierreCampania}
                  settipoCampania={settipoCampania}
                  setfieldcodigoCampania={setfieldcodigoCampania}
                  setSubCampaniaEditar={setSubCampaniaEditar}
                  setsms={setsms}
                  setcarta={setcarta}
                  setwhatsapp={setwhatsapp}
                  setmailing={setmailing}
                  setnombreArchivoinfo={setnombreArchivoinfo}
                  setfechaCargainfo={setfechaCargainfo}
                  setnumeroRegistro={setnumeroRegistro}
                  setregistroError={setregistroError}
                  setregistroClienteDuplicado={setregistroClienteDuplicado}
                  setreparteclientesotrascampañas={setreparteclientesotrascampañas}
                  setclienteotracampania={setclienteotracampania}
                  setObjetoCampania={setObjetoCampania}
                  setopenWindow={setopenWindow}
                  setsubCampaniaVisible={setsubCampaniaVisible}
                  setcampaniaComboMostrar={setcampaniaComboMostrar}
                  setIdCabeceraArchivo={setIdCabeceraArchivo}
                  setshowProgressBarArchivo={setshowProgressBarArchivo}
                  setshowProgressBarArchivoExitoso={setshowProgressBarArchivoExitoso}
                  setshowProgressBarArchivoEliminado={setshowProgressBarArchivoEliminado}
                  setshowProgressBarArchivoEliminadoExitoso={setshowProgressBarArchivoEliminadoExitoso}
                  setestado={setestado}
                  setIdCampania={setIdCampania}
                  setestadoCampania={setestadoCampania}
                  setdespliegueOperacion={setdespliegueOperacion}
                  setEsNuevo={setEsNuevo}
                  setDuplicadoError={setDuplicadoError}
                  setobjetoDuplicado={setobjetoDuplicado}
                  setobjetoError={setobjetoError}
                  setGuardando={setGuardando}
                  setNoRender={setNoRender}
                />
                {guardando &&

                  <ProgressBar />

                }

                {showProgressBarArchivo && <Alert className="alert-addon-card bg-info bg-info text-white shadow-lg alert alert-success alert-dismissible fade show">
                  <span className="icon-addon alert-addon">
                    <i className="zmdi zmdi-info zmdi-hc-fw zmdi-hc-lg" />
                  </span>
                  <span className="d-inline-block">Guardando Archivo</span>
                </Alert>}
                {showProgressBarArchivoExitoso && <Alert className="alert-addon-card bg-success bg-success text-white shadow-lg alert alert-success alert-dismissible fade show">
                  <span className="icon-addon alert-addon">
                    <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                  </span>
                  <span className="d-inline-block">
                    Archivo Guardado
                  </span>
                </Alert>}

                {showProgressBarArchivoEliminado && <Alert className="alert-addon-card bg-info bg-info text-white shadow-lg alert alert-success alert-dismissible fade show">
                  <span className="icon-addon alert-addon">
                    <i className="zmdi zmdi-info zmdi-hc-fw zmdi-hc-lg" />
                  </span>
                  <span className="d-inline-block">
                    Eliminando Archivo
                  </span>
                </Alert>}
                {showProgressBarArchivoEliminadoExitoso && <Alert className="alert-addon-card bg-success bg-success text-white shadow-lg alert alert-success alert-dismissible fade show">
                  <span className="icon-addon alert-addon">
                    <i className="zmdi zmdi-cloud-done zmdi-hc-fw zmdi-hc-lg" />
                  </span>
                  <span className="d-inline-block">
                    Archivo Eliminado
                  </span>
                </Alert>}

                <PopUpAlert
                  type={despliegueOperacion.tipo}
                  show={despliegueOperacion.despliegue}
                  title={despliegueOperacion.titulo}
                  message={despliegueOperacion.mensaje}
                  onConfirm={() =>
                    setdespliegueOperacion({
                      despliegue: false,
                      mensaje: "Para este tipo de campaña se requiere subir un archivo ",
                      tipo: "warning"
                    })}
                />


                <PopupWrapped
                  open={duplicadoError} // popup
                  title={" "}
                  size={"md"}
                  component={
                    <div>
                      <GrdErrorDuplicados
                        objetoDuplicado={objetoDuplicado}
                        objetoError={objetoError}
                      />
                      <div style={{ "textAlign": "right" }}>
                        <CancelButton onClick={() => setDuplicadoError(false)} />
                      </div>
                    </div>
                  }
                />

              </div>
            }
          </div>
        </form>
      )}
    />


  );

}

export default MasterCampania;