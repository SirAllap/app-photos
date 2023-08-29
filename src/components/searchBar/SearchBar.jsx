import { TextField } from '@mui/material'
import React from 'react'

function SearchBar() {
  return (
    <>
      <TextField
        label='e.g. Black cat'
        id='outlined-basic'
        variant='outlined'
        onChange={(e) => console.log(e.target.value)}
        color='secondary'
        sx={{
          width: '95%',
        }}
      />
    </>
  )
}

export default SearchBar
