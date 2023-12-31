import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  savedPhotos: [],
  searchCollection: [],
  setModalView: false,
  photoOfCurrentViewModal: [],
}

const localData = JSON.parse(localStorage.getItem('collectionLocalSession'))
const saveLocaData = () => {
  localData.map(e => initialState.savedPhotos.push(e))
}
localData && saveLocaData()

export const favouriteSlice = createSlice({
  name: 'favouritesPhotos',
  initialState,
  reducers: {
    saveThisPhotoToCollection: (state, action) => {
      state.savedPhotos.push(action.payload)
      localStorage.setItem('collectionLocalSession', JSON.stringify(state.savedPhotos))
    },
    removeThisPhotoFromCollection: (state, action) => {
      const result = state.savedPhotos.filter((e) => e.id !== action.payload)
      state.savedPhotos = result
      localStorage.setItem('collectionLocalSession', JSON.stringify(state.savedPhotos))
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
      const findIndex = state.savedPhotos.findIndex(e => e.id === id)
      const updatedState = state.savedPhotos.filter((e) => {
        return e.id !== id
      })
      state.savedPhotos = [...updatedState]
      state.savedPhotos.splice(findIndex, 0, addingTheKey)
      localStorage.setItem('collectionLocalSession', JSON.stringify(state.savedPhotos))
    },
    searchedResultFromCollection: (state, action) => {
      state.searchCollection = action.payload
    }
  },
})

export default favouriteSlice.reducer

export const {
  saveThisPhotoToCollection,
  removeThisPhotoFromCollection,
  manageModalView,
  manageNewDescription,
  searchedResultFromCollection
} = favouriteSlice.actions

export const savedPhotos = (state) => state.favouritesPhotos.savedPhotos
export const searchCollection = (state) => state.favouritesPhotos.searchCollection
export const modalViewState = (state) => state.favouritesPhotos.setModalView
export const currentPhotoOfTheModal = (state) =>
  state.favouritesPhotos.photoOfCurrentViewModal
