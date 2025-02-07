"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import Papa from "papaparse";

export default function HospitalisationChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/NumberofnewCOVID19hospitalisationsICUadmissionsbyEpiweek.csv');
      const csvText = await response.text();
      const parsedData = Papa.parse(csvText, { header: true, skipEmptyLines: true });

      const formattedData = parsedData.data.reduce((acc, curr) => {
        const week = curr.epi_week;
        if (!acc[week]) {
          acc[week] = { epi_week: week, Hospitalised: 0, ICU: 0 };
        }
        acc[week][curr.new_admisison_type] = parseInt(curr.count, 10);
        return acc;
      }, {});

      const filteredData = Object.values(formattedData).filter((_, index) => index % 2 === 0);
      setData(filteredData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">COVID-19 Hospitalisations & ICU Admissions by Week</h2>
      <ResponsiveContainer width="70%" height={500}>
        <BarChart width={900} height={400} data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="epi_week" angle={-45} textAnchor="end" interval={0} height={70} />
          <YAxis domain={[0, 1000]} />  // Adjust the upper limit based on your data
          <Tooltip />
          <Legend />
          <Bar dataKey="Hospitalised" stackId="a" fill="#1e90ff" name="Hospitalised" />
          <Bar dataKey="ICU" stackId="a" fill="#ff4500" name="ICU Admissions" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
