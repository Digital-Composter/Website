import { RxExit } from 'react-icons/rx';
import { IoSpeedometer } from "react-icons/io5";
import { AiOutlineControl } from "react-icons/ai";
// import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/three 1.png';

export default function HeaderDashboard() {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem(authToken)
    //     const auth = getAuth();
    //     signOut(auth)
    //         .then(() => {
    //             // Redirect user to login page or perform any other actions after logout
    //             localStorage.clear();
                navigate('/'); // misalnya, mengarahkan pengguna ke halaman login setelah logout
    //         })
    //         .catch((error) => {
    //             console.error('Error signing out: ', error);
    //         });
    }
    
    const handleControl = () => {
        navigate('/Control');
    }

    const handleDashboardClick = () => {
        navigate('/Dashboard');
    }
    
    // const user = getAuth().currentUser;
    // const username = user ? user.displayName : '';
    
    return (
        <header className="flex justify-between items-center px-4 border-b-2"> {/* Menambahkan border-b untuk border bottom */}
            <ul className="flex items-center mx-4 my-4">
                <li className="flex items-center">
                    <img src={logo} alt="logo" className="w-10 inline-block items-center hidden sm:block" /> {/* Menampilkan logo hanya pada mode sm */}
                    <span className="ml-2">DigiComps</span>
                </li>
                <li className="flex items-center ml-8 hover:bg-slate-50">
                    <IoSpeedometer className="w-6 h-6 text-black mr-2" />
                    <span className="text-lg md:text-sm hidden sm:block" onClick={handleDashboardClick}>Dashboard</span>
                </li>
            </ul>
            <div className="flex items-center gap-4"> {/* Menggunakan flexbox untuk merekatkan posisi img dan RxExit */}
                <span></span> {/* Menampilkan username */}
                <RxExit className="mr-2 " onClick={handleLogout}/><span  className='hidden sm:block'onClick>Sign Out</span>
            </div>
        </header>
    )
}