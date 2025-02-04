import React, { memo, useState, useEffect } from "react";

function Filter({ columnName, id, uniqueFilter }) {
    const [minAge, setMinAge] = useState(0);
    const [maxAge, setMaxAge] = useState(100);
    const [dropdownValues, setDropdownValues] = useState([]);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        if (uniqueFilter && uniqueFilter[columnName]) {
            setDropdownValues(uniqueFilter[columnName]);
        }
    }, [uniqueFilter, columnName]);

    const handleMinAgeChange = (event) => {
        setMinAge(event.target.value);
    };

    const handleMaxAgeChange = (event) => {
        setMaxAge(event.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    const isDropdownFilter = [
        "Пол",
        "Регион подачи (пользователя)",
        "Регион проживания",
        "Город проживания",
        "Регион подачи (из заявки)",
        "Мероприятие",
        "Часть мероприятия",
        "Направление",
        "Статус заявки",
        "Получил ли грант",
        "Маркеры участия"
    ].includes(columnName);

    if (columnName === "Возраст") {
        return (
            <div className="container mt-5">
                <label className="form-label" id={`form-label${id}`} htmlFor={`filterName${id}`}>
                    {columnName}
                </label>
                <div className="mb-3">
                    <label htmlFor={`minAge${id}`} className="form-label small">
                        От: <span>{minAge}</span>
                    </label>
                    <input
                        type="range"
                        className="form-range inputFilter"
                        id={`minAge${id}`}
                        min="0"
                        max="100"
                        value={minAge}
                        placeholder={`${columnName}MIN`}
                        onChange={handleMinAgeChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor={`maxAge${id}`} className="form-label small">
                        До: <span>{maxAge}</span>
                    </label>
                    <input
                        type="range"
                        className="form-range inputFilter"
                        id={`maxAge${id}`}
                        min="0"
                        max="100"
                        value={maxAge}
                        placeholder={`${columnName}MAX`}
                        onChange={handleMaxAgeChange}
                    />
                </div>
            </div>
        );
    }

    if (columnName === "Последнее обновление") {
        return (
            <div className="container mt-5">
                <label className="form-label" id={`form-label${id}`} htmlFor={`filterName${id}`}>
                    {columnName}
                </label>
                <div className="mb-3">
                    <label htmlFor={`startDate${id}`} className="form-label small">
                        Дата от:
                    </label>
                    <input
                        type="datetime-local"
                        className="form-control inputFilter"
                        id={`startDate${id}`}
                        placeholder={`DATESTART`}
                        value={startDate}
                        onChange={handleStartDateChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor={`endDate${id}`} className="form-label small">
                        Дата до:
                    </label>
                    <input
                        type="datetime-local"
                        className="form-control inputFilter"
                        placeholder={`DATEEND`}
                        id={`endDate${id}`}
                        value={endDate}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>
        );
    }

    if (isDropdownFilter) {
        return (
            <div className="container mt-5">
                <label className="form-label" id={`form-label${id}`} htmlFor={`dropdown${id}`}>
                    {columnName}
                </label>
                <select className="form-select" id={`dropdown${id}`} name={`${columnName}${id}`}>
                    <option value="">Выберите {columnName}</option>
                    {dropdownValues.map((value, idx) => (
                        <option key={idx} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <label className="form-label" id={`form-label${id}`} htmlFor={`filterName${id}`}>
                {columnName}
            </label>
            <input
                type="text"
                className="inputFilter form-control"
                aria-expanded="false"
                id={`filterName${id}`}
                placeholder={`${columnName}`}
                name={`${columnName}${id}`}
            />
        </div>
    );
}

export default memo(Filter);
