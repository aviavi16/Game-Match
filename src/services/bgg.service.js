import { httpService } from "./http.service.remote";

export const bggService = {
    getBGGCollection,
    getHottestGames,
    getGameById,
    sendLog,
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

async function sendLog() {
    httpService.get(`bgg/log`)
}



