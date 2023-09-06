import React from 'react'
import { useDispatch } from 'react-redux'
import { findPicsByUserInput } from '../../features/search/searchThunks'
import { Chip, Stack } from '@mui/material'

const Chips = () => {
  const dispatch = useDispatch()
  const handleClick = (e) => {
    dispatch(findPicsByUserInput(e.currentTarget.innerText))
  }

  return (
    <>
      <Stack direction='row' spacing={1}>
        <Chip
          sx={{
            marginTop: '10px',
            height: '36px',
            width: '100px',
            borderRadius: '4px',
            fontWeight: 'bold',
            borderColor: '#9d81b685',
            backgroundColor: '#9d81b615',
          }}
          style={{ color: '#9d81b6' }}
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
            fontWeight: 'bold',
            borderColor: '#9d81b685',
            backgroundColor: '#9d81b615',
          }}
          style={{ color: '#9d81b6' }}
          color='primary'
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
            fontWeight: 'bold',
            borderColor: '#9d81b685',
            backgroundColor: '#9d81b615',
          }}
          style={{ color: '#9d81b6' }}
          color='primary'
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
            fontWeight: 'bold',
            borderColor: '#9d81b685',
            backgroundColor: '#9d81b615',
          }}
          style={{ color: '#9d81b6' }}
          color='primary'
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
            fontWeight: 'bold',
            borderColor: '#9d81b685',
            backgroundColor: '#9d81b615',
          }}
          style={{ color: '#9d81b6' }}
          color='primary'
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
            fontWeight: 'bold',
            borderColor: '#9d81b685',
            backgroundColor: '#9d81b615',
          }}
          style={{ color: '#9d81b6' }}
          color='primary'
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
            fontWeight: 'bold',
            borderColor: '#9d81b685',
            backgroundColor: '#9d81b615',
          }}
          style={{ color: '#9d81b6' }}
          color='primary'
          variant='outlined'
          label='Hate'
          onClick={handleClick}
        />
      </Stack>
    </>
  )
}

export default Chips
