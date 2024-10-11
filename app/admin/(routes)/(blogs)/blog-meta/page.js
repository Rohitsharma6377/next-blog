'use client'

import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { toast } from "react-toastify";
import ToggleBtn from "@/app/admin/_components/ToggleBtn";
import AddButton from "@/app/admin/_components/AddButton";
import { slugify, test } from "@/utils/helper";

export default function BlogMeta() {
  const [blogMeta, setBlogMeta] = useState([]);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/blogmeta");
        setBlogMeta(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const openForm = () => {
    setFormData({});
    setShowForm(true);
  };

  const closeForm = () => {
    setFormData({});
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const selectedEntry = blogMeta[index];
    setFormData({...selectedEntry});
    setShowForm(true);
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
      const response = await axios[method]("/api/admin/blogmeta", postData);

      if (formData.id) {
        setBlogMeta((blogMeta) => {
          const updatedMeta = [...blogMeta];
          const index = updatedMeta.findIndex(
            (meta) => meta.id === formData.id,
          );
          updatedMeta[index] = response.data;
          return updatedMeta;
        });
      } else {
        setBlogMeta((blogMeta) => [...blogMeta, response.data]);
      }

      setFormData({});
      setShowForm(false);
      toast.success("Submitted!");
    } 
    
    catch (error) {
      toast.error("Try Again.");
      console.error("Failed to update data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let postData = {
      ...formData,
      status: formData?.status ? formData?.status : 1,
      url: "/" + slugify(formData.url),
    };
    
    try {
      handleFormSubmit(postData, formData?.id ? "put" : "post");
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };


  return (
    <div className="container mx-auto py-5 px-8">
      <AddButton text={'Add Blog Meta'} onClick={openForm} />

      {showForm && (
        <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
          <div className="flex justify-between items-center px-8 mb-4">
            <h2 className="text-lg font-bold">{formData.id ? "Update" : "Add"} Blog Meta</h2>
            <AiOutlineClose
              onClick={closeForm}
              className="text-gray-normal hover:text-gray-dark"
            />
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="type"
              >
                Type
              </label>
              <select
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Tag">Tag</option>
                <option value="Category">Category</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required/>
            </div>

            <div className="mb-4">
              <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor="url">
                URL
              </label>
              <input
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="url"
                type="text"
                name="url"
                value={formData.url}
                onChange={handleChange}
                placeholder="URL"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor="meta_title">
                Title*
              </label>
              <input className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="meta_title"
                type="text"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                placeholder="Title"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-dark text-sm font-bold mb-2">Description*</label>
              <textarea 
                type="text" 
                id="meta_description" 
                name="meta_description" 
                value={formData.meta_description} 
                onChange={handleChange} 
                placeholder="Description" 
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline" rows={5} required
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="type"
              >
                Status
              </label>
              <select
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="type"
                name="type"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="1">Show</option>
                <option value="0">Hide</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-primary w-full hover:bg-hover text-white font-bold py-2 px-4 rounded"
            >
              {formData.id ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      )}

      <DataTable
        head={["#", "Type", "Name", "Url", "Meta", "Status", "Action"]}
        dataArray={blogMeta}
        handleEdit={handleEdit}
      />
    </div>
  );
}


function DataTable({ head, dataArray, handleEdit }) {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-light text-gray-normal uppercase text-sm leading-normal">
          {head.map((val, index) => (
            <th key={index} className="py-3 px-6 text-left">
              {val}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="text-gray-normal text-sm font-light [&>*:nth-child(even)]:bg-gray-light">
        {dataArray.map((item, index) => (
          <tr key={index} className="border-b border-gray-200 hover:bg-gray-light">
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {index + 1}
            </td>
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {item.type}
            </td>
            <td className="py-3 px-6 text-left">
              {item.name}
            </td>
            <td className="py-3 px-6 text-left">
              {item.url}
            </td>
            <td className="py-3 px-6 text-left">
              title: {item.meta_title} <br/> desc: {item.meta_description}
            </td>
            <td className="py-3 px-6 text-left">
              <ToggleBtn
                key={index}
                table={"blogmeta"}
                status={item.status}
                id={item.id}
              />
            </td>
            <td className="py-3 px-6 text-left">
              <button onClick={() => handleEdit(index)} className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded mr-2">
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}