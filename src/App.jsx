import './App.css';
import React from 'react';
import { Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter dan Routes
import { auth } from './components/firebase';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ControlPage from './pages/ControlPage';
import LoginPage from './pages/LoginPage';
import Regist from './components/account/Regist';
function App() {
    return (
       
            <Routes>
                <Route path='/' element={ <HomePage firebaseApp={auth}/>} />
                <Route path='/Dashboard' element={ <Dashboard/>} />
                <Route path='/Control' element={ <ControlPage/>} />
                <Route path='/LoginPage' element={ <LoginPage/>} />
                <Route path='/RegistPage' element={ <Regist/>} />
                

            </Routes>
    );
}

export default App;
