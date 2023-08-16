import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '../menu';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Routes,
    Link,
    BrowserRouter,
  } from "react-router-dom";

  import { Button, Input, Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Form} from 'reactstrap';

export const AdminLogin = () =>{
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e)=>{
        if(name == '' && password == ''){
            e.preventDefault();
            navigate('/admin/home', {
                replace: true,
                state: {
                    logged: true,
                },
            });
            return;
        }

        alert('El nombre y/o contraseña son incorrectas');

    }

    return(
        <div className="container">
            <div className="cuadro login">
                <div className='cuadroLogin'>
                    <FormGroup>
                        <Label for="usuario">Nombre</Label>
                        <Input type="text" id="usuario"
                            value={name}
                            onChange={ev=> setName(ev.target.value)}
                            autoComplete='off'
                        /> 
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Contraseña</Label>
                        <Input type="password" id="password"
                            value={password}
                            onChange={ev => setPassword(ev.target.value)}
                            autoComplete='off'
                        /> 
                    </FormGroup>
                    <Button style={{marginTop: 100}}
                        onClick={handleLogin}
                    >Login</Button>
                </div>
            </div>
        </div>
    )
}