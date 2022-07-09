import React, { useContext } from "react";
import { Doughnut } from 'react-chartjs-2';
import { useObtenerRegistrosClientesResumen } from "../../hooks/GestionCampania";
import { useDispatch } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";



const useStyles = makeStyles(theme => ({

    shadowBox: {
        "box-shadow": "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
    }

}));


const ComPGraficoPie = (props) => {

    const { setOpenWindow, setTipoGestion, setRegistrosTotales, setRegistrosGestionEfectiva, setFechaInicio, setFechaFin, setNombreCampania,
        setCampaniasResumen, graficoUno, setHabilitarTab, setRows, setAccionFormulario, setTipoCampania, setCodigoProducto, setIdCampania, setCodigoCampania
        , setValue } = props;

    const classes = useStyles();
    const dispatch = useDispatch();

    const COLORS = ['#F59895', '#96F595', '#F7F999'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        let radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        let x = cx + radius * Math.cos(-midAngle * RADIAN);
        let y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const onPieClick = (e) => {
        var arreglo = new Array();
        var objetoCampania = JSON.parse(sessionStorage.getItem('ultimoObjetoGestion'));
        setIdCampania(objetoCampania.idCampania);
        setNombreCampania(objetoCampania.nombreCampania);
        setTipoCampania(objetoCampania.tipoCampania);
        setFechaInicio(new Date(objetoCampania.fechaInicio));
        setFechaFin(new Date(objetoCampania.fechaFin));
        setCodigoCampania(objetoCampania.codigoCampania);
        setTipoGestion(e);

        useObtenerRegistrosClientesResumen(objetoCampania, e, setRegistrosTotales, setRegistrosGestionEfectiva, setRows, setAccionFormulario, setCodigoProducto, dispatch);

        arreglo.push(objetoCampania);
        setCampaniasResumen(arreglo);
        setHabilitarTab(true);
        setOpenWindow(true);
        setValue(1);
    }

    const cabeceraGestion = () => {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <TrendingUpIcon />
                        </IconButton>
                        <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
                            Gestión Campaña
                        </Typography>
                    </Toolbar>
                </AppBar>
                <br />
            </div>
        )
    }

    const data = {
        labels: graficoUno.length > 0 ? [
            graficoUno[0].name,
            graficoUno[1].name,
            graficoUno[2].name,
        ] : [],
        datasets: [{
            data: graficoUno.length > 0 ? [(graficoUno[0].value), (graficoUno[1].value), (graficoUno[2].value)] : [],
            backgroundColor: COLORS,

        }]
    };

    const options = {
        maintainAspectRatio: false,
        responsive: false,
        legend: {
            position: 'left',
            labels: {
                boxWidth: 10
            }
        }
    }

    return (
        <Paper className={classes.shadowBox}>
            <center>
                {cabeceraGestion()}

                <Doughnut width={500} height={250} data={data} options={options} onElementsClick={elems => {

                    if (elems.length > 0) {
                        if (elems[0]._index == 0)
                            onPieClick("No Gestionado")
                        else if (elems[0]._index == 1)
                            onPieClick("Gestionado")
                        else if (elems[0]._index == 2)
                            onPieClick("Regestión")
                    }
                }}
                />

            </center>
        </Paper>
    );

}



export default ComPGraficoPie;