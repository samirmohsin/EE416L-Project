import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import {useState} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
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

    const handleJoin = (e) => {
        alert("Successfully joined project ID: " + selectedProject);
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
                <Box sx={{width: 1/4, mr: 5}}>
                    <FormControl fullWidth>
                        <TextField label='Enter Project ID' value={selectedProject} onChange={handleChange}></TextField>                
                    </FormControl>
                </Box>   
                <Button sx={{mt: 0, mr: 1, mb:0}} variant='outlined' onClick={handleJoin}>Join Project</Button>
                <Button sx={{mt: 0, mr: 1, mb:0}} variant='outlined'>
                    <Link to='/hardwareManagement'>Checkout/Checkin</Link>
                </Button>               
                <Button sx={{mt: 0, mb:0}} variant='outlined' onClick={handleDelete}>Delete Project</Button>             
            </div>
        
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