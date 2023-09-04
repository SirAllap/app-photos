import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  savedPhotos: [],
  setModalView: false,
  photoOfCurrentViewModal: [],
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

export const manageModalView = (id, bol) => {
  return {
    type: 'favouritesPhotos/manageViewCollectionModal',
    payload: { id, bol },
  }
}
export const manageNewDescription = (id, str) => {
  return {
    type: 'favouritesPhotos/changeDescription',
    payload: { id, str },
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

    manageViewCollectionModal: (state, action) => {
      const { id, bol } = action.payload
      if (bol === true) {
        let photo4Modal = state.savedPhotos.filter((e) => {
          return e.id === id
        })
        state.photoOfCurrentViewModal = { ...photo4Modal[0] }
      }
      state.setModalView = bol
    },

    changeDescription: (state, action) => {
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

export const savedPhotos = (state) => state.favouritesPhotos.savedPhotos
export const modalViewState = (state) => state.favouritesPhotos.setModalView
export const currentPhotoOfTheModal = (state) =>
  state.favouritesPhotos.photoOfCurrentViewModal
