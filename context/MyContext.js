'use client'
import React, { createContext, useState } from "react";

const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  //SlidingForm
  const [isOpen, setIsOpen] = useState(false);

  const [apiData, setApiData] = useState({});
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState({});

  const openForm = () => {
    const updatedFormData = {...formData, status: formData?.status || 1, display_order: formData?.display_order || null};
    setFormData(updatedFormData);
    setIsOpen(!isOpen);
  };

  const closeForm = () => {
    setIsOpen(false);
    setFormData({});
  };

  //SearchBar
  const [searchTerm, setSearchTerm] = useState("");

  //TableRowsToShow
  const [itemsPerPage, setItemsPerPage] = useState(null);

  return (
    <MyContext.Provider
      value={{ isOpen, setIsOpen, openForm, closeForm, apiData, setApiData, formData, setFormData, file, setFile, searchTerm, setSearchTerm, itemsPerPage, setItemsPerPage }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;