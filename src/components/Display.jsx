import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import CryptoJS from 'crypto-js';
import Slider from './Control';
// Sample data for the line chart
const data = [
  { name: '17:05:35', pH: 4000, Suhu: 2400, Kelembapan: 2250, amt: 2400 },
  { name: '18:25:35', pH: 3000, Suhu: 1398, Kelembapan: 2250, amt: 2210 },
  { name: '19:08:30', pH: 2000, Suhu: 9800, Kelembapan: 2250, amt: 2290 },
  { name: '19:45:37', pH: 2780, Suhu: 3908, Kelembapan: 2450, amt: 2000 },
  { name: '20:05:35', pH: 1890, Suhu: 4800, Kelembapan: 2350, amt: 2181 },
  { name: '20:55:33', pH: 2390, Suhu: 3800, Kelembapan: 2650, amt: 2500 },
  { name: '22:05:15', pH: 3490, Suhu: 4300, Kelembapan: 2250, amt: 2100 },
  { name: '22:35:25', pH: 3490, Suhu: 4300, Kelembapan: 2250, amt: 2100 },
  { name: '22:55:35', pH: 3490, Suhu: 4300, Kelembapan: 2650, amt: 2100 },
  { name: '23:25:35', pH: 3490, Suhu: 4300, Kelembapan: 2750, amt: 2100 },
  { name: '23:45:35', pH: 3490, Suhu: 4300, Kelembapan: 2250, amt: 2100 },
  { name: '23:55:46', pH: 3490, Suhu: 4300, Kelembapan: 2250, amt: 2100 },
];

export default function SimpleLineChart() {
  const [temperature, setTemperature] = useState('--');
  const [humidity, setHumidity] = useState('--');
  const [hambiance, setHambiance] = useState('--');
  const [ph, setPh] = useState('--');
  const [tempAmbiance, setTempAmbiance] = useState('--');
  const [token, setToken] = useState('');

  useEffect(() => {
    // Function to decrypt text using AES
    function decrypt(ciphertext, key) {
      const bytes = CryptoJS.AES.decrypt(ciphertext, key);
      return bytes.toString(CryptoJS.enc.Utf8);
    }

    // Retrieve encrypted token from local storage
    const encryptedToken = localStorage.getItem('authToken');
    const secretKey = process.env.REACT_APP_SECRET_KEY // Replace with your secret key

    if (encryptedToken) {
      const decryptedToken = decrypt(encryptedToken, secretKey);
      setToken(decryptedToken);
    } else {
      console.error('Token not found in local storage.');
    }
  }, []);

  useEffect(() => {
    // Fetch data when token is available
    if (token) {
      fetch('https://digicomp.vercel.app/realtime', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);

          // Set values from fetched data
          setTemperature(data.data[0].temp);
          setHumidity(data.data[0].humi);
          setPh(data.data[0].ph);
          setHambiance(data.data[0].humi_ambiance);
          setTempAmbiance(data.data[0].temp_ambiance);
        })
        .catch(error => {
          console.error('There was an error with the fetch operation:', error);
        });
    }
  }, [token]);



// Card component to wrap each IndicatorBox and the LineChart
const Card = ({ children, className }) => (
  <div className={`border px-8 py-2 shadow-md m-2 bg-white rounded-md ${className}`}>
    {children}
  </div>
);

const Control = ({indikator})=>(
  <div className="border p-4 shadow-md m-2 bg-white rounded-md w-3/4">
      <h2 className='text-center text-lg mb-4'>{indikator}</h2>
      <div className="flex flex-row gap-4 justify-center">
        <input 
          type="number" 
          // value={value}
          // onChange={handleChange}
          className="border px-2 py-1 rounded mb-4 w-16"
        /> <span> Min</span>
        <input 
          type="number" 
          // value={value}
          // onChange={handleChange}
          className="border px-2 py-1 rounded mb-4 w-16"
        /> <span>max</span>
        

        </div>
  </div>
)

// NewBox component to display next to the chart
const NewBox = () => (
  <div className=" flex flex-col border p-2 shadow-md m-2 bg-white rounded-md w-full lg:w-1/2 justify-center items-center">
    <Control indikator ='Temperatur'/>
    <Control indikator ='Kelembapan'/>
    <Control indikator ='pH'/>
    <button className='bg-blue-500 text-white rounded-md px-4 py-2 mt-4'>
        Submit
      </button>
        </div>
  
);

// Main component to display the line chart and indicator boxes in cards


  const indicatorData = [
    { title: 'Temperature', value: temperature, textcolor: 'blue-500' },
    { title: 'Humidity', value: humidity, textcolor: 'green-500' },
    { title: 'pH', value: ph, textcolor: 'yellow-500' },
    { title: 'Ambiance Temperature', value: tempAmbiance, textcolor: 'red-500' },
    { title: 'Ambiance Humidity', value: hambiance, textcolor: 'cyan-400' },
  ];

  // IndicatorBox component to display individual metrics
const IndicatorBox = ({ title, value, textcolor }) => (
  <div className="rounded-lg w-36 h-20 md:w-25 md:h-16">
    <h1 className='text-center text-lg'>{title}</h1>
    <p className={`text-center text-${textcolor}`}>{value}</p>
  </div>
);

  return (
    <section className='flex flex-col h-screen -mt-2'>
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
              {/* <Legend width={100} wrapperStyle={{ top: 0, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '30px' }} /> */}
              <Line type="monotone" dataKey="pH" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Suhu" stroke="#82ca9d" />
              <Line type="monotone" dataKey="Kelembapan" stroke="#ebfa16" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <NewBox />
      </div>
    </section>
  );
}
