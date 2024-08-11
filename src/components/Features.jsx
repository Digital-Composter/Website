import otomatis from '../assets/automations.png';
import efisien from '../assets/efficien.png';
import control from '../assets/control.png';

export default function Features() {
  return (
    <>
      <div className="my-24 md:px-14 px-4 max-w-screen-2xl mx-auto pt-10" id='feature'>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
          <div className="lg:w-1/4 ml-8">
            <h3 className="text-3xl text-primary font-bold lg:w-1/2 mb-3">What are the advantages of our product? </h3>
            <p className="text-base text-slate-400">Dicompos is a digital composting device that integrates monitoring and control system to the temperature, moisture, and pH level of compost, automatically.</p>
          </div>
          {/* card */}
          <div className="w-full lg:w-3/4">
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-start md:gap-12 gap-8">
              <div className=' text-white rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center items-center hover:-translate-y-4 transition-all duration-300'>
                <div>
                  <img src={otomatis} alt="" />
                  <h5 className='text-2xl font-semibold text-black px-5 text-center'>Automation</h5>
                </div>
              </div>

              <div className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center items-center hover:-translate-y-4 transition-all duration-300 md:mt-16'>
                <div>
                  <img src={efisien} alt="" />
                  <h5 className='text-2xl font-semibold text-emerald- px-5 text-center'> Efficiency</h5>
                </div>
              </div>

              <div className='bg-[rgba(255, 255, 255, 0.04)] rounded-[35px] h-96 shadow-3xl p-8 items-center flex justify-center items-center hover:-translate-y-4 transition-all duration-300'>
                <div>
                  <img src={control} alt="" />
                  <h5 className='text-2xl font-semibold text-emerald- px-5 text-center'> Control</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
