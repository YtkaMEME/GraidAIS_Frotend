import React from "react";
import style from "../../../styles/table.module.css";

export default function Tr({ tdList = [] }) {
    return (
        <tr>
            {tdList.map((elem, index) => {
                if (typeof elem === 'string') {
                    return (
                        <td key={index} title={elem} className={style.ellipsis}>
                            {elem}
                        </td>
                    );
                }
                return <td key={index}>{elem}</td>;
            })}
        </tr>
    );
}
