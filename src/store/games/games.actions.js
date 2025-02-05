import { bggService } from "../../services/bgg.service.js";
import { showErrorMsg } from "../../services/event-bus.service.js";
import { store } from "../store";
import { INITIALIZE_DATA_HOTTEST, INITIALIZE_DATA_USER, SET_BROWSE, UPDATE_LIKEDGAMES } from "../user/user.reducer.js";

export async function setBrowse ( gamesArray ){
    try {
        console.log('dispatch gamesArray:', gamesArray)
        store.dispatch( { type: SET_BROWSE , gamesArray })

    } catch (err) {
        console.log('dispatch gamesArray :', err)
        showErrorMsg( 'dispatch gamesArray')
        throw new Error ( err )
    }
}

export async function addToLiked ( boardGame ){
    try {      
        const updatedUserArray = await bggService.add ( boardGame)
        console.log('dispatch update UserArray:', updatedUserArray)
        store.dispatch( { type: UPDATE_LIKEDGAMES , likedGamesArray: updatedUserArray.likedGamesArray  })

    } catch (err) {
        console.log('dispatch update likedGamesArray :', err)
        showErrorMsg( 'dispatch update likedGamesArray')
        throw new Error ( err )
    }
}

export function initializeHottestGames(gamesArray) {
    return { type: INITIALIZE_DATA_HOTTEST, gamesArray };
}

export function initializeUserData(userData) {
    return { type: INITIALIZE_DATA_USER, userData };
}