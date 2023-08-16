import React from "react";
import logo from './logo.svg';

export const CuadroEquipo = () =>{
    return(
        <div className="cuadro">
            <h1>Local</h1>
            <img src={logo} className="logoEquipo"></img>
            <h1>Nombre Equipo</h1>
        </div>
    )
}