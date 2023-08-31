import { createAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  savedPhotos: [],
}

export const saveThisPhotoToCollection = (dataFromImg) => {
  return {
    type: 'favouritesPhotos/save2Coll',
    payload: { dataFromImg },
  }
}
export const removeThisPhotoFromCollection = (dataFromImg) => {
  return {
    type: 'favouritesPhotos/removeFromColl',
    payload: { dataFromImg },
  }
}

export const favouriteSlice = createSlice({
  name: 'favouritesPhotos',
  initialState,
  reducers: {
    save2Coll: (state, action) => {
      state.savedPhotos.push(action.payload.dataFromImg)
    },
    removeFromColl: (state, action) => {
      const result = state.savedPhotos.filter(
        (e) => e.id !== action.payload.dataFromImg
      )
      state.savedPhotos = result
    },
  },
})

export default favouriteSlice.reducer
