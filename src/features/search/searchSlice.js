import { createSlice } from '@reduxjs/toolkit'
import { fetchInitialPics, fetch1Pic, findPicsByUserInput } from './searchThunks'

const initialState = {
  initialFetch: [],
  search: {
    pics: [],
    input: [],
  },
  status: 'idle',
  inputStatus: 'idle',
  error: 'null',
}

export const searchSlice = createSlice({
  name: 'browsedImages',
  initialState,
  reducers: {
    removeLikedPic: (state, action) => {
      if (state.initialFetch.some((e) => e.id === action.payload.dataFromImg)) {
        const result = state.initialFetch.filter(
          (e) => e.id !== action.payload.dataFromImg
        )
        state.initialFetch = result
      } else {
        const result = state.search.pics.filter(
          (e) => e.id !== action.payload.dataFromImg
        )
        state.search.pics = result
      }
    },
    clearSavedPicsByInput: (state, action) => {
      state.search.pics = []
      state.search.input = []
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchInitialPics.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchInitialPics.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.initialFetch = action.payload
      })
      .addCase(fetchInitialPics.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })

      .addCase(findPicsByUserInput.pending, (state, action) => {
        state.inputStatus = 'pending'
      })
      .addCase(findPicsByUserInput.fulfilled, (state, action) => {
        if (action.payload[0] === undefined) {
          state.inputStatus = 'rejected'
        } else {
          state.inputStatus = 'fulfilled'
          state.search.input = action.payload[0].input
          state.search.pics = action.payload
        }
      })
      .addCase(findPicsByUserInput.rejected, (state, action) => {
        state.inputStatus = 'rejected'
        state.error = action.error.message
      })

      .addCase(fetch1Pic.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetch1Pic.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.initialFetch.push(action.payload)
      })
      .addCase(fetch1Pic.rejected, (state, action) => {
        state.status = 'rejected'
        state.error = action.error.message
      })
  },
})

export default searchSlice.reducer

export const { removeLikedPic, clearSavedPicsByInput } = searchSlice.actions

export const initialPhotos = (state) => state.browsedImages.initialFetch
export const searchedPicsByUserInput = (state) => state.browsedImages.search.pics
export const selectStatus = (state) => state.browsedImages.status
export const selectInputStatus = (state) => state.browsedImages.inputStatus
