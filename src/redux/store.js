import {configureStore} from '@reduxjs/toolkit'
import searchReducer from './features/searchSlice'
import boardReducer from './features/boardSlice'
import userReducer from './features/userSlice'

export const store = configureStore({
    reducer:{
        search: searchReducer,
        boards: boardReducer,
        user: userReducer
    }
})