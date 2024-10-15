'use client'

import React, { useRef, useEffect, useContext } from "react";
import MyContext from "@/context/MyContext";

function SlidingFormWrapper({ children }) {
  const { isOpen, setIsOpen, setFormData } = useContext(MyContext);
  const slideRef = useRef(null);
  const handleClose = () => {
    setFormData({})
    setIsOpen(false)
  };

  useEffect(() => {
    if (slideRef.current) {
      if (isOpen) {
        slideRef.current.style.transform = "translateX(0)";
      } else {
        slideRef.current.style.transform = "translateX(100%)";
      }
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose}></div>}
      <div ref={slideRef} style={{ transform: "translateX(100%)", transition: "transform 0.7s ease-in-out" }} className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white shadow-lg overflow-y-auto z-50">
        {children}
      </div>
    </div>
  );
}

export default SlidingFormWrapper;