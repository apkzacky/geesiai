// 'use client'
// import { Inter } from "next/font/google";
import NavBar from '../app/component/NavBar'
import './globals.css'
import { AuthContextProvider } from "./context/AuthContext";
import { cookies } from "next/headers";
// const inter = Inter({ subsets: ["latin"] });
import favicon from '../../public/icon.ico'
export const metadata = {
  title: "Geesi AI",
  description: "Geesi AI | Study smart not hard",
};

export default function RootLayout({ children }) {
  const cookieStore = cookies()
  const authToken = cookieStore.get('authToken')
  return (
    <html lang="en" data-theme="dark" className="bg-[#000]">
      <head>
        <link rel="icon" href={favicon.src} type="image/x-icon" />
      </head>
      <body
        style={{ fontFamily: 'sans-serif' }}
      // className='font-extrabold'
      >
        <AuthContextProvider authTokens={`${authToken == undefined || authToken == null || authToken == "" ? "" : authToken.value}`}>

          <NavBar />
          {children}






        </AuthContextProvider>

      </body>
    </html>
  );
}
