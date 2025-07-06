import React from "react";
import DashboardFirstCards from "../components/DashboardFirstCards";
import Graph from "../components/Graph";
import OrderTable from "../components/tables/OrderTable";
import Packages from "../components/pages/PackagesPage";

const Dashboard = () => {
  const firstCardsData = {
    users: 120,
    orders: 90,
    revenue: "$12,500",
    growth: "8.5%",
  };

  const graphData = {
    weekly_registrations: {
      Sunday: 0,
      Monday: 6,
      Tuesday: 5,
      Wednesday: 4,
      Thursday: 3,
      Friday: 2,
      Saturday: 1,
    },
  };

  // Calculate total weekly registrations 
  const totalRegistrations = Object.values(graphData.weekly_registrations).reduce(
    (sum, val) => sum + val,
    0
  );

  return (
    <div
    
      className="ml-[2%] md:ml-[2%] w-[95%] sm:w-[96%] px-4 py-4 z-0 flex flex-col items-start bg-white rounded-3xl"
    >
      <h1 className="mt-1 text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-base text-[#83878a]">Welcome back, Super Admin</p>

      {/* First Four Cards */}
      <div className="flex flex-wrap items-stretch w-full py-1 mt-3 gap-x-4 gap-y-6">
        <DashboardFirstCards data={firstCardsData} />
      </div>

      {/* Weekly Registration Section */}
      <div className="flex flex-col items-start justify-center w-full p-3 mt-3 bg-[#F8F8F8] border rounded-lg">
        <h1 className="text-xl font-semibold">Weekly Registration</h1>
        <p className="mt-1 text-3xl font-semibold">{totalRegistrations}</p>

        {/* Graph */}
        <div className="p-6 w-full">
          <Graph data={graphData} />
        </div>
      </div>

      {/* Tables Section */}
      <div className="flex flex-col flex-wrap items-start justify-between w-full mt-3 gap-y-4 lg:gap-y-0 lg:flex-row">
        <OrderTable />
        <Packages />
      </div>
    </div>
  );
};

export default Dashboard;
