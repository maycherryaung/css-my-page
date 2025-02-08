import CovidLineChart from "./components/CovidLineChart";
import CovidHospitalChart from "./components/CovidHospitalChart";

export default function HomePage() {
  return (
    <main className="p-6 space-y-8">

      <section>
     
        <div className="flex flex-col md:flex-row items-start">
          <div className="flex-1">
            <CovidLineChart />
          </div>
          <div className="w-full md:w-1/3 p-4">
            <p className="text-gray-700">
              This graph illustrates the daily COVID-19 trends in Singapore. It includes the number of confirmed cases, discharged patients, and current hospitalizations over time. The visualization helps in understanding the progression of the pandemic.
            </p>
          </div>
        </div>
      </section>

 
      <section>
      
        <div className="flex flex-col md:flex-row items-start">
          <div className="flex-1">
            <CovidHospitalChart />
          </div>
          <div className="w-full md:w-1/3 p-4">
            <p className="text-gray-700">
              This graph displays the weekly numbers of hospitalisations and ICU admissions related to COVID-19. It offers insights into the healthcare system's capacity and the severity of cases requiring intensive care.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
