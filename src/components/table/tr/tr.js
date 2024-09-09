import React from "react";

export default function Tr({ tdList=[]}){
    return (
        <tr>
            {tdList.map((elem)=>{
                if (typeof elem === 'string' && (elem.startsWith('http') || elem.startsWith('www'))) {
                    return(<td>
                            <a href={elem} target="_blank">Смотреть</a>
                           </td>)
                }
                return(<td>{elem}</td>);
            })}
        </tr>
    );
}