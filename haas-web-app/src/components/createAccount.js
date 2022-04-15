import React, {useEffect, useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import {useNavigate} from 'react-router-dom';
import "./createAccount.css"

export default function CreateAccount (){

    const [userId, setuserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const [postResponse, setPostResponse] = useState("");
    const navigate = useNavigate();

    function validateForm(){
        return userId.length > 0 && password.length > 0 && confirmPassword.length > 0;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(password !== confirmPassword){
            alert("Passwords do not match")
            return;
        }
        //alert("Username: "+ userId + "\nPassword: " + password);

        fetch('/createUser', {
            method:'POST',
            cache: 'no-cache',
            headers: {
                'content_type':'application/json',
            },
            body:JSON.stringify({'username': userId, 'password': password})
            }
        ).then(response => response.json()
        ).then(data => {
            setPostResponse(data.resultVal)
        })

    }
        useEffect(()=>{
            console.log(JSON.stringify(postResponse));
        if (postResponse === 'ERROR') {
            alert('Username Already Exists. Choose another one.')
            return;
        }
        if(postResponse === 'success'){
            navigate('/');
        }
    },[postResponse])



    return(
        <body>
        <h1>Create Account</h1>
        <div className="createAccount">
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField value={userId} onChange={(e) => setuserId(e.target.value)} id="standard-basic" variant="standard" required label="Enter a userID"/>
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="standard-basic" variant="standard" type="password" required label="Enter a Password"/>
                    <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="standard-basic" variant="standard" type="password" required label="Confirm Password"/>
                    <Button variant ="contained" type="submit" disabled={!validateForm()}>
                        Create Account
                    </Button>
                </Stack>
            </form>
        </div>


        </body>

    );
}