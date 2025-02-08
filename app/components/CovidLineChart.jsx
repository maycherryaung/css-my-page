"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { fetchVaccinationData } from "../utils/api";
import { format } from "date-fns";

export default function VaccinationLineChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const vaccinationData = await fetchVaccinationData();
      if (vaccinationData) {
        setData(vaccinationData);
      }
    };

    getData();
  }, []);

  return (
    <div className="p-4">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">
           Progress of COVID-19 vaccination in Singapore
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(date) => format(new Date(date), "MMM dd, yyyy")}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(date) =>
                format(new Date(date), "MMMM dd, yyyy")
              }
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="received_at_least_one_dose"
              stroke="#6a0dad"
              name="At Least One Dose"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="full_regimen"
              stroke="#1e90ff"
              name="Full Regimen"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="minimum_protection"
              stroke="#ff4500"
              name="Minimum Protection"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
        <p className="text-gray-700 mt-4">
       
        </p>
      </div>
    </div>
  );
}
