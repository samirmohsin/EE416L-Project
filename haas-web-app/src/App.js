import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Projects from './components/projects';
import HardwareManagement from './components/hardwareManagement';
import Dataset from './components/dataset';
import Login from './components/login';
import CreateAccount from './components/createAccount';
import Links from './components/links';


function App() {
  return (
    <>
      
      <Router>
        <Routes>
          <Route exact path='/' element={<Login/>} />
          <Route path='/CreateAccount' element={<CreateAccount/>} />
          <Route path='/projects' element={<Projects/>} />
          <Route path='/hardwareManagement' element={<HardwareManagement/>} />
          <Route path='/dataset' element={<Dataset/>} />
          <Route path='/links' element={<Links/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
