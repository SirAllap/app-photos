import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findPicsByUserInput } from '../../features/search/searchThunks'
import { clearSavedPicsByInput } from '../../features/search/searchSlice'
import { Divider, IconButton, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

const SearchBar = ({ isMobile }) => {
  const dispatch = useDispatch()
  const [currentInput, setCurrentInput] = useState(' ')
  const [userInput, setUserInput] = useState('')

  const searchedInput = useSelector((state) => state.browsedImages.search.input)

  useEffect(() => {
    if (searchedInput.length !== 0) {
      setUserInput(searchedInput)
    } else {
      setUserInput('e.g: Black cat')
    }
  }, [searchedInput])

  const clearInput = () => {
    if (currentInput.text !== ' ') {
      setCurrentInput({ text: ' ' })
      dispatch(clearSavedPicsByInput())
    }
  }

  const handleSearch = (event) => {
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

  return (
    <>
      <TextField
        value={currentInput.text === '' ? null : currentInput.text}
        placeholder={userInput}
        onChange={(event) => {
          setCurrentInput({ text: event.target.value })
        }}
        size={isMobile ? 'small' : 'regular'}
        id='outlined-basic'
        variant='outlined'
        onKeyDown={(event) => {
          event.keyCode === 13 &&
            dispatch(findPicsByUserInput(currentInput.text))
        }}
        style={{ color: '#4966A6' }}
        color='primary'
        sx={{
          width: '80%',
          marginLeft: 5,
          marginRight: 0,
          marginTop: 1,
          marginBottom: 1,
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton type='button' sx={{ p: '10px' }} onClick={clearInput}>
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
    </>
  )
}

export default SearchBar
