"use client";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Midleware from "../../components/Midleware/Midleware";


export default function Protected(){
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    let link_url = process.env.NEXT_PUBLIC_URL_REQUEST
        useEffect(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                router.push('/login');
                return;
            }

            axios.get(`${link_url}/api/protected`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                setLoading(false);
            }).catch(error => {
                router.push('/login');
            });
        }, [router]);
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status" style={{width: '5rem', height: '5rem'}}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <>
            <Midleware link_url={link_url}/>
        </>
    )
}
