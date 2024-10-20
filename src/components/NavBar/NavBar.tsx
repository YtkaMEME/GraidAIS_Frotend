import FilterPanel from "./FilterPanel/FilterPanel";
import style from "../../styles/NavBar.module.css"
import {useRouter} from "next/navigation";

export default function NavBar ({title, columns, handleFilterToggle, sendData,
                                    isFilterOpen, filterRef, uniqueFilter}) {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('token');  // Удаляем токен из localStorage
        router.push('/login');
    };
    return (
        <>
            <div className={`d-flex justify-content-between align-items-center ${style.head}`}>
                <h2>{title}</h2>
                <div className={'buttonBlok'}>
                    <button id="exit" className="btn btn-danger" onClick={handleLogout}>Выход</button>
                    <button id={style.filterBtn} className="btn btn-primary" onClick={handleFilterToggle}>Фильтры</button>
                </div>
            </div>
            <div id="filterPanel"
                 className={isFilterOpen ? `${style.filterPanel} ${style.active} ${style.containerForFilters}` : `${style.filterPanel}`}
                 ref={filterRef}>
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
