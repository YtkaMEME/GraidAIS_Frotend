"use client";
import React, {useEffect, useRef, useState} from 'react';
import NavBar from "../NavBar/NavBar";
import Table from "../Table/Table";
import DownloadButton from "../DownLoadButton/downLoadButton";
import FileDropZone from "../FileDropZone/FileDropZone";
import style from "../../styles/NavBar.module.css";
import FilterPanel from "../FilterPanel/FilterPanel";
export async function getServerSideProps({ req, res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );
    return {
        props: {},
    };
}
const MainPage = ({link_url, columns, data}) => {

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDragnDropOpen, setDragnDropOpen] = useState(false);
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

    const handleDragnDropToggle = () => {
        setDragnDropOpen(!isDragnDropOpen);
    };

    const handleClickOutside = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setIsFilterOpen(false);
        }
    };

    async function sendData() {

        let allInputs = document.querySelectorAll(".inputFilter")
        allInputs.forEach((oneInput)=>{
            let value = oneInput["value"]
            let name = oneInput["placeholder"]
            if(value === "") {
                delete allFilters[name]
                return
            }
            allFilters[name] = value
        })
        setAllFilters(allFilters)
        const table_data_resp = await fetch(`${link_url}/api/receive_json/people`, {
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

    if  (isDragnDropOpen){
        return (<>
            <NavBar title={"Audience Rating"}
                    handleDragnDropToggle={handleDragnDropToggle}
                    isDragnDropOpen = {isDragnDropOpen}/>
            <FileDropZone link_url={link_url}/>
        </>);
    }
    else{
        return (
            <>
                <NavBar title={"Audience Rating"}
                        handleDragnDropToggle={handleDragnDropToggle}
                        isDragnDropOpen = {isDragnDropOpen}
                ></NavBar>
                <div className="container d-flex flex-row-reverse mb-3">
                    <button type="button" onClick={handleFilterToggle}
                            className={"btn btn-primary"}>Фильтры
                    </button>
                </div>

                <Table columns={columns} data={state_data}/>
                <div className="container d-flex flex-row-reverse mt-0">
                    <DownloadButton link_url={link_url} allFilters={allFilters}/>
                </div>
                <div id="filterPanel"
                     className={isFilterOpen ? `${style.filterPanel} ${style.active} ${style.containerForFilters}` : `${style.filterPanel}`}
                     ref={filterRef}>
                    <FilterPanel
                        columns={columns}
                        onButtonClick={sendData}
                    />
                </div>
                <div id="overlay"
                     className={isFilterOpen ? `${style.overlay} ${style.active}` : `${style.overlay}`}>
                </div>
            </>
        );
    }
}

export default MainPage;