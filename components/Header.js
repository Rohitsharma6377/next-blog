import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import MyContext from "@/context/MyContext";
import React, { useState, useEffect, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";
import { NavDropdownItems, NavItems } from "@/constants";
import { LiaAngleDownSolid } from "react-icons/lia";
import { verifyAuth } from "@/pages/api/auth/loginApi";

export default function App() {
  const { isOpen, openForm } = useContext(MyContext);
  const currentPath = usePathname();
  const { push } = useRouter();
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  // Fetch user data and set avatar visibility
  const CheckUser = async () => {
    const store = cookies.get("User");
    if (store) {
      const Response = await verifyAuth(store);
      if (Response.status === 200) {
        setUser(Response.data.user); // Set user data when authenticated
      } else if (Response.response.status === 401) {
        cookies.remove("User");
        setUser(null); // Clear user state on invalid token
      }
    }
  };

  // Logout and reset user state
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/auth/logout");
      if (response && currentPath !== "/") push("/");
      setUser(null);  // Clear user state on logout
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  };

  useEffect(() => {
    CheckUser();
  }, []);

  // Recheck user state when the route changes
  useEffect(() => {
    CheckUser();
  }, [currentPath]);

  return (
    <div className="w-full">
      <Navbar className="fixed md:mt-6 md:w-fit md:p-2 md:rounded-3xl mx-auto md:shadow-md" disableAnimation isBordered>
        <NavbarContent className="md:hidden" justify="start">
          <NavbarBrand>
            <Link href="/"><h1>Blog</h1></Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex" justify="start">
          <NavbarBrand>
            <Link href="/"><h1>Blog</h1></Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4" justify="center">
          {NavItems.map((item) => (
            <NavbarItem key={item.name}>
              <Dropdown>
                <DropdownTrigger>
                  <Button disableRipple className="p-0 bg-transparent data-[hover=true]:bg-transparent" radius="sm" variant="light">
                    {NavDropdownItems[item.name.toLowerCase()] ? (
                      <div className="flex items-center text-md text-gray-dark gap-1">
                        {item.name}
                        <LiaAngleDownSolid size={12} />
                      </div>
                      ) : (
                      <Link className="text-md text-gray-dark focus:outline-none" href={item.url}>
                        {item.name}
                      </Link>
                    )}
                  </Button>
                </DropdownTrigger>
                {NavDropdownItems[item.name.toLowerCase()] && (
                  <DropdownMenu aria-label="ACME features" className="w-[200px]">
                    {NavDropdownItems[item.name.toLowerCase()].map((service) => (
                      <DropdownItem key={service.name}>
                        <Link href={service.url} className="block py-1 text-gray-normal">
                            {service.name}
                        </Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </Dropdown>
            </NavbarItem>
          ))}
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem className="focus:outline-none">
            <Button onClick={openForm} as={Link} className="bg-secondary text-white" href="#" variant="flat">
              Contact Us
            </Button>
          </NavbarItem>

          {user && (
            <NavbarItem className="hidden md:flex">
              <Dropdown>
                <DropdownTrigger>
                  <div className="flex items-center gap-2">
                    <Avatar isBordered as="button" className="transition-transform focus:outline-none" color="secondary" name={user.email} size="sm" src="https://i.pravatar.cc/150?u=a042581f4e29026704d"/>
                    <LiaAngleDownSolid size={14} />
                  </div>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Profile Actions"
                  variant="flat"
                  className="py-2 px-0 rounded-md bg-white"
                >
                  <DropdownItem
                    key="profile"
                    className="block text-left w-full px-4 py-2 text-sm text-gray-dark focus:outline-none"
                  >
                    <p className="font-semibold cursor-default">Signed in as</p>
                    <p className="font-semibold cursor-default">{user.email}</p>
                  </DropdownItem>

                  {user.role !== "user" && (
                    <DropdownItem key="admin_panel" className="block text-left w-full px-4 py-1 text-sm text-gray-dark hover:bg-gray-light focus:outline-none">
                      <button onClick={() => push("/admin")}>
                        Admin Panel
                      </button>
                    </DropdownItem>
                  )}

                  <DropdownItem key="logout" color="danger" className="block text-left w-full px-4 py-1 text-sm text-gray-dark hover:bg-gray-light focus:outline-none">
                    <button onClick={handleLogout}>Log Out</button>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          )}
          <NavbarMenuToggle className="md:hidden" />
        </NavbarContent>

        <NavbarMenu className="overflow-y-auto">
          {NavItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Dropdown>
                {NavDropdownItems[item.name.toLowerCase()] ? (
                  <DropdownTrigger>
                    <Button disableRipple className="text-md text-gray-dark mr-1" radius="sm" variant="light">
                      {item.name}
                      <LiaAngleDownSolid size={12} />
                    </Button>
                  </DropdownTrigger>
                ) : (
                  <Button disableRipple className="text-md text-gray-dark mr-1" radius="sm" variant="light">
                    <Link className="text-md text-gray-dark focus:outline-none" href={item.url}>
                      {item.name}
                    </Link>
                  </Button>
                )}
                
                {NavDropdownItems[item.name.toLowerCase()] && (
                  <DropdownMenu aria-label="ACME features" className="w-[200px]">
                    {NavDropdownItems[item.name.toLowerCase()].map((service) => (
                      <DropdownItem key={service.name}>
                        <Link href={service.url} className="block py-1 text-gray-normal">
                          {service.name}
                        </Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                )}
              </Dropdown>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}