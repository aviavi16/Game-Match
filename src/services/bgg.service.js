import { httpService } from "./http.service.remote";

export const bggService = {
    getDataById,
    getBGGCollection,
    getHottestGames,
    getGameById,
}

function getDataById( id) {
    var req = new XMLHttpRequest();
            req.open("GET", "http://localhost:8080/https://www.boardgamegeek.com/xmlapi2/thing?id=013", false);
            req.send(null);
            console.log(req.responseText);
}

async function getBGGCollection(username) {
    const collection = await httpService.get(`bgg/${username}`)
        if (collection) return collection  
}

async function getHottestGames() {
    const collection = await httpService.get(`bgg/hottest`)
    console.log('collection:', collection)
        if (collection) return collection  
}

async function getGameById( gameId ) {
    const gameData = await httpService.get(`bgg/search/${gameId}`)
    if (gameData) return gameData  
}



