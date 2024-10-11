//component Users.js

'use client'

import { formatDate } from "@/utils/helper";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { toast } from "react-toastify";
import AddButton from "@/app/admin/_components/AddButton";


export default function Users() {
  function DataTable({ head, dataArray }) {
    const handleEdit = (index) => {
      const selectedUserEntry = blogMeta[index];

      setFormData({
        id: selectedUserEntry.id,
        name: selectedUserEntry.name,
        email: selectedUserEntry.email,
        phone: selectedUserEntry.phone,
        role: selectedUserEntry.role,
        created_at: selectedUserEntry.created_at,
      });

      setShowForm(true);
    };

    return (
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-light text-gray-normal uppercase text-sm leading-normal">
            {head.map((value, index) => (
              <th key={index} className="py-3 px-6 text-left">
                {value}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-gray-normal text-sm font-light">
          {dataArray.map((data, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 hover:bg-gray-light"
            >
              <td className="py-3 px-6 text-left">{index + 1}</td>
              <td className="py-3 px-6 text-left">{data.name}</td>
              <td className="py-3 px-6 text-left">{data.email}</td>
              <td className="py-3 px-6 text-left">{data.phone}</td>
              <td className="py-3 px-6 text-left">{data.role}</td>
              <td className="py-3 px-6 text-left">
                {formatDate(data.created_at)}
              </td>
              <td className="py-3 px-6 text-left">
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  const [blogMeta, setBlogMeta] = useState([]);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/users");
        setBlogMeta(response.data);
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (postData, method) => {
    try {
      const response = await axios[method]("/api/admin/users", postData);

      if (formData.id) {
        setBlogMeta((blogMeta) => {
          const updatedData = [...blogMeta];
          const index = updatedData.findIndex(
            (meta) => meta.id === formData.id,
          );
          updatedData[index] = response.data.data;
          return updatedData;
        });
      } else {
        setBlogMeta((blogMeta) => [...blogMeta, response.data.data]);
      }

      setFormData({});

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
        role: formData.role,
        created_at: formData.created_at,
      };
      handleFormSubmit(postData, "put");
    } else {
      postData = {
        name: formData.name,
        role: formData.role,
      };
      handleFormSubmit(postData, "post");
    }
  };

  const [formPosition, setFormPosition] = useState("-right-1/3");

  return (
    <div className="container mx-auto py-5 px-8">
      {/* <AddButton text={'Add User'} onClick={openForm} /> */}

      {showForm && (
        <div
          className={`fixed py-9 right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto`}
        >
          <div className="flex justify-between items-center px-8 mb-4">
            <h2 className="text-lg font-bold">{formData.id ? "Update" : "Add"} User</h2>
            <AiOutlineClose
              onClick={closeForm}
              className="text-gray-normal hover:text-gray-dark"
            />
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="phone"
              >
                Phone
              </label>
              <input
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <select
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="seo">SEO</option>
                <option value="user">User</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-primary w-full hover:bg-hover text-white font-bold py-2 px-4 rounded"
            >
              Update
            </button>
          </form>
        </div>
      )}

      <DataTable
        head={["#", "Name", "Email", "Phone", "Role", "Created At", "Action"]}
        dataArray={blogMeta}
      />
    </div>
  );
}
