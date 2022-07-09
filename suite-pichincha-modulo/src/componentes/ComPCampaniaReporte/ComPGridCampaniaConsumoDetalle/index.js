import React, { useContext } from "react";
import { Field } from "react-final-form";
import { GenericGrid } from "odc-common";
import { Context } from "../../../context/ContextReporteCampania";
import { DataTypeProvider } from '@devexpress/dx-react-grid';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Warning from "@material-ui/icons/Warning";

//Anchos de Columnas
const defaultWidths = [
    { columnName: "region_Agencia", width: 140 },
    { columnName: "baseInicialAsignada", width: 160 },
    { columnName: "baseInicialAsignadaAyer", width: 230 },
    { columnName: "gestionado", width: 90 },
    { columnName: "porcentajeGestion", width: 90},
    { columnName: "desembolsos", width: 120 },
    { columnName: "monto", width: 160},
    { columnName: "desembolsosAsignado", width: 120 },
    { columnName: "montoAsignado", width: 220},
    { columnName: "colocacion", width: 220 },
    { columnName: "montoColocacion", width: 240}
  ];
//Semáforos
const iconColumns = ['colocacion', 'montoColocacion'];
const IconFormatter = ({ value }) => {
    if (value >= 80)
        return (<div style={{ display: 'inline' }}>
            <RadioButtonCheckedIcon style={{ color: 'green' }} />
            <span style={{ display: 'table-caption' }}>&nbsp;{value}</span>
        </div>)
    else if (value >= 50 && value < 80)
        return (<div style={{ display: 'inline' }}>
            <RadioButtonCheckedIcon style={{ color: '#FFFF00' }} />
            <span style={{ display: 'table-caption' }}>&nbsp;{value}</span>
        </div>)
    else if (value >= 0 && value < 50)
        return (<div style={{ display: 'inline' }}>
            <RadioButtonCheckedIcon style={{ color: 'red' }} />
            <span style={{ display: 'table-caption' }}>&nbsp;{value}</span>
        </div>)
    else
        return (<div style={{ display: 'inline' }}>
            <Warning style={{ color: '#FF3D00' }} />
            <span style={{display: 'table-caption' }}>&nbsp;{value}</span>
        </div>)
};

const IconTypeProvider = props => (
    <DataTypeProvider formatterComponent={IconFormatter, IconFormatter} {...props} />
);

const GridCampaniaConsumoDetalle = () => {        
    //const { reportes, errorReportes, isLoadingReportes, enableSelection } = useContext(Context);
    //console.log("Ingresó al Grid:====> ");
    return (
        <Field
            name={"GridCampaniaConsumoDetalle"}
            columns={[
                { name: "region_Agencia", title: "Región Agencia" },
                { name: "baseInicialAsignada", title: "Base Inicial Asignada" },
                { name: "baseInicialAsignadaAyer", title: "B. I. A. a la fecha del día de Ayer" },
                { name: "gestionado", title: "Gestionado" },
                { name: "porcentajeGestion", title: "% Gestión" },               
                { name: "desembolsos", title: "# Desembolsos" },
                { name: "monto", title: "Monto Desembolsado" },
                { name: "desembolsosAsignado", title: "# Desembolsos" },
                { name: "montoAsignado", title: "Monto Desembolsado Promedio" },
                { name: "colocacion", title: "% Colocación Desembolsos/Asignado" },
                { name: "montoColocacion", title: "% Colocación Monto/Asignado" },
            ]}
            tableColumnExtensions={defaultWidths}            
            component={GenericGrid}
            disableAdd
            disableEdit
            defaultFilters={[]}
            defaultCurrentPage={0}
            pageSize={10}
            subscription={{ value: true, error: true }}            
            defaultColumnWidths={defaultWidths}
            customProviders={
                <IconTypeProvider for={iconColumns} />
            }
        />
    );
}
export default GridCampaniaConsumoDetalle;
