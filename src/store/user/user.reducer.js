import { userService } from "../../services/user.service.remote.js"
import { bggService } from "../../services/bgg.service"

const intialState = {
    loggedinUser : userService.getLoggedInUser() ,
    bggHottestGames : bggService.getHottestGames() 
}

export const USER_LOGGED = 'USER_LOGGED'
export const USER_LOGOUT = 'USER_LOGOUT'

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
        default:
            return state
    }
}