import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CryptoJS from 'crypto-js';

export default function SimpleLineChart() {
  const [temperature, setTemperature] = useState('--');
  const [humidity, setHumidity] = useState('--');
  const [hambiance, setHambiance] = useState('--');
  const [ph, setPh] = useState('--');
  const [tempAmbiance, setTempAmbiance] = useState('--');
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);

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

        // Check if the data is available and has the expected structure
        if (realtimeData && realtimeData.data && realtimeData.data.length > 0) {
          setTemperature(realtimeData.data[0]?.temp ?? '--');
          setHumidity(realtimeData.data[0]?.humi ?? '--');
          setPh(realtimeData.data[0]?.ph ?? '--');
          setHambiance(realtimeData.data[0]?.humi_ambiance ?? '--');
          setTempAmbiance(realtimeData.data[0]?.temp_ambiance ?? '--');
        } else {
          console.error('Realtime data is not available or has an unexpected structure.');
        }

        // Format records data
        if (recordsData && recordsData.data) {
          const formattedData = recordsData.data.map(record => ({
            ...record,
            name: new Date(record.inserted_at).toLocaleString(),
          }));
          setData(formattedData);
        } else {
          console.error('Records data is not available or has an unexpected structure.');
        }
      })
      .catch(error => {
        console.error('There was an error with the fetch operation:', error);
      });
  }
}, [token]);


  const Card = ({ children, className }) => (
    <div className={`border px-8 py-2 shadow-md m-2 bg-white rounded-md ${className}`}>
      {children}
    </div>
  );

  const Control = ({ indikator }) => (
    <div className="border p-4 shadow-md m-2 bg-white rounded-md w-3/4">
      <h2 className='text-center text-lg mb-4'>{indikator}</h2>
      <div className="flex flex-row gap-4 justify-center">
        <input 
          type="number" 
          className="border px-2 py-1 rounded mb-4 w-16"
        /> <span> Min</span>
        <input 
          type="number" 
          className="border px-2 py-1 rounded mb-4 w-16"
        /> <span>max</span>
      </div>
    </div>
  );


  

  const indicatorData = [
    { title: 'Temperature', value: temperature, textcolor: 'green' },
    { title: 'Humidity', value: humidity, textcolor: 'green' },
    { title: 'pH', value: ph, textcolor: 'green' },
    { title: 'Air Temperature', value: tempAmbiance, textcolor: 'green' },
    { title: 'Air Humidity', value: hambiance, textcolor: 'green' },
  ];

  const IndicatorBox = ({ title, value, textcolor }) => (
    <div className="rounded-lg w-36 h-20 md:w-25 md:h-16">
      <h1 className='text-center text-xl'>{title}</h1>
      <p className={`text-center text-lg text-${textcolor}`}>{value}</p>
    </div>
  );

  return (
    <section className='relative flex flex-col h-screen -mt-2'>
      <div className='flex flex-wrap justify-center gap-4 mt-4'>
        {indicatorData.map((indicator, index) => (
          <Card key={index}>
            <IndicatorBox title={indicator.title} value={indicator.value} textcolor={indicator.textcolor} />
          </Card>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row w-full lg:px-32">
        <Card className="w-full lg:w-1/2">
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
        </Card>
      </div>
      
    </section>
  );
}
