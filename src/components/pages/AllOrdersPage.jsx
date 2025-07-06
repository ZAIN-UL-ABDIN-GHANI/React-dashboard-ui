import React from "react";
import { Link } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import AllOrdersPageTables from "../tables/AllOrdersPageTables";
const AllOrdersPage = () => {
  return (
    <div className="w-full px-4 py-6 md:px-8 lg:px-10 bg-white rounded-3xl shadow-sm">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-4"></div>
      {/* Orders Table */}
      <div className="mt-4 overflow-x-auto w-full">
        <AllOrdersPageTables />
      </div>
      <Link
        to="/"
        className="flex items-center w-full py-3 pb-4 border-b cursor-pointer select-none text-blue-600"
      >
        <MdKeyboardArrowLeft size={28} />
      </Link>
    </div>
  );
};

export default AllOrdersPage;
