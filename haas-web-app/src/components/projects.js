import { InputLabel } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import {useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import {MenuItem, Select} from '@mui/material';
import {Box} from '@mui/system';
import {TextField} from '@mui/material';import './projects.css';
import {Link} from 'react-router-dom';

function Projects() {
    const [selectedProject, setSelectedProject] = useState("");
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [newProjectID, setNewProjectID] = useState("");

    const handleChange = (e) => {
        setSelectedProject(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(JSON.stringify(newProjectName));
        /**For now just output to the page directly w/o the backend
         * ideally, check if project already exists w/ backend/database here
         */
        const newUserProject = {
            key: Math.random(),
            projectID: newProjectID,
            description: newProjectDescription,
            value: newProjectName
        }
        setProjects(projects.concat(newUserProject));
    }

    const handleDelete = (e) => {
        console.log(JSON.stringify(selectedProject))
        const key = selectedProject;
        const list = [...projects];
        const updateList = list.filter(item => item.projectID !== key);
        setSelectedProject("");
        setProjects(updateList);
    }


    return (
        <>  
            <Link to='/links'>
                Go back to nav page
            </Link>
            <h1>
                Projects
            </h1>
            <h2>
                Create a New Project
            </h2>
            <FormControl sx={{mb: 5}}>
                <div className='enter-project'>
                    <TextField sx={{mr: 1}} name='project-name' label="Project Name" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)}></TextField>
                    <TextField sx={{mr: 1}} multiline name='project-description' label="Description" value={newProjectDescription} onChange={(e) => setNewProjectDescription(e.target.value)}></TextField>
                    <TextField sx={{mr:1}} name='project-id' label="ID" value={newProjectID} onChange={(e) => setNewProjectID(e.target.value)}></TextField>
                    <Button sx={{ml: 5}} variant='contained' type='submit' name='Submit' value='Submit' onClick={handleSubmit}>Create New Project</Button>
                </div>
            </FormControl>
            <h2>
                Join or Modify an Existing Project
            </h2>
            <div className='select-project'>
                <Button sx={{mt: 2, mr: 1, mb:2}} variant='outlined'>Join Project</Button>
                <Button sx={{mt: 2, mr: 1, mb:2}} variant='outlined'>Checkout/Checkin</Button>
                <Button sx={{mt: 2, mb:2}} variant='outlined' onClick={handleDelete}>Delete Project</Button> 
            </div>

            <Box sx={{width: 1/4}}>
                <FormControl fullWidth>
                    <InputLabel>
                        Select Project by ID
                    </InputLabel>
                    <Select label='Project Name' value={selectedProject ?? ""} onChange={handleChange}>
                        {projects.map(({key, projectID}) => (
                            <MenuItem key={key} value={projectID}>{projectID}</MenuItem>
                        ))}
                    </Select>           
                </FormControl>
            </Box>   
            
            <h2>
                Available Projects
            </h2>
            <TableContainer className='project-table'>    
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Project Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Project ID</TableCell>
                                <TableCell>HW Set 1</TableCell>
                                <TableCell>HW Set 2</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map(({key, value, description, projectID}) => (
                                <TableRow key={key}>
                                    <TableCell key={key}>{value}</TableCell>
                                    <TableCell key={key}>{description}</TableCell>
                                    <TableCell key={key}>{projectID}</TableCell>
                                </TableRow>
                                
                            ))}
                        </TableBody>
                    </Table>
            </TableContainer>
        </>
    );
}

export default Projects;