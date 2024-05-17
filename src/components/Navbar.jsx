import React, { useState } from 'react';
import logo from '../assets/three 1.png';
import { FaBars, FaXmark } from "react-icons/fa6";
import { Link } from 'react-scroll';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const [onMobile, setOnMobile] = useState(false);

    const toggleMenu = () => {
        setOnMobile(!onMobile);
    }

    const navigate = useNavigate();
    const handleSignUp =()=>{
        navigate('/RegistPage');
    }

    const navItems = [
        { link: "Overview", id: "home" }, // Gunakan ID yang sesuai dengan elemen yang ingin di-scroll
        { link: "Feature", id: "feature" },
        { link: "Developers", id: "team" }, // Gunakan ID yang sesuai dengan elemen yang ingin di-scroll
        // { link: "Documentary", id: "docs" },
    ];

    return (
        <>
            <nav className='bg-white md:px-18 p-4 max-w-screen-2xl mx-auto fixed top-0 left-0 right-0'>
                <div className='text-lg container mx-auto flex justify-between items-center font-medium'>
                    <div className='flex space-x-12 items-center'>
                        <Link to="/" className='text-2xl font-semibold font-sans flex items-center space-x-3'>
                            <img src={logo} alt="logo" className='  w-10 inline-block items-center mx-4' /><span className='text-third'>DigiComps</span>
                        </Link>

                        <ul className='md:flex space-x-14 hidden'>
                            {
                                navItems.map(({ link, id }) => 
                                    <Link activeClass='active' spy={true} smooth={true} offset={-100} key={link} to={id} className='text-third block hover:text-green-500 cursor-pointer'>{link}</Link>
                                )
                            }
                        </ul>
                    </div>

                    <div className='space-x-8 hidden pt-1 md:flex items-center'>
                        <button className=' bg-third text-white rounded-md px-4 py-1 ml-4 transition-all duration-300 hover:text-black hover:bg-slate-500' type='button' onClick={handleSignUp }>Sign Up</button>
                    </div>
                    {/*menu when display hidden (mobile)  */}
                    <div className='md:hidden'>
                        <button onClick={toggleMenu} className='text-white focus:outline-none focus:text-gray-400 '>
                            {
                                onMobile ? (<FaXmark className='w-6 h-6 text-black' />) : (<FaBars className='w-6 h-6 text-black' />)
                            }
                        </button>
                    </div>
                </div>
            </nav>

            <div className={`space-y-4 px-4 pt-24 pb-4 bg-emerald-500 ${onMobile ? 'block fixed top-0 left-0 right-0' : "hidden"}`}>

                {
                    navItems.map(({ link, id }) => (
                        <Link activeClass='active' spy={true} smooth={true} offset={-100} key={link} to={id} className='block text-white hover:text-green-500 text-xl'onClick={toggleMenu}>{link}</Link>
                    ))
                }
            </div>
        </>
    )
}
