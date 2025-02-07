import Papa from 'papaparse';

export const fetchCovidData = async () => {
  try {
    const response = await fetch('/covid_data.csv');  // Fetch from the public folder

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const csvText = await response.text();

    // Parse CSV using PapaParse
    const parsedData = Papa.parse(csvText, {
      header: true,  // Converts CSV headers to object keys
      skipEmptyLines: true
    });

    console.log("Parsed CSV Data:", parsedData.data);  // Check the parsed data

    // Map the data into the desired format
    return parsedData.data.map(item => ({
      date: item.date_figure,
      confirmed: parseInt(item.confirmed_total, 10),
      discharged: parseInt(item.discharge_total, 10),
      hospitalized: parseInt(item.hospitalised_total, 10)
    }));
    console.log("First Row of Parsed Data:", parsedData.data[0]);

  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};
