"use client"
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [logoutMessage, setLogoutMessage] = useState("");
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      setLogoutMessage("Logout successful.");
      router.push('/login')
    } catch (error) {
      setLogoutMessage("An error occurred during logout.");
      console.error("Logout error:", error);
    }
  };
  const handleProfile = () =>{
    router.push('/profile')
  }

  return (
    <>
    <div className="min-h-screen">
    <nav className="w-full p-2 bg-white flex justify-between px-4 md:px-10 items-center">
        <div className="text-regal-blue text-2xl font-bold">
            HmzWebsite
        </div>
        <ul className="md:flex font-semibold hidden">
            <li className="mx-[10px] cursor-pointer hover:scale-125 transition-all ease-in hover:text-regal-blue"><Link href='/profile'>Your Profile</Link></li>
            <li className="mx-[10px] cursor-pointer hover:scale-125 transition-all ease-in hover:text-regal-blue">Contact</li>
            <li className="mx-[10px] cursor-pointer hover:scale-125 transition-all ease-in hover:text-regal-blue">Home</li>
        </ul>
        <button onClick={handleLogout} className="bg-slate-300 p-3 rounded-2xl" >
        Logout
      </button>
        <div className="md:hidden">
            <a href="#" className="text-4xl">&#8801</a>
        </div>
    </nav>
    </div>
    
     
    </>
  );
}
