import React, { useMemo } from "react";
import Filter from "./FilterElem/Filter";
import style from "../../styles/filterPanel.module.css"

export default function FilterPanel({ columns, onButtonClick}) {
    const renderedFilters = useMemo(() => {
        return columns.map((columnName, index) => (
            <Filter
                columnName={columnName}
                key={index}
                id={index}
            />
        ));
    }, [columns]);

    return (
        <>
            <div className={style.HeaderBox}>
                <h4>Фильтры</h4>
            </div>
            <form>
                <div className="container mt-5">
                    <label className="form-label"
                           id={`form-label${-1}`} htmlFor={`filterName-1`}>Поиск</label>
                    <input type="text" className="inputFilter form-control" aria-expanded="false"
                           id={`filterName-1`}
                           placeholder={`Поиск`}
                           name={`Search`}/>
                </div>
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
