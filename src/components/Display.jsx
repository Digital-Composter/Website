import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  return (
    <section className='flex justify-center items-center h-screen -mt-16'>
      <ResponsiveContainer width="80%" height="75%">
          <LineChart
            width={600}
            height={300}
            data={data}
            margin={{ top: 0, right: 20, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
            <Legend width={100} wrapperStyle={{ top: 0, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '30px' }} />
            <Line type="monotone" dataKey="pH" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Suhu" stroke="#82ca9d" />
            <Line type="monotone" dataKey="Kelembapan" stroke="#ebfa16" />
          </LineChart>
          <div className='w-full h-full -mt-12'>
          <IndicatorBox />
          </div>
      </ResponsiveContainer>
    </section>
  );
}

const IndicatorBox = () => {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <div className="rounded-lg w-36 h-28 md:w-25 md:h-25 bg-blue-500"><h1 className='text-center text-lg'>--</h1></div>
      <div className="rounded-lg w-36 h-28 md:w-25 md:h-25 bg-green-500"><h1 className='text-center text-lg'>--</h1></div>
      <div className="rounded-lg w-36 h-28 md:w-25 md:h-25 bg-yellow-500"><h1 className='text-center text-lg'>--</h1></div>
      <div className="rounded-lg w-36 h-28 md:w-25 md:h-25 bg-red-500"><h1 className='text-center text-lg'>--</h1></div>
    </div>
  );
};
