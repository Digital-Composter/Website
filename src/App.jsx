import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Menggunakan Routes dan Route
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import ControlPage from './pages/ControlPage';
import LoginPage from './pages/LoginPage';
import Regist from './components/account/Regist';
import PrivateRoutes from './components/PrivateRoutes';

function App() {
    return (

        <Router>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route element={<PrivateRoutes/>}>
                    <Route element={<Dashboard/>}path='/Dashboard' exact />
                    <Route element={<ControlPage/>}path='/Control' exact />
                </Route>
                <Route path='/LoginPage' element={<LoginPage />} />
                <Route path='/RegistPage' element={<Regist />} />
            </Routes>
        </Router>
    );
}

export default App;
