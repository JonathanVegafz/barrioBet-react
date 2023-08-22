import React from "react";

export const CuadroEquipo = ({titulo, logo, nombreEquipo}) =>{
    return(
        <div className="cuadro">
            <h1>{titulo}</h1>
            <img src={logo} className="logoEquipo"></img>
            <h1>{nombreEquipo}</h1>
        </div>
    )
}