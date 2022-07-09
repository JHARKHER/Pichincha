import React, { useState } from "react";
import XLSX from "xlsx";
import { FileInput } from "odc-common";
import GrdCampaniaNuevoLista from "../ComPCampaniaEspecialNuevoLista";
import { OnChange } from "react-final-form-listeners";
import { IntlMessages, ProgressBar, ActionButton } from "odc-common";
import { useCatalogs } from "odc-configuration";
import { Field } from 'react-final-form'
import MenuItem from "@material-ui/core/MenuItem";
import { VENTASESPECIAL, ENCUESTA, OTROS, ES_TELEFONO, ES_DIRECCION, ES_PRODUCTO, ES_SUB_PRODUCTO, ES_CONTROL, TIPO_IDENTIFICACION, IDENTIFICACION, NOMBRE_CLIENTE, ES_MONTO, ES_TASA, ES_PLAZO } from '../../Constantes'
import {
  required,
  emptyItem,
  renderTextField,
  renderSelectField,
  renderDateField,
  composeValidators,
  maxLength,
  minLength,
} from "odc-common";

const catalogsList = [
  "TipoArchivo",
  "TipoDatoArchivo",
  "TipoChecks",
  "TipoTelefono",
  "TipoUbicacionDipositivo"
];

const CampaniaNuevo = (props) => {

  const {
    //Variables initialValues
    IdCabeceraArchivo, variableProcesar, campanias, esNuevo, esAgregarArchivo, habilitarPlantilla, moduloCedente, cedentes,
    nombreCarga, fechaCarga, rutaArchivo, nombreArchivo, TipoArchivo, rows, tipoCampania,
    //Variables SET
    setHabilitarPlantilla, setvalidarCampos, setdespliegueOperacion, setnombreArchivo, setDotJson,
    setrows, setTipoArchivo,

  } = props;

  let valorNombre;

  var campaniaFiltros = new Array();

  campanias.forEach(element => {
    if (element.cabeceraArchivo != null) {
      if (element.cabeceraArchivo.campoCabeceraArchivo.length > 0) {
        campaniaFiltros.push(element);
      }
    }
  });
  const [campaniasFiltrador] = useState(campaniaFiltros);

  const { catalogs, isLoadingCatalogs } = useCatalogs(catalogsList.join(","));




  const validarCamposBloqueo = (listaColumnas) => {

    let telefonoCarga = false;
    let direccion = false;
    let tipoIdentificacion = false;
    let identificacion = false;
    let nombreCliente = false;
    let bloqueoGeneral = true;

    let monto = false;
    let tasa = false;
    let plazo = false;
    let producto = false;
    let subProducto = false;

    listaColumnas.some(
      item => {

        if (tipoCampania == ENCUESTA || tipoCampania == OTROS) {
          if (item.esActivo) {

            if (item.seleccionCatalogo != null) {

              if (item.seleccionCatalogo == ES_TELEFONO) {

                item.campoBdd = null;
                if (item.tipoUbicacion != null) {
                  telefonoCarga = true;
                }
              } else if (item.seleccionCatalogo == ES_DIRECCION) {

                item.campoBdd = null;
                if (item.tipoUbicacion != null) {
                  direccion = true;
                }
              } else if (item.seleccionCatalogo == ES_PRODUCTO) {

                item.campoBdd = null;
                producto = true;

              } else if (item.seleccionCatalogo == ES_SUB_PRODUCTO) {

                item.campoBdd = null;
                subProducto = true;

              } else if (item.seleccionCatalogo == ES_CONTROL) {

                item.campoBdd = null;

              } else {
                item.campoBdd = null;
              }
            } else if (item.campoBdd != null) {

              if (item.campoBdd == TIPO_IDENTIFICACION) {
                tipoIdentificacion = true;
              } else if (item.campoBdd == IDENTIFICACION) {
                identificacion = true;
              } else if (item.campoBdd == NOMBRE_CLIENTE) {
                nombreCliente = true;
              }
            } else if (item.campoBdd == null) {
              bloqueoGeneral = false;
            }
          }
        } else if (tipoCampania == VENTASESPECIAL) {

          if (item.esActivo) {
            if (item.seleccionCatalogo != null) {

              if (item.seleccionCatalogo == ES_TELEFONO) {

                item.campoBdd = null;
                if (item.tipoUbicacion != null) {
                  telefonoCarga = true;
                }
              } else if (item.seleccionCatalogo == ES_DIRECCION) {

                item.campoBdd = null;
                if (item.tipoUbicacion != null) {
                  direccion = true;
                }
              } else if (item.seleccionCatalogo == ES_MONTO) {

                item.campoBdd = null;
                monto = true;

              } else if (item.seleccionCatalogo == ES_TASA) {
                item.campoBdd = null;
                tasa = true;

              } else if (item.seleccionCatalogo == ES_PLAZO) {
                item.campoBdd = null;
                plazo = true;
              }
              else if (item.seleccionCatalogo == ES_SUB_PRODUCTO) {

                item.campoBdd = null;
              }
              else if (item.seleccionCatalogo == ES_CONTROL) {

                item.campoBdd = null;
              }
              else {
                item.campoBdd = null;
              }
            }
            else if (item.campoBdd != null) {

              if (item.campoBdd == TIPO_IDENTIFICACION) {
                tipoIdentificacion = true;
              } else if (item.campoBdd == IDENTIFICACION) {
                identificacion = true;
              } else if (item.campoBdd == NOMBRE_CLIENTE) {
                nombreCliente = true;
              }
            } else if (item.campoBdd == null) {
              bloqueoGeneral = false;
            }
          }

        }
      }
    );

    ////VALIDACIONES DE BOTON DE GUARDAR(BLOQUEO) CUANDO NO SE ASIGNA IDENTIFICACION, NOMBRE CLIENTE, ES TELEFONO
    if (tipoCampania == VENTASESPECIAL) {
      if (identificacion && nombreCliente && telefonoCarga && direccion && bloqueoGeneral && monto && tasa && plazo && tipoIdentificacion) {
        setvalidarCampos(true);
      } else {
        setvalidarCampos(false);
      }
    } else {
      if (identificacion && nombreCliente && telefonoCarga && direccion && bloqueoGeneral && producto && tipoIdentificacion) {
        setvalidarCampos(true);
      } else {
        setvalidarCampos(false);
      }
    }

  }






  const excelCSVJSON = (csv, nombre) => {
    /* CONVERTIR EN EXCEL, csv, texto */
    var busqueda = nombre.search(/.text/i)
    var headersFinal;
    if (busqueda > 0) {

      var nstr = csv.split(/\r\n/);
      headersFinal = nstr[0].split(/\|/);
      setDotJson(["data", "data"]);
    } else {
      var workbook = XLSX.read(csv, {
        type: 'binary'
      });
      var firstSheet = workbook.SheetNames[0];
      var excelRows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet], { header: 1, raw: true });

      headersFinal = excelRows[0];
      var data = excelRows.slice(1);
      setDotJson(data);
    }
    var arreglo = new Array();
    var cont = 1;

    var arregloColumnas = new Array();
    var pivot = false;
    setnombreArchivo(nombre);
    valorNombre = nombre;

    if (habilitarPlantilla) {

      var longitudOriginal = rows.length;
      var longitudNuevo = headersFinal.length;
      if (longitudOriginal == longitudNuevo
      ) {

        rows.forEach(enviar => {
          arregloColumnas.push(enviar.columnaArchivo)
        });

        if (arregloColumnas.sort().join(',') === headersFinal.sort().join(',')) {
          pivot = true;
        }
      }

      if (pivot == false) {
        setdespliegueOperacion({
          despliegue: true,
          mensaje: "El Archivo seleccionado no coincide con la plantilla",
          tipo: "warning"
        });
        setnombreArchivo("");
      }
      else if (pivot == true) {
        rows.forEach(original => {
          var componentesRows = new Object();
          componentesRows.id = cont;
          componentesRows.esActivo = original.esActivo;
          componentesRows.columnaArchivo = original.columnaArchivo;
          componentesRows.nombrePresentacion = original.nombrePresentacion;
          componentesRows.campoBdd = original.campoBdd;
          componentesRows.seleccionCatalogo = original.seleccionCatalogo;
          componentesRows.tipoUbicacion = original.tipoUbicacion;
          arreglo.push(componentesRows);
          cont++;

        });
        setrows(arreglo);

        validarCamposBloqueo(arreglo);

      }

    } else if (esAgregarArchivo) {

      var longitudOriginal = rows.length;
      var longitudNuevo = headersFinal.length;
      if (longitudOriginal == longitudNuevo
        && IdCabeceraArchivo != null
      ) {

        rows.forEach(enviar => {
          arregloColumnas.push(enviar.columnaArchivo)
        });

        if (arregloColumnas.sort().join(',') === headersFinal.sort().join(',')) {
          pivot = true;
        }
      }
      if (pivot == false) {
        setdespliegueOperacion({
          despliegue: true,
          mensaje: "El Archivo seleccionado no coincide con el archivo original",
          tipo: "warning"
        });
        setnombreArchivo("");
      } else if (pivot == true) {
        rows.forEach(original => {

          var componentesRows = new Object();
          componentesRows.id = cont;
          componentesRows.esActivo = original.esActivo;
          componentesRows.columnaArchivo = original.columnaArchivo;
          componentesRows.nombrePresentacion = original.nombrePresentacion;
          componentesRows.campoBdd = original.campoBdd;
          componentesRows.seleccionCatalogo = original.seleccionCatalogo;
          componentesRows.tipoUbicacion = original.tipoUbicacion;
          arreglo.push(componentesRows);
          cont++;

        });

        setrows(arreglo);
        validarCamposBloqueo(arreglo);
      }

    } else {

      var longitudOriginal = rows.length;
      var longitudNuevo = headersFinal.length;
      if (longitudOriginal == longitudNuevo
        && IdCabeceraArchivo != null
      ) {

        rows.forEach(enviar => {
          arregloColumnas.push(enviar.columnaArchivo)
        });

        if (arregloColumnas.sort().join(',') === headersFinal.sort().join(',')) {
          pivot = true;
        }
      }

      if (pivot == false) {

        headersFinal.forEach(element => {
          var componentesRows = new Object();
          componentesRows.id = cont;
          componentesRows.esActivo = false;
          componentesRows.columnaArchivo = element;
          componentesRows.nombrePresentacion = element;
          componentesRows.seleccionCatalogo;
          componentesRows.nombrePresentacion = element;

          arreglo.push(componentesRows);
          cont++;
        });


      }
      else if (pivot == true) {
        rows.forEach(original => {

          var componentesRows = new Object();
          componentesRows.id = cont;
          componentesRows.esActivo = original.esActivo;
          componentesRows.columnaArchivo = original.columnaArchivo;
          componentesRows.nombrePresentacion = original.nombrePresentacion;
          componentesRows.campoBdd = original.campoBdd;
          componentesRows.seleccionCatalogo = original.seleccionCatalogo;
          componentesRows.tipoUbicacion = original.tipoUbicacion;
          arreglo.push(componentesRows);
          cont++;

        });

      }
      setrows(arreglo);
      validarCamposBloqueo(arreglo);
    }
  }

  const handleFileChange = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const binaryStr = reader.result;

      excelCSVJSON(binaryStr, file.name);
    };
    try {
      reader.readAsBinaryString(file);
    } catch (e) {

    }
  };

  const MostrarPlantillas = () => {
    setHabilitarPlantilla(true);
  }

  const CambioColumnasCampania = (value) => {
    setTipoArchivo(undefined);
    try {
      var headersFinal = JSON.parse(value);


      if (headersFinal.cabeceraArchivo != null) {
        var cont = 1;
        var arregloColumnas = new Array();
        var arregloColumnasLeido = new Array();
        var pivot = false;

        if (headersFinal.cabeceraArchivo.campoCabeceraArchivo.length > 0) {

          var longitudOriginal = rows.length;
          var longitudNuevo = headersFinal.cabeceraArchivo.campoCabeceraArchivo.length;
          if (longitudOriginal == longitudNuevo
          ) {

            rows.forEach(enviar => {
              arregloColumnas.push(enviar.columnaArchivo)
            });

            headersFinal.cabeceraArchivo.campoCabeceraArchivo.forEach(enviar => {
              arregloColumnasLeido.push(enviar.columnaArchivo)
            });

            if (arregloColumnas.sort().join(',') === arregloColumnasLeido.sort().join(',')) {
              pivot = true;
            }
          }

          if (pivot == false && longitudOriginal == 0) {
            headersFinal.cabeceraArchivo.campoCabeceraArchivo.forEach(element => {

              element.id = cont;
              element.idCampoCabeceraArchivo = 0;
              element.idCabeceraArchivo = 0;
              cont++;
            });

            setTipoArchivo(headersFinal.cabeceraArchivo.tipoArchivo);
            setrows(headersFinal.cabeceraArchivo.campoCabeceraArchivo);
            validarCamposBloqueo(headersFinal.cabeceraArchivo.campoCabeceraArchivo);

          } else if (pivot == false && longitudOriginal > 0) {

            setdespliegueOperacion({
              despliegue: true,
              mensaje: "El Archivo seleccionado no coincide con la plantilla",
              tipo: "warning"
            });
            setHabilitarPlantilla(false);
          } else if (pivot == true) {
            headersFinal.cabeceraArchivo.campoCabeceraArchivo.forEach(element => {

              element.id = cont;
              element.idCampoCabeceraArchivo = 0;
              element.idCabeceraArchivo = 0;
              cont++;
            });

            setTipoArchivo(headersFinal.cabeceraArchivo.tipoArchivo);
            setrows(headersFinal.cabeceraArchivo.campoCabeceraArchivo);
            validarCamposBloqueo(headersFinal.cabeceraArchivo.campoCabeceraArchivo);

          }


        }
      }
    } catch (e) { }
  }
  if (isLoadingCatalogs) return (<ProgressBar />);

  return (
    <div>
      {!esAgregarArchivo &&
        <div className="row form-row">

          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
            <Field
              name={"moduloCedente"}
              initialValue={moduloCedente}
              label={<IntlMessages id="campania.campanianuevo.module" />}
              disabled
              isClearable
              validate={
                required
              }
              component={renderSelectField}
              subscription={{ value: true, error: true, touched: true }}
            >
              {emptyItem
                .concat(cedentes)
                .map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.codigoCedente} primarytext={item.nombreCedente}>
                      {" "}
                      {item.nombreCedente}{" "}
                    </MenuItem>
                  );
                })}
            </Field>

          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">

            <Field
              name="nombreCarga"
              initialValue={nombreCarga}
              disabled
              label={<IntlMessages id="campania.campanianuevo.nombreCarga" />}
              validate={composeValidators(
                required,
                minLength(5),
                maxLength(64)
              )}
              component={renderTextField}
              subscription={{ value: true, error: true, touched: true }}
            />


          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
            <Field
              initialValue={fechaCarga}
              type={"date"}
              label="Fecha Carga"
              name="fechaCarga"
              disabled
              component={renderDateField}
              validate={required}
              subscription={{ value: true, error: true, touched: true }}
            />
          </div>
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
            <ActionButton
              title="Seleccionar Plantilla"
              disabled={!esNuevo}
              text="Seleccionar Plantilla"
              onClick={() => MostrarPlantillas()}
            >

            </ActionButton>

          </div>
        </div>
      }
      <div className="row form-row">
        {habilitarPlantilla &&
          <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
            <Field
              name={"cargas"}
              label={<IntlMessages id="campania.campanianuevo.Cargas" />}
              isClearable
              component={renderSelectField}
              subscription={{ value: true, error: true, touched: true }}
            >
              {emptyItem
                .concat(campaniasFiltrador)
                .map((item, index) => {
                  return (
                    <MenuItem key={index} value={JSON.stringify(item)} primarytext={item.nombreCampania}>
                      {" "}
                      {item.nombreCampania}{" "}
                    </MenuItem>
                  );
                })}
            </Field>
            <OnChange name={"cargas"}>
              {(value, previous) => { CambioColumnasCampania(value) }}
            </OnChange>
          </div>
        }
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
          <Field
            name={"TipoArchivo"}
            defaultValue={TipoArchivo}
            label={<IntlMessages id="campania.campanianuevo.TipoArchivo" />}
            validate={
              required
            }
            isClearable
            component={renderSelectField}
            subscription={{ value: true, error: true, touched: true }}
          >
            {emptyItem
              .concat(catalogs["TipoArchivo"])
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

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">

          <Field
            type="file"
            initialValue={rutaArchivo}
            component={FileInput}
            disabled={!variableProcesar && !esAgregarArchivo}
            name="rutaArchivo"
            label="Abrir"
            validate={required}
            subscription={{ value: true, error: true, touched: true }}
          />
          <OnChange name={"rutaArchivo"}>
            {(value, previous) => {
              handleFileChange(value);
            }}
          </OnChange>

        </div>
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">

          <Field
            defaultValue={nombreArchivo == null ? valorNombre : nombreArchivo}
            name="nombreArchivo"
            label={<IntlMessages id="campania.campanianuevo.nombreArchivo" />}
            validate={composeValidators(
              required
            )}
            disabled
            component={renderTextField}
            subscription={{ value: true, error: true, touched: true }}
          />

        </div>

      </div>
      <br></br>
      <div>
        <GrdCampaniaNuevoLista
          {...props}
          dataFindCatalogs={catalogs}

        />
      </div>

    </div>

  );
}


export default CampaniaNuevo;
