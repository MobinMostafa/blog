import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import userReducer from './redux/user/user.slice'
import sessionStorage from 'redux-persist/es/storage/session'


const rootReducer = combineReducers({
    user: userReducer,

})


const persistConfig = {
    key: 'root',
    storage: sessionStorage,
  }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware : (getDefaultMiddleware) => {
       return getDefaultMiddleware({serializableCheck: false})
    }
})

export const persistor = persistStore(store)