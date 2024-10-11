'use client'

import AddButton from "@/app/admin/_components/AddButton";
import { formatDate, metaFlag, slugify } from "@/utils/helper";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

export default function MetaTag() {
  function DataTable({ head, dataArray }) {
    const handleEdit = (index) => {
      const selectedEntry = metaTag[index];
      setFormData({ ...selectedEntry });
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

        <tbody className="text-gray-normal text-sm font-light [&>*:nth-child(even)]:bg-gray-light">
          {dataArray.map((data, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-light">
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {index + 1}
              </td>
              <td className="py-3 px-6 text-left">
                {data.url}
              </td>
              <td className={`${metaFlag(data.meta_title) && "text-action"} py-3 px-6 text-left`}>
                {data.meta_title}
              </td>
              <td className={`${metaFlag(data.meta_description) && "text-action"} py-3 px-6 text-left`}>
                {data.meta_description}
              </td>
              <td className="py-3 px-6 text-left text-nowrap">
                {formatDate(data.updated_at)}
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

  const [metaTag, setMetaTag] = useState([]);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/metatags");
        setMetaTag(response.data);
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
      const apiUrl = method === "post" ? "/api/admin/metatags/add" : "/api/admin/metatags/update";
      const response = await axios[method](apiUrl, postData);

      if (formData.id) {
        setMetaTag((metaTag) => {
          const updatedMeta = [...metaTag];
          const index = updatedMeta.findIndex(
            (meta) => meta.id === formData.id,
          );
          updatedMeta[index] = response.data;
          return updatedMeta;
        });
      } else {
        setMetaTag((metaTag) => [...metaTag, response.data]);
      }

      setFormData({
        id: "",
        url: "",
        title: "",
        description: "",
        media_id: "",
      });
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
        url: "/" + slugify(formData.url.toLowerCase()),
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        media_id: formData.media_id ? formData.media_id : null,
      };
      handleFormSubmit(postData, "put");
    } else {
      postData = {
        url: "/" + slugify(formData.url.toLowerCase()),
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        media_id: formData.media_id ? formData.media_id : null,
        updated_at: new Date(Date.now()).toISOString(),
        created_at: new Date(Date.now()).toISOString()
      };
      handleFormSubmit(postData, "post");
    }
  };

  return (
    <div className="container mx-auto py-5 px-8">
      <AddButton text={'Add Meta Tag'} onClick={openForm} />

      {showForm && (
        <div
          className={`fixed py-8 right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto`}
        >
          <div className="flex justify-between items-center px-8 mb-4">
            <h2 className="text-lg font-bold">{formData.id ? "Update" : "Add"} Meta Tag</h2>
            <AiOutlineClose
              onClick={closeForm}
              className="text-gray-normal hover:text-gray-dark"
            />
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="url"
              >
                URL*
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
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="title"
              >
                Title*
              </label>
              <input
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
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
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="meta_description"
                type="text"
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                placeholder="Description"
                rows={5}
                required
              />
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
        head={["#", "URL", "Title", "Description", "Date", "Action"]}
        dataArray={metaTag}
      />
    </div>
  );
}