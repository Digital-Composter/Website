import React, { useState } from 'react';
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link } from 'react-scroll';

export default function Navbar() {
    const [onMobile, setOnMobile] = useState(false);

    const toggleMenu = () => {
        setOnMobile(!onMobile);
    };

    const navItems = [
        { link: "Overview", id: "carousel" },
        { link: "Feature", id: "feature" },
        { link: "Dashboard", id: "dashboard" },
        { link: "Developers", id: "team" },
    ];

    return (
        <>
            <nav className='bg-green w-full p-4 sticky top-0 left-0 right-0 z-50 border-b-2'>
                <div className='flex justify-between items-center font-medium w-full'>
                    <div className='flex space-x-12 items-center gap-2 text-lg'>
                        <div className='flex items-center space-x-3 pl-10 gap-6'>
                            <img 
                                src={'https://storage.googleapis.com/dicompos-assets/assets/three%201-min.png'} 
                                alt="logo" 
                                className='w-10 inline-block items-center cursor-pointer' 
                                onClick={() => navigate('/')} // Navigasi ke halaman home
                            />
                            <Link 
                                to="home" 
                                className='text-2xl  pb-1 font-semibold font-sans text-white cursor-pointer '
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
                                    className='text-white hover:underline cursor-pointer transition duration-500 ease-in-out'
                                >
                                    {link}
                                </Link>
                            ))}
                        </ul>
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
                        className='block text-white hover:text-green text-xl transition duration-300 ease-in-out' 
                        onClick={toggleMenu}
                    >
                        {link}
                    </Link>
                ))}
            </div>
        </>
    );
}
