import { createSlice } from '@reduxjs/toolkit'

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

export const sortAllPhotosByWidth = () => {
  return {
    type: 'favouritesPhotos/sortByWidth',
    payload: {},
  }
}
export const sortAllPhotosByHeight = () => {
  return {
    type: 'favouritesPhotos/sortByHeight',
    payload: {},
  }
}
export const sortAllPhotosByDate = () => {
  return {
    type: 'favouritesPhotos/sortByDate',
    payload: {},
  }
}
export const sortAllPhotosByLikes = () => {
  return {
    type: 'favouritesPhotos/sortByLikes',
    payload: {},
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
    sortByWidth: (state, action) => {
      console.log('ancho')
      const result = state.savedPhotos.sort((a, b) =>
        a.width < b.width ? 1 : -1
      )
      state.savedPhotos = result
    },
    sortByHeight: (state, action) => {
      const result = state.savedPhotos.sort((a, b) =>
        a.height < b.height ? 1 : -1
      )
      state.savedPhotos = result
    },
    sortByDate: (state, action) => {
      const result = state.savedPhotos.sort((a, b) =>
        a.date < b.date ? 1 : -1
      )
      state.savedPhotos = result
    },
    sortByLikes: (state, action) => {
      const result = state.savedPhotos.sort((a, b) =>
        a.likes < b.likes ? 1 : -1
      )
      state.savedPhotos = result
    },
  },
})

export default favouriteSlice.reducer

export const savedPhotos = (state) => state.favouritesPhotos.savedPhotos
