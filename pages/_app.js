import * as React from "react";
import "@/styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextUIProvider } from "@nextui-org/react";
import { MyContextProvider } from "@/context/MyContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Meta from "@/components/Meta";

export default function App({ Component, pageProps }) {
  const { page } = pageProps;

  return (
    <NextUIProvider>
      <MyContextProvider>
        <Meta title={page && page[0]?.meta_title} description={page && page[0]?.meta_description} />
        
        <Header />
        <Component {...pageProps} />
        <Footer />
        <ToastContainer />
      </MyContextProvider>
    </NextUIProvider>
  );
}