import MainPage from "@/components/mainPage/mainPage";

async function Home (){
    async function getColumsNames() {
        const res = await fetch(`http://127.0.0.1:5000/get_colum/people`)
        return await res.json()
    }

    async function getData() {
        const res = await fetch(`http://127.0.0.1:5000/get_table/people/100`)
        return await res.json()
    }

    async function getUniqueElements(){
        const responeElements = await fetch(`http://127.0.0.1:5000/get_unique_elementss/people`)
        let result = await responeElements.json()
        return result
    }

    let columns = await getColumsNames()
    let data = await getData()
    let uniqueElementsForColum = await getUniqueElements()
    return (
        <>
            <MainPage columns={columns} data={data} uniqueFilter = {uniqueElementsForColum}/>
        </>
    );
}

export default Home;