import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Switch, cn } from "@nextui-org/react";

const ToggleBtn = ({ table, status, id, data, setData }) => {
  const [isChecked, setIsChecked] = useState(status);

  useEffect(() => {
    setIsChecked(status);
  }, [status]);

  const handleChange = async () => {
    const newStatus = !isChecked;
    setIsChecked(newStatus);

    // Convert the boolean value to 1 or 0
    const numericStatus = newStatus ? 1 : 0;

    // Optimistically update the local state
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, status: numericStatus } : item
    );
    setData(updatedData);

    try {
      await axios.put("/api/admin/change-status", { table, status: numericStatus, id });
      toast.success("Status Updated!");
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status. Try again.");

      // Revert the state on error
      const revertedData = data.map((item) =>
        item.id === id ? { ...item, status: status ? 1 : 0 } : item
      );
      setData(revertedData);
      setIsChecked(status);
    }
  };

  return (
    <Switch
      isSelected={isChecked}
      onChange={handleChange}
      classNames={{
        wrapper: "p-0 h-4 overflow-visible bg-neutral-300 group-data-[selected=true]:bg-green-500",
        thumb: cn(
          "w-6 h-6 border-2 shadow-lg",
          "group-data-[hover=true]:border-green-500",
          "group-data-[selected=true]:ml-6",
          "group-data-[pressed=true]:w-7",
          "group-data-[selected]:group-data-[pressed]:ml-4"
        ),
      }}
    ></Switch>
  );
};

export default ToggleBtn;