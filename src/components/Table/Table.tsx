import Tr from "./Tr/Tr";
import style from "../../styles/table.module.css"

export default function Table({columns, data}) {
    let resultList = []
    for (const [key, _] of Object.entries(data[columns[0]])) {
        let dataTr = []
        columns.forEach((column:string) => {
            let cellData = data[column][key]
            if (typeof cellData === 'string' && (cellData.startsWith('http') || cellData.startsWith('www'))) {
                cellData = `<a href="${cellData}" target="_blank">Смотреть</a>`
            }
            dataTr.push(cellData)
        })
        resultList.push((dataTr))
    }

    return (
        <div className={`${style.tableContainer} container mt-0 table`}>
            <table className={` ${style.table} table table-bordered mt-0 table-striped`}>
                <thead>
                    <tr>
                        {columns.map((elem, index) => (
                            <th key={index}>{elem}</th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                {resultList.map((elem, index)=><Tr key={index} tdList={elem}/>)}
                </tbody>
            </table>
        </div>
    );
}

