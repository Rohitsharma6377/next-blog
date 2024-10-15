import { MyContextProvider } from "@/context/MyContext";
import {NextUIProvider} from "@nextui-org/react";
import '@/app/globals.css'

export const metadata = {
  title: "pixel",
  description: "Read Amazing Story by Travelers!!",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>

      <body>
        <NextUIProvider>
          <MyContextProvider>
            {children}
          </MyContextProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}