"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { fetchCovidData } from "../utils/api";
import { parse } from "date-fns";
import { format } from "date-fns";


export default function CovidLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const covidData = await fetchCovidData();
      if (covidData) {
        setData(covidData);
      }
    };

    getData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">COVID-19 Trends in Singapore</h2>

      <LineChart width={1000} height={500} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        
        <XAxis
          dataKey="date"
          tickFormatter={(date) => {
            const parsedDate = parse(date, 'M/d/yyyy', new Date());
            return format(parsedDate, 'MMM dd, yyyy');
          }}
        />

        <YAxis />

        <Tooltip 
          labelFormatter={(date) => format(new Date(date), 'MMMM dd, yyyy')}
        />

        <Legend />

        {/* Multi-line Chart for Confirmed, Discharged, and Hospitalized */}
        <Line type="monotone" dataKey="confirmed" stroke="#6a0dad" name="Total Confirmed Cases" strokeWidth={2} />
        <Line type="monotone" dataKey="discharged" stroke="#1e90ff" name="Total Discharged" strokeWidth={2} />
        <Line type="monotone" dataKey="hospitalized" stroke="#ff4500" name="Total Hospitalized" strokeWidth={2} />
      </LineChart>
    </div>
  );
}
