import sayur from '../assets/sayur.png';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleLoginForm = () => {
    navigate('/LoginPage');
  };
  const handleRegistForm = () => {
    navigate('/RegistPage');
  };

  return (
    <main className='pb-12' id='home'>
      <div className='flex flex-col items-center justify-center'>
        <div className='w-full py-4 my-40'>
          <div className='flex flex-col items-center'>
            <h2 className='text-6xl text-center text-primary font-landingpage '>Save The Waste For the Earth</h2>
            <img
              src={sayur}
              alt='sayur'
              className='w-1/3 -mt-12 hidden sm:block' // Hide on mobile, show on small screens and larger
            />
          </div>
        </div>
        <div className='flex justify-center -mt-40 '>
          <button
            className='bg-primary text-white rounded-md px-10 py-2 mr-4 transition-all duration-300 hover:bg-hv1'
            type='button'
            onClick={handleLoginForm}>
            Login
          </button>
          <button
            className='bg-second text-white rounded-md px-10 py-2 transition-all duration-300  hover:bg-yellow-800'
            type='button'
            onClick={handleRegistForm}>
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
