import { Chip } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { findPicsByUserInput } from '../../store/slices/searchSlice'

const Chips = () => {
  const dispatch = useDispatch()
  const handleClick = (e) => {
    dispatch(findPicsByUserInput(e.currentTarget.innerText))
  }

  return (
    <>
      <Chip label='Dog' onClick={handleClick} />
      <Chip label='One Piece' onClick={handleClick} />
      <Chip label='Rock' onClick={handleClick} />
      <Chip label='Ice' onClick={handleClick} />
      <Chip label='Keyboard' onClick={handleClick} />
      <Chip label='React' onClick={handleClick} />
      <Chip label='Hate' onClick={handleClick} />
    </>
  )
}

export default Chips
