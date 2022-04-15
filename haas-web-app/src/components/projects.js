import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';
import {Box} from '@mui/system';
import {TextField} from '@mui/material';import './projects.css';
import {Link} from 'react-router-dom';

function Projects() {
    const [selectedProject, setSelectedProject] = useState("");
    const [projects, setProjects] = useState([]);
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectDescription, setNewProjectDescription] = useState("");
    const [newProjectID, setNewProjectID] = useState("");
    const [postResponse, setPostResponse] = useState("");

    const handleChange = (e) => {
        setSelectedProject(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
       // console.log(JSON.stringify(newProjectName));
        /**For now just output to the page directly w/o the backend
         * ideally, check if project already exists w/ backend/database here
         */
/*        const newUserProject = {
            key: Math.random(),
            projectID: newProjectID,
            description: newProjectDescription,
            value: newProjectName
        }
        setProjects(projects.concat(newUserProject)); */

        fetch("/createProject", {
            method:'POST',
            cache: 'no-cache',
            headers: {
                'content-type':'application/json',
            },
            body:JSON.stringify({'name': newProjectName, 'description': newProjectDescription, 'id': newProjectID, 'username': window.sessionStorage.getItem('username')})
        }).then(response => response.json()
        ).then(async data => {
            await setPostResponse(data.resultVal)
        })
    }

    const handleDelete = (e) => {
        console.log(JSON.stringify(selectedProject))

        fetch("/deleteProject/" + selectedProject)
            .then(response => response.json())
            .then(async data=> {
                await setPostResponse(data.resultVal)
            })
            .catch(error=> {
                console.log(error)
            })
           
        //remove this once backend can send all projects to frontend 
        //also should probably update capacity and stuff for the hw sets 
        //or just dont allow deletion if stuff is still checked out
        //also needs to delete project from all the users too
       /* const key = selectedProject;
        const list = [...projects];
        const updateList = list.filter(item => item.projectID !== key);
        setSelectedProject("");
        setProjects(updateList); */
    }

    const handleJoin = (e) => {
        fetch("/joinProject", {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'content-type':'application/json',
            },
            body:JSON.stringify({'id': selectedProject, 'username': window.sessionStorage.getItem('username')})
        }).then(response => response.json()
        ).then(async data => {
            await setPostResponse(data.resultVal)
        })

        //insert logic to display newly joined project here
    }

    useEffect(() => {
       //alert(JSON.stringify(postResponse));
        console.log(JSON.stringify(postResponse));;
        if (postResponse === 'ERROR:join:user') {
            alert('You have already joined project: ' + selectedProject);
        }

        if (postResponse === 'ERROR:join:id') {
            alert('No project exists with ID: ' + selectedProject);
        }

        if (postResponse === 'success:join') {
            alert("Successfully joined project ID: " + selectedProject);
            window.location.reload();
        }

        if (postResponse === 'ERROR:delete') {
            alert('No Project exists with inputted ID.');
        }

        if (postResponse === 'success:delete') {
            alert('Project ' + selectedProject + ' successfully deleted.');
            window.location.reload();
        }

        if (postResponse === 'ERROR:create') {
            alert('ID: '+ newProjectID + '\n is already associated with an existing project. Choose another ID.');
        }

        if (postResponse === 'success:create') {
            alert('Successfully created project ID: ' + newProjectID);
            window.location.reload();
        }

    },[postResponse])

    const getProjects = async () => {
        fetch('/updateProjects/' + window.sessionStorage.getItem('username'))
        .then(response => response.json())
        .then(async data => {
            await setProjects(data.resultVal)
        }).catch(error => {
            console.log(error)
        })
        //console.log(projects)
    };


    useEffect(() => {
       console.log(projects)
        const timer = setInterval(getProjects, 2000);
        return () => clearInterval(timer);
    },[])


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
                Available (Joined/Created) Projects
            </h2>
            <div>
                {projects.map(({name, description, ID, HWSet1_checked_out, HWSet2_checked_out}) => (
                    <div className = 'project-list'>

                        <h3>
                            Project Name: {name}
                        </h3>
                        <ul>
                            <li key={description}> 
                                Description: {description}
                            </li>
                            <li key={ID}>
                                ID: {ID}
                            </li>

                            <li key={HWSet1_checked_out}>
                                <p>HWSet 1 Checked Out: {HWSet1_checked_out}</p>
                                <p>HWSet 2 Checked Out: {HWSet2_checked_out}</p>
                            </li>                            
                        </ul>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Projects;