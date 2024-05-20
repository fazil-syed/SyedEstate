import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from "./user/userSlice.js"
import {persistReducer, persistStore} from "redux-persist"
import storage from 'redux-persist/lib/storage'
const rootReducer = combineReducers({
  user: userReducer
}) 
const persistedConfig = {
  key: "root",
  storage,
  version: 1
}

const persistedReducer = persistReducer(persistedConfig,rootReducer)
export const store = configureStore({
  reducer:persistedReducer,
  middleware : (getDefaultMiddleware)=>
    getDefaultMiddleware({
        serializableCheck: false
    })
  
})

export const persistor = persistStore(store)