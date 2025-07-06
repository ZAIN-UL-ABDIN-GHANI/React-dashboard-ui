import React, { useState } from "react";

const Packages = () => {
  const [orderData, setOrderData] = useState([
    {
      id: 0,
      name: "Trial",
      monthly: "$0.00",
      yearly: "$0.00",
    },
    {
      id: 1,
      name: "Basic",
      monthly: "$9.00",
      yearly: "$99.00",
    },
    {
      id: 2,
      name: "Standard",
      monthly: "$29.00",
      yearly: "$299.00",
    },
    {
      id: 3,
      name: "Professional",
      monthly: "$59.00",
      yearly: "$599.00",
    },
  ]);

  return (
    <>
      {/* Packages */}
      <div className="flex flex-col flex-wrap items-start justify-center w-[100%] lg:w-[40%] p-3 bg-[#F8F8F8] border rounded-lg overflow-hidden">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-xl font-semibold">Packages</h1>
          <h4 className="text-blue-500 font-semibold text-center">
            <a
              href="/packages"
              className="hover:no-underline hover:text-blue-500"
            >
              <span className="cursor-pointer">View All</span>
            </a>
          </h4>
        </div>

        {/* Table */}
        <div className="border overflow-x-auto w-full my-3 bg-white">
          <table className="w-full min-w-full">
            <thead className="bg-[#F8F8F8]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-[185px]">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-[140px]">
                  Monthly
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b border-gray-200 w-[140px]">
                  Yearly
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-200 hover:bg-gray-50 
                  bg-white
                  `}
                >
                  <td className="px-4 py-3 text-sm text-gray-900 w-[185px]">
                    <strong>{row.name}</strong>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 w-[140px]">
                    {row.monthly}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 w-[140px]">
                    {row.yearly}
                  </td>
                </tr>
              ))}
              <tr className="bg-[#F8F8F8] h-10">
                <td colSpan="6"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Packages;
