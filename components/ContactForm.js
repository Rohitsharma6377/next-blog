import React, { useState, useRef, useEffect, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import MyContext from "@/context/MyContext";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react"; // Import NextUI components

function ContactForm() {
  const { isOpen, setIsOpen } = useContext(MyContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false); // State to manage loading
  const slideRef = useRef(null);

  const handleClose = () => setIsOpen(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted

    try {
      const response = await axios.post("/api/admin/contacts", formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      toast.success("Form Submitted!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to submit!");
      console.error("Error submitting contact form:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
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
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleClose}></div>
      )}
      <div
        ref={slideRef}
        style={{ transform: "translateX(100%)", transition: "transform 0.7s ease-in-out" }}
        className="fixed right-0 top-0 h-full w-full md:w-1/3 bg-white shadow-lg overflow-y-auto z-50"
      >
        <div className="bg-gray-light flex justify-between items-center py-3 px-4">
          <h2 className="text-lg text-black font-semibold">Get a Home Loan!</h2>
          <AiOutlineClose onClick={handleClose} className="text-gray-dark cursor-pointer" />
        </div>
        <form onSubmit={handleSubmit} className="py-8 px-4">
          <div className="mb-4">
            <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor="name">
              Full Name*
            </label>
            <input
              className="appearance-none border w-full py-3 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor="email">
              Email*
            </label>
            <input
              className="appearance-none border w-full py-3 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor="phone">
              Phone*
            </label>
            <input
              className="appearance-none border w-full py-3 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-dark text-sm font-bold mb-2" htmlFor="message">
              Message*
            </label>
            <textarea
              className="appearance-none border w-full py-3 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Please tell us a little about your requirement"
              rows={5}
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            color="secondary"
            auto
            disabled={loading} // Disable button when loading
          >
            {loading ? <Spinner size="sm" /> : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;