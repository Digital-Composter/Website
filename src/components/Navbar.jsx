import React, { useState, useEffect } from 'react';
import logo from '../assets/three 1.png';
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [onMobile, setOnMobile] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const toggleMenu = () => {
        setOnMobile(!onMobile);
    };

    const handleButtonClick = () => {
        if (isLoggedIn) {
            navigate('/Dashboard');
        } else {
            navigate('/RegistPage');
        }
    };

    const navItems = [
        { link: "Overview", id: "carousel" },
        { link: "Feature", id: "feature" },
        { link: "Developers", id: "team" },
    ];

    return (
        <>
            <nav className='bg-white md:px-18 p-4 max-w-screen-2xl mx-auto fixed top-0 left-0 right-0 z-50'>
                <div className='text-lg container mx-auto flex justify-between items-center font-medium'>
                    <div className='flex space-x-12 items-center'>
                        <div className='flex items-center space-x-3'>
                            <img 
                                src={logo} 
                                alt="logo" 
                                className='w-10 inline-block items-center mx-4 cursor-pointer' 
                                onClick={() => navigate('/')}
                            />
                            <Link 
                                to="home" 
                                className='text-2xl font-semibold font-sans text-third cursor-pointer'
                                spy={true} 
                                smooth={true} 
                                offset={-100}
                            >
                                Dicompos
                            </Link>
                        </div>

                        <ul className='hidden md:flex space-x-14'>
                            {navItems.map(({ link, id }) => (
                                <Link 
                                    key={link} 
                                    to={id} 
                                    activeClass='active' 
                                    spy={true} 
                                    smooth={true} 
                                    offset={-100} 
                                    className='text-third block hover:text-green-500 cursor-pointer'
                                >
                                    {link}
                                </Link>
                            ))}
                        </ul>
                    </div>

                    <div className='space-x-8 hidden pt-1 md:flex items-center'>
                        <button 
                            className='bg-green text-white rounded-md px-4 py-1 ml-4 transition-all duration-300 hover:text-black hover:bg-hv2' 
                            type='button' 
                            onClick={handleButtonClick}
                        >
                            {isLoggedIn ? 'Dashboard' : 'Sign Up'}
                        </button>
                    </div>

                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-white focus:outline-none focus:text-gray-400'>
                            {onMobile ? (<FaXmark className='w-6 h-6 text-black' />) : (<FaBars className='w-6 h-6 text-black' />)}
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`space-y-4 px-4 pt-24 pb-4 bg-emerald-500 ${onMobile ? 'block fixed top-0 left-0 right-0 z-40' : "hidden"}`}>
                {navItems.map(({ link, id }) => (
                    <Link 
                        key={link} 
                        to={id} 
                        activeClass='active' 
                        spy={true} 
                        smooth={true} 
                        offset={-100} 
                        className='block text-white hover:text-green-500 text-xl' 
                        onClick={toggleMenu}
                    >
                        {link}
                    </Link>
                ))}
            </div>
        </>
    );
}
