import React, { useContext } from "react";
import Paper from "@material-ui/core/Paper"; //contenedor de la forma
import { makeStyles } from '@material-ui/core/styles';
import { Context } from "../../context/ContextGestionCampania";
import Typography from '@material-ui/core/Typography';
import TodayIcon from '@material-ui/icons/Today';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import IconButton from '@material-ui/core/IconButton';
import {
    ResponsiveContainer,
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

const ComPGraficoBarras = (props) => {

    const { bgColor,graficoDos } = props;

    let dataArreglo = new Array();
    graficoDos.forEach(element => {

        var objeto = new Object();
        objeto.name = element.name;
        objeto[element.name] = element.value;
        dataArreglo.push(objeto);
    });

    const useStyles = makeStyles(theme => ({

        shadowBox: {
            "box-shadow": "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
        }
    }));

    const classes = useStyles();

    const cabeceraGestionDiaria = () => {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <TodayIcon />
                        </IconButton>
                        <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
                            Gestión Diaria
                         </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }

    return (
        <Paper className={classes.shadowBox}>

            {cabeceraGestionDiaria()}
            <ResponsiveContainer minHeight={215}>
                <ComposedChart width={800} height={215} data={dataArreglo}
                    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid stroke='#f5f5f5' />
                    <XAxis style={{ "fontSize": "13px" }} dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    {
                        dataArreglo.map((entry, index) => {

                            return <Bar key={index} dataKey={entry.name} barSize={100} fill={bgColor[index]}
                            />
                        })
                    }
                </ComposedChart>
            </ResponsiveContainer>
        </Paper>
    );

}



export default ComPGraficoBarras;