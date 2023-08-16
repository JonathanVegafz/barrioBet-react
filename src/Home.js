import logo from './logo.svg';

import React, { useState, setState} from 'react';
import './App.css';
import { CuadroEquipo } from './cuadroEquipo';
import { CuadroFactor } from './cuadroFactor';
import { Button, Input, Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import PropTypes from 'prop-types';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Routes,
  Link,
  BrowserRouter,
} from "react-router-dom";
import { FormularioApuesta } from './formularioApuesta';


export const Home = ()=> {
  return (
    <div className='container'>
        <ul className="horizontal-list">
            <li><CuadroEquipo></CuadroEquipo></li>
            <li><CuadroEquipo></CuadroEquipo></li>
        </ul>
        <ul className="horizontal-list">
            <li><CuadroFactor factor={0.4} factorTitulo={"Factor Local"}></CuadroFactor></li>
            <li><CuadroFactor factor={0.5} factorTitulo={"Factor Empate"}></CuadroFactor></li>
            <li><CuadroFactor factor={0.2} factorTitulo={"Factor Visita"}></CuadroFactor></li>
        </ul>
    </div>
  );
}