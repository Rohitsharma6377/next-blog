import Image from "next/image";
import React, { useState } from "react";
import { ForgotPass } from "@/pages/api/auth/loginApi";
import { toast } from "react-toastify";
import { fetchDataFromDB } from "@/utils/helper";

export default function ForgotPage() {
  const [ForgotData, SetData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async () => {
    try {
      const response = await ForgotPass({ email: ForgotData.email });

      if (response.status == 200) {
        toast.success("Reset Password Link Successfull Send");
      } else if (response.status !== 200) {
        toast.error("Invalid Email Address");
      }
    } catch (error) {
      // console.log("Sending Link", error.message);
    }
  };
  return (
    <div>
      <div className="py-5 px-8 mt-28 mb-28 flex flex-col items-center justify-center">
        <Image src="/images/logo.svg" alt="Logo" width={100} height={50} className="h-10 mb-6"/>

        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-dark text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="appearance-none border w-full py-2 px-3 text-gray-dark leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Your Email"
              value={ForgotData.email}
              onChange={(e) => {
                SetData({ ...ForgotData, [e.target.name]: e.target.value });
              }}
            />
          </div>
          <div className="mb-6">
            <button
              type="button"
              className="bg-primary w-full hover:bg-hover text-white font-bold py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}



export async function getServerSideProps(context) {
  const { req } = await context;
  const pageUrl = `${req.url}`;
  
  let page;
  try {
    page = await fetchDataFromDB({url: `/api/user/page?url=${pageUrl}`});
  }
  catch (err) {
    console.error("Error fetching data:", err);
  }
  
  return { props: { page: page || [] } };
}