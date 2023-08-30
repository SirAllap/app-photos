import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'
import favouritesReducer from './slices/favouritesSlice'

export const store = configureStore({
    reducer: {
        browsedImages: searchReducer,
        favouritesPhotos: favouritesReducer
    },
})