import './hardwareManagement.css';
import * as React from 'react';
import {
    Button,
    Select,
    MenuItem,
    TableContainer,
    TableHead,
    Table,
    TableRow,
    Paper,
    TableCell, TableBody, Box, TextField
} from "@mui/material";
import {Link} from 'react-router-dom';
import {useEffect, useState} from "react";




function HardwareManagement() {
    function createData(name, availability, capacity) {
        return { name, availability, capacity};
    }

    const[availability1,setAvailability1] = useState(0);
    const[availability2,setAvailability2] = useState(0);
    const[quantity, setQuantity] =  useState("");
    
    const rows = [
        createData('HW Set 1', availability1, 200,),
        createData('HW Set 2', availability2, 200,),
    ];

    const handleSubmit = event =>{
        event.preventDefault();

        fetch('http://127.0.0.1:5000/updateAvailability', {
                method:'POST',
                cache: 'no-cache',
                headers: {
                    'content_type':'application/json',
                },
                body:JSON.stringify({'quantity': quantity})
            }
        ).then(response => response.json())
    }

    useEffect(()=>{
          fetch("http://127.0.0.1:5000/hardwareManagement" )
            .then(response => response.json())
            .then(async data=> {
                await setAvailability1(data.Availability1)
                await setAvailability2(data.Availability2)
            })
            .catch(error=> {
                console.log(error)
            })
    },[availability1,availability2])

  return (
    <div className="hardwareManagement">
        <header className="hardwareManagement-header">
            <p> Hardware Management </p>
        </header>
        <div className="check">
            <form onSubmit={handleSubmit}>
                <header> Check-In/Checkout</header>
                <p>Set #:</p>
                <div className="select">
                    <Select className="dropdown">
                        <MenuItem value="HW Set 1">HW Set 1</MenuItem>
                        <MenuItem value="HW Set 2">HW Set 2</MenuItem>
                    </Select>
                    <Button  component={Paper} variant={"contained"} size={"small"}>select</Button>
                </div>
                <div className="quantity">
                    <header> Quantity:</header>
                    <br/>
                    <TextField id="Quant" label="Enter Quantity" variant="outlined" value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
                </div>
                <Button variant={"contained"} size={"medium"} >Check-in</Button>
                <Button variant={"contained"} size={"medium"} >Checkout</Button>
            </form>
        </div>
            
        <div>
            <Link to='/links'>
                Go back to nav page
            </Link>
            <Box className="table" sx={{width: 650}}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Set</TableCell>
                                <TableCell>Availability</TableCell>
                                <TableCell>Capacity</TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell>{row.availability}</TableCell>
                                    <TableCell>{row.capacity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Box>

        </div>
    </div>

  );
}

export default HardwareManagement;