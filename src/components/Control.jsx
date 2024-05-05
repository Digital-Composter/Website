import React, { useState } from 'react';

const Slider = () => {
  return (
    <>
      <Parameter className='w-full' namaParameter="Suhu" />
      <Parameter namaParameter="Kelembapan" />
      <Parameter namaParameter="pH" />
      <div className="flex flex-col items-center justify-center">
        <button className='bg-blue-500 text-white rounded-md px-4 py-2 mt-4' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

const Parameter = ({ namaParameter }) => {
  const [value, setValue] = useState(50);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-center flex-col"> 
      <span className="text-lg text-gray-500 mb-4">{namaParameter}</span> 
      <div className="flex items-center justify-between w-1/4"> 
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={handleChange}
          className="appearance-none w-full h-1.5 bg-blue-500 rounded-full outline-none focus:outline-none active:outline-none mr-4"
        />
        <div className="h-6 bg-gray-200 rounded-full w-20 flex items-center justify-center"> 
          <h1 className='text-center'>
            {value} 
          </h1>
        </div>
      </div>
      {/* Tambahkan input hidden untuk menyimpan nilai value */}
      <input type="hidden" name={namaParameter} value={value} />
    </div>
  );
}

const handleSubmit = () => {
  // Menggunakan document.getElementsByName untuk mendapatkan nilai value dari setiap input hidden
  const suhu = document.getElementsByName("Suhu")[0].value;
  const kelembapan = document.getElementsByName("Kelembapan")[0].value;
  const pH = document.getElementsByName("pH")[0].value;

  // Melakukan apa pun yang Anda inginkan dengan nilai-nilai tersebut, misalnya, mencetaknya
  console.log("Nilai Suhu:", suhu);
  console.log("Nilai Kelembapan:", kelembapan);
  console.log("Nilai pH:", pH);
};

export default Slider;
