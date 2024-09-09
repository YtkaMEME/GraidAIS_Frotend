import Tr from "@/components/table/tr/tr";
import style from "../../styles/table.module.css"

export default function Table({columns, data}) {
    let resultList = []
    let lensData = Object.keys(data[columns[0]]).length;
    for (let i = 0; i < lensData; i++) {
        let dataTr = []
        columns.forEach((column) => {
            let cellData = data[column][i]
            if (typeof cellData === 'string' && (cellData.startsWith('http') || cellData.startsWith('www'))) {
                cellData = `<a href="${cellData}" target="_blank">Смотреть</a>`
            }
            dataTr.push(data[column][i])

        })
        resultList.push(dataTr)
    }

    return (
        <div className={`${style.tableContainer} container mt-5 table`}>
            <table className={` ${style.table} table table-bordered mt-3 table-striped`}>
                <thead>
                    <tr>
                        {columns.map((elem) => <th>{elem}</th>)}
                    </tr>
                </thead>
                <tbody>
                {resultList.map((elem)=><Tr tdList={elem}/>)}
                </tbody>
            </table>
        </div>
    );
}

