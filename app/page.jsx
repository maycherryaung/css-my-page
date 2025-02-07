import CovidLineChart from "./components/CovidLineChart";
import CovidHospitalChart from "./components/CovidHospitalChart";  // Import the bar chart

export default function HomePage() {
  return (
    <main className="p-6 space-y-8">  {/* Added spacing between charts */}
      <section>
        <h2 className="text-2xl font-bold mb-4">COVID-19 Trends Over Time</h2>
        <CovidLineChart />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Weekly Hospitalisations & ICU Admissions</h2>
        <CovidHospitalChart />
      </section>
    </main>
  );
}
