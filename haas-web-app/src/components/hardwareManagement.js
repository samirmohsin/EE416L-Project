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
    const[projectID, setProjectID] =  useState("");
    const[selectedHWSet,setSelectedHWSet] = useState("");
    const[postResponse,setPostResponse]= useState("");
    const[checkedOutAmount1,setCheckedOutAmount1]=useState(0);
    const[checkedOutAmount2,setCheckedOutAmount2]=useState(0);

    const rows = [
        createData('HW Set 1', availability1, 200,),
        createData('HW Set 2', availability2, 200,),
    ];

    const checkOut = event =>{
        console.log(selectedHWSet);

        fetch('http://127.0.0.1:5000/checkOut/' + window.sessionStorage.getItem('username'), {
                method:'POST',
                cache: 'no-cache',
                headers: {
                    'content_type':'application/json',
                },
                body:JSON.stringify({'quantity': quantity,'set':selectedHWSet,'projectID':projectID})
            }
        ).then(response => response.json()
        ).then(async data => {
            await setPostResponse(data.resultVal)
        })
    }

    const checkIn = event =>{
        fetch('http://127.0.0.1:5000/checkIn/' + window.sessionStorage.getItem('username'), {
                method:'POST',
                cache: 'no-cache',
                headers: {
                    'content_type':'application/json',
                },
                body:JSON.stringify({'quantity': quantity,'set':selectedHWSet,'projectID':projectID})
            }
        ).then(response => response.json()
        ).then(async data => {
            await setPostResponse(data.resultVal)
        })

    }



    useEffect( () =>{
        if(postResponse === 'ERROR:too much checked out'){
            alert("Too much checked out, try smaller value")
            window.location.reload();
        }

        if(postResponse === 'ERROR:too much checked in'){
            alert("Too much checked in, try smaller value")
            window.location.reload();
        }

        if(postResponse === 'ERROR:Invalid ProjectID'){
            alert("Invalid ProjectId, try again")
            window.location.reload();
        }

        if(postResponse === 'ERROR:Not part of project'){
            alert("You are not apart of this project.\nPlease go to the project page and join that project")
            window.location.reload();
        }

        if(postResponse === 'success'){
            window.location.reload();
        }


    },[postResponse])

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

    //function to update checkedout amnounts
    useEffect(()=>{
        fetch("http://127.0.0.1:5000/updateCheckedOut/"+projectID )
            .then(response => response.json())
            .then(async data=> {
                await setCheckedOutAmount1(data.Availability1)
                await setCheckedOutAmount2(data.Availability2)
            })
            .catch(error=> {
                console.log(error)
            })
    },[projectID])

    const handleDropDown = e => setSelectedHWSet(e.target.value)

  return (
    <div className="hardwareManagement">
        <header className="hardwareManagement-header">
            <p> Hardware Management </p>
        </header>
        <div className="check">
            <form>
                <header> Check-In/Checkout</header>
                <br/>
                <p>Select a Hardware Set</p>
                <br/>
                <div className="select">
                    <Select className="dropdown" onChange={handleDropDown}>
                        <MenuItem value="HW Set 1">HW Set 1</MenuItem>
                        <MenuItem value="HW Set 2">HW Set 2</MenuItem>
                    </Select>
                </div>
                <div className="quantity">
                    <br/>
                    <header>ProjectID:</header>
                    <br/>
                    <TextField id="ProjectID" label="Enter ProjectID" variant="outlined" value={projectID} onChange={(e)=> setProjectID(e.target.value)} />
                    <br/><br/>
                    <header> Quantity:</header>
                    <br/>
                    <TextField id="Quant" label="Enter Quantity" variant="outlined" value={quantity} onChange={(e)=> setQuantity(e.target.value)} />
                </div>
                <Button variant={"contained"} size={"medium"} onClick={checkIn} >Check-in</Button>
                <Button variant={"contained"} size={"medium"} onClick={checkOut}  >Checkout</Button>
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
                <br/>
                <h6>Current Hardware Set 1 checked out amount: {checkedOutAmount1}</h6>
                <h6>Current Hardware Set 2 checked out amount: {checkedOutAmount2}</h6>
            </Box>

        </div>
    </div>

  );
}

export default HardwareManagement;