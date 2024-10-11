'use client'

import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { slugify } from "@/utils/helper";
import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import('@/components/blocks/CKEditor'), { ssr: false });

export default function AddUpdatePage({ pageId }) {
  const { push } = useRouter();

  const [image, setImage] = useState(null);
  const [cover, setCover] = useState(null);
  const [blogMeta, setBlogMeta] = useState([]);
  const [formData, setFormData] = useState({});

  const handleEditorChange = (identifier) => (data) => {
    setFormData((prev) => ({
      ...prev,
      [identifier]: data,
    }));
  };

  let imageSrc = image ? image : `/${formData.image}`;
  let coverSrc = cover ? cover : `/${formData.cover}`;

  useEffect(() => {
    if (!pageId) {
      setFormData({
        model: "page",
        sitemap: "show",
        schema: "show",
        status: 1,
      });
    }

    const fetchData = async () => {
      try {
        let response = {};
        if (pageId) {
          response = await axios.get(`/api/admin/page?id=${pageId}`);
        }

        setBlogMeta(response.data[0]);
        pageId && setFormData(response.data[0]);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [pageId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (files) {
      if (name === "image") {
        setImage(URL.createObjectURL(files[0]));
      }
      if (name === "cover") {
        setCover(URL.createObjectURL(files[0]));
      }
    }
  };

  const handleFormSubmit = async (postData, method) => {
    try {
      const apiUrl = method === "post" ? `/api/admin/page/add` : `/api/admin/page/update`;
      const response = await axios[method](apiUrl, postData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData({});
      toast.success("Submitted!");
      push("/admin/pages");
    } catch (error) {
      toast.error("Try Again.");
      console.error("Failed to update data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formsData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'image' || key === 'cover') {
        formsData.append(key, e.target.elements[key].files[0] || value);
      } else {
        formsData.append(key, value);
      }
    });

    formsData.append("status", formData?.status ? formData?.status : 1);
    formsData.set("url", "/" + slugify(formData.url.toLowerCase()));

    handleFormSubmit(formsData, formData.id ? "put" : "post");
  };

  return (
    <div className="container mx-auto h-full w-full bg-white z-50 overflow-x-auto">
      <div className="flex justify-between items-center px-8 mb-4">
        <h2 className="text-lg font-bold">
          {pageId ? "Update Page" : "Add Page"}
        </h2>
        <AiOutlineClose
          onClick={() => push("/admin/pages")}
          className="cursor-pointer text-gray-normal hover:text-gray-dark"
        />
      </div>

      <form onSubmit={handleSubmit} className="p-8">
        {/* Form fields */}
        <div className="grid grid-cols-4 gap-10">
          <div className="mb-4 w-full">
            <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor="name">
              Name*
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Name"
              required
            />
          </div>

          {/* URL, Model, Sitemap, etc. */}
          <div className="mb-4 w-full">
            <label
              className="block text-gray-dark text-sm font-bold mb-2"
              htmlFor="url"
            >
              URL*
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              placeholder="URL"
              required
            />
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="model"
              className="block text-gray-dark text-sm font-bold mb-2"
            >
              Model*
            </label>
            <select
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="page">Page</option>
              <option value="blog">Blog</option>
            </select>
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="sitemap"
              className="block text-gray-dark text-sm font-bold mb-2"
            >
              Sitemap*
            </label>
            <select
              id="sitemap"
              name="sitemap"
              value={formData.sitemap}
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="1">Show</option>
              <option value="0">Hide</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-10">
          <div className="mb-4">
            <label
              htmlFor="schema"
              className="block text-gray-dark text-sm font-bold mb-2"
            >
              Schema*
            </label>
            <select
              id="schema"
              name="schema"
              value={formData.schema}
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="show">Show</option>
              <option value="hide">Hide</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-dark text-sm font-bold mb-2"
            >
              Status*
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="1">Show</option>
              <option value="0">Hide</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-dark text-sm font-bold mb-2">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
            />
            {(image || formData.image_path) && (
              <Image
                loader={() => (image ? image : `/${formData.image_path}`)}
                src={image ? image : `/${formData.image_path}`}
                alt="image"
                width={100}
                height={100}
                className="w-24 mt-4"
              />
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="cover" className="block text-gray-dark text-sm font-bold mb-2">
              Cover
            </label>
            <input
              type="file"
              id="cover"
              name="cover"
              accept="image/*"
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
            />
            {(cover || formData.cover_path) && (
              <Image
                loader={() => (cover ? cover : `/${formData.cover_path}`)}
                src={cover ? cover : `/${formData.cover_path}`}
                alt="cover"
                width={100}
                height={100}
                className="w-24 mt-4"
              />
            )}
          </div>
        </div>

        {/* Remaining form fields */}
        <div className="mb-4">
          <label
            className="block text-gray-dark text-sm font-bold mb-2"
            htmlFor="meta_title"
          >
            Meta Title*
          </label>
          <input
            type="text"
            id="meta_title"
            name="meta_title"
            value={formData.meta_title}
            onChange={handleChange}
            className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Title"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-dark text-sm font-bold mb-2"
            htmlFor="meta_description"
          >
            Meta Description*
          </label>
          <input
            type="text"
            id="meta_description"
            name="meta_description"
            value={formData.meta_description}
            onChange={handleChange}
            className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Description"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-10">
          <div className="mb-4">
            <label
              className="block text-gray-dark text-sm font-bold mb-2"
              htmlFor="faq_title"
            >
              FAQ Title
            </label>
            <input
              type="text"
              id="faq_title"
              name="faq_title"
              value={formData.faq_title}
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              placeholder="FAQ Title"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-dark text-sm font-bold mb-2"
              htmlFor="testimonial_title"
            >
              Testimonial Title
            </label>
            <input
              type="text"
              id="testimonial_title"
              name="testimonial_title"
              value={formData.testimonial_title}
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Testimonial Title"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-dark text-sm font-bold mb-2"
            htmlFor="faq_description"
          >
            FAQ Description
          </label>
          <Editor value={formData.faq_description || ''} onChange={handleEditorChange("faq_description")} />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-dark text-sm font-bold mb-2"
            htmlFor="testimonial_description"
          >
            Testimonial Description
          </label>
          <Editor value={formData.testimonial_description || ''} onChange={handleEditorChange("testimonial_description")} />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-dark text-sm font-bold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <Editor value={formData.content || ''} onChange={handleEditorChange("content")} />
        </div>

        <button
          type="submit"
          className="bg-primary w-full hover:bg-hover text-white font-bold py-2 px-4 rounded"
        >
          {pageId ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}