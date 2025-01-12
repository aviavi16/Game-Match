import { httpService } from "./http.service.remote";

export const bggService = {
    getBGGCollection,
    getHottestGames,
    getGameById,
    sendLog,
    getHardCodedGamesArray
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

function getHardCodedGamesArray(){
    return [
        {
            name: "Gaia Project2", 
            image: "https://res.cloudinary.com/thekingdom/image/fetch/c_limit,f_jpg,h_555,q_auto,w_555/https://cf.geekdo-images.com/images/pic3528112.jpg",
            // thumbnail: ,
            // description: ,
            // yearpublished: ,
            // minplayers: ,
            // maxplayers: ,
            // suggested_numplayers: ,
            // suggested_numplayers_totalvotes: ,
            // minplaytime: ,
            // maxplaytime: ,
            // minage: ,
            // language_dependence: ,
            // boardgamecategories: ,
            // boardgamemechanics: ,
            // boardgameexpansion: ,
            // boardgamedesigner: ,
            // boardgameartist: ,
            // boardgamepublishers: 
        },
        {
            name: "Terraforming mars", 
            image: "https://images.squarespace-cdn.com/content/v1/591861c529687fd2ca03c3f3/1665422600142-L0C42JQ49BJNHIODGV07/Spiral+Galaxy+Oct22-3.jpg?format=2500w"
        },
        {
            name: "Great western trail", 
            image: "https://m.media-amazon.com/images/I/81jyHMaoiVL.__AC_SX300_SY300_QL70_FMwebp_.jpg"
        },
        {
            name: "Anachrony", 
            image: "https://lostdice.com/wp-content/uploads/2017/05/Anachrony-Box-Cover-550x381.jpg"
        },
        {
            name: "Gaia Project", 
            image: "https://res.cloudinary.com/thekingdom/image/fetch/c_limit,f_jpg,h_555,q_auto,w_555/https://cf.geekdo-images.com/images/pic3528112.jpg"
        },
    ]
}



