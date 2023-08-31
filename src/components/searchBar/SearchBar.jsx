import { TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findPicsByUserInput } from '../../features/search/searchSlice'

const SearchBar = () => {
  const dispatch = useDispatch()
  const keypress = (e) => {
    if (e.keyCode === 13) {
      dispatch(findPicsByUserInput(e.target.value))
    }
  }
  const [userInput, setUserInput] = useState(' ')

  const searchedInput = useSelector((state) => state.browsedImages.search.input)
  useEffect(() => {
    if (searchedInput.length !== 0) {
      return setUserInput(searchedInput)
    } else {
      return setUserInput('e.g. Black cat')
    }
  }, [searchedInput])

  return (
    <>
      <TextField
        label={userInput}
        id='outlined-basic'
        variant='outlined'
        onKeyDown={keypress}
        style={{ color: '#4966A6' }}
        color='primary'
        sx={{
          width: '82%',
          m: 4,
        }}
      />
    </>
  )
}

export default SearchBar
