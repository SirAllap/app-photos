import React, { useEffect, useState } from 'react'
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
  const [currentInput, setCurrentInput] = useState({ text: '' })
  const [userInput, setUserInput] = useState('')

  const searchedInput = useSelector((state) => state.browsedImages.search.input)

  useEffect(() => {
    if (searchedInput.length !== 0) {
      setUserInput(searchedInput)
    } else {
      setUserInput('e.g: Black cat')
    }
  }, [searchedInput, userInput])

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

  return (
    <>
      <Box component='form' noValidate autoComplete='off'>
        <CssTextField
          autoFocus
          placeholder={userInput}
          value={currentInput.text}
          onChange={(event) => {
            setCurrentInput({ text: event.target.value })
          }}
          size={isMobile ? 'small' : 'regular'}
          id='outlined-basic'
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
