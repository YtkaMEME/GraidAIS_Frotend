import React, { memo, useState, useEffect } from "react";

function Filter({ columnName, id, uniqueFilter }) {
    const [minAge, setMinAge] = useState(18);
    const [maxAge, setMaxAge] = useState(60);
    const [dropdownValues, setDropdownValues] = useState([]);

    // Следим за изменениями uniqueElems и обновляем dropdownValues
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

    // Определяем, является ли колонка выпадающим списком
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

    // Фильтр для диапазона возраста
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

    // Если колонка является выпадающим списком
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

    // Обычный текстовый фильтр
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
