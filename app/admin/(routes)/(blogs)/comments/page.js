//component comment.js

'use client'

import axios from "axios";
import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import { toast } from "react-toastify";

export default function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    page: "",
    user: "",
    comment: "",
    date: "",
    status: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handleToggleStatus = async (comment) => {
    const newStatus = comment.status === "show" ? "hide" : "show";
    const updatedComment = { ...comment, status: newStatus };

    try {
      await axios.put("/api/comments/comments", updatedComment);
      setComments(
        comments.map((c) =>
          c.id === comment.id ? { ...c, status: newStatus } : c,
        ),
      );
    } catch (error) {
      console.error("Failed to toggle status", error);
    }
  };

  function DataTable({ head, dataArray }) {
    const handleEdit = (index) => {
      const selectedEntry = comments[index];

      setFormData({
        id: selectedEntry.id,
        page: selectedEntry.page,
        user: selectedEntry.user,
        comment: selectedEntry.comment,
        date: selectedEntry.date,
        status: selectedEntry.status,
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
              <td className="py-3 px-6 text-left">{data.page}</td>
              <td className="py-3 px-6 text-left">{data.user}</td>
              <td className="py-3 px-6 text-left">{data.comment}</td>
              <td className="py-3 px-6 text-left">{data.date}</td>
              <td className="py-3 px-6 text-left">
                <button
                  onClick={() => handleToggleStatus(data)}
                  className={`${data.status === "show" ? "bg-green-500" : "bg-gray-light0"} text-white font-bold py-2 px-4 rounded mr-2`}
                >
                  {data.status === "show" ? "Hide" : "Show"}
                </button>
              </td>
              {/* <td className="py-3 px-6 text-left">
                                    <button onClick={() => handleEdit(index)} className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded mr-2">Edit</button>
                                </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/comments/comments");
        setComments(response.data);
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

  const handleFormSubmit = async (postData) => {
    try {
      const response = await axios.put("/api/comments/comments", postData);

      if (formData.id) {
        setComments((comment) => {
          const updatedData = [...comment];
          const index = updatedData.findIndex(
            (meta) => meta.id === formData.id,
          );
          updatedData[index] = response.data.data;
          return updatedData;
        });
      } else {
        setComments((comment) => [...comment, response.data.data]);
      }

      setFormData({
        id: "",
        page: "",
        user: "",
        comment: "",
        date: "",
        status: "",
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

    postData = {
      id: formData.id,
      page: formData.page,
      user: formData.user,
      comment: formData.comment,
      date: formData.date,
      status: formData.status,
    };

    handleFormSubmit(postData);
  };

  return (
    <div className="container mx-auto py-5 px-8">
      {showForm && (
        <div
          className={`fixed flex flex-col justify-center right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto`}
        >
          <div className="flex justify-between items-center px-8 mb-4">
            <h2 className="text-lg font-bold">Edit Comment Form</h2>
            <AiOutlineClose
              onClick={closeForm}
              className="text-gray-normal hover:text-gray-dark"
            />
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="page"
              >
                Page
              </label>
              <input
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="page"
                name="page"
                type="text"
                value={formData.page}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="user"
              >
                User
              </label>
              <input
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="user"
                type="text"
                name="user"
                value={formData.user}
                onChange={handleChange}
                placeholder="User"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="comment"
              >
                Comment
              </label>
              <textarea
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="comment"
                type="text"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Comment"
                rows={7}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="date"
              >
                Date
              </label>
              <input
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                id="date"
                type="text"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Date"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-dark text-sm font-bold mb-2"
                htmlFor="status"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                
                <option value="show">Show</option>
                <option value="hide">Hide</option>
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
        head={["#", "Page", "User", "Comment", "Date", "Status"]}
        dataArray={comments}
      />
    </div>
  );
}