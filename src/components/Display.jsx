import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Team from './team/Team';

export default function SimpleLineChart() {
  const [temperature, setTemperature] = useState('--');
  const [humidity, setHumidity] = useState('--');
  const [ph, setPh] = useState('--');
  const [temin, setTemin] = useState('--');
  const [temax, setTemax] = useState('--');
  const [mesofilik, setMesofilik] = useState('--');
  const [thermofilik, setThermofilik] = useState('--');
  const [maturasi, setMaturasi] = useState('--');
  const [moismin, setMoismin] = useState('--');
  const [moismax, setMoismax] = useState('--');
  const [phase, setPhase] = useState('--');
  const [data, setData] = useState([]);

  const fetchRealtimeData = () => {
    fetch('https://dicompos-backend-prod-45yiaz3vqa-et.a.run.app/data/realtime', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(realtimeData => {
      setTemperature(realtimeData.data[0].temp);
      setHumidity(realtimeData.data[0].moist);
      setPh(realtimeData.data[0].ph);
      setHambiance(realtimeData.data[0].humid_ambiance);
      setTempAmbiance(realtimeData.data[0].temp_ambiance);
      setPhase(realtimeData.data[0].phase);
    })
    .catch(error => {
      console.error('There was an error with the fetch operation:', error);
    });
  };

  const fetchStaticData = () => {
    const fetchRecords = fetch('https://dicompos-backend-prod-45yiaz3vqa-et.a.run.app/data/records', {
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

    const fetchControl = fetch('https://dicompos-backend-prod-45yiaz3vqa-et.a.run.app/control', {
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

    Promise.all([fetchRecords, fetchControl])
      .then(([recordsData, controlData]) => {

        setTemin(controlData.data[0].vc2);
        setTemax(controlData.data[0].vh2);
        setMesofilik(controlData.data[0].lw2);
        setThermofilik(controlData.data[0].h2);
        setMaturasi(controlData.data[0].vc2);
        setMoismin(controlData.data[0].moist_min);
        setMoismax(controlData.data[0].moist_max);

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
  };

  useEffect(() => {
    fetchRealtimeData(); // Initial fetch for real-time data
    fetchStaticData();   // Initial fetch for static data

    const realtimeInterval = setInterval(fetchRealtimeData, 1000); // 1 second interval for real-time data
    const staticInterval = setInterval(fetchStaticData, 10000);    // 10 seconds interval for static data

    return () => {
      clearInterval(realtimeInterval); // Cleanup intervals on component unmount
      clearInterval(staticInterval);
    };
  }, []);

  const Card = ({ children, className }) => (
    <div className={`border px-6 py-4 shadow-md m-2 bg-card rounded-md ${className}`}>
      {children}
    </div>
  );

  const indicatorData = [
    { title: 'Temperature', value: temperature, unit: '°C' },
    { title: 'Humidity', value: humidity, unit: '%' },
    { title: 'pH', value: ph, unit: '' },
    { title: 'Phase', value: phase, unit: '' },
  ];

const IndicatorBox = ({ title, value, unit }) => (
  <div className="rounded-lg w-full h-24 flex flex-col justify-center items-center p-2">
    <h1 className='text-center text-lg font-medium md:text-lg'>{title}</h1>
    <div className="flex items-baseline">
      <p className="text-center font-semibold text-2xl text-black">{value}</p>
      <span className="text-center text-sm md:text-base font-medium text-green ml-1">{unit}</span>
    </div>
  </div>
);

  const MultiDataIndicatorBox = ({ data }) => (
    <div className="flex flex-col items-start w-full">
      {data.map((item, index) => (
        <div key={index} className="flex flex-row items-center">
          <h1 className='text-sm md:text-lg'>{item.title}:</h1>
          <div className="flex items-baseline ml-2">
            <p className="font-semibold text-lg md:text-xl text-black">{item.value}</p>
            <span className="text-sm md:text-base text-green ml-1">{item.unit}</span>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section className='relative flex flex-col h-screen -mt-20  ' id='dashboard'>
      <div className='flex flex-row justify-center gap-4 mt-4'>
        {/* Left Card */}
        <Card className="w-full sm:w-1/3 h-auto flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold mb-4">Temperature Target</h2>
          <MultiDataIndicatorBox 
            className="text-left w-full"
            data={[
              { title: 'Suhu Minimum', value: temin, unit: '°C' },
              { title: 'Suhu Maksimum', value: temax, unit: '°C' },
              { title: 'Mesofilik', value: mesofilik, unit: '°C' },
              { title: 'Termofilik', value: thermofilik, unit: '°C' },
              { title: 'Maturasi', value: maturasi, unit: '°C' }
            ]}
          />
        </Card>

        {/* Right Card */}
        <Card className="w-full sm:w-1/3 h-auto flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold mb-4 -mt-20">Moisture Target</h2>
          <MultiDataIndicatorBox 
            className="text-left w-full"
            data={[
              { title: 'Kelembapan Minimum', value: moismin, unit: '%' },
              { title: 'Kelembapan Maksimum', value: moismax, unit: '%' },
            ]}
          />
        </Card>
      </div>

      <div className='flex flex-wrap justify-center gap-4 mt-2'>
        {indicatorData.map((indicator, index) => (
          <Card key={index} className="w-1/3 h-20 flex justify-center items-center">
            <IndicatorBox title={indicator.title} value={indicator.value} unit={indicator.unit} />
          </Card>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row w-full justify-center items-center">
        <Card className="w-full lg:mx-52 sm:mx-4 sm:my-8">
          <ResponsiveContainer width="100%" height={window.innerWidth < 640 ? 350 : 360}>
            <LineChart
              data={data}
              margin={{ top: 15, right: 10, left: 10, bottom: 10 }}
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
