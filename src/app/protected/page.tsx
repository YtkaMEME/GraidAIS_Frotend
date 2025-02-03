"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Midleware from "../../components/Midleware/Midleware";


export default function Protected(){
    const [message, setMessage] = useState('');
    const router = useRouter();
    let link_url = "audiencerating.ru"
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            axios.get(`${link_url}/api/protected`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setMessage(response.data.message);
            }).catch(error => {
                setMessage('Access denied');
                router.push('/login');
            });
        }, [router]);

    return (
        <>
            <Midleware link_url={link_url}/>
        </>
    )
}
