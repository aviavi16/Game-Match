import { legacy_createStore as createStore } from "redux";
import { userReducer } from "./user/user.reducer";

export const store = createStore( userReducer)

window.gStore = store
