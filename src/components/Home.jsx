import sayur from '../assets/sayur.png';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Home() {
  const navigate = useNavigate();

  const handleLoginForm =()=>{
    navigate ('/LoginPage')
  }
  const handleRegistForm =()=>{
    navigate ('/RegistPage')
  }
  return (
    <main className='pb-8'id='home'>
      <div className='flex items-center justify-center'>
        <div className='w-1/3 py-4 my-40 -ml-4'>
          <div className='flex flex-col items-center'>
            <h2 className='text-6xl text-center text-primary'>Save The Waste For the Earth</h2>
            <div className='flex justify-center'>
              <button
                className='bg-primary text-white rounded-md px-8 py-1 mr-4 mt-4 transition-all duration-300  hover:bg-hv1'
                type='button'
                onClick={handleLoginForm}>
                Login
              </button>
              <button className='bg-second text-white rounded-md px-6 py-1 mt-4 transition-all duration-300 hover:text-black hover:bg-slate-500' onClick={handleRegistForm}>Sign Up</button>
            </div>
          </div>
        </div>
        <img
          src={sayur}
          alt='sayur'
          className='w-1/3 ml-36 mt-8 -mr-20 hidden sm:block' // Hide on mobile, show on small screens and larger
        />
      </div>
    </main>
  );
}
