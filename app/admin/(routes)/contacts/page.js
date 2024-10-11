'use client'

import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { toast } from "react-toastify";

function DataTable({ tableHead, dataArray, handleEdit }) {
  const [formData, setFormData] = useState(null);

  const handleCancelEdit = () => {
    setFormData(null);
  };

  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-light text-gray-normal uppercase text-sm leading-normal">
          {tableHead.map((value) => (
            <th key={value} className="py-3 px-6 text-left">
              {value}
            </th>
          ))}
          {/* <th className="py-3 px-6 text-left">Action</th> */}
        </tr>
      </thead>

      <tbody className="text-gray-normal text-sm font-light [&>*:nth-child(even)]:bg-gray-light">
        {dataArray.map((data, index) => (
          <tr
            key={index}
            className="border-b border-gray-200 hover:bg-gray-light"
          >
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {index + 1}
            </td>
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {data.name}
            </td>
            <td className="py-3 px-6 text-left">{data.email}</td>
            <td className="py-3 px-6 text-left">{data.phone}</td>
            <td className="py-3 px-6 text-left">{data.message}</td>
            <td className="py-3 px-6 text-left">{data.admin_remarks}</td>
            <td className="py-3 px-6 text-left">
              <button onClick={() => handleEdit(index)} className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded">
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Contacts() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/contacts");
        setUsers(response.data.reverse());
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const selectedEntry = users[index];

    setFormData({
      id: selectedEntry.id,
      name: selectedEntry.name,
      email: selectedEntry.email,
      phone: selectedEntry.phone,
      message: selectedEntry.message,
      admin_remarks: selectedEntry.admin_remarks,
    });

    openForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (postData, method) => {
    try {
      const response = await axios[method]("/api/admin/contacts", postData);

      if (formData.id) {
        setUsers((item) => {
          const updatedData = [...item];
          const index = updatedData.findIndex(
            (data) => data.id === formData.id,
          );
          updatedData[index] = response.data.data;
          return updatedData;
        });
      } else {
        setUsers((item) => [...item, response.data.data]);
      }

      setFormData(null);
      setShowForm(false);

      toast.success("Submitted!");
    } catch (error) {
      toast.error("Try Again.");
      console.error("Failed to update data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let postData = {};

    if (formData.id) {
      postData = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        admin_remarks: formData.admin_remarks,
      };
      handleFormSubmit(postData, "put");
    } else {
      postData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        admin_remarks: formData.admin_remarks,
      };
      handleFormSubmit(postData, "post");
    }
  };

  return (
    <div className="container mx-auto py-5 px-8">
      {showForm && (
        <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
          <div className="flex justify-between items-center px-8 mb-4">
            <h2 className="text-lg font-bold">
              {formData.id ? "Update" : "Add"} Details
            </h2>
            <AiOutlineClose
              onClick={closeForm}
              className="text-gray-normal hover:text-gray-dark"
            />
          </div>

          <form onSubmit={handleSubmit} className="p-8 bg-white rounded">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-dark text-sm font-bold mb-2"
              >
                Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-dark text-sm font-bold mb-2"
              >
                Email*
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-dark text-sm font-bold mb-2"
              >
                Phone*
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-dark text-sm font-bold mb-2"
              >
                Message
              </label>
              <textarea
                type="text"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                rows={10}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="admin_remarks"
                className="block text-gray-dark text-sm font-bold mb-2"
              >
                Admin Remarks
              </label>
              <input
                type="text"
                id="admin_remarks"
                name="admin_remarks"
                value={formData.admin_remarks}
                onChange={handleChange}
                placeholder="Admin Remarks"
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded w-full"
            >
              {formData.id ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      )}

      {/* Display client data */}
      <DataTable
        tableHead={[
          "#",
          "Name",
          "Email",
          "Phone",
          "Message",
          "Remarks",
          "Action",
        ]}
        dataArray={users}
        handleEdit={handleEdit}
      />
    </div>
  );
}
