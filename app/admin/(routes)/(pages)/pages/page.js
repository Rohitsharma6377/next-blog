'use client'

import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import threeDots from "../../../../../public/action.svg";
import { filterDataBySearchTerm, metaFlag } from "@/utils/helper";

import ToggleBtn from "@/components/ToggleBtn";
import MyContext from "@/context/MyContext";
import AddButton from "@/app/admin/_components/AddButton";

export default function Pages() {
  const { searchTerm, setSearchTerm } = useContext(MyContext);

  const { push } = useRouter();
  const [pages, setPages] = useState([]);

  function DataTable({ head, dataArray }) {
    const [openIndex, setOpenIndex] = useState(false);
    
    const handleActionBtns = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

    const filteredSearchData = filterDataBySearchTerm(dataArray, searchTerm);

    return (
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-light text-nowrap text-gray-normal uppercase text-sm leading-normal">
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
          {filteredSearchData.map((data, index) => (
            <tr key={index} className={`border-b border-gray-200`}>
              <td className="py-3 px-6 text-left">{index + 1}</td>
              <td className="py-3 px-6 text-left">
                Page: {data.name} <br /> URL: {data.url}
              </td>
              <td className={`${metaFlag(data.meta_title, data.meta_description) && "text-action"} py-3 px-6 text-left`}>
                Title: {data.meta_title} <br /> Desc: {data.meta_description}
              </td>
              <td className="py-3 px-6 text-left">
                {data.media_path && <Image src={`/${data.media_path}`} alt={data.image_alt} width={50} height={50} className="w-16"/>}
              </td>
              <td className="py-3 px-6 text-left">
                {data.cover_path && <Image src={`/${data.cover_path}`} alt={data.cover_alt} width={50} height={50} className="w-16"/>}
              </td>
              <td className="py-3 px-6 text-center">
                {data.faqs_count === 0 ? "" : data.faqs_count}
              </td>
              <td className="py-3 px-6 text-center">
                {data.testimonials_count === 0 ? "" : data.testimonials_count}
              </td>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                Sitemap: {`${data.sitemap === 1 ? "Show" : "Hide"}`} <br /> Schema: {data.schema} <br />{" "}
                Status: {`${data.status === 1 ? "Show" : "Hide"}`}
              </td>
              <td className="py-3 px-6 text-center">
                <ToggleBtn
                  key={index}
                  table={"pages"}
                  status={data.status}
                  id={data.id}
                  data={pages}
                  setData={setPages}
                />
              </td>
              <td
                className="py-3 px-6 text-left relative"
                onMouseEnter={() => handleActionBtns(index)}
                onMouseLeave={() => handleActionBtns(null)}
              >
                <Image
                  src={threeDots}
                  width={20}
                  height={20}
                  alt="Action Menu"
                  className={`mx-auto ${openIndex === index && "hidden"}`}
                />
                <div
                  className={`action-buttons flex flex-col py-2 px-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 absolute z-10 top-0 right-0 ${openIndex !== index && "hidden"}`}
                >
                  <button
                    onClick={() => push(`/admin/update-page/${data.id}`)}
                    className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-light"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      push(`/admin/update-faq/${data.model}/${data.id}`)
                    }
                    className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-light"
                  >
                    Edit FAQ
                  </button>
                  <button
                    onClick={() =>
                      push(`/admin/update-banner/${data.model}/${data.id}`)
                    }
                    className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-light text-nowrap"
                  >
                    Edit Banners
                  </button>
                  <button
                    onClick={() =>
                      push(`/admin/update-testimonial/${data.model}/${data.id}`)
                    }
                    className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-light text-nowrap"
                  >
                    Edit Testimonial
                  </button>
                  <button
                    onClick={() =>
                      push(`/admin/update-point/${data.model}/${data.id}`)
                    }
                    className="block text-left w-full px-4 py-2 text-sm text-black hover:bg-gray-light text-nowrap"
                  >
                    Edit Point
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  useEffect(() => {
    setSearchTerm("");
    
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/admin/page");
        setPages(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-5 px-8">
      <AddButton text={'Add Page'} onClick={() => push('/admin/add-page')} />

      <DataTable
        head={[
          "#",
          "Name|URL",
          "Meta",
          "Image",
          "Cover",
          `FAQ's`,
          "Testimonials",
          "SSS",
          "Status",
          "Action",
        ]}
        dataArray={pages}
      />
    </div>
  );
}