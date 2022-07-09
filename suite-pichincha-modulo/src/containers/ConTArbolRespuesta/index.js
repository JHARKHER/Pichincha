import React, { Fragment } from "react";
import { useConsultaArbolRespuesta, useAdminArbolRespuesta, useKeyPres, useTextChange } from "../../hooks/ArbolRespuesta";
import { useDispatch } from 'react-redux';
import { PROSPECCION, AGENDAMIENTO, NEGOCIACION, CONTACTO_DIRECTO, CONTACTO_INDIRECTO, NO_CONTACTO } from '../../Constantes'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { QuestionAnswer, PlaylistAddCheck, DoneOutline, Done, Home, PlayArrow } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import EventIcon from '@material-ui/icons/Event';
var respuestas = [];
var ultimoKey = new Date();
var clsCtrl = "ctrlAR_";

// #region Temas
const theme0 = createMuiTheme({
    palette: {
        primary: {
            light: '#3c8dbc',
            main: '#3c8dbc',
            contrastText: '#FFF',
        }
    }
});

const theme1 = createMuiTheme({
    palette: {
        primary: {
            light: '#aa66cc',
            main: '#aa66cc',
            contrastText: '#fff',
        }
    }
});

const theme2 = createMuiTheme({
    palette: {
        primary: {
            light: '#173362',
            main: '#173362',
            contrastText: '#FFF',
        }
    }
});

const theme3 = createMuiTheme({
    palette: {
        primary: {
            light: '#4285f4',
            main: '#4285f4',
            contrastText: '#fff',
        }
    }
});

const theme4 = createMuiTheme({
    palette: {
        primary: {
            light: '#33b5e5',
            main: '#33b5e5',
            contrastText: '#fff',
        }
    }
});

const themeS = createMuiTheme({
    palette: {
        primary: {
            light: '#00c851',
            main: '#00c851',
            contrastText: '#fff',
        }
    }
});

var shadows = [
    '60,141,188', '170,102,204', '23,51,98', '66,133,244', '51,181,229'
];

var temas = [
    theme0, theme1, theme2, theme3, theme4
];

for (var i = 0; i < 3; i++) {
    shadows = shadows.concat(shadows)
    temas = temas.concat(temas)
}

//#endregion

const ArbolRespuesta = (props) => {
    //#region Campos
    const dispatch = useDispatch();
    const { dataSource, errorConsulta, estaCargando, iniciar, setIniciar } = useConsultaArbolRespuesta(dispatch, props.codigoArbol, props.id);

    const { respuesta, setRespuesta } = useAdminArbolRespuesta()
    const { valor, setKeyPress } = useKeyPres()
    const { texto, setTexto } = useTextChange()
    var _opciones = [];
    //#endregion

    if (iniciar) {
        respuestas = [];
        var _opSel = dataSource['Home'] || { id: '0' }
        if (_opSel.id != respuesta.id)
            setRespuesta(_opSel);
        setIniciar(false);
    }

    _opciones = dataSource[respuesta.id] || [];

    //#region Funciones
    const keyPresshandler = event => {
        if (event.charCode == '13') {
            enfocarControl(clsCtrl + 'boton');
        }
    };

    const finalizar = (value) => {
        if (texto == '' || texto == null) {
        } else {
            props.onFinish({ respuetas: respuestas, texto: texto, valor: value });

            if (value != AGENDAMIENTO && value != NEGOCIACION) {
                inicializar();
            }
        }
    };

    const handleChange = event => {
        setTexto(event.target.value);
    };

    const keyPresshandlerControl = event => {
        if (event.charCode > '47' && event.charCode < '58') {
            var _stamp = new Date() - ultimoKey;
            var _valor = valor;
            if (_stamp < 300) {
                _valor += event.key;
            }
            else {
                _valor = event.key;
            }
            setKeyPress(_valor);
            ultimoKey = new Date();
            enfocarControl(clsCtrl + _valor);
        }
    };

    const enfocarControl = cls => {
        var _obj = document.getElementsByClassName(cls)[0];
        if (_obj) {
            _obj.focus();
        }
    };

    const inicializar = () => {
        respuestas = [];
        setRespuesta({ id: '0' });
        setTexto('');
        setIniciar(true);
    };

    const esFinal = () => {
        return _opciones.length == 0 && respuesta.id != "0"
    }
    //#endregion

    //#region Componentes
    const modoBotones = () => {
        return (<div style={{ margin: 10 }}>
            <Fab size="small" color="primary" aria-label="home" className={clsCtrl + '0'} onClick={() => {
                inicializar()
            }}>
                <Home />
            </Fab>
            <div style={{ display: 'inline', marginRight: 10 }}></div>
            {respuestas.map((element, i) => {
                return (
                    <ThemeProvider theme={esFinal() && respuestas.length == i + 1 ? themeS : temas[i + 1]}>
                        <Button variant="outlined" color="primary" size="large" key={i}
                            endIcon={esFinal() && respuestas.length == i + 1 ? <DoneOutline /> : <Done />}
                            onClick={() => {
                                setRespuesta(element)
                                respuestas = respuestas.slice(0, i + 1);
                            }}>
                            {element.descripcion}
                        </Button>
                    </ThemeProvider>
                )
            })}
        </div>)
    }

    const modoPasos = () => {
        return (
            <Stepper alternativeLabel>
                <Step onClick={() => { inicializar() }}>
                    <StepLabel StepIconComponent={() => { return <Fab size="small" aria-label="home" color="primary" ><Home /></Fab> }}>
                        Inicio
                    </StepLabel>
                </Step>
                {respuestas.map((label, index) => {
                    const stepProps = { completed: true };
                    const labelProps = {};
                    return (
                        <Step key={index} {...stepProps} onClick={() => {
                            setRespuesta(label)
                            respuestas = respuestas.slice(0, index + 1);
                            enfocarControl(clsCtrl + '0');
                        }}>
                            <StepLabel variant="contained" {...labelProps} StepIconComponent={() => {
                                return (
                                    <ThemeProvider theme={esFinal() && respuestas.length == index + 1 ? themeS : temas[index + 1]}>
                                        <Fab size="small" aria-label="home" color="primary" >{esFinal() && respuestas.length == index + 1 ? <DoneOutline /> : <Done />}</Fab>
                                    </ThemeProvider>
                                )
                            }}>
                                {label.descripcion}
                            </StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
        );
    }

    const cabecera = () => {
        return (
            <div>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" className={clsCtrl + '0'} >
                            <QuestionAnswer />
                        </IconButton>
                        <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
                            Gestión en curso: {props.titulo}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }

    const opciones = () => {
        return (
            _opciones.length > 0 &&
            <Paper style={{ padding: 5, boxShadow: '0px 0px 6px -1px rgba(' + shadows[respuestas.length] + ',1)' }} >
                {_opciones.map((opcion, i) => {
                    return (
                        <Fragment>
                            <ThemeProvider theme={temas[respuestas.length]}>
                                <Button key={i} variant="outlined" color="primary" size="small" className={clsCtrl + (i + 1)}
                                    onClick={() => {
                                        if(opcion.codigoRespuesta == CONTACTO_DIRECTO)
                                            props.setRespuestaInicial(CONTACTO_DIRECTO);
                                        else if(opcion.codigoRespuesta == CONTACTO_INDIRECTO)
                                            props.setRespuestaInicial(CONTACTO_INDIRECTO);
                                        else if(opcion.codigoRespuesta == NO_CONTACTO)
                                            props.setRespuestaInicial(NO_CONTACTO)
                                        setRespuesta(opcion)
                                        respuestas.push(opcion);
                                        enfocarControl(clsCtrl + '0');
                                    }}>
                                    {(i + 1) + '. ' + opcion.descripcion}
                                </Button>
                                <div style={{ display: 'inline', marginRight: 5 }} />
                            </ThemeProvider>
                        </Fragment>)
                })}
            </Paper>
        )
    };

    const observacion = () => {
        return (
            esFinal() &&
            <div style={{ padding: 5 }}>
                <TextField fullWidth id="outlined-basic" onChange={handleChange} value={texto} onKeyPress={keyPresshandler} className={clsCtrl + 'input'} autoFocus label="Ingrese la observación de la gestión" variant="outlined" />
                <div style={{ marginTop: 5 }} />
                <div style={{ display: 'flex' }}>

                    <ThemeProvider theme={themeS}>
                        <Button size="medium" variant="contained" style={{ "margin": "5px" }} raised className={clsCtrl + 'boton'} color="primary" endIcon={<PlaylistAddCheck />}
                            onClick={() => {
                                if (respuesta != null)
                                    finalizar(respuesta.codigoRespuesta)

                            }}>
                            {respuesta.codigoRespuesta == PROSPECCION &&
                                'Prospectar'
                            }
                            {respuesta.codigoRespuesta == AGENDAMIENTO &&
                                'Agendar'
                            }
                            {respuesta.codigoRespuesta == NEGOCIACION &&
                                'Negociación'
                            }
                            {respuesta.codigoRespuesta != NEGOCIACION && respuesta.codigoRespuesta != AGENDAMIENTO
                                && respuesta.codigoRespuesta != PROSPECCION &&
                                'Finalizar'
                            }
                        </Button>
                    </ThemeProvider>
                </div>
            </div>
        )
    }
    //#endregion


    if (iniciar && document.getElementsByClassName(clsCtrl + '0')[0]) {
        enfocarControl(clsCtrl + '0');
    };

    return (
        estaCargando ? "" : props.id != 0 ?
            <Paper onKeyPress={keyPresshandlerControl} >
                {cabecera()}
                {respuesta.dialogo && <div>{respuesta.dialogo}</div>}
                <div>
                    {props.variante == 'botones' ? modoBotones() : modoPasos()}
                    {opciones()}
                </div>
                {observacion()}
            </Paper > : null
    );
}

export default ArbolRespuesta;