import React, { Fragment } from "react";
import { blue } from '@material-ui/core/colors';
import { usePanelGestion } from "../../hooks/Flotantes";
import { useDispatch } from 'react-redux';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { formatoFecha } from '../../utils/funciones';
import { useStyles, botonFlotante } from './comun';
import { ContactPhone, PhoneDisabled, Face, ErrorOutline, TagFaces, SentimentDissatisfied, MoodBad, SentimentSatisfied, SentimentVeryDissatisfied } from '@material-ui/icons';

const eventoClick = (setState, onClick, obj) => {
    setState(false)
    if (onClick && typeof (onClick) === 'function') {
        onClick(obj)
    }
    else
        console.log('obj', obj)
};

const iconoTemperamento = temp => {
    switch (temp) {
        case "NO DEFINIDO":
            return <ErrorOutline style={{ color: '#FFFFFF' }} />;
        case "SILENCIOSO":
            return <Face style={{ color: '#E0E0E0' }} />;
        case "SIMPATICO":
            return <TagFaces style={{ color: '#16d122' }} />;
        case "NORMAL":
            return <SentimentSatisfied style={{ color: '#84FFFF' }} />;
        case "CONTROLADOR":
            return <SentimentDissatisfied style={{ color: '#FFEB3B' }} />;
        case "DESCORTÉS":
            return <MoodBad style={{ color: '#F44336' }} />;
        case "INSATISFECHO":
            return <SentimentVeryDissatisfied style={{ color: '#FFC107' }} />;
        case "INTRATABLE":
            return <SentimentVeryDissatisfied style={{ color: '#7e57c2' }} />;
        default:
            return <ErrorOutline style={{ color: '#FFFFFF' }} />;
    }
};

const detalle = params => {
    const { lista, color, onClick, setState } = params
    const classes = useStyles({ color: color });
    return lista.map((item, i) => {
        return (
            <Fragment key={'e_' + i}>
                <Card key={i} className='contenedor_tarjeta' href={`${item.nombreAsesor}${item.codigoCanal}${formatoFecha(item.fechaGestion, 'DD-MM-YYYY hh:mm')}${item.codigoRespuesta}`}>
                    <CardContent key={'a_' + i} className={classes.card} style={{ paddingBottom: 2 }} onClick={() => { eventoClick(setState, onClick, item) }}>
                        <Typography className={classes.body}>
                            {iconoTemperamento(item.temperamento)}
                            <div className={classes.textBody} title={item.comentario}>
                                {`${item.nombreRespuesta}`}
                            </div>
                        </Typography>
                        <Typography gutterBottom key={'b_' + i} className={classes.title} color="textSecondary">
                            {`${item.codigoCanal}`}
                        </Typography>
                        <Typography key={'c_' + i} className={classes.pos} color="textSecondary">
                            {`${formatoFecha(item.fechaGestion, 'DD-MM-YYYY hh:mm')}`}
                        </Typography>
                        <Typography key={'d_' + i} className={classes.pos} color="textSecondary">
                            {`${item.nombreAsesor}`}
                        </Typography>
                    </CardContent>
                    <Divider key={'dv_' + i} />
                </Card>
            </Fragment>
        )
    })
};

const PanelGestion = props => {
    const _dispatch = useDispatch();
    const { state, setState, lista } = usePanelGestion(_dispatch, props.identificacion);
    const _float = { ...{ right: 10, top: 150 },...props.float };
    const _params = {
        state: state,
        setState: setState,
        lista: lista || [],
        anchor: props.anchor || "right",
        color: props.color || blue,
        detalle: detalle,
        float: _float,
        onClick: props.onClick,
        icono: props.icono ? props.icono : () => { return <ContactPhone /> },
        iconoVacio: props.iconoVacio ? props.iconoVacio : () => { return <PhoneDisabled /> },
        titulo: props.titulo || 'GESTIÓN'
    };
    return botonFlotante(_params);
};

export default PanelGestion;