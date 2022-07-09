import React, { Fragment } from "react";
import { teal } from '@material-ui/core/colors';
import { useClienteSeguimiento } from "../../hooks/Flotantes";
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { formatoFecha } from '../../utils/funciones';
import { useStyles, botonFlotante } from './comun';
import { Alarm, AlarmOff, Face } from '@material-ui/icons';

const eventoClick = (setState, onClick, obj) => {
    setState(false)
    if (onClick && typeof (onClick) === 'function') {
        onClick(obj);       
    }
    else
        console.log('obj', obj)
};

const detalle = params => {
    const { lista, color, onClick, setState } = params
    const classes = useStyles({ color: color });
    return lista.map((item, i) => {
        return (
            <Fragment key={'e_' + i}>
                <Card key={i} className='contenedor_tarjeta' href={`${item.primerApellido} ${item.segundoApellido} ${item.primerNombre} ${item.segundoNombre} ${item.celular} ${formatoFecha(item.fechaUltimoSeguimiento, 'DD-MM-YYYY')} ${item.tipoIdentificacion}: ${item.identificacion}`}>
                    <CardContent key={'a_' + i} className={classes.card} style={{ paddingBottom: 2 }} onClick={() => { eventoClick(setState, onClick, item) }}>
                        <Typography className={classes.body}>
                            <Face className={classes.icono}/>
                            <div className={classes.textBody}> {`${item.primerApellido} ${item.segundoApellido} ${item.primerNombre} ${item.segundoNombre} - ${item.tipoIdentificacion}: ${item.identificacion}`}</div>
                        </Typography>
                        <Typography gutterBottom key={'b_' + i} className={classes.title2} color="textSecondary">
                            {`${item.celular}`}
                        </Typography>
                        <Typography key={'c_' + i} className={classes.pos} color="textSecondary">
                            {`Ult. Consulta: ${formatoFecha(item.fechaUltimoSeguimiento, 'DD-MM-YYYY hh:mm')}`}
                        </Typography>
                    </CardContent>
                    <Divider key={'dv_' + i} />
                </Card>
            </Fragment>
        )
    })
};

const Seguimiento = props => {
    const _dispatch = useDispatch();
    const { state, setState, lista } = useClienteSeguimiento(_dispatch, props.id);
    const _float = { ...{ right: 10, top: 200 }, ...props.float };
    const _params = {
        state: state,
        setState: setState,
        lista: lista || [],
        anchor: props.anchor || "right",
        color: props.color || teal,
        detalle: detalle,
        float: _float,
        onClick: props.onClick,
        icono: props.icono ? props.icono : () => { return <Alarm /> },
        iconoVacio: props.iconoVacio ? props.iconoVacio : () => { return <AlarmOff /> },
        titulo: props.titulo || 'PROSPECTOS'
    };
    return botonFlotante(_params)
};

export default Seguimiento;