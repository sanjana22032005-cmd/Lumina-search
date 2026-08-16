import {configureStore} from '@reduxjs/toolkit'
import searchReducer from './features/searchSlice'
<<<<<<< HEAD
import boardReducer from './features/boardSlice'
import userReducer from './features/userSlice'

export const store = configureStore({
    reducer:{
        search: searchReducer,
        boards: boardReducer,
        user: userReducer
=======
import collectionReducer from './features/collectionSlice'


export const store = configureStore({
    reducer:{
        search:searchReducer,
        collection:collectionReducer
>>>>>>> d52f16b2d67d4f1ce8208ddcbbe38e691ca6ded3
    }
})