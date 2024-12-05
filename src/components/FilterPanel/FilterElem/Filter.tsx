import React, { memo } from "react";

function Filter({columnName, id}) {

    // useEffect(() => {
    //     let parentNodeForCurrent = document.getElementById(`filterName${id}`).parentNode
    //     let allChildrens = parentNodeForCurrent.lastElementChild.childNodes
    //     allChildrens.forEach((item)=>{
    //         item.addEventListener('click', event => {
    //             let inputElem = document.getElementById(`filterName${id}`)
    //             inputElem.value = event.target.textContent;
    //         });
    //     });
    // }, []);
    return (
        <div className="container mt-5">
            <label className="form-label"
                   id={`form-label${id}`} htmlFor={`filterName${id}`}>{columnName}</label>
            <input type="text" className="inputFilter form-control" aria-expanded="false"
                   id={`filterName${id}`}
                   placeholder={`${columnName}`}
                   name={`${columnName}${id}`}/>
            {/*<div className="dropdown">*/}
            {/*    <input type="text" className="inputFilter form-control dropdown-toggle"*/}
            {/*           data-bs-toggle="dropdown" aria-expanded="false"*/}
            {/*           id={`filterName${id}`}*/}
            {/*           placeholder={`${columnName}`}*/}
            {/*           name={`${columnName}${id}`}/>*/}
            {/*    /!*<ul className="dropdown-menu" aria-labelledby="dropdownInput">*!/*/}
            {/*    /!*    {uniqueFilter.map((currentFilter) => {*!/*/}
            {/*    /!*        return (<li><a className="dropdown-item" href="#">{currentFilter}</a></li>)*!/*/}
            {/*    /!*    })}*!/*/}
            {/*    /!*</ul>*!/*/}
            {/*</div>*/}
        </div>
    );
}

export default memo(Filter)