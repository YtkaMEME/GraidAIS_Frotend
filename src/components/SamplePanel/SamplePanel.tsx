import React, { useState, useMemo } from "react";
import style from "../../styles/SamplePanel.module.css";

export default function SamplePanel({ columns, setSelectedCheckboxes, selectedCheckboxes}) {
    const selectAll = () => {
        const updatedCheckboxes = {};
        columns.forEach((columnName) => {
            updatedCheckboxes[`${columnName}`] = true;
        });
        setSelectedCheckboxes(updatedCheckboxes);
    };

    const resetAll = () => {
        const updatedCheckboxes = {};
        columns.forEach((columnName) => {
            updatedCheckboxes[`${columnName}`] = false;
        });
        setSelectedCheckboxes(updatedCheckboxes);
    };

    const handleCheckboxChange = (columnKey) => {
        setSelectedCheckboxes((prevState) => ({
            ...prevState,
            [columnKey]: !prevState[columnKey]
        }));
    };

    const renderedColumElem = useMemo(() => {
        return columns.map((columnName, index) => {
            const columnKey = `${columnName}`;
            return (
                <div key={index} className={`${style.custom_checkbox} d-flex align-items-center mb-2`}>
                    <input
                        type="checkbox"
                        id={`checkbox${index}`}
                        checked={selectedCheckboxes[columnKey]}
                        onChange={() => handleCheckboxChange(columnKey)}
                        className="checkbox-item"
                    />
                    <label htmlFor={`checkbox${index}`}>{columnName}</label>
                </div>
            );
        });
    }, [columns, selectedCheckboxes]);

    return (
        <>
            <div className={`${style.HeaderBox} d-flex flex-column align-items-center pb-3`}>
                <h4>Настройка Шаблона</h4>
                <div className="container d-flex flex-row mt-0 gap-3 justify-content-center">
                    <button className={`btn btn-outline-primary ${style.btn_custom}`} onClick={selectAll}>
                        Выбрать все
                    </button>
                    <button className={`btn btn-outline-danger ${style.btn_custom}`} onClick={resetAll}>
                        Очистить
                    </button>
                </div>
            </div>
            <div className="container mt-4">
                <div className={style.checkbox_panel}>
                    {renderedColumElem}
                </div>
            </div>
        </>
    );
}
