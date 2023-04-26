import { configureStore, combineReducers } from '@reduxjs/toolkit'
import usersReducer from './slice/usersSlice'
import toastReducer from './slice/toastSlice'
import dialogReducer from './slice/dialogSlice'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer, FLUSH, PAUSE, REHYDRATE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const rootReducer = combineReducers({ auth: usersReducer, toast: toastReducer, dialog: dialogReducer })

const persistConfig = {
    key: 'root',
    version: '1',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
})

export const persistor = persistStore(store)
