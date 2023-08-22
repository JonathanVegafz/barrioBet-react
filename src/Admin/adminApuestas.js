import React, {useState, useEffect} from 'react'
import { Menu } from '../menu';
import {Button, Spinner, Table} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css';
import { app } from '../firebaseService';
import { ModalEquipo } from './Equipo/modalEquipo';
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc} 
from 'firebase/firestore/lite';


export default function AdminApuestas() {

    const [state, setStates] = useState(false);
    const [docus, setDocus] = useState([]);

    const abrirModal=()=>{
        setStates(!state);
    }

    const eliminarHandler = async(idDocument)=>{

        const coleccionRef = doc(getFirestore(app), 'apuestas', idDocument);
        
        await deleteDoc(coleccionRef, `apuestas/${idDocument}`);

        // Elimina el documento del estado local
        setDocus(docus.filter(doc => doc.id !== idDocument));
    }

    useEffect(() => {
        const obtenerEquipos = async () => {
            const coleccionRef = collection(getFirestore(app), "apuestas");
            const equiposSnapshot = await getDocs(coleccionRef); // Cambio aquí
            console.log(equiposSnapshot.docs[0].data());
            setDocus(equiposSnapshot.docs.map((doc) => {return {id: doc.id, data: doc.data()}} ));
        };
        
        obtenerEquipos();
    }, []);

    const handlerData = ()=>{
        if(docus.length == 0){
            return (
                <Spinner></Spinner>
            );
        }
        
        return (
            docus.map((doc,i)=>
                            
                <tr>
                    <th scope="row">{i+1}</th>
                    <td>{doc.id}</td>
                    <td>{doc.data['nombre']}</td>
                    <td>{doc.data['correo']}</td>
                    <td>
                        <div className='containerTable'>
                            {/* <Button style={{marginRight: '20px'}}>Editar</Button> */}
                            <Button style={{marginRight: '20px'}} onClick={()=>eliminarHandler(doc.id)} disabled={docus.length === 1}>Eliminar</Button>
                        </div>
                    </td>
                </tr>
                            // <li><h3>{doc.nombre}</h3><img src={doc.url} height="100px" width="100px" /></li>
            )
        );
    }

    return (
        <div style={{textAlign: 'center', justifyContent:'center'}}>
            <Menu></Menu>
            <h1>Apuestas</h1>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Id Apuesta</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        handlerData()
                    }

                </tbody>
            </Table>
        </div>
    )
}
