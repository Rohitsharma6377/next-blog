'use client'

import { useState } from "react";
import Header from "@/app/admin/_components/AdminHeader";
import SubHeader from "@/app/admin/_components/SubHeader";
import Sidebar from "@/app/admin/_components/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);

  return (
    <div className="flex">
      <Sidebar setSelectedContent={setSelectedContent} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>

      <div className="absolute right-0" style={{ width: isSidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 6rem)" }}>
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        {/* <SubHeader isSidebarOpen={isSidebarOpen} /> */}

        <div className="mt-32">
          {children}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
