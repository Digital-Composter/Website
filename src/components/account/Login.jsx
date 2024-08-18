// import React, { useState } from 'react';
// import sideImg from '../../assets/488.jpg';
// import { useNavigate } from 'react-router-dom';
// import CryptoJS from 'crypto-js';
// import { FaEye, FaRegEyeSlash } from "react-icons/fa";

// function Login() {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState({
//     Email: '',
//     Password: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   // Function to encrypt text using AES
//   function encrypt(text, key) {
//     return CryptoJS.AES.encrypt(text, key).toString();
//   }

//   // Function to handle login
//   const handleLogin = async () => {
//     try {
//       const response = await fetch('https://digicomp.vercel.app/user/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           Email: formData.Email,
//           Password: formData.Password,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || 'Failed to login');
//         return;
//       }

//       const fetchedToken = data.data.Token;

//       // Encrypt the token using AES with your secret key
//       const encryptedToken = encrypt(fetchedToken, 'pr3001trecthphn01');

//       localStorage.setItem('authToken', encryptedToken);
//       localStorage.setItem('userEmail', formData.Email);

//       setTimeout(() => {
//         localStorage.removeItem('authToken');
//         localStorage.removeItem('userEmail');
//       }, 60 * 60 * 1000);
//     console.log(fetchedToken)
//       navigate('/Dashboard');
//     } catch (error) {
//       console.error('Login error:', error);
//       setError(error.message.includes('fetch') ? 'fetch failed' : error.message || 'An error occurred while logging in');
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex">
//         <div className="p-4 w-full">
//           <span className='text-center text-red-500'>{error}</span>
//           <h1 className="text-2xl mb-4">Login</h1>
//           <div className="flex flex-col gap-6 justify-center">
//             <BoxForm label="Email" type="email" value={formData.Email} onChange={handleChange} onPressEnter={handleLogin} />
//             <div className="relative">
//               <BoxForm label="Password" type={showPassword ? "text" : "password"} value={formData.Password} onChange={handleChange} onPressEnter={handleLogin} />
//               <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5" onClick={togglePasswordVisibility}>
//                 {showPassword ? <FaRegEyeSlash /> : <FaEye />}
//               </button>
//             </div>
//           </div>
//           <div className="flex flex-col gap-2 py-10 justify-center">
//             <button className="bg-black hover:bg-green text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleLogin}>Login</button>
//             <div className="flex flex-wrap gap-2 justify-center items-end">
//               <span className="text-xs">Don't have an account?</span>
//               <a href="/RegistPage" className='text-xs text-green '>Sign Up</a>
//             </div>
//           </div>
//         </div>
//         <img src={sideImg} alt="Login Image" className="h-full w-1/2 object-cover hidden md:block" />
//       </div>
//     </div>
//   );
// }

// const BoxForm = ({ label, type, value, onChange, onPressEnter }) => {
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       onPressEnter();
//     }
//   };

//   return (
//     <div className="flex flex-col space-y-6">
//       <div className="rounded-lg shadow-sm -space-y-px">
//         <div>
//           <label htmlFor={label} className="sr-only">{label}</label>
//           <input
//             id={label}
//             name={label}
//             type={type}
//             value={value}
//             onChange={onChange}
//             onKeyDown={handleKeyDown}
//             className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-green focus:z-10 sm:text-sm"
//             placeholder={label}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
