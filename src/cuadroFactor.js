import logo from './logo.svg';
import { Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import { FormularioApuesta } from './formularioApuesta';
import React, { useState } from 'react';


export const CuadroFactor = ({factor, factorTitulo}) =>{
    const [state, setStates] = useState(false);

    const abrirModal=()=>{
        setStates(!state);
    }

    return(
        <>
            <Button className="btn btn-primary cuadroFactor" onClick={abrirModal}>
                <h5>{factorTitulo}</h5>
                <h3>{factor}</h3>
            </Button>

            <FormularioApuesta estado={state} factor={factor} abrirModal={abrirModal}></FormularioApuesta>
        </>
        // <div className="containe">
        //     <Button variant="light" className="rounded">
        //         Botón Redondeado
        //     </Button>
        // </div>
    )
}