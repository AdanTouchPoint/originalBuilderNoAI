import { fetchData } from "./fetchData";

const fetchRepresentatives = async (petitionMethod, backendURLBase, endpoint, clientId, params = '', setAllDataIn) => {
    const datos = await fetchData(petitionMethod, backendURLBase, endpoint, clientId, params)
    const data = datos.data
    const arr  = []
    for (let index = 0; index < data.length; index++) {
        const element = data[index].email;
        arr.push(element)
    }
    setAllDataIn(arr)
}

export{
    fetchRepresentatives
}
