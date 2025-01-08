import { userService } from "../../services/user.service.remote.js"

const intialState = {
    loggedinUser : userService.getLoggedInUser() ,
    bggHottestGames : []
}

export const USER_LOGGED = 'USER_LOGGED'
export const USER_LOGOUT = 'USER_LOGOUT'
export const SET_BROWSE = 'SET_BROWSE'

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
        default:
            return state
    }
}