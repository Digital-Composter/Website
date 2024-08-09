import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CryptoJS from 'crypto-js';

const Control = ({ indikator, min, max, valueMin, valueMax, onChangeMin, onChangeMax, onSubmit }) => (
  <div className="border p-4 shadow-md m-2 bg-white rounded-md w-3/4">
    <h2 className='text-center text-lg mb-4'>{indikator}</h2>
    <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
      <form onSubmit={onSubmit}>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            name={min}
            className="border px-2 py-1 rounded mb-4 w-3/4"
            value={valueMin}
            onChange={onChangeMin}
            placeholder={`Enter Value`}
          />
          <label htmlFor={min} className="min-w-max mb-5">Min</label>
        </div>
        <div className="flex items-center gap-2">
          <input 
            type="number" 
            name={max}
            className="border px-2 py-1 rounded mb-4 w-3/4"
            value={valueMax}
            onChange={onChangeMax}
            placeholder={`Enter Value`}
          />
          <label htmlFor={max} className="min-w-max mb-5">Max</label>
        </div>
        <button 
          type="submit"
          className='bg-green text-white font-semibold hover:bg-hv2 rounded-md px-8 py-2 mt-4'
        >
          Submit
        </button>
      </form>
    </div>
  </div>
);

const NewBox = ({ tempMin, tempMax, humiMin, humiMax, handleTempChange, handleHumiChange, handleTempSubmit, handleHumiSubmit }) => {
  const handleTempFormSubmit = (e) => {
    e.preventDefault();
    handleTempSubmit();
  };

  const handleHumiFormSubmit = (e) => {
    e.preventDefault();
    handleHumiSubmit();
  };

  return (
    <div className="flex flex-col border p-4 shadow-md m-2 bg-white rounded-md w-full lg:w-1/2 justify-center items-center">
      <Control 
        indikator='Temperature' 
        min='tempMin' 
        max='tempMax' 
        valueMin={tempMin}
        valueMax={tempMax}
        onChangeMin={handleTempChange} 
        onChangeMax={handleTempChange}
        onSubmit={handleTempFormSubmit} 
      />
      <Control 
        indikator='Humidity' 
        min='humiMin' 
        max='humiMax' 
        valueMin={humiMin}
        valueMax={humiMax}
        onChangeMin={handleHumiChange} 
        onChangeMax={handleHumiChange} 
        onSubmit={handleHumiFormSubmit} 
      />
    </div>
  );
};

const Chart = ({ data }) => (
  <ResponsiveContainer width="100%" height={450}>
    <LineChart
      data={data}
      margin={{ top: 15, right: 10, left: 20, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
      <Line type="monotone" dataKey="temp" stroke="#8884d8" activeDot={{ r: 8 }} />
      <Line type="monotone" dataKey="ph" stroke="#82ca9d" />
      <Line type="monotone" dataKey="humi" stroke="#ebfa16" />
    </LineChart>
  </ResponsiveContainer>
);

const IndicatorBox = ({ title, value, unit }) => (
  <div className="rounded-lg w-36 h-20 md:w-25 md:h-16">
    <h1 className='text-center text-sm text-gray-600'>{title}</h1> {/* Font lebih kecil dan abu-abu */}
    <p className='text-center text-3xl font-bold text-black'>
      {value}
      <span className='text-lg font-normal text-green'> {unit}</span> {/* Font lebih kecil dan berwarna hijau */}
    </p>
  </div>
);

const Card = ({ children, className }) => (
  <div className={`border px-10 py-2 shadow-md m-2 bg-white rounded-md ${className}`}>
    {children}
  </div>
);

export default function SimpleLineChart() {
  const [temperature, setTemperature] = useState('--');
  const [humidity, setHumidity] = useState('--');
  const [hambiance, setHambiance] = useState('--');
  const [ph, setPh] = useState('--');
  const [tempAmbiance, setTempAmbiance] = useState('--');
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);

  const [tempMin, setTempMin] = useState('');
  const [tempMax, setTempMax] = useState('');
  const [humiMin, setHumiMin] = useState('');
  const [humiMax, setHumiMax] = useState('');

  useEffect(() => {
    function decrypt(ciphertext, key) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    }

    const encryptedToken = localStorage.getItem('authToken');
    const secretKey = 'pr3001trecthphn01';

    if (encryptedToken) {
      const decryptedToken = decrypt(encryptedToken, secretKey);
      setToken(decryptedToken);
    } else {
      console.error('Token not found in local storage.');
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetchRealtime = fetch('https://digicomp.vercel.app/realtime', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
  
      const fetchRecords = fetch('https://digicomp.vercel.app/records', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
        
      });
  
      Promise.all([fetchRealtime, fetchRecords])
        .then(([realtimeData, recordsData]) => {
          console.log('Realtime Data:', realtimeData);
          console.log('Records Data:', recordsData);
  
          setTemperature(realtimeData.data[0].temp);
          setHumidity(realtimeData.data[0].humi);
          setPh(realtimeData.data[0].ph);
          setHambiance(realtimeData.data[0].humi_ambiance);
          setTempAmbiance(realtimeData.data[0].temp_ambiance);
  
          const formattedData = recordsData.data.map(record => {
            const date = new Date(record.inserted_at);
            return {
              ...record,
              name: date.toLocaleString('id-ID', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                timeZone: 'Asia/Jakarta' // Zona waktu untuk WIB
              }),
            };
          });
  
          setData(formattedData);
        })
        .catch(error => {
          console.error('There was an error with the fetch operation:', error);
        });
    }
  }, [token]);

const handleTempChange = (e) => {
  const { name, value } = e.target;
  const floatValue = parseFloat(value); // Convert to float

  if (name === 'tempMin') {
    setTempMin(floatValue); // Set as float
  } else if (name === 'tempMax') {
    setTempMax(floatValue); // Set as float
  }
};

  
  const handleHumiChange = (e) => {
    const { name, value } = e.target;
    if (name === 'humiMin') {
      setHumiMin(value);
    } else if (name === 'humiMax') {
      setHumiMax(value);
    }
  };

  const handleHumiSubmit = async () => {
    try {
      const response = await fetch('https://digicomp.vercel.app/control/kelembapan', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moist_min: humiMin,
          moist_max: humiMax,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data); // Check the response
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  const handleTempSubmit = async () => {
    try {
      const response = await fetch('https://digicomp.vercel.app/control/temperatur', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use decrypted token here
          
        },
        body: JSON.stringify({
          mesophilic_temp: 20,
          thermophilic_temp: 60,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text(); // Get more info from the server
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      console.log('Decrypted Token:', token);
      console.log (token);

    }
  };
  

  return (
    <div className='flex flex-col items-center'>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <Card className="flex gap-6">
          <IndicatorBox title="Temperature" value={temperature} unit="°C" />
          <IndicatorBox title="Humidity" value={humidity} unit="%" />
          <IndicatorBox title="pH" value={ph} unit="" />
        </Card>
        <Card className="flex gap-6">
          <IndicatorBox title="Temp Ambiance" value={tempAmbiance} unit="°C" />
          <IndicatorBox title="Humidity Ambiance" value={hambiance} unit="%" />
        </Card>
      </div>
      <Chart data={data} />
      <NewBox 
        tempMin={tempMin}
        tempMax={tempMax}
        humiMin={humiMin}
        humiMax={humiMax}
        handleTempChange={handleTempChange}
        handleHumiChange={handleHumiChange}
        handleTempSubmit={handleTempSubmit}
        handleHumiSubmit={handleHumiSubmit}
      />
    </div>
  );
}
