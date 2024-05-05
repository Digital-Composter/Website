import TeamData from '../team/data';
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";

export default function Team() {
  return (
    <section className='py-20 my-auto'id='team'>
      <ul className="flex flex-wrap justify-center items-center">
        {TeamData?.map((team) => (
          <li key={team.Nama} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mx-4 mb-8">
            <div className="bg-emerald-500 rounded-xl p-8 shadow-md">
              <img className='w-full h-2xl mx-auto' src={team.image} alt={`${team.Nama}`} />
              <div className='text-center mt-4 text-slate-200 font-sans'>
                <h2 className='text-xl'>
                  <strong>{team.Nama}</strong>
                  </h2>
                <p className='mx-auto'>
                  {team.Universitas}
                </p>
                <div className="flex justify-center">
                  <a href={team.link} target="_blank" className="inline-block">
                    <FaLinkedin className="h-xl text-slate-300 hover:text-blue-700 mx-1 " />
                  </a>
                  <a href={team.git} target="_blank" className="inline-block">
                    <FaGithub className="h-xl text-slate-300 hover:text-blue-700 mx-1 " />
                  </a>
                  <a href={team.ig} target="_blank" className="inline-block">
                    <FaInstagram className="h-xl text-slate-300 hover:text-blue-700 mx-1  " />
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
