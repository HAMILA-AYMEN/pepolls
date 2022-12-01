import React from 'react';
import {  BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';


import Navbar from '../Nav/Navbar';


const index = () => {
  
  
  return (
   
   
   <Router>
   <Navbar/>
   <Routes>
       
        <Route path="/profil" element={<Profil />} />
        <Route path="/" element={ <Home/>} />
     
        
      </Routes>
      </Router>
      
    
  );
};

export default index;