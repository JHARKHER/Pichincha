
import React, { useState, createContext } from "react";
import { useObtenerCampaniaRepartida, useGraficarCampania } from "../../hooks/GestionCampania";
import { useDispatch } from 'react-redux';
import { useCatalogs } from "odc-configuration";

export const Context = createContext({});

export const Provider = (props) => {
    const {
        children
    } = props;

    

   
    
    return <Context.Provider value={usersContext}>{children}</Context.Provider>;
};
