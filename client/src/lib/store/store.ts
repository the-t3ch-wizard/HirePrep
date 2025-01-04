import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from "./features/counter/counterSlice"
import userReducer from "./features/user/userSlice"

const rootReducer = combineReducers({
  // reducer made for testing purpose
  counter: counterReducer,
  
  user: userReducer,
  
})

const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store