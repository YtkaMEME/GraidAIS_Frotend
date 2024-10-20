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
                    const res = await fetch(`http://127.0.0.1:5000/get_colum/people`);
                    return await res.json();
                };

                const getData = async () => {
                    const res = await fetch(`http://127.0.0.1:5000/get_table/people/100`);
                    return await res.json();
                };

                const getUniqueElements = async () => {
                    const responseElements = await fetch(`http://127.0.0.1:5000/get_unique_elementss/people`);
                    return await responseElements.json();
                };

                let columnsData = await getColumsNames();
                let tableData = await getData();
                let uniqueElementsData = await getUniqueElements();

                tableData = JSON.parse(tableData)
                columnsData = JSON.parse(columnsData)
                // uniqueElementsData = JSON.parse(uniqueElementsData)

                setColumns(columnsData);
                setData(tableData);
                setUniqueFilter(uniqueElementsData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                // Отключаем загрузку после того, как все данные получены
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Условный рендеринг: отображаем заглушку, пока данные загружаются
    if (loading || !columns || !data || !uniqueFilter) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <MainPage columns={columns} data={data} uniqueFilter={uniqueFilter} />
        </>
    );
}
