"use client";

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import Papa from "papaparse";

export default function HospitalisationChart() {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState("Hospitalised"); // Default selection

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

  const handleSelectionChange = (e) => {
    setSelectedData(e.target.value);
  };

  return (
    <div className="p-4">
      {/* Unified container for heading, dropdown, and paragraph */}
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-2xl font-bold mb-4">COVID-19 Hospitalisations & ICU Admissions by Week</h2>

        <div className="mb-4">
          <label htmlFor="hospitalDataSelect" className="block font-medium text-gray-700 mb-2">
            Select Data to Display:
          </label>
          <select
            id="hospitalDataSelect"
            className="border border-gray-300 rounded-md p-2 w-full md:w-1/3"
            value={selectedData}
            onChange={handleSelectionChange}
          >
            <option value="Hospitalised">Hospitalised</option>
            <option value="ICU">ICU Admissions</option>
          </select>
        </div>

        {/* Make the chart responsive */}
        <ResponsiveContainer width="100%" height={500}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="epi_week" angle={-45} textAnchor="end" interval={0} height={70} />
            <YAxis domain={[0, (dataMax) => dataMax < 100 ? 100 : dataMax + 50]} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey={selectedData}
              fill={selectedData === "Hospitalised" ? "#1e90ff" : "#ff4500"}
              name={selectedData === "Hospitalised" ? "Hospitalised" : "ICU Admissions"}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Paragraph aligned with heading and dropdown */}
        <p className="text-gray-700 mt-4">
          This graph displays the weekly numbers of hospitalisations and ICU admissions related to COVID-19. It offers insights
          into the healthcare system's capacity and the severity of cases requiring intensive care.
        </p>
      </div>
    </div>
  );
}
