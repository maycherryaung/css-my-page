"use client";

import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { fetchCovidData } from "../utils/api";
import { parse, format } from "date-fns";

export default function CovidLineChart() {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState("Total Confirmed Cases");

  const dataKeys = {
    "Total Confirmed Cases": { key: "confirmed", color: "#6a0dad" },
    "Total Discharged": { key: "discharged", color: "#1e90ff" },
    "Total Hospitalized": { key: "hospitalized", color: "#ff4500" },
  };

  useEffect(() => {
    const getData = async () => {
      const covidData = await fetchCovidData();
      if (covidData) {
        setData(covidData);
      }
    };

    getData();
  }, []);

  const handleSelectionChange = (e) => {
    setSelectedData(e.target.value);
  };

  return (
    <div className="p-4">
      {/* Unified container for heading, dropdown, and paragraph */}
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">COVID-19 Trends in Singapore</h2>

        <div className="mb-4">
          <label htmlFor="dataSelect" className="block font-medium text-gray-700 mb-2">
            Select Data to Display:
          </label>
          <select
            id="dataSelect"
            className="border border-gray-300 rounded-md p-2 w-full md:w-1/3"
            value={selectedData}
            onChange={handleSelectionChange}
          >
            {Object.keys(dataKeys).map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Make the chart responsive */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => {
                const parsedDate = parse(date, 'M/d/yyyy', new Date());
                return format(parsedDate, 'MMM dd, yyyy');
              }}
            />
            <YAxis />
            <Tooltip labelFormatter={(date) => format(new Date(date), 'MMMM dd, yyyy')} />
            <Legend />
            <Line
              type="monotone"
              dataKey={dataKeys[selectedData].key}
              stroke={dataKeys[selectedData].color}
              name={selectedData}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Paragraph aligned with heading and dropdown */}
        <p className="text-gray-700 mt-4">
          This graph illustrates the daily COVID-19 trends in Singapore. It includes the number of confirmed cases,
          discharged patients, and current hospitalizations over time. The visualization helps in understanding the
          progression of the pandemic.
        </p>
      </div>
    </div>
  );
}
