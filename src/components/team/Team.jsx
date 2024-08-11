import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";
import irgiImage from '../../assets/IrgiF.png'
import azkaImage from '../../assets/azka.png'
import hariImage from '../../assets/hari (2).png'
import dimasImage from '../../assets/dimas.png'

const TeamData = [
  {
    Nama: 'Hari Iskandar',
    Universitas: 'Telkom University',
    image: hariImage,
    link: 'https://www.linkedin.com/in/irgi-faisal-03507527a/',
    git: 'https://github.com/Irgii17',
    ig: 'https://www.instagram.com/'
  },
  {
    Nama: 'Irgi Faisal',
    Universitas: 'Telkom University',
    image: irgiImage,
    link: 'https://www.linkedin.com/in/irgi-faisal-03507527a/',
    git: 'https://github.com/Irgii17',
    ig: 'https://www.instagram.com/'
  },
  {
    Nama: 'Azka Hafizh',
    Universitas: 'Telkom University',
    image: azkaImage,
    link: 'https://www.linkedin.com/in/irgi-faisal-03507527a/',
    git: 'https://github.com/Irgii17',
    ig: 'https://www.instagram.com/'
  },
  {
    Nama: 'Gamara Dimas',
    Universitas: 'Telkom University',
    image: dimasImage,
    link: 'https://www.linkedin.com/in/irgi-faisal-03507527a/',
    git: 'https://github.com/Irgii17',
    ig: 'https://www.instagram.com/'
  },
];

export default function Team() {
  return (
    <section className='py-20 my-auto ' id='team'>
      <ul className="flex flex-wrap justify-center items-center">
        {TeamData?.map((team) => (
          <li key={team.Nama} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 mx-4 mb-8">
            <div className="border-2 border-emerald-500 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img className='w-full h-2xl mx-auto rounded-full' src={team.image} alt={`${team.Nama}`} />
              <div className='text-center mt-4 text-slate-800 font-sans'>
                <h2 className='text-xl font-bold'>
                  {team.Nama}
                </h2>
                <p className='mx-auto text-sm'>
                  {team.Universitas}
                </p>
                <div className="flex justify-center mt-2">
                  <a href={team.link} target="_blank" className="inline-block mx-1">
                    <FaLinkedin className="h-6 w-6 text-slate-600 hover:text-blue-700" />
                  </a>
                  <a href={team.git} target="_blank" className="inline-block mx-1">
                    <FaGithub className="h-6 w-6 text-slate-600 hover:text-gray-800" />
                  </a>
                  <a href={team.ig} target="_blank" className="inline-block mx-1">
                    <FaInstagram className="h-6 w-6 text-slate-600 hover:text-pink-600" />
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