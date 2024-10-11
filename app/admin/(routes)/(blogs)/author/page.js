'use client'

import axios from "axios";
import Image from "next/image";
import { useState, useEffect } from "react";

import ToggleBtn from "@/app/admin/_components/ToggleBtn";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { baseUrl } from "@/utils/helper";
import AddButton from "@/app/admin/_components/AddButton";

function DataTable({ tableHeadings, dataArray, handleEdit }) {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-light text-gray-normal uppercase text-sm leading-normal">
          {tableHeadings.map((value, index) => (
            <th key={index} className="py-3 px-6 text-left">
              {value}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="text-gray-normal text-sm font-light [&>*:nth-child(even)]:bg-gray-light">
        {dataArray.map((data, index) => (
          <tr key={index}
            className="border-b border-gray-200 hover:bg-gray-light">
            <td className="py-3 px-6 text-left">{index + 1}</td>
            <td className="py-3 px-6 text-left whitespace-nowrap">
              {data.name}
            </td>
            <td className="py-3 px-6 text-left">
              {data.media_path && (
                <Image
                  loader={() => `${baseUrl}/${data.media_path}`}
                  src={`${baseUrl}/${data.media_path}`}
                  alt={data.media_alt}
                  width={50}
                  height={50}
                  className="w-24"
                />
              )}
            </td>
            <td className="py-3 px-6 text-left">
              <ToggleBtn
                key={index}
                table={"authors"}
                status={data.status}
                id={data.id}
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

export default function Authors() {
  const [file, setFile] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/authors");
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const openForm = () => {
    // setFormData({
    //   status: 1,
    // });
    setFormData({});
    setFile(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setFormData({});
    setFile(null);
    setShowForm(false);
  };

  const handleEdit = (index) => {
    const selectedEntry = authors[index];
    setFile(null);
    setFormData({...selectedEntry});
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFormSubmit = async (postData, method) => {
    const apiUrl = method === "post" ? "/api/admin/authors/add" : "/api/admin/authors/update";
    try {
      const response = await axios[method](apiUrl, postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (formData.id) {
        setAuthors((authors) => {
          const updatedData = [...authors];
          const index = updatedData.findIndex(
            (author) => author.id === formData.id,
          );
          updatedData[index] = response.data;
          return updatedData;
        });
      } else {
        setAuthors((authors) => [...authors, response.data]);
      }
      setFormData({});
      toast.success("Submitted!");
    } catch (error) {
      toast.error("Try again");
    } finally {
      setShowForm(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formsData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'image') {
        formsData.append(key, e.target.elements[key].files[0] || value);
      } else {
        formsData.append(key, value);
      }
    });

    if(!formData?.id) {
      formsData.append("status", formData?.status ? formData?.status : 1);
    }

    handleFormSubmit(formsData, formData.id ? "put" : "post");
  };

  const imageSrc = formData.media_path ? `${baseUrl}/${formData.media_path}` : null;

  return (
    <div className="container mx-auto py-5 px-8">
      <AddButton text={'Add Author'} onClick={openForm} />

      {showForm && (
        <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
          <div className="flex justify-between items-center px-8 mb-4">
            <h2 className="text-lg font-bold">{formData.id ? "Update" : "Add"} Author</h2>
            <AiOutlineClose onClick={closeForm} className="text-gray-normal hover:text-gray-dark"/>
          </div>

          <form onSubmit={handleSubmit} className="p-8 bg-white rounded">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-dark text-sm font-bold mb-2">Name*</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            <div className="mb-4">
              <label htmlFor="bio" className="block text-gray-dark text-sm font-bold mb-2">Bio</label>
              <textarea type="text" id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline" rows={5}/>
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-dark text-sm font-bold mb-2">Status*</label>
              <select id="status" name="status" value={formData.status} onChange={handleChange} className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline" required> 
                <option value="1">Show</option>
                <option value="0">Hide</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-dark text-sm font-bold mb-2">
                Image*
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                required={!formData.media_path}
              />
            </div>

            {(file || formData.media_path) && (
              <Image
                loader={() => (file ? file : imageSrc)}
                src={file ? file : imageSrc}
                alt="image"
                width={100}
                height={100}
                className="w-24 mb-4"
              />
            )}

            <button type="submit" className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded w-full">
              {formData.id ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      )}

      <DataTable
        tableHeadings={["#", "Author", "Image", "Status", "Action"]}
        dataArray={authors}
        handleEdit={handleEdit}
      />
    </div>
  );
}