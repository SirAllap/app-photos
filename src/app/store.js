import { configureStore } from '@reduxjs/toolkit'
import { searchSlice } from '../features/search/searchSlice'
import { favouriteSlice } from '../features/favourites/favouritesSlice'

export const store = configureStore({
    reducer: {
        browsedImages: searchSlice.reducer,
        favouritesPhotos: favouriteSlice.reducer
    },
})