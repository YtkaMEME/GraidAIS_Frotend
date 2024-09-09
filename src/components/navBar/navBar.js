import FilterPanel from "@/components/filterPanel/filterPanel";
import style from "../../styles/NavBar.module.css"
export default function NavBar ({title, columns, handleFilterToggle, sendData,
                                    isFilterOpen, filterRef, uniqueFilter}) {

    return (
        <>
            <div className={`d-flex justify-content-between align-items-center ${style.head}`}>
                <h2>{title}</h2>
                <button id="filterBtn" className="btn btn-primary" onClick={handleFilterToggle}>Фильтры</button>
            </div>
            <div id="filterPanel" className={isFilterOpen ? `${style.filterPanel} ${style.active} ${style.containerForFilters}` : `${style.filterPanel}`} ref={filterRef}>
                <FilterPanel
                    columns = {columns}
                    onButtonClick = {sendData}
                    uniqueFilter = {uniqueFilter}
                />
            </div>
            <div id="overlay" className={isFilterOpen ? `${style.overlay} ${style.active}` : `${style.overlay}`}></div>
        </>
    );
};
