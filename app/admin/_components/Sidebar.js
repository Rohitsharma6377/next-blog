'use client'

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { usePathname, useRouter } from "next/navigation";
import { sidebarItems } from "@/constants";
import { slugify } from "@/utils/helper";

export default function Sidebar({ setSelectedContent, isSidebarOpen, setIsSidebarOpen }) {
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState(null);
  const sidebarRef = useRef(null);
  const { push } = useRouter();

  const openSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = "16rem";
      sidebarRef.current.style.transition = "width 0.5s";
      setTimeout(() => {
        setIsSidebarOpen(true);
      }, 300);
    }
  };

  const closeSidebar = () => {
    if (sidebarRef.current) {
      sidebarRef.current.style.width = "6rem";
      sidebarRef.current.style.transition = "width 0.5s";
      setIsSidebarOpen(false);
      setOpenItem(null);
    }
  };

  const toggleDropdown = (itemName) => {
    setOpenItem(openItem === itemName ? null : itemName);
  };

  const handleItemClick = (item) => {
    openSidebar();

    setTimeout(() => {
      if (item.subItems.length > 0) {
        toggleDropdown(item.name);
      } else {
        push(`/admin/${item.name.toLowerCase()}`);
      }
    }, 300);
  };

  return (
    <div ref={sidebarRef} className={`bg-white border-r ${isSidebarOpen ? "w-64" : "flex flex-col items-center"} px-8 overflow-y-auto fixed h-full z-30`}>
      <div className="flex justify-between items-center py-4">
        {isSidebarOpen ? (
          <>
            <Link href={"/"}>
              <Image src="/images/logo.svg" alt="Logo" width={100} height={50} className="h-8"/>
            </Link>
            <button onClick={closeSidebar} className="p-1 rounded-xl opacity-50 hover:opacity-80 bg-primary text-white">
              <AiOutlineClose size={20} />
            </button>
          </>
        ) : (
          <button onClick={openSidebar} className="mt-4 p-1 rounded-xl hover:bg-secondary bg-primary text-white">
            <IoIosArrowForward size={20} />
          </button>
        )}
      </div>

      <nav className="pt-4 text-black">
        <ul>
          {isSidebarOpen && (
            <h3 className="text-sm text-gray-normal mb-3">MENU</h3>
          )}

          {sidebarItems.map((item) => {
            // const isActive = pathname === `/admin/${slugify(item.name.toLowerCase())}`;  // Check if the item is active

            return (
              <li key={item.name} className={`${isSidebarOpen ? "relative mb-2" : "relative mb-3"}`}>
                <div className={`flex justify-between items-center text-md font-light hover:font-medium ${isSidebarOpen ? "hover:text-white hover:bg-primary pl-4" : "py-0"} py-3 rounded-l-full cursor-pointer rounded-xl`} onClick={() => handleItemClick(item)}>
                  <div className={`${!isSidebarOpen && "hover:text-white hover:bg-primary p-2 rounded-xl"} flex gap-3 items-center`}>
                    <item.icon className={""} size={24} />
                    {isSidebarOpen && item.name}
                  </div>
                </div>

                {openItem === item.name && (
                  <div className="relative left-8 top-2 mt-0 mb-6 w-40 bg-gray-light rounded-md overflow-hidden z-10">
                    {item.subItems.map((subItem) => {
                      const isSubActive = pathname === `/admin/${slugify(subItem.toLowerCase())}`;  // Check if the sub-item is active

                      return (
                        <Link href={`/admin/${slugify(subItem.toLowerCase())}`} key={subItem} onClick={() => setSelectedContent(subItem)} className={`block w-full text-left px-4 py-2 text-sm ${isSubActive ? "bg-primary text-white" : "text-gray-dark hover:bg-gray-light"}`}>
                          {subItem}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}