"use client";  // This tells Next.js to treat this file as a Client Component

import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";

export default function HospitalisationChart() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedData, setSelectedData] = useState("ICU"); // Default selection to ICU
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://data.gov.sg/api/action/datastore_search?resource_id=d_98e8d8ba612a748413c439550c3c6942');
      const result = await response.json();

      const records = result.result.records;

      const formattedData = records.reduce((acc, curr) => {
        const week = curr.epi_week;
        if (!acc[week]) {
          acc[week] = { epi_week: week, Hospitalised: 0, ICU: 0 };
        }
        if (curr.new_admisison_type === "Hospitalised" || curr.new_admisison_type === "ICU") {
          acc[week][curr.new_admisison_type] = parseInt(curr.count, 10);
        }
        return acc;
      }, {});

      const allData = Object.values(formattedData);
      setData(allData);
      setFilteredData(allData);

      // Extract unique months from the data
      const months = [...new Set(allData.map(item => item.epi_week.slice(0, 7)))];
      setAvailableMonths(months);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const filtered = data.filter(item => item.epi_week.startsWith(selectedMonth));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedMonth, data]);

  const handleSelectionChange = (e) => {
    setSelectedData(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const getDescription = () => {
    if (selectedData === "ICU") {
      return (
        "The graph illustrates the weekly count of new ICU admissions due to COVID-19 in Singapore from January 2023 to January 2024. " +
        "The x-axis represents the epidemiological weeks (Epi-weeks), ranging from week 9 of 2023 to week 7 of 2024. " +
        "The y-axis shows the number of ICU admissions, with counts ranging from 0 to 40.\n" +
        "Key Observations: There is a noticeable peak between weeks 15 and 21 of 2023, where ICU admissions fluctuated between 10 and 17 cases. " +
        "A significant spike occurs around week 51 of 2023, reaching over 30 ICU admissions, followed by a gradual decline into early 2024. " +
        "After week 1 of 2024, the number of ICU admissions steadily decreases, approaching zero by week 7 of 2024. " +
        "The data is sourced from the Ministry of Health (MOH) and was last updated 8 months ago. A CSV file with the data is available for download."
      );
    } else {
      return (
        "The graph illustrates the weekly count of new COVID-19 hospitalisations in Singapore from January 2023 to January 2024. " +
        "The x-axis represents the epidemiological weeks (Epi-weeks), ranging from week 9 of 2023 to week 7 of 2024. " +
        "The y-axis shows the number of hospitalisations, with counts ranging from 0 to  1250.\n" +
        "Key Observations: There is a significant peak between weeks 15 and 21 of 2023, where hospitalisations ranged between 500 and 550 cases. " +
        "Another major spike occurs around week 50 of 2023, reaching close to 950 hospitalisations, followed by a steady decline into early 2024. " +
        "By week 7 of 2024, the number of hospitalisations drops significantly. " +
        "The data is sourced from the Ministry of Health (MOH) and was last updated 8 months ago. A CSV file with the data is available for download."
      );
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Number of new COVID-19 hospitalisations / ICU admissions by Epi-week</h2>

      {/* Dropdown to select Hospitalised or ICU */}
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

      {/* Month-based Filter */}
      <div className="mb-4">
        <label htmlFor="monthFilter" className="block font-medium text-gray-700 mb-2">Filter by Month:</label>
        <select
          id="monthFilter"
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/3"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="">All Months</option>
          {availableMonths.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={500}>
        <BarChart width={500} height={400} data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="epi_week" angle={-45} textAnchor="end" interval={0} height={70} tick={{ fill: '#6b7280' }} />
          <YAxis tick={{ fill: '#6b7280' }} label={{ value: 'Count', angle: -90, position: 'insideLeft', fill: '#6b7280' }} />
          <Tooltip contentStyle={{ backgroundColor: '#f9fafb', borderColor: '#d1d5db' }} />
          <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '10px' }} />

          <Bar
            dataKey={selectedData}
            fill={selectedData === "Hospitalised" ? "#D18700" : "#6a0dad"}
            name={selectedData === "Hospitalised" ? "Hospitalised" : "ICU Admissions"}
            barSize={20}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-gray-700 mt-4">
        {getDescription()}
      </p>
    </div>
  );
}
