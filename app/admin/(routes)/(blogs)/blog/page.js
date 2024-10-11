'use client'

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

import threeDots from "../../../../../public/action.svg";
import AddButton from "@/app/admin/_components/AddButton";
import { fetchDataFromDB } from "@/utils/helper";
import MyContext from "@/context/MyContext";

export default function Blogs() {
  const { push } = useRouter();
  const [blogMeta, setBlogMeta] = useState([]);
  const { formData, setFormData } = useContext(MyContext); // useContext for formData
  const [category, setCategory] = useState([]);
  const [tags, setTags] = useState([]);

  function DataTable({ head, dataArray }) {
    const [openIndex, setOpenIndex] = useState(false);

    const handleActionBtns = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    return (
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-light text-gray-normal uppercase text-sm leading-normal">
            {head.map(function (val, index) {
              return (
                <th key={index} className="py-3 px-6 text-left">
                  {val}
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody className="text-gray-normal text-sm font-light [&>*:nth-child(even)]:bg-gray-light">
          {dataArray.map((data, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-light">
              <td className="py-3 px-6 text-left">{index + 1}</td>
              <td className="py-3 px-6 text-left">
                {data.media_path && (
                  <Image
                    loader={() => `/${data.media_path}`}
                    src={`/${data.media_path}`}
                    alt={data.media_alt}
                    width={50}
                    height={50}
                    className="w-24"
                  />
                )}
              </td>
              <td className="py-3 px-6 text-left">
                {data.title}
              </td>
              <td className="py-3 px-6 text-left">
                Category: {data.category_name} <br /> Tag: {data.tags_name}
              </td>
              <td className="py-3 px-6 text-left">
                Title: {data.meta_title} <br /> Description: {data.meta_description}
              </td>
              <td className="py-3 px-6 text-left relative"
                onMouseEnter={() => handleActionBtns(index)}
                onMouseLeave={() => handleActionBtns(null)}>
                <Image
                  src={threeDots}
                  width={20}
                  height={20}
                  alt="Action Menu"
                  className={`mx-auto ${openIndex === index && "hidden"}`}
                />
                <div
                  className={`action-buttons flex flex-col items-center justify-center py-2 px-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 absolute z-10 top-0 right-0 ${openIndex !== index && "hidden"}`}
                >
                  <button
                    onClick={() => push(`/admin/update-blog/${data.id}`)}
                    className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-light"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => push(`/admin/update-faq/page/${data.id}`)}
                    className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-light"
                  >
                    Edit FAQ
                  </button>
                  <button
                    onClick={() =>
                      push(`/admin/update-testimonial/page/${data.id}`)
                    }
                    className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-light text-nowrap"
                  >
                    Edit Testimonial
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  // Fetch blog meta and other data
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/admin/blog");
      const categoryData = await fetchDataFromDB({ url: `/api/admin/blogmeta?type=category` });
      const tagsData = await fetchDataFromDB({ url: `/api/admin/blogmeta?type=tag` });
      setBlogMeta(response.data);
      setCategory(categoryData);
      setTags(tagsData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Rerun fetchData when formData changes
  useEffect(() => {
    fetchData();
  }, [formData]); // formData in the dependency array

  return (
    <div className="container mx-auto py-5 px-8">
      <Link href="/admin/add-blog">
        <AddButton text={'Add Blog'} />
      </Link>

      <DataTable
        head={[
          "#",
          "Image",
          "Title",
          "BlogMeta",
          "Meta",
          "Actions",
        ]}
        dataArray={blogMeta}
      />
    </div>
  );
}