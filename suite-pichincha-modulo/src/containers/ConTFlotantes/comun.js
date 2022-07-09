import React, { Fragment } from "react";
import Fab from '@material-ui/core/Fab';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { fade, makeStyles } from '@material-ui/core/styles';
import { grey, blue } from '@material-ui/core/colors';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';

export const useStyles = makeStyles(theme => ({
    fab: {
        position: 'absolute',
        top: 150,
        backgroundColor: props => props.color[500],
        '&:hover': {
            backgroundColor: props => props.color[600],
        },
    },
    fabInactive: {
        position: 'absolute',
        top: 150,
        backgroundColor: grey[500],
        '&:hover': {
            backgroundColor: grey[600],
        },
    },
    card: {
        padding: 4,
        minWidth: 350,
        background: 'linear-gradient(45deg, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.65) 90%)',
        cursor: 'pointer',
        '&:hover': {
            background: 'linear-gradient(45deg, rgba(0,0,0,0.75) 30%, rgba(0,0,0,0.55) 90%)',
        },
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 12,
        color: props => props.color[50],
    },
    icono: {
        fontSize: 20,
        color: props => props.color[500],
    },
    title2: {
        fontSize: 16,
        color: props => props.color[50],
    },
    body: {
        fontSize: 14,
        color: props => props.color[100],
        display: 'inline-flex'
    },
    textBody: {
        lineHeight: '14px',
        padding: 5
    },
    pos: {
        fontSize: 13,
        marginBottom: 0,
        color: '#AAA'
    },
    contenedor: {
        height: '100%'
    },
    contenedorDetalle: {
        overflowY: 'auto'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        }
    },
    appbar: {
        background: props => props.color[900]
    },
    apptit: {
        color: '#FFFFFF'
    }
}));

const setFiltro = filtro => {
    var _elementos = document.getElementsByClassName('contenedor_tarjeta');
    filtro = filtro.toUpperCase()
    for (var i = 0; i < _elementos.length; i++) {
        var _elm = _elementos[i];
        var _atr = _elm.getAttribute('href').toUpperCase();
        if (_elm != undefined) {
            _elm.style.display = _atr.indexOf(filtro) >= 0 ? 'block' : 'none';
        }
    }
};

const detalleControl = params => {
    const { detalle, titulo } = params
    const classes = useStyles({ color: params.color || blue });
    return <div className={classes.contenedor} role="presentation">
        <AppBar position="static" className={classes.appbar}>
            <Toolbar>
                <Typography variant="h6" className={classes.apptit} noWrap>
                    {titulo}
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Buscar..."
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        onChange={(e) => {
                            setFiltro(e.target.value);
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
            </Toolbar>
        </AppBar>
        <div className={'buscador_flotante ' + classes.contenedorDetalle}>
            {detalle(params)}
        </div>
    </div>
};

export const botonFlotante = params => {
    const classes = useStyles({ color: params.color || blue });
    const { lista, float, anchor, state, setState, icono, iconoVacio, titulo } = params;
    return (
        <Fragment>
            <Fab key='fb' size="small" aria-label={classes.fab.label} title={titulo} className={classes[lista.length > 0 ? 'fab' : 'fabInactive']} style={{ ...float, zIndex: 1102 }} color='primary'
                onClick={() => { setState(lista.length > 0) }}>
                {lista.length > 0 ? icono() : iconoVacio()}
            </Fab>
            <SwipeableDrawer
                anchor={anchor || "right"}
                open={state}
                key='sw'
                onClose={() => {
                    if (state)
                        setState(false)
                }}
                onOpen={() => {
                    if (!state)
                        setState(true)
                }}>
                {detalleControl(params)}
            </SwipeableDrawer>
        </Fragment>
    )
};