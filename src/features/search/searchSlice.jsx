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
  numRandomPics: 30,
}

const urlRandomParameterToGet1 = {
  urlParam: `photos/random?count=`,
  numRandomPics: 1,
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
          index: i,
          date: e.created_at,
          width: e.width,
          height: e.height,
          description: e.description,
          descriptionFromAlt: e.alt_description,
          uriMedium: e.urls.regular,
          uriBig: e.urls.full,
          likes: e.likes,
          download: e.links.download,
        }
      })
      return fetchDataFromPics
    } catch (error) {
      console.log('Log ERROR: ' + error)
      throw new Error(`We could not fetch the initial photos ${error.message}`)
    }
  }
)

export const fetch1Pic = createAsyncThunk(
  'browsedImages/fetch1Pic',
  async () => {
    try {
      let initialFetch1 = await axios(
        baseURL +
          urlRandomParameterToGet1.urlParam +
          urlRandomParameterToGet1.numRandomPics +
          clientID
      ).then((res) => {
        return res.data
      })
      const fetchDataFromThePic = initialFetch1.map((e, i) => {
        return {
          index: i,
          id: e.id,
          date: e.created_at,
          width: e.width,
          height: e.height,
          description: e.description,
          descriptionFromAlt: e.alt_description,
          uriMedium: e.urls.regular,
          likes: e.likes,
          download: e.links.download,
        }
      })
      return fetchDataFromThePic[0]
    } catch (error) {
      console.log('Log ERROR: ' + error)
      throw new Error(`We could not fetch 1 photo ${error.message}`)
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
          index: i,
          id: e.id,
          date: e.created_at,
          width: e.width,
          height: e.height,
          description: e.description,
          descriptionFromAlt: e.alt_description,
          uriMedium: e.urls.regular,
          likes: e.likes,
          download: e.links.download,
          input: userInput,
        }
      })
      return fetchDataFromSearchedPic
    } catch (error) {
      console.log('Log ERROR: ' + error)
      throw new Error(`We could not search by that input ${error.message}`)
    }
  }
)

export const removeThisPhotoFromHome = (dataFromImg) => {
  return {
    type: 'browsedImages/removeLikedPic',
    payload: { dataFromImg },
  }
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
  },
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
        state.search.input = action.payload[0].input
        state.search.pics = action.payload
      })
      .addCase(findPicsByUserInput.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })

      .addCase(fetch1Pic.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetch1Pic.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.initialFetch.push(action.payload)
      })
      .addCase(fetch1Pic.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export default searchSlice.reducer

export const initialPhotos = (state) => state.browsedImages.initialFetch
export const searchedPicsByUserInput = (state) =>
  state.browsedImages.search.pics
export const selectStatus = (state) => state.browsedImages.status