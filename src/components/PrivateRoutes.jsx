// import { Navigate, Outlet } from 'react-router-dom';

// const PrivateRoutes = () => {
//   // Periksa apakah token memiliki nilai yang valid dari local storage
//   const authToken = localStorage.getItem('authToken');
//   const isAuthenticated = authToken !== undefined && authToken !== null && authToken !== '';

//   return (
//     // Jika token memiliki nilai yang valid, tampilkan Outlet (routes private)
//     // Jika tidak, redirect pengguna ke halaman login
//     isAuthenticated ? <Outlet /> : <Navigate to='/' />
//   );
// };

// export default PrivateRoutes;
