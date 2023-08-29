import { TextField } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { findPicsByUserInput } from '../../store/slices/searchSlice'

const SearchBar = () => {
  const dispatch = useDispatch()
  const keypress = (e) => {
    if (e.keyCode === 13) {
      dispatch(findPicsByUserInput(e.target.value))
    }
  }

  return (
    <>
      <TextField
        label='e.g. Black cat'
        id='outlined-basic'
        variant='outlined'
        onKeyDown={keypress}
        color='secondary'
        sx={{
          width: '95%',
        }}
      />
    </>
  )
}

export default SearchBar
