"use client";
import React, {useEffect, useRef, useState} from 'react';
import NavBar from "../NavBar/NavBar";
import Table from "../Table/Table";
import DownloadButton from "../DownLoadButton/downLoadButton";
import FileDropZone from "../FileDropZone/FileDropZone";
import style from "../../styles/NavBar.module.css";
import FilterPanel from "../FilterPanel/FilterPanel";
import SamplePanel from "../SamplePanel/SamplePanel";
import styles from "../../styles/FileDropZone.module.css";
export async function getServerSideProps({res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59'
    );
    return {
        props: {},
    };
}
const MainPage = ({link_url, columns, data, uniqueFilter}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isSamplerOpen, setIsSampleOpen] = useState(false);
    const [isDragnDropOpen, setDragnDropOpen] = useState(false);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState(
        columns.reduce((acc, columnName) => {
            acc[`${columnName}`] = true;
            return acc;
        }, {})
    );
    const [loading, setLoading] = useState<boolean>(false);

    const filterRef = useRef(null);
    const SampleRef = useRef(null);

    const [allFilters, setAllFilters] = useState({})
    const [stateData, setData] = useState(data)

    const handleFilterToggle = () => {
        setIsFilterOpen(!isFilterOpen);
        const overlay = document.getElementById('overlay');
        if(isFilterOpen)
            overlay.classList.toggle('active');
        else
            overlay.classList.remove('active');

    };

    const handleSampleToggle = () => {
        setIsSampleOpen(!isSamplerOpen);
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
        if (SampleRef.current && !SampleRef.current.contains(event.target)) {
            setIsSampleOpen(false);
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

        if("ВозрастMAX" in allFilters && "ВозрастMIN" in allFilters){
            if (allFilters["ВозрастMAX"] < allFilters["ВозрастMIN"]) {
                alert(`Возраст не может быть от ${allFilters["ВозрастMIN"]} до ${allFilters["ВозрастMAX"]}\nИзмените фильтр и попробуйте снова!`)
                return;
            }
        }

        const table_data_resp = await fetch(`${link_url}/api/receive_json/people/100`, {
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

    if  (isDragnDropOpen || Object.keys(columns).length === 0 || Object.keys(data).length === 0 ||
        Object.keys(uniqueFilter).length === 0) {
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
                {loading && (
                    <div className={styles.loadingOverlay}>
                        <div className="d-flex justify-content-center align-items-center vh-100">
                            <div className="spinner-border" role="status"
                                 style={{width: '5rem', height: '5rem', color: 'white'}}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </div>
                )}
                <NavBar title={"Audience Rating"}
                        handleDragnDropToggle={handleDragnDropToggle}
                        isDragnDropOpen={isDragnDropOpen}
                ></NavBar>
                <div className="container d-flex flex-row-reverse mb-3">
                    <button type="button" onClick={handleFilterToggle}
                            className={"btn btn-primary"}>Фильтры
                    </button>
                </div>

                <Table columns={columns} data={stateData}/>

                <div className="container d-flex flex-row-reverse mt-0 gap-3">
                    <DownloadButton link_url={link_url} allFilters={allFilters} selectedCheckboxes = {selectedCheckboxes} setLoading = {setLoading}/>
                    <button type="button" onClick={handleSampleToggle} className={"btn btn-primary"}>
                        Настройка шаблона скачивания
                    </button>
                </div>

                <div id="filterPanel"
                     className={isFilterOpen ? `${style.filterPanel} ${style.active} ${style.containerForFilters}` : `${style.filterPanel}`}
                     ref={filterRef}>
                    <FilterPanel
                        columns={columns}
                        onButtonClick={sendData}
                        uniqueFilter = {uniqueFilter}
                    />
                </div>

                <div id="SamplePanel"
                     className={isSamplerOpen ? `${style.SamplePanel} ${style.active} ${style.containerForFilters}` : `${style.SamplePanel}`}
                     ref={SampleRef}>
                    <SamplePanel
                        columns={columns}
                        setSelectedCheckboxes = {setSelectedCheckboxes}
                        selectedCheckboxes = {selectedCheckboxes}
                    />
                </div>

                <div id="overlay"
                     className={isFilterOpen || isSamplerOpen? `${style.overlay} ${style.active}` : `${style.overlay}`}>
                </div>
            </>
        );
    }
}

export default MainPage;