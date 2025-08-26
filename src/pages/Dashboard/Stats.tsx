import React from "react";
import { UserIcon, UserPlusIcon, UserGroupIcon, UsersIcon } from "@heroicons/react/24/solid";

export default function StatsCards() {
  const colorMap = {
    secondary: "var(--color-secondary)",
    green: "var(--color-green)",
    red: "var(--color-red)",
    yellow: "var(--color-yellow)",
  };
  const stats = [
    {
      title: "Session",
      value: "21,459",
      change: "+29%",
      changeColor: "text-green-500",
      desc: "Total User",
      shadowColor: "secondary",
      icon: <UserGroupIcon className="w-6 h-6" style={{ color: colorMap["secondary"] }} />,
    },
    {
      title: "Paid Users",
      value: "4,567",
      change: "+18%",
      changeColor: "text-green-500",
      desc: "Last week analytics",
      shadowColor: "green",
      icon: <UserPlusIcon className="w-6 h-6" style={{ color: colorMap["green"] }} />,
    },
    {
      title: "Active Users",
      value: "19,860",
      change: "-14%",
      changeColor: "text-red-500",
      desc: "Last week analytics",
      shadowColor: "red",
      icon: <UserIcon className="w-6 h-6" style={{ color: colorMap["red"] }} />,
    },
    {
      title: "Pending Users",
      value: "237",
      change: "+42%",
      changeColor: "text-green-500",
      desc: "Last week analytics",
      shadowColor: "yellow",
      icon: <UsersIcon className="w-6 h-6" style={{ color: colorMap["yellow"] }} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 ">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`bg-layout-bg p-5 rounded-xl transform duration-700`}
          style={{
            boxShadow: `0 1px 0 0 ${colorMap[stat.shadowColor]}`,
            transition: "box-shadow 0.7s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 2px 0 0 ${colorMap[stat.shadowColor]}`)}
          onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 1px 0 0 ${colorMap[stat.shadowColor]}`)}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">{stat.title}</span>
            <div className="bg-bg-secondary p-2 rounded-lg">
              {React.cloneElement(stat.icon, { style: { color: colorMap[stat.shadowColor] } })}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold text-text-primary">{stat.value}</p>
              <span className={`text-sm font-medium ${stat.changeColor}`}>{stat.change}</span>
            </div>
            <p className="text-secondary text-sm">{stat.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
