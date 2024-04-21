"use client";
import axios from "axios";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {toast} from "react-hot-toast";
import {useRouter} from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const [email, setEmail] = useState("")
    const [username, setusername] = useState('')
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await axios.get('/api/users/me');
                setData(res.data.data._id);
                setEmail(res.data.data.email);
                setusername(res.data.data.username);
            } catch (error) {
                // Handle error
                console.error('Error fetching user details:', error);
            }
        };

        getUserDetails();

        // Cleanup function
        return () => {
            // Any cleanup code here if needed
        };
    }, []); // Empty dependency array ensures the effect runs only once after mount

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <p>Profile page</p>
            <h2 className="p-1 rounded bg-green-500"><Link href={`/profile/${data}`}>{data}
            </Link></h2>
            <h2>User Email: {email}</h2>
            <h2>Username: {username}</h2>
        <hr />
        <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >Logout</button>

            </div>
    )
}