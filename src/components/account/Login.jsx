import React, { useState } from 'react';
import sideImg from '../../assets/488.jpg';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { FcGoogle } from "react-icons/fc";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Email: '',
    Password: '',
    Username: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogin = () => {
    // Melakukan apa pun yang Anda inginkan dengan nilai-nilai tersebut, misalnya, mencetaknya
    console.log("username:", formData.Username);
    console.log("password:", formData.Password);

    // Mereset nilai-nilai formulir
    setFormData({
      Email: '',
      Password: '',
      Username: ''
    });
  };
  // google login
  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.info(result.user);
        // Set isLoggedIn ke true setelah berhasil login
        navigate('/Dashboard');
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex">
        <div className="p-4 w-full">
          <h1 className="text-2xl mb-4">Login</h1>
          <div className="flex flex-col gap-4 justify-center">
            <BoxForm label="Email" type="email" value={formData.Email} onChange={handleChange} />
            <BoxForm label="Password" type="password" value={formData.Password} onChange={handleChange} />
          </div>
          <div className="flex flex-col gap-2 py-2 justify-center">
            <button className="bg-black hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleLogin}>Login</button>
            <span className="text-center text-sm">or login with</span>
            <button className="flex items-center justify-center bg-white border border-black hover:bg-red-600 text-black py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
              onClick={handleGoogleLogin}>
              <FcGoogle className="mr-2" />
              Google
            </button>
            <div className="flex flex-wrap gap-2 justify-center items-end"> {/* Mengatur tata letak ke kanan */}
            <span className=" text-xs ">Dont have account ?</span> 
           <a href="/RegistPage" className='text-xs text-sky-600'>Sign Up</a> {/* Tautan untuk sign-up */}
          </div>
          </div>
        </div>
        <img src={sideImg} alt="Login Image" className="h-full w-1/2 object-cover hidden md:block" />
      </div>
    </div>
  );
}

const BoxForm = ({ label, type, value, onChange }) => {
  return (
    <form className="flex flex-col space-y-6">
      <div className="rounded-lg shadow-sm -space-y-px">
        <div>
          <label htmlFor={label} className="sr-only">{label}</label>
          <input id={label} name={label} type={type} value={value} onChange={onChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder={label} />
        </div>
      </div>
    </form>
  );
};

export default Login;
