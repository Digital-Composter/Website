import { RxExit } from 'react-icons/rx';
import { IoSpeedometer } from "react-icons/io5";
import { AiOutlineControl } from "react-icons/ai";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/three 1.png';

export default function HeaderDashboard() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                // Redirect user to login page or perform any other actions after logout
                navigate('/'); // misalnya, mengarahkan pengguna ke halaman login setelah logout
            })
            .catch((error) => {
                console.error('Error signing out: ', error);
            });
    }
    
    const handleControl =()=>{
        navigate('/Control');
    }

    const handleDashboardClick = () => {
        navigate('/Dashboard');
    }
    
    const user = getAuth().currentUser;
    const photoURL = user ? user.photoURL : '';
    
    return (
        <header className="flex justify-between items-center px-4 py-2">
            <ul className="flex items-center mx-4 my-4">
                <li className="flex items-center">
                    <img src={logo} alt="logo" className="w-10 inline-block items-center" />
                    <span>DigiComps</span>
                </li>
                <li className="flex items-center ml-8 hover:bg-slate-50">
                    <IoSpeedometer className="w-6 h-6 text-black mr-2" />
                    <span className="text-lg md:text-sm" onClick={handleDashboardClick}>Dashboard</span>
                </li>
                <li className="flex ml-8 hover:bg-slate-50" onClick={handleControl}>
                    <AiOutlineControl className="w-6 h-6 text-black mr-2" />
                    <span>Control</span>
                </li>
            </ul>
            <div className="flex items-center gap-4"> {/* Menggunakan flexbox untuk merekatkan posisi img dan RxExit */}
                <RxExit className="mr-2" /><span onClick={handleLogout}>Sign Out</span>
                <img className="w-10 h-10 rounded-full" src={photoURL} alt="Profile" />
            </div>
        </header>
    )
}
