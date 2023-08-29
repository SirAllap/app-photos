import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  initialFetch: [],
  search: {
    pics: [],
    input: [],
  },
  status: 'idle',
  error: 'null',
}

const baseURL = `https://api.unsplash.com/`

const urlRandomParameter = {
  urlParam: `photos/random?count=`,
  numRandomPics: 16,
}

const urlSearchParameter = {
  urlParam: `search/photos?query=`,
  // userInput: 'car',
}

const clientID = `&client_id=${process.env.REACT_APP_ACCESS_KEY}`

export const fetchInitialPics = createAsyncThunk(
  'browsedImages/fetchInitialPics',
  async () => {
    try {
      let initialFetch = []
      initialFetch = await axios(
        baseURL +
          urlRandomParameter.urlParam +
          urlRandomParameter.numRandomPics +
          clientID
      ).then((res) => {
        return res.data
      })
      const fetchDataFromPics = initialFetch.map((e, i) => {
        return {
          id: e.id,
          width: e.width,
          height: e.height,
          description: e.description,
          descriptionFromAlt: e.alt_description,
          uriSmall: e.urls.small,
          uriMedium: e.urls.regular,
          uriBig: e.urls.full,
          likes: e.likes,
          download: e.links.download,
          index: i,
        }
      })
      return fetchDataFromPics
    } catch (error) {
      console.log('Log ERROR: ' + error)
      throw new Error(`We could not fetch the initial photos ${error.message}`)
    }
  }
)

export const findPicsByUserInput = createAsyncThunk(
  'browsedImages/findPicsByUserInput',
  async (userInput) => {
    try {
      let search = []
      search = await axios(
        baseURL + urlSearchParameter.urlParam + userInput + clientID
      ).then((res) => {
        return res.data.results
      })
      const fetchDataFromSearchedPic = search.map((e, i) => {
        return {
          id: e.id,
          width: e.width,
          height: e.height,
          description: e.description,
          descriptionFromAlt: e.alt_description,
          uriSmall: e.urls.small,
          uriMedium: e.urls.regular,
          uriBig: e.urls.full,
          likes: e.likes,
          download: e.links.download,
          index: i,
        }
      })
      return fetchDataFromSearchedPic
    } catch (error) {
      console.log('Log ERROR: ' + error)
      throw new Error(`We could not search by that input ${error.message}`)
    }
  }
)

export const searchSlice = createSlice({
  name: 'browsedImages',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchInitialPics.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchInitialPics.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.initialFetch = action.payload
      })
      .addCase(fetchInitialPics.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(findPicsByUserInput.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(findPicsByUserInput.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.search.pics = action.payload
      })
      .addCase(findPicsByUserInput.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default searchSlice.reducer
