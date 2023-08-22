import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseService';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Spinner } from 'reactstrap';
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export const ModalPartido = ({ estado, abrirModal = () => {}, setDocus = ([])=>{}}) => {

    const [fecha, setFecha] = useState('');
    const [factorLocal, setFactorLocal] = useState(0.0);
    const [factorEmpate, setFactorEmpate] = useState(0.0);
    const [factorVisita, setFactorVisita] = useState(0.0);
    const [idEquipoLocal, setIdEquipoLocal] = useState('');
    const [idEquipoVisita, setIdEquipoVisita] = useState('');
    const [bandera, setBandera] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!fecha || !factorLocal || !factorEmpate || !factorVisita || !idEquipoLocal || !idEquipoVisita) {
            alert("Completa todos los campos");
            return;
        }

        const coleccionRef = collection(getFirestore(app), "partidos");
        try {
            setBandera(true);

            const getEquipos = async()=>{
                const coleccionRef = collection(getFirestore(app), "equipos");
                const equiposSnapshot = await getDocs(coleccionRef); // Cambio aquí
                const documentos = equiposSnapshot.docs.map((doc) => {return{id:doc.id, data: doc.data()}});
                return documentos.filter((doc)=>doc.id === idEquipoLocal || doc.id === idEquipoVisita).length === 0;
            }

            if(getEquipos() === true){
                alert('Alguno de los id de los equipos estan incorrectos');
                setBandera(false);
                return;
            }
            const data = await addDoc(coleccionRef, { 
                fecha: fecha,
                factorLocal: factorLocal, 
                factorEmpate: factorEmpate,
                factorVisita: factorVisita,
                idEquipoLocal: idEquipoLocal,
                idEquipoVisita: idEquipoVisita
            });

            const obtenerPartidos = async () => { //Esto no es lo mas optimo
                const coleccionRef = collection(getFirestore(app), "partidos");
                const equiposSnapshot = await getDocs(coleccionRef); // Cambio aquí
                setDocus(equiposSnapshot.docs.map((doc) => {return{id:doc.id, data: doc.data()}}));
            };
            obtenerPartidos();
            setBandera(false);
            abrirModal();
            setFecha('');
            setFactorLocal(0.0);
            setFactorEmpate(0.0);
            setFactorVisita(0.0);
            setIdEquipoLocal('');
            setIdEquipoVisita('');
        } catch (error) {
            console.error("Error al agregar el equipo:", error);
        }
    }

    const modalStyles = {
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    };
    
    const carga = ()=>{
        if(bandera){
            return(
                <div style={{textAlign:'center'}}><Spinner className="m-5"></Spinner></div>
            );
        }

        return(
            <ModalBody>
                    <FormGroup>
                        <Label for="fecha">fecha</Label>
                        <Input type="text" id="fecha" name="fecha"
                            value={fecha}
                            onChange={ev => setFecha(ev.target.value)}
                            autoComplete='off'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="factorLocal">factorLocal</Label>
                        <Input type="number" id="factorLocal" name="factorLocal"
                            value={factorLocal}
                            onChange={ev => setFactorLocal(ev.target.value)}
                            autoComplete='off'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="factorEmpate">factorEmpata</Label>
                        <Input type="number" id="factorEmpate" name="factorEmpate"
                            value={factorEmpate}
                            onChange={ev => setFactorEmpate(ev.target.value)}
                            autoComplete='off'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="factorVisita">factorVisita</Label>
                        <Input type="number" id="factorVisita" name="factorVisita"
                            value={factorVisita}
                            onChange={ev => setFactorVisita(ev.target.value)}
                            autoComplete='off'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="idEquipoLocal">id Equipo Local</Label>
                        <Input type="text" id="idEquipoLocal" name="idEquipoLocal"
                            value={idEquipoLocal}
                            onChange={ev => setIdEquipoLocal(ev.target.value)}
                            autoComplete='off'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="idEquipoVisita">id Equipo Visita</Label>
                        <Input type="text" id="idEquipoVisita" name="idEquipoVisita"
                            value={idEquipoVisita}
                            onChange={ev => setIdEquipoVisita(ev.target.value)}
                            autoComplete='off'
                        />
                    </FormGroup>
            </ModalBody>
        );
    }

    const ReiniciarParametros = () => {
        abrirModal();
    }

    return (
        <Modal isOpen={estado} style={modalStyles}>
            <ModalHeader>
                Agregar Partido
            </ModalHeader>
            {   
                carga()
            }
            <ModalFooter>
                {<Button color="primary" onClick={submitHandler} disabled={bandera}>Agregar Partido</Button>}
                {<Button color="secondary" onClick={ReiniciarParametros} disabled={bandera}>Cerrar</Button>}
            </ModalFooter>
        </Modal>
    )
}