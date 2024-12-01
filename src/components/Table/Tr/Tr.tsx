import React from "react";

export default function Tr({ tdList=[]}){
    return (
        <tr>
            {tdList.map((elem, index) => {
                if (typeof elem === 'string' && (elem.startsWith('http') || elem.startsWith('www'))) {
                    return (
                        <td key={index}>
                            <a href={elem} target="_blank" rel="noopener noreferrer">Смотреть</a>
                        </td>
                    );
                }
                return <td key={index}>{elem}</td>;
            })}
        </tr>
    );
}