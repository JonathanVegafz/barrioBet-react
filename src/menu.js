import React from "react";
import './menu.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { NavLink } from "react-router-dom";

export const Menu = () =>{
    const [ menu , setMenu ] = useState( false );
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenu( !menu )
    }

    const handleActiveHome = (e)=>{
        e.preventDefault();
        navigate('/admin/home', {
            replace: true,
            state: {
                logged: true,
            },
        });
        return;
    }

    const handleActiveApuesta = (e)=>{
        e.preventDefault();
        navigate('/admin/apuesta', {
            replace: true,
            state: {
                logged: true,
            },
        });
        return;
    }

    const handleActivePartido = (e)=>{
        e.preventDefault();
        navigate('/admin/partido', {
            replace: true,
            state: {
                logged: true,
            },
        });
        return;
    }

    const handleActiveEquipo = (e)=>{
        e.preventDefault();
        navigate('/admin/equipo', {
            replace: true,
            state: {
                logged: true,
            },
        });
        return;
    }

    const handleDesactiveSalir = (e)=>{
        e.preventDefault();
        navigate('/admin/home', {
            replace: true,
            state: {
                logged: false,
            },
        });
        return;
    }

    return(
        <header className="Cabecera">
            <h1 className="Cabecera-h1">
                <NavLink to='/admin/home' className="Cabecera-a" onClick={handleActiveHome}>BarrioBet</NavLink>
            </h1>
            <button 
                onClick={ toggleMenu }
            className="Cabecera-button">
            <svg className='Cabecera-svg' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            </button>

            <nav className={ `Cabecera-nav ${ menu ? 'isActive' : '' }` }>
                <ul className="Cabecera-ul">
                    <li><NavLink to='/admin/equipo' className="Cabecera-li" onClick={handleActiveEquipo}>Equipo</NavLink></li>
                    <li><NavLink to='/admin/apuesta' className="Cabecera-li" onClick={handleActiveApuesta}>Apuesta</NavLink></li>
                    <li><NavLink to='/admin/partido' className="Cabecera-li" onClick={handleActivePartido}>Partido</NavLink></li>
                    <li><NavLink to='/admin' className="Cabecera-li" style={{color:'red'}} onClick={handleDesactiveSalir}>Salir</NavLink></li>
                </ul>
            </nav>

        </header>
    )
}