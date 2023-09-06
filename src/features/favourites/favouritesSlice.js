import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  savedPhotos: [],
  setModalView: false,
  photoOfCurrentViewModal: [],
}

export const favouriteSlice = createSlice({
  name: 'favouritesPhotos',
  initialState,
  reducers: {
    saveThisPhotoToCollection: (state, action) => {
      state.savedPhotos.push(action.payload.dataFromImg)
    },
    removeThisPhotoFromCollection: (state, action) => {
      const result = state.savedPhotos.filter(
        (e) => e.id !== action.payload.dataFromImg
      )
      state.savedPhotos = result
    },
    manageModalView: (state, action) => {
      const { id, bol } = action.payload
      if (bol === true) {
        let photo4Modal = state.savedPhotos.filter((e) => {
          return e.id === id
        })
        state.photoOfCurrentViewModal = { ...photo4Modal[0] }
      }
      state.setModalView = bol
    },
    manageNewDescription: (state, action) => {
      const { id, str } = action.payload
      let photoFromTheList = state.savedPhotos.filter((e) => {
        return e.id === id
      })
      const addingTheKey = { ...photoFromTheList[0], customDescription: str }

      const updatedState = state.savedPhotos.filter((e) => {
        return e.id !== id
      })
      state.savedPhotos = [...updatedState]
      state.savedPhotos.push(addingTheKey)
    },
  },
})

export default favouriteSlice.reducer

export const { saveThisPhotoToCollection, removeThisPhotoFromCollection, manageModalView, manageNewDescription } = favouriteSlice.actions

export const savedPhotos = (state) => state.favouritesPhotos.savedPhotos
export const modalViewState = (state) => state.favouritesPhotos.setModalView
export const currentPhotoOfTheModal = (state) => state.favouritesPhotos.photoOfCurrentViewModal
