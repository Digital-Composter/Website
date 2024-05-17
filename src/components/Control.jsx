import React, { useState } from 'react';

const Slider = () => {
  return (
    <div className="flex flex-col items-center justify-center"> {/* Menggunakan flexbox untuk mengatur posisi */}
      <Parameter className='' namaParameter="Suhu" />
      <Parameter namaParameter="Kelembapan" />
      <Parameter namaParameter="pH" />
      <button className='bg-blue-500 text-white rounded-md px-4 py-2 mt-4' onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const Parameter = ({ namaParameter }) => {
  const [value, setValue] = useState(50);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="flex flex-col"> 
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
  // Handle submit logic
};

export default Slider;
