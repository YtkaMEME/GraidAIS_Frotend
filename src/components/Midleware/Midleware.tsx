import { useEffect, useState } from 'react';
import MainPage from "../MainPage/MainPage";

export default function Midleware({ link_url }) {
    const [columns, setColumns] = useState(null);
    const [data, setData] = useState(null);
    const [uniqueFilter, setUniqueFilter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const getColumsNames = async () => {
                    const res = await fetch(`${link_url}/api/get_colum/people`);
                    return await res.json();
                };

                const getData = async () => {
                    const res = await fetch(`${link_url}/api/get_table/people/100`);
                    return await res.json();
                };

                const getUniqueElements = async () => {
                    const columsDrop = [
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
                    ];

                    const responseElements = await fetch(`${link_url}/api/get_unique_elements/people`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ columsDrop })
                    });

                    return await responseElements.json();
                };

                // Запускаем все запросы параллельно
                const [columnsData, tableData, uniqueElementsData] = await Promise.all([
                    getColumsNames(),
                    getData(),
                    getUniqueElements()
                ]);

                // Преобразуем данные (если необходимо)
                setColumns(JSON.parse(columnsData));
                setData(JSON.parse(tableData));
                setUniqueFilter(uniqueElementsData);

                // После получения данных, устанавливаем состояние загрузки
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false); // В случае ошибки убираем индикатор загрузки
            }
        }

        fetchData();
    }, [link_url]);

    if (loading || !columns || !data) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border" role="status" style={{ width: '5rem', height: '5rem' }}>
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <>
            <MainPage link_url={link_url} columns={columns} data={data} uniqueFilter={uniqueFilter} />
        </>
    );
}
