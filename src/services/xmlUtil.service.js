
export const xmlUtilService = {
    getDataById,
    getProxyData,
}

function getDataById( id) {
    var req = new XMLHttpRequest();
            req.open("GET", "http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/thing?id=013", false);
            req.send(null);
            console.log(req.responseText);
}

async function getProxyData( username ) {
    const proxyUrl = `https://cors-anywhere.herokuapp.com/https://www.boardgamegeek.com/xmlapi2/collection?username=${username}&subtype=boardgame&own=1`;

    try {
      const response = await fetch(proxyUrl);
      const responseText = await response.text();
      return responseText;
    } catch (error) {
      console.error("Error fetching via proxy:", error.message);
     }    //try {
    //     const response = await fetch(proxyUrl);
      
    //     // The API might return an HTTP 200 status even for errors, so check the response text for errors
    //     if (!response.ok) {
    //       throw new Error(`HTTP Error: ${response.status}`);
    //     }
      
    //     const responseText = await response.text(); // Get response as text
    //     const parser = new DOMParser();
    //     const xmlDoc = parser.parseFromString(responseText, "application/xml");
      
    //     // Check if the response contains <errors>
    //     const errorNode = xmlDoc.querySelector("error > message");
    //     if (errorNode) {
    //       console.error("Error message from API:", errorNode.textContent);
    //     } else {
    //       console.log("Data fetched successfully:", responseText);
    //     }
    //   } catch (error) {
    //     console.error("Fetch error:", error.message);
    //   }
}