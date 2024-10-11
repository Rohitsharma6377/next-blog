//Navbar
export const NavItems = [
    { id: 1, name: "Home", url: "/" },
    // { id: 2, name: "Services", url: "" },
    // { id: 3, name: "Calculators", url: "" },
    // { id: 5, name: "FAQs", url: "/faq" },
    { id: 6, name: "Blogs", url: "/blogs" }
];

  
export const NavDropdownItems = {
    services: [
        { name: "New Home Loan", url: "/new-home-loan" },
        { name: "Balance Transfer of Existing Loan", url: "/balance-transfer-existing-of-loan" },
        // { name: "Loan Against Property", url: "/loan-against-property" },
        // { name: "Home Construction Loan", url: "/home-construction-loan" },
        // { name: "Home Improvement Loan", url: "/home-improvement-loan" },
        { name: "Plot Loan", url: "/plot-loan" }
    ],

    calculators: [
        { name: "EMI Calculator", url: "/emi-calculator" },
        // { name: "Eligibility Calculator", url: "/eligibility-calculator" }
    ]
};


//SideBar Menu
import { RiBloggerLine } from "react-icons/ri";
import { MdOutlineInsertPageBreak } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { RiContactsBook2Line } from "react-icons/ri";
import { RiCodeFill } from "react-icons/ri";

export const sidebarItems = [
    { name: "Contacts", icon: RiContactsBook2Line, subItems: [] },
    // { name: "Refer", icon: RiUserSettingsLine, subItems: [] },
    { name: "Meta-Tags", icon: RiCodeFill, subItems: [] },
    { name: "Users", icon: RiUserSettingsLine, subItems: [] },
    { name: "Pages", icon: MdOutlineInsertPageBreak, subItems: [] },
    {
      name: "Blogs",
      icon: RiBloggerLine,
    //   subItems: ["Blog", "Comments", "Author", "Blog-Meta"],
      subItems: ["Blog", "Author", "Blog-Meta"],
    }
];