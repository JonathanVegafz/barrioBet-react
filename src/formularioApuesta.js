import logo from './logo.svg';
import React, { useState } from 'react';
import { Button, Input, Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label} from 'reactstrap';
  import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

export const FormularioApuesta = ({direction, estado, factor, abrirModal=()=>{}, ...args}) =>{
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const modalStyles={
        position: "absolute",
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    }

    const [apuesta, setApuesta] = useState('Seleccionar apuesta');

    const handleApuesta = (apuestaNueva)=>{
        setApuesta(apuestaNueva);
    }

    const ReiniciarParametros = ()=>{
        abrirModal();
        setApuesta('Seleccionar apuesta');
    }

    return(
        <Modal isOpen={estado} style={modalStyles}>
            <ModalHeader>
            Agreagar Apuesta, factor {factor}
            </ModalHeader>
            <ModalBody>
            <FormGroup>
                <Label for="usuario">Nombre</Label>
                <Input type="text" id="usuario"/> 
            </FormGroup>
            <FormGroup>
                <Label for="correo">Correo Electronico</Label>
                <Input type="text" id="correo"/> 
            </FormGroup>
            <FormGroup>
                <Label for='apuesta'>Seleccionar Apuesta</Label>
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction} id='apuesta'>
                    <DropdownToggle caret>{apuesta}</DropdownToggle>
                    <DropdownMenu {...args}>
                    <DropdownItem header>Monto apuesta</DropdownItem>
                    {/* <DropdownItem>Some Action</DropdownItem> */}
                    {/* <DropdownItem text>Dropdown Item Text</DropdownItem> */}
                    {/* <DropdownItem disabled>Action (disabled)</DropdownItem> */}
                    {/* <DropdownItem divider /> */}
                    <DropdownItem onClick={()=>{handleApuesta('500')}}>500</DropdownItem>
                    <DropdownItem onClick={()=>{handleApuesta('1000')}}>1000</DropdownItem>
                    <DropdownItem onClick={()=>{handleApuesta('2000')}}>2000</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </FormGroup>
            </ModalBody>

            <ModalFooter>
                <Button color="primary">Agregar apuesta</Button>
                <Button color="secondary" onClick={ReiniciarParametros}>Cerrar</Button>
            </ModalFooter>
        </Modal>    
    )
}