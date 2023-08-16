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
import { Menu } from './menu';

import {Home} from './Home';
import { AdminHome } from './Admin/adminHome';
import { AdminLogin } from './Admin/adminLogin';
import { PrivateRoute } from './privateRoute';

function App({ direction, ...args }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const modalStyles={
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
  // const state={
  //   abierto: false,
  // }

  const [state, setStates] = useState(false);

  const abrirModal=()=>{
    setStates(!state);
  }

  
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home></Home>}></Route>
            <Route path='admin'>
              <Route index element={<AdminLogin></AdminLogin>}></Route>
              <Route path='home' element={<PrivateRoute><AdminHome></AdminHome></PrivateRoute>}></Route>
              <Route path='equipo' element={<PrivateRoute><h1>Equipo</h1></PrivateRoute>}></Route>
              <Route path='partido' element={<PrivateRoute><h1>Partido</h1></PrivateRoute>}></Route>
              <Route path='apuesta' element={<PrivateRoute><h1>Apuesta</h1></PrivateRoute>}></Route>
            </Route>
          </Route>
          <Route path='*' element={<h1>404 Not Found</h1>}></Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
