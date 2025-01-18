import { bggService } from "../../services/bgg.service.js";
import { showErrorMsg } from "../../services/event-bus.service.js";
import { store } from "../store";
import { SET_BROWSE } from "../user/user.reducer.js";

export async function setBrowse ( boardGame ){
    try {      
        const gamesArray = await bggService.add ( boardGame)
        console.log('dispatch gamesArray:', gamesArray)
        store.dispatch( { type: SET_BROWSE , gamesArray })

    } catch (err) {
        console.log('dispatch gamesArray :', err)
        showErrorMsg( 'dispatch gamesArray')
        throw new Error ( err )
    }
}
