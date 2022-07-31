import {useState} from 'react';

import { createContext } from "react";

export const FindByIdPaciente = createContext();

export function FindByIdProvider(props){
    const [contextData, setContextData] = useState({})

    const id = {contextData, setContextData};

    return(
        <FindByIdPaciente.Provider value={id}>
            {props.children}
        </FindByIdPaciente.Provider>
    )
}
