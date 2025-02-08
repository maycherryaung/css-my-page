export const fetchVaccinationData = async () => {
  try {
    const response = await fetch(
      "https://data.gov.sg/api/action/datastore_search?resource_id=d_713e8c4fd88c64a7b7e55e9c2643e936"
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const jsonData = await response.json();
    const records = jsonData.result.records;

    // Map records to desired format
    return records.map(item => ({
      date: item.vacc_date, // ISO date (YYYY-MM-DD)
      received_at_least_one_dose: Number(item.received_at_least_one_dose),
      full_regimen: Number(item.full_regimen),
      minimum_protection: Number(item.minimum_protection)
    }));
  } catch (error) {
    console.error("Error fetching vaccination data:", error);
    return [];
  }
};
