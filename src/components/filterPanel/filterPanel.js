import React, { useMemo } from "react";
import Filter from "@/components/filterPanel/filterElem/filter";
import style from "../../styles/filterPanel.module.css"

export default function FilterPanel({ columns, onButtonClick, uniqueFilter }) {
    const renderedFilters = useMemo(() => {
        return columns.map((columnName, index) => (
            <Filter
                columnName={columnName}
                key={index}
                id={index}
                uniqueFilter={uniqueFilter[columnName]}
            />
        ));
    }, [columns, uniqueFilter]);

    return (
        <>
            <div className={style.HeaderBox}>
                <h4>Фильтры</h4>
            </div>
            <form>
                {renderedFilters}
            </form>
            <div className={style.buttonBox}>
                <button type="button" id="submitBTN" className="btn btn-primary" onClick={onButtonClick}>
                    Применить фильтры
                </button>
            </div>
        </>
    );
}
