import { Link } from 'react-scroll'; // Import Link dari react-scroll
import sayur from '../assets/sayur-min.png';

export default function Home() {

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
        <div className='flex justify-center -mt-40'>
          <Link 
            to='dashboard' 
            spy={true} 
            smooth={true} 
            offset={-100} 
          >
          <button
            className='bg-green text-white text-lg font-semibold rounded-full px-10 py-3 mr-4 transition-all duration-300 hover:bg-green-600 hover:shadow-xl transform hover:scale-105 shadow-lg'
            type='button'>
            Dashboard
          </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
