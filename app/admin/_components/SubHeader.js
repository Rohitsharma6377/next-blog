'use client'

import { useContext, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { LuLayoutList } from "react-icons/lu";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Button,
  Avatar,
} from "@nextui-org/react";
import MyContext from "@/context/MyContext";

const values = [10, 25, 50, 100];

export default function SubHeader({ isSidebarOpen }) {
  // const sidebarItems = [
  //   { name: 'Blogs', icon: RiBloggerLine, subItems: ['Blog', 'Comments', 'Author', 'Blog Meta'] },
  //   { name: 'Pages', icon: MdOutlineInsertPageBreak, subItems: ['Pages', 'FAQ', 'Testimonials', 'Meta-Tags', 'Clients', 'Banners', 'Contacts', 'Teams', 'Subscribers', 'Careers', 'Services', 'Points'] },
  //   { name: 'Users', icon: RiUserSettingsLine, subItems: [] },
  //   { name: 'Home', icon: GoHome, subItems: [] },
  // ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const { itemsPerPage, setItemsPerPage } = useContext(MyContext);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="fixed z-10 bg-white top-20"
      style={{
        width: isSidebarOpen ? "calc(100% - 16rem)" : "calc(100% - 6rem)",
      }}
    >
      <div className="flex gap-5 border-b pt-6 text-gray-normal px-8">
        <h3 className="text-blue-900 font-medium border-b-4 border-blue-900 pb-5">
          Request
        </h3>
        <h3>Calender</h3>
        <h3>Blocked Days</h3>
      </div>

      {/* Dropdown */}
      <div className="flex justify-end gap-1 py-6 px-8">
        <Dropdown className="focus:outline-none">
          <DropdownTrigger className="focus:outline-none">
            <Button
              onClick={toggleDropdown}
              variant="light"
              className="bg-transparent border text-gray-normal text-sm py-2 px-4 rounded-full inline-flex items-center focus:outline-none rou"
            >
              <LuLayoutList size={18} />
              {itemsPerPage ? itemsPerPage : "Show"}
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </DropdownTrigger>
          <DropdownMenu className="w-24 py-2 px-0 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            {values.map((val, index) => (
              <DropdownItem
                onPress={() => setItemsPerPage(values[index])}
                key={index}
                className="relative block text-left w-full px-4 py-2 text-sm text-gray-dark hover:bg-gray-light focus:outline-none"
              >
                {val.toString()}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        {/* <div className="relative inline-block"> */}

        {/* {isOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => handleCitySelection(city)}
                          className="block text-left w-full px-4 py-2 text-sm text-gray-dark hover:bg-gray-light"
                          role="menuitem"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                )} */}
        {/* </div> */}
        {/* 
          <div className='flex items-center gap-1 border text-gray-normal py-2 px-4 rounded-full'>
            <RxDashboard />
            <h3 className='text-sm'>Sort</h3>
          </div> */}
      </div>
    </div>
  );
}
