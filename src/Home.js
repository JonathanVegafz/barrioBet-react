import logo from './logo.svg';

import React, { useState, setState, useEffect} from 'react';
import './App.css';
import { CuadroEquipo } from './cuadroEquipo';
import { CuadroFactor } from './cuadroFactor';
import { Button, Input, Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Spinner} from 'reactstrap';
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
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc} 
from 'firebase/firestore/lite';
import { app } from './firebaseService';


export const Home = ()=> {

  const [docs, setDocus] = useState([]);
  const [equipoLocal, setEquipoLocal] = useState([]);
  const [equipoVisita, setEquipoVisita] = useState([]);
  const [loading, setLoading] = useState(true);

  const hanlerPartidoActivo = ()=>{
      if(loading === true){
        return (
          <div className='container'><Spinner></Spinner></div>
        );
      }

      return (
        <div className='container'>
          <ul className="horizontal-list">
              <li><CuadroEquipo titulo={'Local'} logo={equipoLocal[0].data['url']} nombreEquipo={equipoLocal[0].data['nombre']}></CuadroEquipo></li>
              <li><CuadroEquipo titulo={'Visita'} logo={equipoVisita[0].data['url']} nombreEquipo={equipoVisita[0].data['nombre']}></CuadroEquipo></li>
          </ul>
          <ul className="horizontal-list">
              <li><CuadroFactor factor={docs[0].data['factorLocal']} factorTitulo={"Factor Local"}></CuadroFactor></li>
              <li><CuadroFactor factor={docs[0].data['factorEmpate']} factorTitulo={"Factor Empate"}></CuadroFactor></li>
              <li><CuadroFactor factor={docs[0].data['factorVisita']} factorTitulo={"Factor Visita"}></CuadroFactor></li>
          </ul>
        </div>
      );
  }


  useEffect(() => {
    const obtenerPartidos = async () => {
        const coleccionRef = collection(getFirestore(app), "partidoActivo");
        const coleccionRefEquipo = collection(getFirestore(app), "equipos");
        const partidoSnapshot = await getDocs(coleccionRef);
        const equiposSnapshot = await getDocs(coleccionRefEquipo);
        const docsEquipos = equiposSnapshot.docs.map((doc) => {return {id: doc.id, data: doc.data()}} );
        const partidoActivo = partidoSnapshot.docs.map((doc) => {return {id: doc.id, data: doc.data()}} );
        setEquipoLocal(docsEquipos.filter(doc => doc.id=== partidoActivo[0].data['idEquipoLocal']));
        setEquipoVisita(docsEquipos.filter(doc => doc.id === partidoActivo[0].data['idEquipoVisita']));
        setDocus(partidoActivo);
        setLoading(false);
    };
    
    obtenerPartidos();
}, []);

  return hanlerPartidoActivo();
}