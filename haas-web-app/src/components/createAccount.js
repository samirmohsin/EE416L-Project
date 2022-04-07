import React, {Component, useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import "./createAccount.css"

export default function CreateAccount (){

    const [userId, setuserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    function validateForm(){
        return userId.length > 0 && password.length > 0 && confirmPassword.length > 0;
    }

    function handleSubmit(event){
        if(password !== confirmPassword){
            alert("Passwords do not match")
            return;
        }
        alert("Username: "+ userId + "\nPassword: " + password);
    }

    return(
        <body>
        <h1>Create Account</h1>
        <div className="createAccount">
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField value={userId} onChange={(e) => setuserId(e.target.value)} id="standard-basic" variant="standard" required label="Enter a userID"/>
                    <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="standard-basic" variant="standard" type="password" required label="Enter a Password"/>
                    <TextField value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} id="standard-basic" variant="standard" type="password" required label="Confirm Password"/>
                    <Button variant ="contained" type="submit" disabled={!validateForm()}>Create Account</Button>
                </Stack>
            </form>
        </div>


        </body>

    );
}