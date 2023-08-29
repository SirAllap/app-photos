import { Chip } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { findPicsByUserInput } from '../../store/slices/searchSlice'
import { purple } from '@mui/material/colors'

const Chips = () => {
  const dispatch = useDispatch()
  const handleClick = (e) => {
    dispatch(findPicsByUserInput(e.currentTarget.innerText))
  }

  return (
    <>
      <Chip
        sx={{
          marginTop: '10px',
          height: '36px',
          width: '100px',
          borderRadius: '4px',
        }}
        style={{ color: purple[400] }}
        color='secondary'
        variant='outlined'
        label='Dog'
        onClick={handleClick}
      />
      <Chip
        sx={{
          marginTop: '10px',
          height: '36px',
          width: '100px',
          borderRadius: '4px',
        }}
        style={{ color: purple[400] }}
        color='secondary'
        variant='outlined'
        label='One Piece'
        onClick={handleClick}
      />
      <Chip
        sx={{
          marginTop: '10px',
          height: '36px',
          width: '100px',
          borderRadius: '4px',
        }}
        style={{ color: purple[400] }}
        color='secondary'
        variant='outlined'
        label='Rock'
        onClick={handleClick}
      />
      <Chip
        sx={{
          marginTop: '10px',
          height: '36px',
          width: '100px',
          borderRadius: '4px',
        }}
        style={{ color: purple[400] }}
        color='secondary'
        variant='outlined'
        label='Ice'
        onClick={handleClick}
      />
      <Chip
        sx={{
          marginTop: '10px',
          height: '36px',
          width: '100px',
          borderRadius: '4px',
        }}
        style={{ color: purple[400] }}
        color='secondary'
        variant='outlined'
        label='Keyboard'
        onClick={handleClick}
      />
      <Chip
        sx={{
          marginTop: '10px',
          height: '36px',
          width: '100px',
          borderRadius: '4px',
        }}
        style={{ color: purple[400] }}
        color='secondary'
        variant='outlined'
        label='React'
        onClick={handleClick}
      />
      <Chip
        sx={{
          marginTop: '10px',
          height: '36px',
          width: '100px',
          borderRadius: '4px',
        }}
        style={{ color: purple[400] }}
        color='secondary'
        variant='outlined'
        label='Hate'
        onClick={handleClick}
      />
    </>
  )
}

export default Chips
