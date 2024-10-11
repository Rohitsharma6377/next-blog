'use client'

import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Button, Avatar } from "@nextui-org/react";
import { IoNotificationsOutline } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import { CiSearch } from "react-icons/ci";

import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { verifyAuth } from "@/pages/api/auth/loginApi";
import Cookies from "universal-cookie";
import MyContext from "@/context/MyContext";

export default function Header({ pageTitle, isSidebarOpen }) {
  const { searchTerm, setSearchTerm } = useContext(MyContext);

  const cookies = new Cookies();
  const { push } = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    CheckUser();
  }, []);

  const CheckUser = async () => {
    const store = cookies.get("User");

    if (store) {
      const Response = await verifyAuth(store);
      if (Response.status == 200) {
        setUser(Response.data.user);
      } else if (Response.response.status == 401) {
        cookies.remove("User");
      }
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
      if (response) push("/");
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  };

  return (
    <div className="fixed z-20" style={{ width: isSidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 6rem)" }}>
      <header className="flex h-20 justify-between items-center text-gray-normal border-b bg-white px-8">
        <Link href={"/admin"}>
          <h1 className="lg:text-2xl text-xl mr-4 font-bold text-gray-normal">
            {pageTitle ? pageTitle : "Dashboard"}
          </h1>
        </Link>

        <div className="flex gap-4">
          <div className="flex items-center relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              className="lg:w-72 md:w-48 w-32 border bg-transparent text-black rounded-full px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
            />
            <div className="absolute right-0 px-4">
              <CiSearch size={20} />
            </div>
          </div>

          {/* Notification icon */}
          {/* <div className="flex items-center border rounded-full p-2">
            <IoNotificationsOutline size={20} />
          </div> */}

          {/* Settings icon */}
          {/* <div className="flex items-center border rounded-full p-2">
            <GoGear size={20} />
          </div> */}

          {/* {dropdownOpen && ( */}
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <div className="flex items-center justify-center gap-2">
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
                {user && (
                  <div className="hidden lg:block">
                    <p className="text-md font-medium text-black">{user.name}</p>
                    <p className="text-[10px] text-gray-normal font-medium">
                      {user.email}
                    </p>
                  </div>
                )}
              </div>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              className="py-2 px-0 rounded-md bg-white focus:outline-none"
            >
              {user && (
                <DropdownItem
                  key="profile"
                  className="block text-left w-full px-4 py-2 text-sm text-gray-dark focus:outline-none"
                >
                  <p className="font-semibold cursor-default">Signed in as</p>
                  <p className="font-semibold cursor-default">{user.email}</p>
                </DropdownItem>
              )}

              <DropdownItem
                key="logout"
                color="danger"
                className="block text-left w-full px-4 py-2 text-sm text-gray-dark hover:bg-gray-light focus:outline-none"
              >
                <button onClick={() => handleLogout()}>Log Out</button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </header>
    </div>
  );
}