import { combineReducers } from "redux";
import { usersSlice } from "./usersSlice";

export const rootReducer = combineReducers({
  users: usersSlice.reducer
})
