import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Menggunakan Routes dan Route
import HomePage from './pages/HomePage';
// import PrivateRoutes from './components/PrivateRoutes';

function App() {
    return (

        <Router >
            <Routes>
                <Route path='/' element={<HomePage />} />
                {/* <Route element={<PrivateRoutes/>}>
                    <Route element={<Dashboard/>}path='/Dashboard' exact />
                </Route> */}
                {/* <Route path='/LoginPage' element={<LoginPage />} />
                <Route path='/RegistPage' element={<Regist />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
