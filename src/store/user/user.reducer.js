import { bggService } from "../../services/bgg.service.js"
import { userService } from "../../services/user.service.remote.js"

const intialState = {
    loggedinUser : userService.getLoggedInUser() ,
    bggHottestGames: [], // ✅ Start with empty array
    userData: [], // ✅ Start with empty array
};

export const USER_LOGGED = 'USER_LOGGED'
export const USER_LOGOUT = 'USER_LOGOUT'
export const SET_BROWSE = 'SET_BROWSE'
export const UPDATE_LIKEDGAMES = 'UPDATE_LIKEDGAMES'
export const INITIALIZE_DATA_HOTTEST = "INITIALIZE_DATA_HOTTEST";
export const INITIALIZE_DATA_USER = "INITIALIZE_DATA_USER";

export function userReducer ( state = intialState, cmd = {}  ){
    switch (cmd.type){
        case USER_LOGGED :
            return{
                ...state,
                loggedinUser : cmd.loggedUser
            }  
        case USER_LOGOUT :
            return{
                ...state,
                loggedinUser : null
            }  
        case SET_BROWSE :
            return{
                ...state,
                bggHottestGames : cmd.gamesArray
            }  
        case UPDATE_LIKEDGAMES :
            return{
                ...state,
                userData : cmd.likedGamesArray
            };
        case INITIALIZE_DATA_HOTTEST:
            return {
                ...state,
                bggHottestGames: cmd.gamesArray, // ✅ Update with fetched data
            };
        case INITIALIZE_DATA_USER:
            return {
                ...state,
                userData: cmd.userData, // ✅ Update with fetched data
            };
        default:
            return state
    }
}