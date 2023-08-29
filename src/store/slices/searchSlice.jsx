import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const baseURL = `https://api.unsplash.com/photos`
const numRandomPics = 16
const urlRandomParameter = `/random?count=${numRandomPics}&`
const clientID = `client_id=${process.env.REACT_APP_ACCESS_KEY}`

export const fetchInitialPics = createAsyncThunk(
  'browsedImages/fetchInitialPics',
  async () => {
    try {
      let initialFetch = []
      initialFetch = await axios(baseURL + urlRandomParameter + clientID).then(
        (res) => {
          return res.data
        }
      )
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

export const searchSlice = createSlice({
  name: 'browsedImages',
  initialState: {
    initialFetch: [],
    status: 'idle',
    error: 'null',
  },
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
  },
})

export default searchSlice.reducer
