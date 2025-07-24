const fetchRepresentatives = async (
    backendURLBase,
    endpoints,
    clientId
  ) => {
    try {
        const datos = await fetch(
          `${backendURLBase}${endpoints.toGetAllRepresentatives}?clientId=${clientId}`,
          { cache: 'no-store' }
        );
        const response = await datos.json();
        console.log("fetchRepresentatives", response.data);
        return response.data[0];
    } catch (error) {
        console.error("Error fetching representatives:", error);
        return false;
    }
  };
  
  export { fetchRepresentatives };
  