import { configureStore } from '@reduxjs/toolkit'
import searchReducer from './slices/searchSlice'

export const store = configureStore({
    reducer: { browsedImages: searchReducer },
})