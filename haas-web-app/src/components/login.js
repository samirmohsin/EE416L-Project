import './login.css';
import React, {Component, useEffect, useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import CreateAccount from "./createAccount";
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';



export default function Login() {

    const [userId, setuserId] = useState("");
    const [password, setPassword] = useState("");
    const [postResponse, setPostResponse] = useState("");
    const[loggedin,setLoggedin]=useState(false);
    const navigate = useNavigate();

    function validateForm(){
        return userId.length > 0 && password.length > 0;
    }

    const handleSubmit = event => {
        event.preventDefault();
        //alert("Username: "+ userId + "\nPassword: " + password);

        fetch('http://127.0.0.1:5000/login', {
                method:'POST',
                cache: 'no-cache',
                headers: {
                    'content_type':'application/json',
                },
                body:JSON.stringify({'username': userId, 'password': password})
            }
        ).then(response => response.json()
        ).then(async data => {
            await setPostResponse(data.resultVal)
        })

    }

    useEffect(()=>{
        console.log(JSON.stringify(postResponse));

        if(postResponse === 'ERROR'){
            console.log("login failed");
            alert("Login failed, please check username and password");
        }

        if(postResponse === 'success'){
            navigate('/links');
        }
    },[navigate, postResponse])

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
