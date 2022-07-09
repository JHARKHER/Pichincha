import React, { useContext } from "react";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from "@material-ui/core/Paper"; //contenedor de la forma
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FlagIcon from '@material-ui/icons/Flag';
import IconButton from '@material-ui/core/IconButton';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { Context } from "../../context/ContextGestionCampania";

const GrdCampaniaAsesor = (props) => {
  const { selectedIndex, campanias, CambioValor,bgColor } = props;

  const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    shadowBox: {
      "box-shadow": "0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)"
    },
    tamano: {
      "minHeight": "610px"
    }
  }));

  const classes = useStyles();

  const cabeceraCampaniaAsesor = () => {
    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu">
              <ListAltIcon />
            </IconButton>
            <Typography style={{ "padding": "5px", "fontSize": "17px", "fontWeight": "bold" }} color="inherit">
              Lista Campañas
        </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }

  const noExistenCampanias = () => {
    return (
      <Card className={`${classes.card} ${classes.shadowBox}`} style={{ "textAlign": "center" }}>
        <CardContent>

          <h2 style={{ "fontWeight": "bold" }}>
            No existen campañas disponibles
              </h2>

        </CardContent>

      </Card>
    )
  }

  return (
    <div>
      <Paper className={`${classes.shadowBox} ${classes.tamano}`}>

        {cabeceraCampaniaAsesor()}

        {campanias != null &&

          campanias.map((item, index) => {

            return (

              <List component="nav" aria-label="main mailbox folders" key={JSON.stringify(item)} >
                <ListItem button selected={selectedIndex === index} alignItems="flex-start">

                  <ListItemIcon>
                    <FlagIcon style={{ color: bgColor[index] }} />
                  </ListItemIcon>
                  <ListItemText
                    onClick={() => CambioValor(item, index)}
                    primary={item.nombreCampania + " — " + item.tipoCampania}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                        >
                          Nº Registros
                        </Typography>
                        {" — " + item.numeroRegistros}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider style={{ backgroundColor: "#3C8DBC" }} />

              </List>

            );
          })}

        {campanias == null || campanias.length == 0 &&
           noExistenCampanias() 
        }

      </Paper>
    </div>
  );

}
export default GrdCampaniaAsesor;
