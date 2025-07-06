import React, { useState } from "react";
import { Link } from "react-router-dom";

const OrderTable = () => {
  const [orderData] = useState([
    {
      id: 0,
      package: "Basic",
      total: "$9.90",
      gateway: "Paypal",
      status: "Pending",
    },
    {
      id: 1,
      package: "Standard",
      total: "$29.00",
      gateway: "Stripe",
      status: "Success",
    },
    {
      id: 2,
      package: "Pro",
      total: "$59.00",
      gateway: "Paypal",
      status: "Pending",
    },
  ]);

  return (
    <div className="flex flex-col flex-wrap items-start justify-center w-full lg:w-[59%] p-3 bg-[#F8F8F8] border rounded-lg overflow-hidden">
      {/* Title */}
      <h1 className="text-xl font-semibold">Orders</h1>

      {/* Table */}
      <div className="w-full my-3 overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-[#F8F8F8]">
            <tr>
              <th className="px-4 py-2 border">Package</th>
              <th className="px-4 py-2 border">Total</th>
              <th className="px-4 py-2 border">Gateway</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((order, index) => (
              <tr key={order.id} className="bg-white">
                <td className="px-4 py-2 border">{order.package}</td>
                <td className="px-4 py-2 border">{order.total}</td>
                <td className="px-4 py-2 border">{order.gateway}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      order.status === "Pending"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 h-10"></tr>
          </tbody>
        </table>
      </div>

      {/* View All */}
      <div className="w-full">
        <h4 className="font-semibold text-center text-blue-500">
          <Link
            to="/allorders"
            className="hover:no-underline hover:text-blue-500"
          >
            <span className="cursor-pointer">View All</span>
          </Link>
        </h4>
      </div>
    </div>
  );
};

export default OrderTable;
