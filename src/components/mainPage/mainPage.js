"use client";
import React, {useEffect, useRef, useState} from 'react';
import NavBar from "@/components/navBar/navBar";
import Table from "@/components/table/table";
import DownloadButton from "@/components/DownLoadButton/downLoadButton";
export async function getServerSideProps({ req, res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );
    return {
        props: {},
    };
}
const MainPage = ({columns, data, uniqueFilter}) => {

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);

    const [allFilters, setAllFilters] = useState({})

    const [state_data, setData] = useState(data)

    const handleFilterToggle = () => {
        setIsFilterOpen(!isFilterOpen);
        const overlay = document.getElementById('overlay');
        if(isFilterOpen)
            overlay.classList.toggle('active');
        else
            overlay.classList.remove('active');

    };

    const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setIsFilterOpen(false);
        }
    };

    async function sendData() {

        let allInputs = document.querySelectorAll(".inputFilter")
        allInputs.forEach((oneInput)=>{
            let value = oneInput.value
            let name = oneInput.placeholder
            if(value === "") {
                delete allFilters[name]
                return
            }
            allFilters[name] = value
        })
        setAllFilters(allFilters)
        const table_data_resp = await fetch('http://127.0.0.1:5000/receive_json/people', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({allFilters})
        });
        const tableData = await table_data_resp.json();
        if(Object.keys(tableData["table"]) .length !== 0) {
            setData(tableData["table"])
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    // const handleChangeFilter = (e) =>{
    //     const target = e.target;
    //     changeFilterFromInput(target)
    // }
    //
    // function changeFilterFromInput(inputElem) {
    //     console.log("Hi")
    //     let value = inputElem.value
    //     let name = inputElem.placeholder
    //     allFilters[name] = value
    //     if(!value)
    //         delete allFilters[name]
    //
    //     setAllFilters(allFilters)
    // }

    return (
        <>
            <NavBar title={"Имя таблицы"} columns = {columns}
                    handleFilterToggle = {handleFilterToggle}
                    filterRef = {filterRef}
                    sendData = {sendData} isFilterOpen = {isFilterOpen}
                    allFilters = {allFilters} uniqueFilter = {uniqueFilter}
            ></NavBar>
            <Table columns={columns} data={state_data}/>
            <div className="d-flex flex-row-reverse m-5 mb-0">
                <DownloadButton allFilters = {allFilters}/>
            </div>
        </>
    );
}

export default MainPage;