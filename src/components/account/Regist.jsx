// import React, { useState } from 'react';
// import sideImg from '../../assets/488.jpg';
// import { useNavigate } from 'react-router-dom';

// function Regist() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     Email: '',
//     Password: '',
//     Username: ''
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });
//   };

//   const handleSignUp = () => {
//     setIsLoading(true);
//     fetch('https://digicomp.vercel.app/user', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       setIsLoading(false);
//       setIsSuccess(true);
//       console.log('Registration successful:', data);
//       // Redirect user to dashboard or login page after successful registration
//       setTimeout(() => {
//         navigate('/Dashboard');
//       }, 2000); // wait for 2 seconds before redirecting
//     })
//     .catch(error => {
//       setIsLoading(false);
//       setError('Error registering user: ' + error.message);
//       console.error('Error registering user:', error);
//     });
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden flex">
//         <div className="p-4 w-full">
//           <h1 className="text-2xl mb-4">Sign Up</h1>
//           {error && <div className="text-red-500 mb-4">{error}</div>}
//           <div className="flex flex-col gap-4 justify-center">
//             <BoxForm label="Username" type="text" value={formData.Username} onChange={handleChange} />
//             <BoxForm label="Email" type="email" value={formData.Email} onChange={handleChange} />
//             <BoxForm label="Password" type="password" value={formData.Password} onChange={handleChange} />
//           </div>
//           <div className="flex flex-col gap-4 py-8 justify-center">
//             <button className="bg-black hover:bg-green text-white py-2 px-4 rounded-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500" onClick={handleSignUp} disabled={isLoading}>
//               {isLoading ? 'Signing Up...' : 'Sign Up'}
//             </button>
//             {isSuccess && <div className="text-green mt-4">Registration successful! Redirecting...</div>}
//             <div className="flex flex-wrap gap-2 justify-center items-end">
//               <span className="text-xs">Have account ?</span> 
//               <a href="/LoginPage" className='text-xs text-green'>Login</a>
//             </div>
//           </div>
//         </div>
//         <img src={sideImg} alt="Login Image" className="h-full w-1/2 object-cover hidden md:block" />
//       </div>
//     </div>
//   );
// }

// const BoxForm = ({ label, type, value, onChange }) => {
//   return (
//     <div className="flex flex-col space-y-6">
//       <div className="rounded-lg shadow-sm -space-y-px">
//         <div>
//           <label htmlFor={label} className="sr-only">{label}</label>
//           <input id={label} name={label} type={type} value={value} onChange={onChange} required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder={label} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Regist;
