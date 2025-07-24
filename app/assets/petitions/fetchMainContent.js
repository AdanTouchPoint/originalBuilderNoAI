const fetchMainContent = async (backendURLBase,id,clientId, campaignType) => {
    
    const pageData = await fetch(`${backendURLBase}/campaignContentId?clientId=${clientId}&id=${id}&type=${campaignType}`, { cache: 'no-store' })
    if (pageData.ok === false) {
        return false
    }
   
    const data = await pageData.json()
     console.log("fetchMainContent", data.data.docs[0].mainform);
    return data 
}

export {
    fetchMainContent
}
