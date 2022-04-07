import './hardwareManagement.css';
import * as React from 'react';
import {
    Button,
    Slider,
    Select,
    MenuItem,
    TableContainer,
    TableHead,
    Table,
    TableRow,
    Paper,
    TableCell, TableBody, Box
} from "@mui/material";
import {Link} from 'react-router-dom';




function HardwareManagement() {
    function createData(name, availability, capacity) {
        return { name, availability, capacity};
    }
    
    const rows = [
        createData('HW Set 1', 159, 200,),
        createData('HW Set 2', 237, 150,),
        createData('HW Set 3', 262, 300,),
        createData('HW Set 4', 305, 300),
        createData('HW Set 5', 356, 500),
    ];

  return (
    <div className="hardwareManagement">
        <header className="hardwareManagement-header">
            <p> Hardware Management </p>
        </header>
        <div className="check">
            <header> Check-In/Checkout</header>
            <p>Set #:</p>
            <div className="select">
                <Select className="dropdown">
                    <MenuItem value="HW Set 1">HW Set 1</MenuItem>
                    <MenuItem value="HW Set 2">HW Set 2</MenuItem>
                    <MenuItem value="HW Set 3">HW Set 3</MenuItem>
                    <MenuItem value="HW Set 4">HW Set 4</MenuItem>
                    <MenuItem value="HW Set 5">HW Set 5</MenuItem>
                </Select>
                <Button  component={Paper} variant={"contained"} size={"small"} color={"secondary"}>select</Button>
            </div>
            <div className="quantity">
                <header> Quantity:</header>
                <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" color={"secondary"} />
            </div>
            <Button variant={"contained"} size={"medium"} color={"secondary"}>Check-in</Button>
            <Button variant={"contained"} size={"medium"} color={"secondary"}>Checkout</Button>
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