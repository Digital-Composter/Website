import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SimpleLineChart() {
  const [temperature, setTemperature] = useState('--');
  const [humidity, setHumidity] = useState('--');
  const [hambiance, setHambiance] = useState('--');
  const [ph, setPh] = useState('--');
  const [tempAmbiance, setTempAmbiance] = useState('--');
  const [token, setToken] = useState('');
  const [data, setData] = useState([]);



  useEffect(() => {
    const fetchRealtime = fetch('https://digicomp.vercel.app/realtime', {
      method: 'GET',
      headers: {
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
            timeZone: 'Asia/Jakarta',
          }),
        };
      });
  
        setData(formattedData);
      })
      .catch(error => {
        console.error('There was an error with the fetch operation:', error);
      });
  }, []);
  

  const Card = ({ children, className }) => (
    <div className={`border px-8 py-2 shadow-md m-2 bg-white rounded-md ${className}`}>
      {children}
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
    <section className='relative flex flex-col h-screen -mt-2'id='dashboard'>
      <div className='flex flex-wrap justify-center gap-4 mt-4'>
        {indicatorData.map((indicator, index) => (
          <Card key={index}>
            <IndicatorBox title={indicator.title} value={indicator.value} textcolor={indicator.textcolor} />
          </Card>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row w-full  justify-center items-center">
  <Card className="w-full mx-40">
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
