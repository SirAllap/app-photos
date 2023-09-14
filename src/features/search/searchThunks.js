import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const URL = {
    baseURL: `https://api.unsplash.com/`,
    urlRandomParameter: {
        urlParam: `photos/random?count=`,
        numRandomPics: 30,
    },
    urlRandomParameterToGet1: {
        urlParam: `photos/random?count=`,
        numRandomPics: 1,
    },
    urlSearchParameter: {
        urlParam: `search/photos?query=`,
        urlOrder: `&order_by=latest`,
    },
    clientID: `&client_id=${process.env.REACT_APP_ACCESS_KEY_1}`,
    // clientID: `&client_id=${process.env.REACT_APP_ACCESS_KEY}`,
    // clientID1: `&client_id=${process.env.REACT_APP_ACCESS_KEY_1}`
}

export const fetchInitialPics = createAsyncThunk(
    'browsedImages/fetchInitialPics',
    async () => {
        try {
            let initialFetch = []
            initialFetch = await axios(
                URL.baseURL +
                URL.urlRandomParameter.urlParam +
                URL.urlRandomParameter.numRandomPics +
                URL.clientID
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
                    download: (e.links.download.split('?')[0].concat(`?force=true?ixid=${process.env.REACT_APP_ACCESS_KEY_1}`)),
                    userName: e.user.name,
                    downloads: e.downloads,
                    views: e.views,
                }
            })
            return fetchDataFromPics
        } catch (error) {
            throw new Error(`We could not fetch the initial photos ${error.message}`)
        }
    }
)
export const secondFetchInitialPics = createAsyncThunk(
    'browsedImages/secondFetchInitialPics',
    async () => {
        try {
            let initialFetch = []
            initialFetch = await axios(
                URL.baseURL +
                URL.urlRandomParameter.urlParam +
                URL.urlRandomParameter.numRandomPics +
                URL.clientID1
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
                    download: (e.links.download.split('?')[0].concat(`?force=true?ixid=${process.env.REACT_APP_ACCESS_KEY_1}`)),
                    userName: e.user.name,
                    downloads: e.downloads,
                    views: e.views,
                }
            })
            return fetchDataFromPics
        } catch (error) {
            throw new Error(`We could not fetch the initial photos ${error.message}`)
        }
    }
)

export const fetch1Pic = createAsyncThunk(
    'browsedImages/fetch1Pic',
    async () => {
        try {
            let initialFetch1 = await axios(
                URL.baseURL +
                URL.urlRandomParameterToGet1.urlParam +
                URL.urlRandomParameterToGet1.numRandomPics +
                URL.clientID
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
                    download: (e.links.download.split('?')[0].concat(`?force=true?ixid=${process.env.REACT_APP_ACCESS_KEY}`)),
                    userName: e.user.name,
                    downloads: e.downloads,
                    views: e.views,
                }
            })
            return fetchDataFromThePic[0]
        } catch (error) {
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
                URL.baseURL + URL.urlSearchParameter.urlParam + userInput + URL.urlSearchParameter.urlOrder + URL.clientID
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
                    download: (e.links.download.split('?')[0].concat(`?force=true?ixid=${process.env.REACT_APP_ACCESS_KEY}`)),
                    input: userInput,
                    userName: e.user.name,
                    downloads: e.downloads,
                    views: e.views,
                }
            })
            return fetchDataFromSearchedPic
        } catch (error) {
            throw new Error(`We could not search by that input ${error.message}`)
        }
    }
)