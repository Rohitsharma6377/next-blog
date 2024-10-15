'use client'

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import Image from "next/image";
import { toast } from "react-toastify";

import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/blocks/CKEditor"), {
  ssr: false,
});

import Pagination from "@/components/blocks/Pagination";
import ToggleBtn from "@/components/blocks/ToggleBtn";
import MyContext from "@/context/MyContext";
import SlidingFormWrapper from "@/app/_components/SlidingFormWrapper";

export default function BannersTable({ model, model_id }) {
  const { searchTerm, setSearchTerm, itemsPerPage } = useContext(MyContext);
  const [image, setImage] = useState(null);
  const [mobileImage, setMobileImage] = useState(null);
  const [banners, setBanners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPageData = async (page) => {
    try {
      let response;
      if (!model_id) {
        response = await axios.get(`/api/admin/banners?page=${page}&items_per_page=${10}`);
      } else {
        response = await axios.get(`/api/admin/banners?model=${model}&model_id=${model_id}&page=${page}&items_per_page=${10}`);
      }

      setImage(null);
      setMobileImage(null);
      setBanners(response.data.banners);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  useEffect(() => {
    setSearchTerm("");
    fetchPageData(currentPage);
  }, [currentPage, itemsPerPage]);

  const openForm = () => {
    setFormData({
      status: 1,
    });
    setImage(null);
    setMobileImage(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setFormData({});
    setImage(null);
    setMobileImage(null);
    setShowForm(false);
  };

  const handleEditorChange = (identifier) => (data) => {
    setFormData((prev) => ({
      ...prev,
      [identifier]: data,
    }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (files) {
      setImage(URL.createObjectURL(files[0]));
    }
    if (files) {
      setMobileImage(URL.createObjectURL(files[0]));
    }
  };

  const handleFormSubmit = async (postData, method) => {
    try {
      const apiUrl = method === "post" ? "/api/admin/banners/add" : "/api/admin/banners/update";
      const response = await axios[method](apiUrl, postData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (formData.id) {
        setBanners((prev) =>
          prev.map((banner) =>
            banner.id === formData.id ? response.data : banner,
          ),
        );
      } else {
        setBanners((prev) => [...prev, response.data]);
      }

      toast.success("Submitted!");
      fetchPageData(currentPage);
    } catch (error) {
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

    if(formData?.id) {
      formsData.append("status", formData?.status ? formData?.status : 1);
    }
    
    if(model && model_id) {
      formsData.append("model", model);
      formsData.append("model_id", model_id);
    }

    handleFormSubmit(formsData, formData.id ? "put" : "post");
    setShowForm(false);
  };

  const DataTable = ({ head, dataArray }) => {
    const filteredData = searchTerm
      ? dataArray.filter((item) =>
          item.para.toLowerCase().includes(searchTerm.toLowerCase()),
        )
      : dataArray;

    const handleEdit = (index) => {
      const selectedEntry = banners[index];
      setImage(null);
      setMobileImage(null);
      setFormData({...selectedEntry});
      setShowForm(true);
    };

    return (
      <div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-light text-gray-normal uppercase text-sm leading-normal">
              {head.map((value, index) => <th key={index} className="py-3 px-6 text-left">{value}</th>)}
            </tr>
          </thead>
          <tbody className="text-gray-normal text-sm font-light [&>*:nth-child(even)]:bg-gray-light">
            {filteredData.map((data, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-light">
                <td className="py-3 px-6 text-left">{(currentPage - 1) * 10 + index + 1}</td>
                <td className="py-3 px-6 text-left">{data.page_name}</td>
                <td className="py-3 px-6 text-left">{data.heading}</td>
                <td className="py-3 px-6 text-left">{data.mobile_media_path && <Image src={`/${data.mobile_media_path}`} alt={data.mobile_media_alt} width={50} height={50} className="w-16"/>}</td>
                <td className="py-3 px-6 text-left">{data.media_path && <Image src={`/${data.media_path}`} alt={data.media_alt} width={50} height={50} className="w-16"/>}</td>
                <td className="py-3 px-6 text-center"><ToggleBtn key={index} table={"banners"} status={data.status} id={data.id}/></td>
                <td className="py-3 px-6 text-left"><button onClick={() => handleEdit(index)} className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded mr-2">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-center">
          <Pagination total={totalPages} initialPage={currentPage} onChange={handlePageChange}/>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-5 px-8">
      {model_id && (
        <button onClick={openForm} className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded mb-4">
          Add Point
        </button>
      )}

      {showForm && <div className="fixed py-8 right-0 top-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
        <div className="flex justify-between items-center px-8 mb-4">
          <h2 className="text-lg font-bold">
            {formData.id ? "Edit" : "Add"} Point
          </h2>
          <AiOutlineClose
            onClick={closeForm}
            className="text-gray-normal hover:text-gray-dark cursor-pointer"
          />
        </div>
        <form onSubmit={handleSubmit} className="p-8 bg-white rounded">
          <div className="mb-4">
            <label
              htmlFor="heading"
              className="block text-gray-dark text-sm font-bold mb-2"
            >
              Heading*
            </label>
            <input
              type="text"
              id="heading"
              name="heading"
              value={formData.heading}
              onChange={handleChange}
              placeholder="Heading"
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="url"
              className="block text-gray-dark text-sm font-bold mb-2"
            >
              Url*
            </label>
            <input
              type="text"
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Url"
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="display_order"
              className="block text-gray-dark text-sm font-bold mb-2"
            >
              Display Order*
            </label>
            <input
              type="number"
              id="display_order"
              name="display_order"
              value={formData.display_order}
              onChange={handleChange}
              placeholder="Display Order"
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4 w-full">
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
            <label
              className="block text-gray-dark text-sm font-bold mb-2"
              htmlFor="text"
            >
              Text*
            </label>
            <Editor
              value={formData.text}
              onChange={handleEditorChange("text")}
            />
          </div>
          <div className="mb-4">
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
          <div className="mb-4">
            {(file || formData.media_path) && (
              <Image
                src={file ? file : `/${formData.media_path}`}
                alt="image"
                width={100}
                height={100}
                className="w-24"
              />
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="mobile_image"
              className="block text-gray-dark text-sm font-bold mb-2"
            >
              Mobile Image*
            </label>
            <input
              type="file"
              id="mobile_image"
              name="mobile_image"
              accept="image/*"
              onChange={handleChange}
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              required={!formData.mobile_media_path}
            />
          </div>
          <div className="mb-4">
            {(file || formData.mobile_media_path) && (
              <Image
                src={file ? file : `/${formData.mobile_media_path}`}
                alt="image"
                width={100}
                height={100}
                className="w-24"
              />
            )}
          </div>
          <button
            type="submit"
            className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded w-full"
          >
            {formData.id ? "Update" : "Submit"}
          </button>
        </form>
      </div>}

      <DataTable head={["#", "Page Name", "Heading", "Image", "Mobile Image", "Status", "Action"]} dataArray={banners}/>
    </div>
  );
}










// 'use client'

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { AiOutlineClose } from "react-icons/ai";
// import Image from "next/image";

// import dynamic from "next/dynamic";
// const Editor = dynamic(() => import('@/components/blocks/CKEditor'), { ssr: false });

// import { toast } from "react-toastify";
// import AddButton from "@/app/admin/_components/AddButton";

// function DataTable({ head, dataArray, handleEdit }) {
//   return (
//     <table className="w-full table-auto">
//       <thead>
//         <tr className="bg-gray-light text-gray-normal uppercase text-sm leading-normal">
//           {head.map((value, index) => (
//             <th key={index} className="py-3 px-6 text-left">
//               {value}
//             </th>
//           ))}
//         </tr>
//       </thead>

//       <tbody className="text-gray-normal text-sm font-light [&>*:nth-child(even)]:bg-gray-light">
//         {dataArray.map((data, index) => (
//           <tr
//             key={index}
//             className="border-b border-gray-200 hover:bg-gray-light"
//           >
//             <td className="py-3 px-6 text-left">{index + 1}</td>
//             <td className="py-3 px-6 text-left whitespace-nowrap">
//               {data.url}
//             </td>
//             <td className="py-3 px-6 text-left">{data.text}</td>
//             <td className="py-3 px-6 text-left">
//               {data.image && (
//                 <Image
//                   loader={() =>
//                     `${process.env.NEXT_PUBLIC_BASE_URL}/${data.image}`
//                   }
//                   src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.image}`}
//                   alt="image"
//                   width={50}
//                   height={50}
//                   className="w-24"
//                 />
//               )}
//             </td>
//             <td className="py-3 px-6 text-left">
//               {data.mobile_image && (
//                 <Image
//                   loader={() =>
//                     `${process.env.NEXT_PUBLIC_BASE_URL}/${data.mobile_image}`
//                   }
//                   src={`${process.env.NEXT_PUBLIC_BASE_URL}/${data.mobile_image}`}
//                   alt="mobile image"
//                   width={50}
//                   height={50}
//                   className="w-24"
//                 />
//               )}
//             </td>
//             <td className="py-3 px-6 text-left">{data.status}</td>
//             <td className="py-3 px-6 text-left">
//               <button
//                 onClick={() => handleEdit(index)}
//                 className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded mr-2"
//               >
//                 Edit
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }


// export default function Banners() {
//   const [file, setFile] = useState({
//     image: null,
//     mobile_image: null,
//   });
//   const [clients, setClients] = useState([]);
//   const [formData, setFormData] = useState({
//     model_type: "",
//     model: "",
//     status: "",
//     display_order: "",
//     image: null,
//     mobile_image: null,
//     url: "",
//     heading: "",
//     text: "",
//   });
//   const [showForm, setShowForm] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/api/admin/banners");
//         setClients(response.data);
//       } catch (error) {
//         console.error("Error fetching data: ", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const openForm = () => {
//     setShowForm(true);
//   };

//   const closeForm = () => {
//     setFormData({
//       model_type: "",
//       model: "",
//       status: "",
//       display_order: "",
//       image: null,
//       mobile_image: null,
//       url: "",
//       heading: "",
//       text: "",
//     });

//     setShowForm(false);
//   };

//   const handleEdit = (index) => {
//     const selectedBlogEntry = clients[index];

//     setFile(null);

//     setFormData({
//       id: selectedBlogEntry.id,
//       model_type: selectedBlogEntry.model_type,
//       model: selectedBlogEntry.model,
//       status: selectedBlogEntry.status,
//       display_order: selectedBlogEntry.display_order,
//       image: selectedBlogEntry.image,
//       mobile_image: selectedBlogEntry.mobile_image,
//       url: selectedBlogEntry.url,
//       heading: selectedBlogEntry.heading,
//       text: selectedBlogEntry.text,
//     });

//     setShowForm(true);
//   };

//   const handleEditorChange = (identifier) => (data) => {
//     setFormData((prev) => ({
//       ...prev,
//       [identifier]: data,
//     }));
//   };

//   let imageSrc = `${process.env.NEXT_PUBLIC_BASE_URL}/${formData.image}`;
//   let mobileImageSrc = `${process.env.NEXT_PUBLIC_BASE_URL}/${formData.mobile_image}`;

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value,
//     }));

//     if (files) {
//       setFile((prevState) => ({
//         ...prevState,
//         [name]: URL.createObjectURL(e.target.files[0]),
//       }));
//     }
//   };

//   const handleFormSubmit = async (postData, method) => {
//     try {
//       const apiUrl = method === 'post' ? '/api/admin/banners/add' : '/api/admin/banners/update';
//       const response = await axios[method](apiUrl, postData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       if (formData.id) {
//         setClients((clients) => {
//           const updatedData = [...clients];
//           const index = updatedData.findIndex(
//             (meta) => meta.id === formData.id,
//           );
//           updatedData[index] = response.data.data;
//           return updatedData;
//         });
//       } else {
//         setClients((clients) => [...clients, response.data.data]);
//       }

//       setFormData({
//         model_type: "",
//         model: "",
//         status: "",
//         display_order: "",
//         image: null,
//         mobile_image: null,
//         url: "",
//         heading: "",
//         text: "",
//       });

//       toast.success("Submitted!");
//     } catch (error) {
//       toast.error("Try Again.");
//       console.error("Failed to update data", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formsData = new FormData();

//     if (formData.id) {
//       formsData.append("id", formData.id);
//     }

//     formsData.append("model_type", formData.model_type);
//     formsData.append("model", formData.model);
//     formsData.append("status", formData.status);
//     formsData.append(
//       "display_order",
//       formData.display_order ? formData.display_order : null,
//     );
//     formsData.append(
//       "image",
//       e.target.elements.image.files[0]
//         ? e.target.elements.image.files[0]
//         : formData.image,
//     );
//     formsData.append(
//       "mobile_image",
//       e.target.elements.mobile_image.files[0]
//         ? e.target.elements.mobile_image.files[0]
//         : formData.mobile_image,
//     );
//     formsData.append("url", formData.url);
//     formsData.append("heading", formData.heading);
//     formsData.append("text", formData.text);

//     handleFormSubmit(formsData, formData.id ? "put" : "post");
//     setShowForm(false);
//   };

//   const src = `${process.env.NEXT_PUBLIC_BASE_URL}/${formData.image}`;

//   return (
//     <div className="container mx-auto py-5 px-8">
//       <AddButton text={'Add Banner'} onClick={openForm} />

//       {showForm && (
//         <div className="fixed py-10 top-0 right-0 h-full w-1/3 bg-white shadow-lg z-50 overflow-y-auto">
//           <div className="flex justify-between items-center px-8 mb-4">
//             <h2 className="text-lg font-bold">
//               {formData.id ? "Update Banner" : "Add Banner"}
//             </h2>
//             <AiOutlineClose
//               onClick={closeForm}
//               className="text-gray-normal hover:text-gray-dark"
//             />
//           </div>

//           <form onSubmit={handleSubmit} className="p-8 bg-white rounded">
//             <div className="mb-4">
//               <label
//                 htmlFor="model_type"
//                 className="block text-gray-dark text-sm font-bold mb-2"
//               >
//                 Model Type*
//               </label>
//               <select
//                 id="model_type"
//                 name="model_type"
//                 value={formData.model_type}
//                 onChange={handleChange}
//                 className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               >
                
//                 <option value="show">Show</option>
//                 <option value="hide">Hide</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="model"
//                 className="block text-gray-dark text-sm font-bold mb-2"
//               >
//                 Model*
//               </label>
//               <select
//                 id="model"
//                 name="model"
//                 value={formData.model}
//                 onChange={handleChange}
//                 className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               >
//                 <option value="">Select Model</option>
//                 <option value="page">Page</option>
//                 <option value="blog">Blog</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="status"
//                 className="block text-gray-dark text-sm font-bold mb-2"
//               >
//                 Status*
//               </label>
//               <select
//                 id="status"
//                 name="status"
//                 value={formData.status}
//                 onChange={handleChange}
//                 className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               >
                
//                 <option value="0">Show</option>
//                 <option value="1">Hide</option>
//               </select>
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="display_order"
//                 className="block text-gray-dark text-sm font-bold mb-2"
//               >
//                 Display Order
//               </label>
//               <input
//                 type="text"
//                 id="display_order"
//                 name="display_order"
//                 value={formData.display_order}
//                 onChange={handleChange}
//                 placeholder="Display Order"
//                 className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="image"
//                 className="block text-gray-dark text-sm font-bold mb-2"
//               >
//                 Image*
//               </label>
//               <input
//                 type="file"
//                 id="image"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             {(file.image || formData.image) && (
//               <Image
//                 loader={() => (file.image ? file.image : imageSrc)}
//                 src={file.image ? file.image : imageSrc}
//                 alt="image"
//                 width={100}
//                 height={100}
//                 className="w-24"
//               />
//             )}

//             <div className="mb-4">
//               <label
//                 htmlFor="mobile_image"
//                 className="block text-gray-dark text-sm font-bold mb-2"
//               >
//                 Mobile Image*
//               </label>
//               <input
//                 type="file"
//                 id="mobile_image"
//                 name="mobile_image"
//                 accept="image/*"
//                 onChange={handleChange}
//                 className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
//               />
//             </div>
//             {(file.mobile_image || formData.mobile_image) && (
//               <Image
//                 loader={() =>
//                   file.mobile_image ? file.mobile_image : mobileImageSrc
//                 }
//                 src={file.mobile_image ? file.mobile_image : mobileImageSrc}
//                 alt="mobile image"
//                 width={100}
//                 height={100}
//                 className="w-24"
//               />
//             )}

//             <div className="mb-4">
//               <label
//                 htmlFor="url"
//                 className="block text-gray-dark text-sm font-bold mb-2"
//               >
//                 URL*
//               </label>
//               <input
//                 type="text"
//                 id="url"
//                 name="url"
//                 value={formData.url}
//                 onChange={handleChange}
//                 placeholder="URL"
//                 className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label
//                 htmlFor="heading"
//                 className="block text-gray-dark text-sm font-bold mb-2"
//               >
//                 Heading*
//               </label>
//               <input
//                 type="text"
//                 id="heading"
//                 name="heading"
//                 value={formData.heading}
//                 onChange={handleChange}
//                 placeholder="Heading"
//                 className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>

//             <div className="mb-4">
//               <label
//                 className="block text-gray-dark text-sm font-bold mb-2"
//                 htmlFor="text"
//               >
//                 Text*
//               </label>
//               {/* <Editor value={formData.text} onChange={handleEditorChange("text")} /> */}
//             </div>

//             <button
//               type="submit"
//               className="bg-primary hover:bg-hover text-white font-bold py-2 px-4 rounded w-full"
//             >
//               {formData.id ? "Update" : "Submit"}
//             </button>
//           </form>
//         </div>
//       )}

//       {/* Display client data */}
//       <DataTable
//         head={["#", "URL", "Text", "Image", "Mobile Image", "Status", "Action"]}
//         dataArray={clients}
//         handleEdit={handleEdit}
//       />
//     </div>
//   );
// }