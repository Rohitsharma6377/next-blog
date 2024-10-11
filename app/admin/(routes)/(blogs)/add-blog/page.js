'use client';

import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Select from 'react-select';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { baseUrl, fetchDataFromDB, slugify, test } from "@/utils/helper";
import React, { useState, useEffect, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import MyContext from "@/context/MyContext";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import('@/components/blocks/CKEditor'), { ssr: false });


export default function AddUpdateBlog({ blogId }) {
  const { push } = useRouter();
  
  const [file, setFile] = useState(null);
  const [blogMeta, setBlogMeta] = useState([]);
  // const [formData, setFormData] = useState({});
  const { formData, setFormData } = useContext(MyContext);

  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);
  const [authors, setAuthors] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTags, setSelectedTags] = useState(null);

  const options = (type) => (Array.isArray(type) ? type : []).map((item) => ({
    value: item.id,
    label: item.name
  }));
  
  const handleSelectChange = (identifier, setData, option) => {
    setData(option);
    setFormData((prev) => ({
      ...prev,
      [identifier]: option.map(item => item.value),
    }));
  };

  const handleEditorChange = (identifier) => (data) => {
    setFormData((prev) => ({
      ...prev,
      [identifier]: data,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(blogId ? `/api/admin/blog?id=${blogId}` : "/api/admin/blog");
        const categoryData = await fetchDataFromDB({url: `/api/admin/blogmeta?type=category`});
        const tagsData = await fetchDataFromDB({url: `/api/admin/blogmeta?type=tag`});
        const authorsData = await fetchDataFromDB({url: `/api/admin/authors`});

        setCategory(categoryData);
        setTags(tagsData);
        setAuthors(authorsData)
        setBlogMeta(response.data[0]);

        const initialValues = (idString, data, setData) => {
          if(idString) {
            const selectedIds = idString.split(",").map(Number);
    
            const initialOptions = Array.isArray(data) && data
            .filter((option) => selectedIds.includes(option.id))
            .map((option) => ({
              value: option.id,
              label: option.name,
            }));
            
            setData(initialOptions)
          }
          else {
            setData([]);
          }
        }

        blogId && setFormData(response?.data[0]);
        blogId && initialValues(response?.data[0]?.category, categoryData, setSelectedCategory);
        blogId && initialValues(response?.data[0]?.tags, tagsData, setSelectedTags);
      } 
      
      catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (files) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleFormSubmit = async (postData, method) => {
    try {
      const response = await axios[method](
        method === "post" ? `/api/admin/blog/add` : `/api/admin/blog/update`,
        postData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setFormData({});
      toast.success("Submitted!");
    } 
    
    catch (error) {
      toast.error("Try Again.");
      console.error("Failed to update data", error);
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

    formsData.set("url", "/" + slugify(Array.isArray(formData.url) ? formData.url[0] : formData.url));
    handleFormSubmit(formsData, formData.id ? "put" : "post");
    push("/admin/blog");
  };

  const src = `${baseUrl}/${formData.image_path}`;

  return (
    <div className="container w-full bg-white z-50 overflow-x-auto">
      <div className="flex justify-between items-center px-8 mb-4">
        <h2 className="text-lg font-bold">
          {blogId ? "Update Blog" : "Add Blog"}
        </h2>
        <Link href={"/admin/blog"}>
          <AiOutlineClose className="text-gray-normal hover:text-gray-dark" />
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="p-8">
        <div className="flex gap-10">
          <div className="mb-4 w-full">
            <label
              className="block text-gray-dark text-sm font-bold mb-2"
              htmlFor="title"
            >
              Title*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Title"
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label
              className="block text-gray-dark text-sm font-bold mb-2"
              htmlFor="url"
            >
              Url*
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url || ''}
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Url"
              required
            />
          </div>
        </div>

        <div className="flex gap-10">
          <div className="mb-4 w-full">
            <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor="category">
              Category*
            </label>
            <Select
              id="category"
              name="category"
              value={selectedCategory}
              onChange={(option) => handleSelectChange('category', setSelectedCategory, option)}
              options={options(category)}
              isMulti
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label
              className="block text-gray-dark text-sm font-bold mb-2"
              htmlFor="tags"
            >
              Tags*
            </label>
            <Select
              id="tags"
              name="tags"
              value={selectedTags}
              onChange={(option) => handleSelectChange('tags', setSelectedTags, option)}
              options={options(tags)}
              isMulti
              required
            />
          </div>
        </div>

        <div className="flex gap-10">
          {/* <div className="mb-4 w-full">
            <label
              className="block text-gray-dark text-sm font-bold mb-2"
              htmlFor="services"
            >
              Services*
            </label>
            <Select
              id="services"
              name="services"
              value={selectedOption}
              onChange={handleSelectChange}
              options={options}
              isMulti
              required
            />
          </div> */}

          <div className="mb-4 w-full">
            <label htmlFor="author" className="block text-gray-dark text-sm font-bold mb-2">Author*</label>
            <select 
              id="author_id" 
              name="author_id" 
              value={formData.author_id || ''} 
              onChange={handleChange} 
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline" 
              required
            > 
              <option value="">Select Author</option>
              {Array.isArray(authors) && authors.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-4 w-full">
            <label
              htmlFor="image"
              className="block text-gray-dark text-sm font-bold mb-2"
            >
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
              loader={() => (file ? file : `/${formData.media_path}`)}
              src={file ? file : `/${formData.media_path}`}
              alt="image"
              width={100}
              height={100}
              className="w-24 mb-4"
            />
          )}
        </div>

        <div className="mb-4 w-full">
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
            value={formData.meta_title || ''}
            onChange={handleChange}
            className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Title"
            required
          />
        </div>

        <div className="mb-4 w-full">
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
            value={formData.meta_description || ''}
            onChange={handleChange}
            className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Description"
            required
          />
        </div>
        
        <div className="mb-4">
          <label
            className="block text-gray-dark text-sm font-bold mb-2"
            htmlFor="content"
          >
            Blog Content*
          </label>
          <Editor value={formData.content || ''} onChange={handleEditorChange("content")} />
        </div>

        <button
          type="submit"
          className="bg-primary w-full hover:bg-hover text-white font-bold py-2 px-4 rounded"
        >
          {blogId ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}