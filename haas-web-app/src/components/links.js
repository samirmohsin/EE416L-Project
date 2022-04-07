import React from 'react';
import {List, ListItem, ListItemText} from '@mui/material';
import './links.css';

export default function Links() {
    return (
        <>  
            <h1>
                Use the links below to navigate the site:
            </h1>
            <List className='links-list' sx={{width: 1/2}}>
                <ListItem button component='a' href='/projects'>
                    <ListItemText primary='Projects'/>
                </ListItem>

                <ListItem button component='a' href='/hardwareManagement'>
                    <ListItemText primary='Hardware Management' />
                </ListItem>

                <ListItem button component='a' href='/dataset'>
                    <ListItemText primary='Datasets' />
                </ListItem>
            </List>           
        </>
    );
}