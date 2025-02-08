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
  const [filteredData, setFilteredData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [availableMonths, setAvailableMonths] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const getData = async () => {
      const vaccinationData = await fetchVaccinationData();
      if (vaccinationData) {
        setData(vaccinationData);
        setFilteredData(vaccinationData);
        // Extract unique months in "YYYY-MM" format from the date field
        const months = [
          ...new Set(
            vaccinationData.map((item) =>
              format(new Date(item.date), "yyyy-MM")
            )
          ),
        ];
        setAvailableMonths(months);
      }
    };

    getData();
  }, []);

  // Filter data based on the selected month
  useEffect(() => {
    if (selectedMonth) {
      const filtered = data.filter(
        (item) => format(new Date(item.date), "yyyy-MM") === selectedMonth
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [selectedMonth, data]);

  const getDescription = () => {
    if (selectedOption === "all") {
      return "This graph displays the progress of COVID-19 vaccination in Singapore, showing three metrics: the number of individuals who have received at least one dose, those who have completed the full regimen, and those who have achieved minimum protection. This comprehensive view helps to compare different stages of the vaccination rollout over time.";
    } else if (selectedOption === "atLeastOne") {
      return "The line graph showcases the cumulative number of people who have received at least one dose of the vaccine over time. The x-axis represents dates from December 31, 2020 to April 8, 2021, while the y-axis indicates the number of vaccinated individuals, ranging from 0 to 1,200,000. The vaccination campaign started slowly in early January 2021, with minimal increases. A noticeable rise began around late January 2021, with consistent growth through February. From March 2021 onwards, the vaccination rate accelerated significantly, indicating a robust vaccination rollout. By early April 2021, the number of individuals with at least one dose approached 1.1 million. The graph uses a purple line with circular markers to plot the data, and a dropdown menu suggests that other vaccination data could be selected for display.";
    } else if (selectedOption === "fullRegimen") {
      return "The line graph highlights the number of people who have completed the Full Regimen of vaccination. The x-axis covers the timeline from December 31, 2020 to April 8, 2021, while the y-axis represents the total number of fully vaccinated individuals, scaling up to 600,000. The graph starts with no significant activity through January 2021, reflecting a slow rollout of second doses or full regimen vaccinations. A noticeable upward trend begins in February 2021, with steady growth as more people complete their vaccination schedules. From March 2021 onwards, the rate of full regimen vaccinations increases more rapidly, indicating a significant ramp-up in the vaccination campaign. By April 8, 2021, nearly 600,000 people had completed their full vaccination regimen. The data is illustrated using a light blue line with circular markers, and the dropdown menu suggests that other vaccination-related data sets are available for selection.";
    } else if (selectedOption === "minimumProtection") {
      return "This graph illustrates the trend of COVID-19 vaccinations in Singapore by focusing on the number of individuals who have achieved minimum protection. It demonstrates the progress in providing a basic level of immunity across the population.The x-axis spans from December 31, 2020 to April 8, 2021, while the y-axis ranges from 0 to 12. For most of the period, the graph remains flat at around 9, indicating little to no change in the number of people achieving minimum protection. A slight increase is noticeable around mid-March 2021, where the count rises to approximately 10 and then stabilizes again. This trend suggests that the rate of achieving minimum protection was relatively stagnant, with only a minor uptick observed in March. The graph is represented with an orange line with circular markers, and the dropdown menu indicates the possibility of selecting other vaccination metrics for display.";
    }
  };

  return (
    <div className="p-4">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-xl font-bold mb-4">
          Progress of COVID-19 vaccination in Singapore
        </h2>
        {/* Dropdown to choose which line(s) to display */}
        <div className="mb-4">
          <label htmlFor="line-select" className="mr-2">
            Select data to display:
          </label>
          <select
            id="line-select"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All</option>
            <option value="atLeastOne">At Least One Dose</option>
            <option value="fullRegimen">Full Regimen</option>
            <option value="minimumProtection">Minimum Protection</option>
          </select>
        </div>
        {/* Dropdown to filter data by month */}
        <div className="mb-4">
          <label htmlFor="month-filter" className="mr-2">
            Filter by Month:
          </label>
          <select
            id="month-filter"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Months</option>
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <ResponsiveContainer width="100%" height={450}>
          <LineChart
            data={filteredData}
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
            {(selectedOption === "all" ||
              selectedOption === "atLeastOne") && (
              <Line
                type="monotone"
                dataKey="received_at_least_one_dose"
                stroke="#6a0dad"
                name="At Least One Dose"
                strokeWidth={2}
              />
            )}
            {(selectedOption === "all" ||
              selectedOption === "fullRegimen") && (
              <Line
                type="monotone"
                dataKey="full_regimen"
                stroke="#1e90ff"
                name="Full Regimen"
                strokeWidth={2}
              />
            )}
            {(selectedOption === "all" ||
              selectedOption === "minimumProtection") && (
              <Line
                type="monotone"
                dataKey="minimum_protection"
                stroke="#ff4500"
                name="Minimum Protection"
                strokeWidth={2}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        {/* Description paragraph that updates based on the selected option */}
        <p className="text-gray-700 mt-4">{getDescription()}</p>
      </div>
    </div>
  );
}
