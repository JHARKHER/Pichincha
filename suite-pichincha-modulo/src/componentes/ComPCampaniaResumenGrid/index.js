import React, { useContext } from "react";
import { Field } from "react-final-form";
import { GenericGrid } from "odc-common";
import { useObtenerDatosClientes } from "../../hooks/GestionCampania";
import { useDispatch } from 'react-redux';
const ComPCampaniaResumenGrid = (props) => {

    const dispatch = useDispatch();

    const {
        setSaldoMontoLiquido, tipoGestion, rows, enablePlaceholder, setHabilitarGestion, setNombreCliente, setIdentificacionCliente, 
        setUnaCampaniaNormal, setHabilitarTab, setTipoIdentificacion, setCodigoSubProducto, setCamundaVariables, rowsPrecedente,
        setPrimerNombre, setSegundoNombre, setPrimerApellido, setSegundoApellido, setdespliegueOperacion,setRowsRubros,
        siguienteCliente, setSiguienteCliente, setAccionFormulario, setIdCliente, setDispositivos, setDirecciones, setCorreos,
        setPlazoMontosSubproductoinfo, codigoCampania, setValue } = props;


    React.useEffect(() => {

        VerificarSiguienteCliente();

    }, [siguienteCliente])

    const VerificarSiguienteCliente = () => {

        if (siguienteCliente == true) {

            let clienteGestionado = JSON.parse(sessionStorage.getItem('ultimoObjetoG'));
            let clienteXGestionar = [];
            let i = 0;
            let valor = false;
            for (var i = 0; i < rowsPrecedente.length; i++) {
                if (rowsPrecedente[i].idCliente == clienteGestionado.idCliente) {
                    valor = true;
                    break;
                }
            }

            if (valor) {
                let posicion = i + 1;
                if (posicion > rows.length) {
                    clienteXGestionar.push(rows[0]);
                } else {
                    clienteXGestionar.push(rows[i + 1]);
                }
                SiguienteCliente(clienteXGestionar);
                setSiguienteCliente(false);

            }
        }
    }

    const SiguienteCliente = (e) => {
        if (e.length > 0)
            sessionStorage.setItem('ultimoObjetoG', JSON.stringify(e[0]));

        var jsonObjeto = JSON.parse(sessionStorage.getItem('ultimoObjetoG'));

        if (tipoGestion != 'Gestionado') {
            let calculoCuota = jsonObjeto.monto / jsonObjeto.plazo;

            setUnaCampaniaNormal({
                monto:jsonObjeto.monto.toFixed(2),
                plazo:jsonObjeto.plazo,
                cuota:calculoCuota.toFixed(2)
            })

            setIdCliente(jsonObjeto.idCliente);
            setNombreCliente(jsonObjeto.nombreCliente)

            setPrimerNombre(jsonObjeto.primerNombre)
            setSegundoNombre(jsonObjeto.segundoNombre)
            setPrimerApellido(jsonObjeto.primerApellido)
            setSegundoApellido(jsonObjeto.segundoApellido)

            setIdentificacionCliente(jsonObjeto.identificacion)
            setTipoIdentificacion(jsonObjeto.tipoIdentificacion)
            setCodigoSubProducto(jsonObjeto.codigoSubProducto);
            setValue(2);
            setHabilitarGestion(true);
            setHabilitarTab(false);

            const funcionAwait = async () => {
                await useObtenerDatosClientes(jsonObjeto.identificacion, jsonObjeto.tipoIdentificacion, jsonObjeto.codigoSubProducto, setCamundaVariables,
                    setAccionFormulario, jsonObjeto.idCliente, setDispositivos, setSaldoMontoLiquido, jsonObjeto.monto,
                    setDirecciones, setCorreos, jsonObjeto.codigoProducto, setRowsRubros,setPlazoMontosSubproductoinfo,jsonObjeto.tipoControl, codigoCampania, dispatch)
            }

            funcionAwait().then(() => {

                setdespliegueOperacion({
                    despliegue: true,
                    tipo: "success"
                });
            })

        }
    }

    const CambiarGestion = (e) => {
        if (e.length > 0)
            sessionStorage.setItem('ultimoObjetoG', JSON.stringify(e[0]));

        if (JSON.parse(sessionStorage.getItem('ultimoObjetoG')) && e.length == 0) {
            var jsonObjeto = JSON.parse(sessionStorage.getItem('ultimoObjetoG'));

            if (tipoGestion != 'Gestionado') {
                let calculoCuota = jsonObjeto.monto / jsonObjeto.plazo;

                setUnaCampaniaNormal({
                    monto:jsonObjeto.monto.toFixed(2),
                    plazo:jsonObjeto.plazo,
                    cuota:calculoCuota.toFixed(2)
                })
                setIdCliente(jsonObjeto.idCliente);
                setNombreCliente(jsonObjeto.nombreCliente)

                setPrimerNombre(jsonObjeto.primerNombre)
                setSegundoNombre(jsonObjeto.segundoNombre)
                setPrimerApellido(jsonObjeto.primerApellido)
                setSegundoApellido(jsonObjeto.segundoApellido)

                setIdentificacionCliente(jsonObjeto.identificacion)
                setTipoIdentificacion(jsonObjeto.tipoIdentificacion)
                setCodigoSubProducto(jsonObjeto.codigoSubProducto);
                setValue(2);
                setHabilitarGestion(true);
                setHabilitarTab(false);
                useObtenerDatosClientes(jsonObjeto.identificacion, jsonObjeto.tipoIdentificacion, jsonObjeto.codigoSubProducto, setCamundaVariables,
                    setAccionFormulario, jsonObjeto.idCliente, setDispositivos, setSaldoMontoLiquido, jsonObjeto.monto,
                    setDirecciones, setCorreos, jsonObjeto.codigoProducto, setRowsRubros, setPlazoMontosSubproductoinfo,jsonObjeto.tipoControl, codigoCampania, dispatch)
            }
        }

    }
    let defaultWidths = [];
    let nombres = [];
    if (tipoGestion == 'No Gestionado') {
        defaultWidths = [
            { columnName: "tipoIdentificacion", width: 150 },
            { columnName: "identificacion", width: 300 },
            { columnName: "nombreCliente", width: 300 },
            // { columnName: "numeroGestionesEfectivas", width: 150 },
            // { columnName: "numeroTelefonos", width: 200 },
            { columnName: "monto", width: 200 },
            { columnName: "plazo", width: 200 },
            { columnName: "tasa", width: 200 },
            { columnName: "codigoSubProducto", width: 300 },
        ];

        nombres = [
            { name: "tipoIdentificacion", title: "Tipo Identificación" },
            { name: "identificacion", title: "Identificación" },
            { name: "nombreCliente", title: "Nombre Cliente" },
            // { name: "numeroGestionesEfectivas", title: "Nº Gestiones Efectivas" },
            // { name: "numeroTelefonos", title: "Nº Teléfonos" },
            { name: "monto", title: "Monto" },
            { name: "plazo", title: "Plazo" },
            { name: "tasa", title: "Tasa" },
            { name: "codigoSubProducto", title: "SubProducto" },
        ]
    } else {
        nombres = [
            { name: "tipoIdentificacion", title: "Tipo Identificación" },
            { name: "identificacion", title: "Identificación" },
            { name: "nombreCliente", title: "Nombre Cliente" },
            { name: "numeroGestiones", title: "Nº Gestiones" },
            // { name: "numeroGestionesEfectivas", title: "Nº Gestiones Efectivas" },
            // { name: "numeroTelefonos", title: "Nº Teléfonos" },
            { name: "respuesta", title: "Respuesta" },
            { name: "motivo", title: "Motivo" },
            { name: "monto", title: "Monto" },
            { name: "plazo", title: "Plazo" },
            { name: "tasa", title: "Tasa" },
            { name: "codigoSubProducto", title: "SubProducto" },
        ]

        defaultWidths = [
            { columnName: "tipoIdentificacion", width: 115 },
            { columnName: "identificacion", width: 200 },
            { columnName: "nombreCliente", width: 300 },
            { columnName: "numeroGestiones", width: 115 },
            // { columnName: "numeroGestionesEfectivas", width: 150 },
            // { columnName: "numeroTelefonos", width: 115 },
            { columnName: "respuesta", width: 200 },
            { columnName: "motivo", width: 200 },
            { columnName: "monto", width: 115 },
            { columnName: "plazo", width: 115 },
            { columnName: "tasa", width: 115 },
            { columnName: "codigoSubProducto", width: 200 },
        ];
    }
    return (
        <Field
            defaultValue={rows}
            name={'ComPCampaniaResumenGrid'}
            columns={nombres}
            tableColumnExtensions={defaultWidths}
            enableColumnResizing
            defaultColumnWidths={defaultWidths}

            enablePlaceholder={enablePlaceholder}
            component={GenericGrid}
            disableAdd
            disableEdit
            defaultFilters={[]}
            defaultCurrentPage={0}
            pageSize={10}
            disableInlineEditing
            subscription={{ value: true, error: true }}
            enableSelection={true}
            onSelectionChange={(e) => CambiarGestion(e)}
        />

    );

}
export default ComPCampaniaResumenGrid;
