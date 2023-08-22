import React, { useState, useEffect } from 'react';
import { app } from '../../firebaseService';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Spinner } from 'reactstrap';
import { getFirestore, collection, addDoc, getDocs, deleteDoc } from 'firebase/firestore/lite';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';


export const ModalEquipo = ({ estado, abrirModal = () => {}, setDocus = ([])=>{}}) => {
    const [archivoUrl, setArchivoUrl] = useState("");
    // const [docus, setDocus] = useState([]);
    const [name, setName] = useState('');
    const [divicion, setDivicion] = useState('');
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [archivo, setArchivo] = useState({});
    const [bandera, setBandera] = useState(false);
    
    const archivoHandler = async (e) => {
        setArchivo(e.target.files[0]);
        // const archivo = e.target.files[0];
        // const storage = getStorage(app);
        // const storageRef = ref(storage, `equipos/${archivo.name}`);
        // setNombreArchivo(e.target.value);
        // try {
        //     await uploadBytes(storageRef, archivo);
        //     const enlaceUrl = await getDownloadURL(storageRef);
        //     setArchivoUrl(enlaceUrl);
        // } catch (error) {
        //     console.error("Error cargando el archivo:", error);
        // }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        // const nombreArchivo = e.target.usuario.value;
        // const divicion = e.target.correo.value;

        if (!name || !divicion) {
            alert("Completa todos los campos");
            return;
        }

        const coleccionRef = collection(getFirestore(app), "equipos");
        const storage = getStorage(app);
        const storageRef = ref(storage, `equipos/Logo_${name}_${archivo.name}`);
        setNombreArchivo(e.target.value);
        try {
            setBandera(true);
            await uploadBytes(storageRef, archivo);
            const enlaceUrl = await getDownloadURL(storageRef);
            setArchivoUrl(enlaceUrl);

            const data = await addDoc(coleccionRef, { nombre: name,divicion: divicion, url: archivoUrl });
            console.log("Data: ", data);
            console.log("Equipo agregado:", nombreArchivo);
            const obtenerEquipos = async () => { //Esto no es lo mas optimo
                const coleccionRef = collection(getFirestore(app), "equipos");
                const equiposSnapshot = await getDocs(coleccionRef); // Cambio aquí
                setDocus(equiposSnapshot.docs.map((doc) => {return{id:doc.id, data: doc.data()}}));
            };
            obtenerEquipos();
            setBandera(false);
            abrirModal();
            setArchivoUrl('');
            setName('');
            setDivicion('');
            setNombreArchivo('');
            setArchivo({});
        } catch (error) {
            console.error("Error al agregar el equipo:", error);
        }
    }

    // useEffect(() => {
    //     const obtenerEquipos = async () => {
    //         const coleccionRef = collection(getFirestore(app), "equipos");
    //         const equiposSnapshot = await getDocs(coleccionRef); // Cambio aquí
    //         setDocus(equiposSnapshot.docs.map((doc) => doc.data()));
    //     };

    //     obtenerEquipos();
    // }, []);

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
                        <Label for="usuario">Nombre</Label>
                        <Input type="text" id="usuario" name="usuario"
                            value={name}
                            onChange={ev => setName(ev.target.value)}
                            autoComplete='off'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="divicion">División</Label>
                        <Input type="text" id="divicion" name="divicion"
                            value={divicion}
                            onChange={ev => setDivicion(ev.target.value)}
                            autoComplete='off'
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="logo">Seleccionar Logo</Label>
                        <Input type="file" id="logo" name="logo" onChange={archivoHandler} />
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
                Agregar Equipo
            </ModalHeader>
            {   
                carga()
            }
            <ModalFooter>
                {<Button color="primary" onClick={submitHandler} disabled={bandera}>Agregar Equipo</Button>}
                {<Button color="secondary" onClick={ReiniciarParametros} disabled={bandera}>Cerrar</Button>}
            </ModalFooter>
        </Modal>
    )
}