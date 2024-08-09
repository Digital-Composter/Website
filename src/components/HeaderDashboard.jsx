import React, { useEffect, useState } from 'react';
import { RxExit } from 'react-icons/rx';
import { IoSpeedometer } from "react-icons/io5";
import { AiOutlineControl } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import logo from '../assets/three 1.png';
import { FaHouseMedicalCircleExclamation } from 'react-icons/fa6';

export default function HeaderDashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                if (!authToken) return;

                const response = await fetch('https://digicomp.vercel.app/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log('Fetched user data:', data); // Debugging line
                    setUsername(data.user?.name); // assuming the API returns user data in { user: { name: ... } }
                } else {
                    console.error('Failed to fetch user data', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        navigate('/');
        localStorage.clear();
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <header className="flex justify-between items-center px-4 border-b-2 bg-white z-50 sticky top-0">
            <ul className="flex items-center mx-4 my-4 ml-32">
                <li className="flex items-center">
                    <div className='flex justify-center' onClick={handleLogoClick}>

                    <img src={logo} alt="logo" className="w-10 inline-block items-center hidden sm:block" />
                    <span className="ml-2">Dikompos</span>
                    </div>
                </li>
                <li className="flex items-center ml-8 hover:bg-slate-50">
                    <IoSpeedometer className="w-6 h-6 text-black mr-2" />
                    <span className="text-lg md:text-sm hidden sm:block">Dashboard</span>
                </li>
            </ul>
            <div className="flex items-center gap-4">
                {username && (
                    <span className="hidden sm:block">{username}</span>
                )}
                <div className="flex mr-32 items-center gap-4" onClick={handleLogout}>
                    <RxExit className="mr-2" />
                    <span className='hidden sm:block'>Sign Out</span>
                </div>
            </div>
        </header>
    );
}
