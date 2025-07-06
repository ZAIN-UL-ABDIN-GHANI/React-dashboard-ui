import React, { useState, useEffect } from "react";
import { Trash2, Edit3, Plus } from "lucide-react";
import { Link } from "react-router-dom";

import { MdKeyboardArrowLeft } from "react-icons/md";
const PackagesPageTables = () => {
  const [addedName, setAddedName] = useState("");
  const [addedMonthlyPrice, setAddedMonthlyPrice] = useState("");
  const [addedYearlyPrice, setAddedYearlyPrice] = useState("");
  const [addedCharacters, setAddedCharacters] = useState("");
  const [addedStatus, setAddedStatus] = useState("Active");
  const [addedCategory, setAddedCategory] = useState([]);
  const [editedName, setEditedName] = useState("");
  const [editedMonthlyPrice, setEditedMonthlyPrice] = useState("");
  const [editedYearlyPrice, setEditedYearlyPrice] = useState("");
  const [editedCharacters, setEditedCharacters] = useState("");
  const [editedStatus, setEditedStatus] = useState("Active");
  const [editedCategory, setEditedCategory] = useState([]);
  const [index, setIndex] = useState(-1);
  const [filterNumbers] = useState([10, 25, 50, 100]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [categoryData, setCategoryData] = useState([
    {
      id: 0,
      name: "Trial",
      monthlyPrice: 0.0,
      yearlyPrice: 0.0,
      generateCharacters: "10000",
      status: "Active",
      category: ["Free"],
    },
    {
      id: 1,
      name: "Basic",
      monthlyPrice: 9.0,
      yearlyPrice: 99.0,
      generateCharacters: "100000",
      status: "Active",
      category: ["Standard"],
    },
    {
      id: 2,
      name: "Standard",
      monthlyPrice: 29.0,
      yearlyPrice: 299.0,
      generateCharacters: "300000",
      status: "Active",
      category: ["Premium"],
    },
    {
      id: 3,
      name: "Professional",
      monthlyPrice: 44.0,
      yearlyPrice: 599.0,
      generateCharacters: "10000000",
      status: "Active",
      category: ["Enterprise"],
    },
  ]);
  const [filteredData, setFilteredData] = useState(categoryData);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredData.length / selectedFilter);

  // Filter Data Function
  const handleChangeFilter = (event) => {
    setSelectedFilter(Number(event.target.value));
    setCurrentPage(1);
  };

  // Search Data Function
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const searchResults = categoryData.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(searchResults);
    setCurrentPage(1);
  };

  // Calculating the starting index and ending index for the current page
  const startIndex = (currentPage - 1) * selectedFilter;
  const endIndex = Math.min(currentPage * selectedFilter, filteredData.length);

  // Current page rows using filtered data
  const currentPageRows = filteredData.slice(startIndex, endIndex);

  // Handler for changing the current page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // for Opening Modal and selecting row for Delete Modal
  const toggleDeleteModal = (selectedRow) => {
    setIndex(selectedRow);
    setDeleteModal(true);
  };

  // for Opening and selecting row for Edit Modal
  const toggleEditModal = (selectedRow) => {
    const selectedCategory = categoryData.find((row) => row.id === selectedRow);
    setIndex(selectedRow);
    setEditedName(selectedCategory.name);
    setEditedMonthlyPrice(selectedCategory.monthlyPrice);
    setEditedYearlyPrice(selectedCategory.yearlyPrice);
    setEditedCharacters(selectedCategory.generateCharacters);
    setEditedStatus(selectedCategory.status);
    setEditedCategory([selectedCategory.category]);
    setEditModal(true);
  };

  // for Opening Modal for Add Modal
  const toggleAddModal = () => {
    setAddModal(true);
  };

  // Handling Delete Row
  const handleDelete = () => {
    if (index === -1) return;

    setCategoryData((prevData) => prevData.filter((row) => row.id !== index));

    setFilteredData((prevData) => prevData.filter((row) => row.id !== index));

    setDeleteModal(false);
  };

  // Handling Editing Row
  const handleEdit = (e) => {
    e.preventDefault();

    if (index === -1) return;

    const selectedRow = categoryData.find((row) => row.id === index);

    const updatedRow = {
      ...selectedRow,
      name: editedName,
      monthlyPrice: editedMonthlyPrice,
      yearlyPrice: editedYearlyPrice,
      generateCharacters: editedCharacters,
      status: editedStatus,
      category: editedCategory,
    };

    setCategoryData((prevData) =>
      prevData.map((row) => (row.id === index ? updatedRow : row))
    );

    setFilteredData((prevData) =>
      prevData.map((row) => (row.id === index ? updatedRow : row))
    );

    setEditedName("");
    setEditedMonthlyPrice("");
    setEditedYearlyPrice("");
    setEditedCharacters("");
    setEditModal(false);
    setEditedCategory([]);
  };

  // Handling Adding Row
  const handleAdd = (e) => {
    e.preventDefault();

    const addedRow = {
      id: categoryData.length,
      name: addedName,
      monthlyPrice: addedMonthlyPrice,
      yearlyPrice: addedYearlyPrice,
      generateCharacters: addedCharacters,
      status: addedStatus,
      category: addedCategory,
    };

    setCategoryData((nextData) => [...nextData, addedRow]);
    setFilteredData((nextData) => [...nextData, addedRow]);

    setAddedName("");
    setAddedMonthlyPrice("");
    setAddedYearlyPrice("");
    setAddedCharacters("");
    setAddModal(false);
    setAddedCategory([]);
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  // Delete Modal
  const DeleteModal = () => (
    <Modal
      isOpen={deleteModal}
      onClose={() => setDeleteModal(false)}
      title="Delete Package"
    >
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
          <Trash2 className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Delete Package
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this package? This action cannot be
          undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setDeleteModal(false)}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );

  // Add/Edit Modal
  const AddEditModal = ({ isEdit = false }) => {
    const isOpen = isEdit ? editModal : addModal;
    const onClose = () => (isEdit ? setEditModal(false) : setAddModal(false));
    const onSubmit = isEdit ? handleEdit : handleAdd;
    const name = isEdit ? editedName : addedName;
    const setName = isEdit ? setEditedName : setAddedName;
    const monthlyPrice = isEdit ? editedMonthlyPrice : addedMonthlyPrice;
    const setMonthlyPrice = isEdit
      ? setEditedMonthlyPrice
      : setAddedMonthlyPrice;
    const yearlyPrice = isEdit ? editedYearlyPrice : addedYearlyPrice;
    const setYearlyPrice = isEdit ? setEditedYearlyPrice : setAddedYearlyPrice;
    const characters = isEdit ? editedCharacters : addedCharacters;
    const setCharacters = isEdit ? setEditedCharacters : setAddedCharacters;
    const status = isEdit ? editedStatus : addedStatus;
    const setStatus = isEdit ? setEditedStatus : setAddedStatus;

    return (
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`${isEdit ? "Edit" : "Add"} Package`}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Monthly Price
            </label>
            <input
              type="number"
              step="0.01"
              value={monthlyPrice}
              onChange={(e) => setMonthlyPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Yearly Price
            </label>
            <input
              type="number"
              step="0.01"
              value={yearlyPrice}
              onChange={(e) => setYearlyPrice(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Characters
            </label>
            <input
              type="text"
              value={characters}
              onChange={(e) => setCharacters(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onSubmit}
              className="flex-1 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div className="ml-[2%] md:ml-[2%] w-[95%] sm:w-[96%] h-full px-8 py-4 flex flex-col bg-white border">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Packages</h1>
        <button
          onClick={toggleAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Package
        </button>
      </div>

      {/* Table Container */}
      <div className="ml-[2%] md:ml-[2%] w-[95%] sm:w-[96%] h-full px-4 py-4 flex flex-col bg-white border">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-center p-4 border-b border-gray-300 gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Show</span>
            <select
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={handleChangeFilter}
              value={selectedFilter}
            >
              {filterNumbers.map((number) => (
                <option key={number} value={number}>
                  {number}
                </option>
              ))}
            </select>
            <span>entries</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Search:</span>
            <input
              value={searchQuery}
              onChange={handleSearchChange}
              className="p-4 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-auto "
              type="text"
              placeholder="Search packages..."
            />
          </div>
        </div>

        <div className="overflow-x-auto px-4 border   bg-white w-full">
          <table className="w-full min-w-[700px] border ">
            <thead className="bg-[#f8f8f8ac]  ">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Monthly Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Yearly Price
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Characters
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentPageRows.map((row, index) => (
                <tr
                  key={row.id}
                  className="border border-b border-gray-300 bg-white"
                >
                  <td className="px-4 py-2 text-gray-800 whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                    ${row.monthlyPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                    ${row.yearlyPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-gray-700 whitespace-nowrap">
                    {row.generateCharacters}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`inline-block rounded-lg px-4 py-1 text-xs font-semibold ${
                        row.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-gray-600 whitespace-nowrap">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => toggleEditModal(row.id)}
                        className="hover:text-blue-600 transition-colors"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleDeleteModal(row.id)}
                        className="hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="bg-white h-10">
                <td colSpan="6"></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 gap-4">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {endIndex > filteredData.length ? filteredData.length : endIndex} of{" "}
            {filteredData.length} entries
          </div>
          <div className="flex items-center gap-1 overflow-x-auto">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index + 1}
                className={`px-3 py-1 text-sm rounded-lg font-medium transition-colors ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <DeleteModal />
      <AddEditModal isEdit={false} />
      <AddEditModal isEdit={true} />
      <Link
        to="/"
        className="flex items-center w-full py-3 pb-4 border-b cursor-pointer select-none text-blue-600"
      >
        <MdKeyboardArrowLeft size={28} />
      </Link>
    </div>
  );
};

export default PackagesPageTables;
