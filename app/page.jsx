import CovidLineChart from "./components/CovidLineChart";
import CovidHospitalChart from "./components/CovidHospitalChart";

export default function HomePage() {
  return (
    <main className="p-6 space-y-12">

      {/* Section for Line Chart */}
      <section>
        <div style={{ display: 'table', width: '100%' }}>
          <div style={{ display: 'table-cell', width: '70%', verticalAlign: 'top' }}>
            <CovidLineChart />
          </div>
          <div style={{ display: 'table-cell', width: '30%', paddingLeft: '20px', verticalAlign: 'middle' }}>
            <p className="text-gray-700 mt-12">
              This graph illustrates the daily COVID-19 trends in Singapore. It includes the number of confirmed cases, discharged patients, and current hospitalizations over time. The visualization helps in understanding the progression of the pandemic.
            </p>
          </div>
        </div>
      </section>

      {/* Section for Hospital Chart */}
      <section>
        <div style={{ display: 'table', width: '100%' }}>
          <div style={{ display: 'table-cell', width: '70%', verticalAlign: 'top' }}>
            <CovidHospitalChart />
          </div>
          <div style={{ display: 'table-cell', width: '30%', paddingLeft: '20px', verticalAlign: 'middle' }}>
            <p className="text-gray-700 mt-12">
              This graph displays the weekly numbers of hospitalisations and ICU admissions related to COVID-19. It offers insights into the healthcare system's capacity and the severity of cases requiring intensive care.
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
