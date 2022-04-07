import './login.css';
import React, {Component, useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import CreateAccount from "./createAccount";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';



export default function Login() {

    const [userId, setuserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function validateForm(){
        return userId.length > 0 && password.length > 0;
    }

    function handleSubmit(event){
        alert("Username: "+ userId + "\nPassword: " + password);
        navigate('/links');
    }

    return (
        <div className="Login">
            <h1>Welcome!</h1>
            <form onSubmit={handleSubmit}>
                <Stack spacing={4} direction="column">
                    <TextField id="standard-basic" variant="standard" label ="Enter userId" value={userId} onChange={(e) => setuserId(e.target.value)}/>
                    <TextField id="standard-basic" type = "password" variant="standard" label ="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Button variant ="contained" type="submit" disabled={!validateForm()}>Login</Button>
                    <Link to ="/createAccount">
                        Don't have an account?
                    </Link>
                </Stack>
            </form>
        </div>

    );

}
