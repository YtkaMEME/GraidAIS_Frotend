import { useEffect, useState, useMemo } from 'react';
import MainPage from "../MainPage/MainPage";
import {json} from "node:stream/consumers";

export default function Midleware() {
    const [columns, setColumns] = useState(null); // Изначально null
    const [data, setData] = useState(null); // Изначально null
    const [uniqueFilter, setUniqueFilter] = useState(null); // Изначально null
    const [loading, setLoading] = useState(true); // Изначально true

    useEffect(() => {
        async function fetchData() {
            try {
                const getColumsNames = async () => {
                    const res = await fetch(`https://audiencerating.ru/api/get_colum/people`);
                    return await res.json();
                };

                const getData = async () => {
                    const res = await fetch(`https://audiencerating.ru/api/get_table/people/100`);
                    return await res.json();
                };

                const getUniqueElements = async () => {
                    const responseElements = await fetch(`https://audiencerating.ru/api/get_unique_elementss/people`);
                    return await responseElements.json();
                };

                let columnsData = await getColumsNames();
                let tableData = await getData();
                let uniqueElementsData = await getUniqueElements();

                tableData = JSON.parse(tableData)
                columnsData = JSON.parse(columnsData)

                setColumns(columnsData);
                setData(tableData);
                setUniqueFilter(uniqueElementsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);


    if (loading || !columns || !data || !uniqueFilter) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status" style={{ width: '5rem', height: '5rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <>
            <MainPage columns={columns} data={data} uniqueFilter={uniqueFilter}/>
        </>
    );
}
