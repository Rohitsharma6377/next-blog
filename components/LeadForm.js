import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Spinner } from "@nextui-org/react"; // Import NextUI components

function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false); // State for loading

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true on submit

    try {
      const response = await axios.post("/api/admin/contacts", formData);

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

      toast.success("Form Submitted!");
    } catch (error) {
      toast.error("Failed to submit!");
      console.error("Error submitting contact form:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Apply for Loan</h3>
      <form onSubmit={handleSubmit} className="h-full w-full max-w-md mx-auto p-4">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Your Name *"
            className="form-control w-full p-2 border rounded"
            required
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Your Email *"
            className="form-control w-full p-2 border rounded"
            required
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            placeholder="Mobile Number *"
            className="form-control w-full p-2 border rounded"
            required
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="form-control w-full p-2 border rounded resize-none"
            placeholder="Please tell us a little about your requirement *"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5} // Ensures it shows 5 rows
            required
          ></textarea>
        </div>
        <Button
          type="submit"
          className="w-full"
          color="primary"
          auto
          disabled={loading} // Disable button when loading
        >
          {loading ? <Spinner size="sm" /> : "Submit"}
        </Button>
      </form>
    </div>
  );
}

export default LeadForm;