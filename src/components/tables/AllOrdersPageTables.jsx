import React, { useState, useEffect } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaEye } from "react-icons/fa";

const AllOrdersPageTables = () => {
  const [index, setIndex] = useState(-1);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [filterNumbers] = useState([10, 25, 50, 100]);
  const [filterbystatus, setfilterbystatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(10);
  const [iswidth, setIswidth] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [allOrderData] = useState([
    {
      id: 0,
      sl: 1,
      package: "Residential Plot",
      amount: "PKR 1,200,000",
      status: "Booked",
      gateway: "Bank Alfalah",
      date: "2023-03-22",
    },
    {
      id: 1,
      sl: 2,
      package: "Commercial Shop",
      amount: "PKR 3,500,000",
      status: "Paid",
      gateway: "JazzCash",
      date: "2023-02-15",
    },
    {
      id: 2,
      sl: 3,
      package: "Solar Panel Installation",
      amount: "PKR 850,000",
      status: "Pending",
      gateway: "EasyPaisa",
      date: "2023-01-10",
    },
    {
      id: 3,
      sl: 4,
      package: "Industrial Land",
      amount: "PKR 5,500,000",
      status: "Cancelled",
      gateway: "UBL",
      date: "2022-12-30",
    },
  ]);
  const [filteredData, setFilteredData] = useState(allOrderData);
  const columns = [
    {
      field: "sl",
      headerName: "SL",
      flex: iswidth ? undefined : 0,
      width: iswidth ? 0 : undefined,
    },
    {
      field: "package",
      headerName: "Package",
      flex: iswidth ? undefined : 1,
      width: iswidth ? 150 : undefined,
    },
    {
      field: "amount",
      headerName: "Amount",
      flex: iswidth ? undefined : 1,
      width: iswidth ? 150 : undefined,
    },
    {
      field: "status",
      headerName: "Status",
      flex: iswidth ? undefined : 1,
      width: iswidth ? 150 : undefined,
      renderCell: (params) => (
        <span
          className={
            ["Pending", "Bank Pending", "Cancelled"].includes(params.value)
              ? "bg-red-200 text-red-500"
              : params.value === "Paid"
              ? "bg-green-100 text-green-500"
              : "" + " rounded-lg px-4 py-1"
          }
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      flex: iswidth ? undefined : 1,
      width: iswidth ? 150 : undefined,
      renderCell: (params) => (
        <FaEye
          size={15}
          onClick={() => toggleShowModal(params.row.id)}
          className="cursor-pointer"
        />
      ),
    },
  ];
  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredData.length / selectedFilter);
  const handleChangeFilter = (event) => {
    setSelectedFilter(Number(event.target.value));
    setCurrentPage(1);
  };
  // Search by package name
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const searchResults = allOrderData.filter((item) =>
      item.package.toLowerCase().includes(query)
    );
    setFilteredData(searchResults);
    setCurrentPage(1);
  };

  // Slice data for current page
  const startIndex = (currentPage - 1) * selectedFilter;
  const endIndex = Math.min(currentPage * selectedFilter, filteredData.length);
  const currentPageRows = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (page) => setCurrentPage(page);

  // Handle window resize for responsive columns
  useEffect(() => {
    const handleResize = () => setIswidth(window.innerWidth < 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter data by order status
  const filterDataByStatus = (status) => {
    if (status === "All") {
      setFilteredData(allOrderData);
      setCurrentPage(1);
      return;
    }
    const filtered = allOrderData.filter((item) => item.status === status);
    setFilteredData(filtered);
    setCurrentPage(1);
  };
  const toggleShowModal = (selectedRow) => {
    setIndex(selectedRow);
    setShowModal(true);
    const selectedData = filteredData.find((item) => item.id === selectedRow);
    setSelectedRowData(selectedData || {});
  };

  return (
    <div className="ml-[2%] md:ml-[2%] w-[95%] sm:w-[96%] h-full px-4 py-4 flex flex-col bg-white border">
      {/* Page title */}
      <div className="flex justify-between items-center border-b py-3">
        <h2 className="text-2xl">All Orders</h2>
        <div className="flex items-center">
          <h4>Dashboard</h4>
          <MdKeyboardArrowLeft size={18} />
          <h4 className="font-semibold text-black">All Order</h4>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex gap-x-3 py-3 border-b overflow-x-auto text-[#808080]">
        {["All", "Paid", "Pending", "Bank Pending", "Cancelled"].map(
          (status) => (
            <h2
              key={status}
              onClick={() => {
                filterDataByStatus(status);
                setfilterbystatus(status);
              }}
              className={`${
                filterbystatus === status ? "text-blue-500 bg-blue-100" : ""
              } px-3 py-2 cursor-pointer`}
            >
              {status}
            </h2>
          )
        )}
      </div>

      {/* Table controls and search */}
      <form className="flex justify-between items-center text-sm text-[#83878a] p-4 ">
        <div className="flex items-center gap-x-4">
          <span>Show</span>
          <select
            value={selectedFilter}
            onChange={handleChangeFilter}
            className="border rounded-lg p-2"
          >
            {filterNumbers.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
        <div>
          <span>Search:</span>
          <input
            value={searchQuery}
            onChange={handleSearchChange}
            className="p-4 border border-gray-400 focus:outline-none focus:ring-2 m-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto "
            type="text"
          />
        </div>
      </form>

      {/* Orders table */}
      <div className="overflow-x-auto px-4  border">
        <table className="w-full border">
          <thead className="bg-[#F8F8F8]">
            <tr>
              {columns.map((col) => (
                <th key={col.field} className="px-4 py-2 text-left">
                  {col.headerName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageRows.map((row, idx) => (
              <tr key={row.id} className="bg-white border">
                <td className="px-4 py-2">{row.sl}</td>
                <td className="px-4 py-2">{row.package}</td>
                <td className="px-4 py-2">{row.amount}</td>
                <td className="px-4 py-2">
                  <span
                    className={
                      ["Pending", "Bank Pending", "Cancelled"].includes(
                        row.status
                      )
                        ? "bg-red-200 text-red-500 rounded-lg px-4 py-1"
                        : row.status === "Paid"
                        ? "bg-green-100 text-green-500 rounded-lg px-4 py-1"
                        : ""
                    }
                  >
                    {row.status}
                  </span>
                </td>

                <td className="px-4 py-2">
                  <FaEye
                    onClick={() => toggleShowModal(row.id)}
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            ))}
            <tr className="bg-white h-10">
              <td colSpan="6"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-[#83878a] px-4 py-3 m-2 pb-3">
        <div>
          Showing {startIndex + 1} to {endIndex} of {allOrderData.length}
        </div>
        <div className="flex gap-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`${
                currentPage === i + 1 ? "bg-blue-500 text-white" : ""
              } px-3 py-1 rounded-lg`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllOrdersPageTables;
