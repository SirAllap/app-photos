import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findPicsByUserInput } from '../../features/search/searchThunks'
import { clearSavedPicsByInput } from '../../features/search/searchSlice'
import {
  Box,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  styled,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import {
  savedPhotos,
  searchedResultFromCollection,
} from '../../features/favourites/favouritesSlice'

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '2px solid',
      borderColor: '#9d81b685',
    },
    '&:hover fieldset': {
      borderColor: '#9d81b655',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#9d81b6',
    },
  },
})

const SearchBar = ({ isMobile }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const savedPics = useSelector(savedPhotos)
  const [currentInput, setCurrentInput] = useState({ text: '' })
  const [userInput, setUserInput] = useState('')
  const [resultFromTheCollectionSearch, setResultFromTheCollectionSearch] =
    useState([])
  const searchedInput = useSelector((state) => state.browsedImages.search.input)

  useEffect(() => {
    if (searchedInput.length !== 0) {
      setUserInput(searchedInput)
    } else {
      setUserInput('e.g: Black cat')
    }
    resultFromTheCollectionSearch &&
      dispatch(
        searchedResultFromCollection(
          resultFromTheCollectionSearch.filter(
            (value, index, self) =>
              index ===
              self.findIndex(
                (t) => t.place === value.place && t.name === value.name
              )
          )
        )
      )
  }, [searchedInput, userInput, resultFromTheCollectionSearch, dispatch])

  const clearInput = () => {
    if (currentInput.text !== ' ') {
      setCurrentInput({ text: '' })
      dispatch(clearSavedPicsByInput())
    }
  }

  const handleSearch = () => {
    if (
      currentInput.text === '' ||
      currentInput.text === undefined ||
      currentInput.text === null
    ) {
      dispatch(clearSavedPicsByInput())
    } else {
      dispatch(findPicsByUserInput(currentInput.text))
    }
  }

  const filterSearch = () => {
    return savedPics.filter(
      (savedPic) =>
        (savedPic.customDescription !== (undefined && null)
          ? savedPic.customDescription
              .toLowerCase()
              .includes(currentInput.text) &&
            setResultFromTheCollectionSearch(
              (resultFromTheCollectionSearch) => [
                ...resultFromTheCollectionSearch,
                savedPic,
              ]
            )
          : false) ||
        (savedPic.description !== null
          ? savedPic.description.toLowerCase().includes(currentInput.text) &&
            setResultFromTheCollectionSearch(
              (resultFromTheCollectionSearch) => [
                ...resultFromTheCollectionSearch,
                savedPic,
              ]
            )
          : false) ||
        (savedPic.altDescription !== null
          ? savedPic.altDescription.toLowerCase().includes(currentInput.text) &&
            setResultFromTheCollectionSearch(
              (resultFromTheCollectionSearch) => [
                ...resultFromTheCollectionSearch,
                savedPic,
              ]
            )
          : false)
    )
  }

  const handleCollectionSearch = () => {
    setResultFromTheCollectionSearch([])
    filterSearch()
  }

  return (
    <>
      {location.pathname === '/collection' ? (
        <Box component='form' noValidate autoComplete='off'>
          <CssTextField
            autoFocus={isMobile}
            placeholder={userInput}
            value={currentInput.text}
            onChange={(event) => {
              setCurrentInput({ text: event.target.value })
            }}
            size={isMobile ? 'small' : 'regular'}
            variant='outlined'
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault()
                handleCollectionSearch()
              }
            }}
            style={{ color: '#4966A6' }}
            color='primary'
            sx={inputStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    type='button'
                    sx={{ p: '10px' }}
                    onClick={clearInput}
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 1 }} orientation='vertical' />
                  <IconButton
                    type='button'
                    sx={{ p: '10px' }}
                    onClick={handleCollectionSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      ) : (
        <Box component='form' noValidate autoComplete='off'>
          <CssTextField
            autoFocus={isMobile}
            placeholder={userInput}
            value={currentInput.text}
            onChange={(event) => {
              setCurrentInput({ text: event.target.value })
            }}
            size={isMobile ? 'small' : 'regular'}
            variant='outlined'
            onKeyDown={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault()
                dispatch(findPicsByUserInput(currentInput.text))
              }
            }}
            style={{ color: '#4966A6' }}
            color='primary'
            sx={inputStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    type='button'
                    sx={{ p: '10px' }}
                    onClick={clearInput}
                  >
                    <CancelOutlinedIcon />
                  </IconButton>
                  <Divider sx={{ height: 28, m: 1 }} orientation='vertical' />
                  <IconButton
                    type='button'
                    sx={{ p: '10px' }}
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
    </>
  )
}

export default SearchBar

const inputStyle = {
  width: '80%',
  marginLeft: 5,
  marginRight: 0,
  marginTop: 1,
  marginBottom: 1,
  fontWeight: 'bold',
}
