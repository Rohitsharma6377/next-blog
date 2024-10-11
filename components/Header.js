import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Cookies from "universal-cookie";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react";
import { NavDropdownItems, NavItems } from "@/constants";
import { LiaAngleDownSolid } from "react-icons/lia";
import { verifyAuth } from "@/pages/api/auth/loginApi";

export default function App() {
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
    <Navbar className="w-full bg-white p-1" disableAnimation isBordered>
      <NavbarContent className="md:hidden" justify="start">
        <NavbarBrand>
          <Link href="/"><Image src="/images/logo.svg" alt="Logo" width={100} height={50} className="h-8"/></Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden md:flex" justify="start">
        <NavbarBrand>
          <Link href="/"><Image src="/images/logo.svg" alt="Logo" width={100} height={50} className="h-8"/></Link>
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
                <DropdownMenu aria-label="TrueLoans Services" className="w-[200px]">
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
          <Button as={Link} className="bg-secondary text-white" href="/contact-us" variant="flat">
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
                  <p className="font-semibold cursor-default">Signed in as<br/> {user.email}</p>
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
        <NavbarMenuToggle className="text-black md:hidden" />
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
  );
}




// import { useState } from 'react';
// import Link from 'next/link';
// import Image from 'next/image';

// const Header = ({ user }) => {
//     const [isMenuOpen, setIsMenuOpen] = useState(false);
//     const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
//     const [isCalculatorsDropdownOpen, setIsCalculatorsDropdownOpen] = useState(false);
//     const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

//     const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
//     const toggleServicesDropdown = () => setIsServicesDropdownOpen(!isServicesDropdownOpen);
//     const toggleCalculatorsDropdown = () => setIsCalculatorsDropdownOpen(!isCalculatorsDropdownOpen);
//     const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

//     const handleLogout = () => {
//         // Handle logout logic
//     };

//     return (
//         <header className="sticky top-0 z-50 bg-white shadow">
//             <nav className="container mx-auto flex justify-between items-center p-4">
//                 {/* Logo */}
//                 <Link href="/">
//                     <img src="/images/logo.svg" alt="Logo" className="h-8" />
//                 </Link>

//                 {/* Hamburger Menu Button (Mobile) */}
//                 <button className="lg:hidden flex items-center" onClick={toggleMenu}>
//                     <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                         {isMenuOpen ? (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                         ) : (
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
//                         )}
//                     </svg>
//                 </button>

//                 {/* Main Menu */}
//                 <div className={`lg:flex lg:space-x-4 ${isMenuOpen ? 'block' : 'hidden'} lg:block lg:relative bg-white w-full lg:w-auto`}>
//                     <div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 p-6 lg:p-0">
//                         <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>

//                         {/* Services Dropdown */}
//                         <div className="relative group">
//                             <button className="text-gray-700 hover:text-blue-600" onClick={toggleServicesDropdown}>
//                                 Services
//                             </button>
//                             {isServicesDropdownOpen && (
//                                 <div className="absolute left-0 bg-white border rounded shadow-lg">
//                                     {['New Home Loan', 'Balance Transfer of Existing Loan', 'Loan Against Property', 'Home Construction Loan', 'Home Improvement Loan', 'Plot Loan'].map(service => (
//                                         <Link href={`/${service.replace(/ /g, '')}`} key={service} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                                             {service}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Calculators Dropdown */}
//                         <div className="relative group">
//                             <button className="text-gray-700 hover:text-blue-600" onClick={toggleCalculatorsDropdown}>
//                                 Calculators
//                             </button>
//                             {isCalculatorsDropdownOpen && (
//                                 <div className="absolute left-0 mt-2 bg-white border rounded shadow-lg">
//                                     {['Emi Calculator', 'Eligibility Calculator'].map(calc => (
//                                         <Link href={`/${calc.replace(/ /g, '')}`} key={calc} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                                             {calc}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>

//                         <Link href="/faq" className="text-gray-700 hover:text-blue-600">FAQs</Link>
//                         <Link href="/blog" className="text-gray-700 hover:text-blue-600">Blogs</Link>
//                         <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact Us</Link>

//                         {/* User Dropdown */}
//                         <div className="relative group">
//                             <button className="flex items-center" onClick={toggleUserDropdown}>
//                                 {user?.role ? (
//                                     <span>{user.name}</span>
//                                 ) : (
//                                     <img src="/images/icons/user-blue.svg" alt="User Icon" className="h-8" />
//                                 )}
//                             </button>
//                             {isUserDropdownOpen && (
//                                 <div className="absolute left-0 mt-2 bg-white border rounded shadow-lg">
//                                     {user?.role ? (
//                                         <>
//                                             {user.role === 'Admin' && (
//                                                 <Link href="/admin/users" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
//                                                     Admin Panel
//                                                 </Link>
//                                             )}
//                                             <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
//                                                 Log Out
//                                             </button>
//                                         </>
//                                     ) : (
//                                         <>
//                                             <Link href="/Register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Register</Link>
//                                             <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Login</Link>
//                                         </>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//         </header>
//     );
// };

// export default Header;