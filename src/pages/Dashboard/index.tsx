import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import StatsCards from "./Stats";
import { EarningsAndSupport, ProfitExpensesLeads } from "./RevenueChart";

// Register Chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

export default function Dashboard() {
  // Card data
  const stats = [
    { title: "Users", value: "1,200", color: "bg-blue-500" },
    { title: "Orders", value: "320", color: "bg-yellow-500" },
    { title: "Revenue", value: "$12,500", color: "bg-green-500" },
    { title: "Refunds", value: "12", color: "bg-red-500" },
  ];

  // Charts Data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Revenue ($)",
        data: [1200, 1900, 1500, 2100, 1800, 2400],
        borderColor: "#22c55e",
        backgroundColor: "rgba(34, 197, 94, 0.2)",
        tension: 0.3,
      },
    ],
  };

  const barData = {
    labels: ["Electronics", "Clothing", "Groceries", "Books", "Others"],
    datasets: [
      {
        label: "Orders",
        data: [200, 150, 300, 100, 80],
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const pieData = {
    labels: ["Credit Card", "PayPal", "Bank Transfer"],
    datasets: [
      {
        label: "Payment Methods",
        data: [55, 30, 15],
        backgroundColor: ["#ef4444", "#3b82f6", "#facc15"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: "top" as const } },
  };

  return (
    <div className="rounded-xl min-h-screen">
      <StatsCards />
      <EarningsAndSupport />
      <ProfitExpensesLeads />
    </div>
  );
}
