"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, seterrorMsg] = useState("")

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/");
    } catch (error:any) {
      console.log(error.response.data.error);
      seterrorMsg(error.response.data.error)
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl font-bold text-black">
        {loading ? "Processing" : "Login"}
      </h1>
      <hr className="border-black w-[20%] mb-12 mt-4" />
      <div className="bg-slate-200 rounded-xl flex flex-col gap-2 p-8 min-w-[20vw]">
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />
      {errorMsg && 
      <div>
        {errorMsg}
      </div>
      }
      <button
        onClick={onLogin}
        disabled={buttonDisabled}
        className="p-2 border border-gray-300 rounded-lg mb-4 disabled:cursor-not-allowed focus:outline-none focus:border-gray-600"
      >
        {loading ? "Processing" : "Login"}
      </button>
      <Link href="/signup" className="text-blue-500 text-center">
        Visit Signup page
      </Link>
      </div>
    </div>
  );
}