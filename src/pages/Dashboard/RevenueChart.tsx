import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { CurrencyDollarIcon, CheckCircleIcon, TicketIcon, ClockIcon } from "@heroicons/react/24/solid";
import { PointElement, LineElement } from "chart.js";
import { getTailwindColor } from "../../utils/utils";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

export function EarningsAndSupport() {
  // Data for Earnings Bar Chart
  const purple = getTailwindColor("--color-purple");
  const barData = {
    labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
    datasets: [
      {
        label: "Earnings",
        data: [300, 400, 350, 500, 800, 600, 550],
        backgroundColor: purple,
        borderRadius: 6,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: getTailwindColor("--color-gray-500") } },
    },
  };

  // Data for Support Tracker Doughnut Chart
  const doughnutData = {
    labels: [],
    datasets: [
      {
        data: [85, 15],
        backgroundColor: [purple, "#1f2937"],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Earnings Reports */}
      <div className="bg-layout-bg p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold">Earning Reports</h2>
        <p className="text-gray-500 text-sm">Weekly Earnings Overview</p>

        <div className="flex items-center gap-3 mt-4">
          <h3 className="text-3xl font-bold">$468</h3>
          <span className="text-green-500 text-sm font-medium">+4.2%</span>
        </div>
        <p className="text-text-secondary text-sm mt-1">You informed of this week compared to last week</p>

        <div className="mt-6">
          <Bar data={barData} options={barOptions} height={100} />
        </div>

        {/* Small Stats */}
        <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-2 font-bold text-gray-500">
              <CurrencyDollarIcon className="w-4 h-4 text-purple" />
              Earnings
            </div>
            <p className="font-semibold">$545.69</p>
          </div>
          <div>
            <div className="flex items-center gap-2 font-bold text-gray-500">
              <CheckCircleIcon className="w-4 h-4 text-teal" />
              Profit
            </div>
            <p className="font-semibold">$256.34</p>
          </div>
          <div>
            <div className="flex items-center gap-2 font-bold text-gray-500">
              <CurrencyDollarIcon className="w-4 h-4 text-red" />
              Expense
            </div>
            <p className="font-semibold">$74.19</p>
          </div>
        </div>
      </div>

      {/* Support Tracker */}
      <div className="bg-layout-bg p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-semibold">Support Tracker</h2>
        <p className="text-gray-500 text-sm">Last 7 Days</p>

        <h3 className="text-3xl font-bold mt-4">164</h3>
        <p className="text-gray-500 text-sm">Total Tickets</p>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-500">
              <TicketIcon className="w-4 h-4 text-purple" />
              New Tickets
            </div>
            <p>142</p>

            <div className="flex items-center gap-2 text-gray-500">
              <CheckCircleIcon className="w-4 h-4 text-teal" />
              Open Tickets
            </div>
            <p>28</p>

            <div className="flex items-center gap-2 text-gray-500">
              <ClockIcon className="w-4 h-4 text-yellow" />
              Response Time
            </div>
            <p>1 Day</p>
          </div>

          {/* Doughnut Chart */}
          <div className="flex-1 flex justify-center items-center relative">
            <div className="flex md:hidden w-40 h-40">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="md:flex hidden">
              <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div className="absolute text-center">
              <p className="text-gray-500 text-sm">Completed Task</p>
              <p className="text-2xl font-bold">85%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Title, Tooltip, Legend);

export function ProfitExpensesLeads() {
  // Line Chart Data (Profit)
  const profitData = {
    labels: ["", "", "", "", "", "", ""],
    datasets: [
      {
        label: "Profit",
        data: [500, 620, 570, 590, 560, 610, 624],
        borderColor: "#14b8a6",
        backgroundColor: "rgba(20, 184, 166, 0.2)",
        tension: 0.3,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#14b8a6",
      },
    ],
  };
  const profitOptions = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false, grid: { display: false } },
      y: { display: false, grid: { display: false } },
    },
  };

  // Semi Doughnut Data (Expenses)
  const expensesData = {
    labels: [],
    datasets: [
      {
        data: [78, 22],
        backgroundColor: ["#f59e0b", "#374151"],
        borderWidth: 0,
        circumference: 180,
        rotation: 270,
        cutout: "70%",
      },
    ],
  };
  const expensesOptions = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  // Doughnut Data (Leads)
  const leadsData = {
    labels: [],
    datasets: [
      {
        data: [184, 50],
        backgroundColor: ["#22c55e", "#1e3a34"],
        borderWidth: 0,
        cutout: "70%",
      },
    ],
  };
  const leadsOptions = {
    responsive: true,
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 mt-8 gap-6">
      {/* Profit Card */}
      <div className="bg-layout-bg p-6 rounded-xl shadow-lg">
        <h2 className="text-lg font-bold ">Profit</h2>
        <p className="text-gray-500 text-sm">Last Month</p>
        <div className="mt-4 h-24 ">
          <Line data={profitData} options={profitOptions} />
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold">624k</p>
          <span className="text-green text-sm font-medium">+8.2%</span>
        </div>
      </div>

      {/* Expenses Card */}
      <div className="bg-layout-bg p-6 rounded-xl shadow-lg flex flex-col items-center">
        <h2 className="text-lg font-semibold">82.5k</h2>
        <p className="text-gray-500 text-sm">Expenses</p>
        <div className="w-32 h-20 mt-4 flex justify-center">
          <Doughnut data={expensesData} options={expensesOptions} />
        </div>
        <p className="text-xl font-bold mt-2">78%</p>
        <p className="text-gray-500 text-sm">$21k Expenses more than last month</p>
      </div>

      {/* Generated Leads Card */}
      <div className="bg-layout-bg p-6 rounded-xl shadow-lg flex flex-col items-center">
        <h2 className="text-lg font-semibold">Generated Leads</h2>
        <p className="text-gray-500 text-sm">Monthly Report</p>
        <p className="text-3xl font-bold mt-4">4,350</p>
        <span className="text-green text-sm font-medium">+15.8%</span>
        <div className="w-28 h-28 mt-4 flex justify-center relative">
          <Doughnut data={leadsData} options={leadsOptions} />
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <p className="text-lg font-bold">184</p>
            <p className="text-gray-500 text-xs">Total</p>
          </div>
        </div>
      </div>
    </div>
  );
}
