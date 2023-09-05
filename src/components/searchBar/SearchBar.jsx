import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//? ACTIONS + SELECTORS
import { findPicsByUserInput } from '../../features/search/searchThunks'
import { selectInputStatus } from '../../features/search/searchSlice'

//? MUI COMPONENTS
import { TextField } from '@mui/material'

//? SWEET ALERT
import Swal from 'sweetalert2'

const SearchBar = ({ isMobile }) => {
  const dispatch = useDispatch()
  const keypress = (e) => {
    if (e.keyCode === 13) {
      dispatch(findPicsByUserInput(e.target.value))
      if (inputChecked === 'rejected') {
        Swal.fire({
          position: 'top',
          icon: 'error',
          text: `We cound't find what you are looking for... please try again`,
          width: 'auto',
          heightAuto: true,
          showConfirmButton: false,
          timer: 1000,
          timerProgressBar: 1000,
          backdrop: true,
        })
      }
    }
  }
  const [userInput, setUserInput] = useState(' ')
  const [inputChecked, setInputChecked] = useState('')
  const requestStatus = useSelector(selectInputStatus)

  const searchedInput = useSelector((state) => state.browsedImages.search.input)
  useEffect(() => {
    if (requestStatus === 'rejected') {
      setInputChecked('rejected')
    } else if (requestStatus === 'fulfilled') {
      setInputChecked('fulfilled')
    }

    if (searchedInput.length !== 0) {
      setUserInput(searchedInput)
    } else {
      setUserInput()
    }
  }, [searchedInput, requestStatus])

  return (
    <>
      <TextField
        size={isMobile ? 'small' : 'regular'}
        placeholder={userInput}
        id='outlined-basic'
        variant='outlined'
        onKeyDown={keypress}
        style={{ color: '#4966A6' }}
        color='primary'
        sx={{
          width: '80%',
          marginLeft: 5,
          marginRight: 0,
          marginTop: 1,
          marginBottom: 1,
        }}
      />
    </>
  )
}

export default SearchBar
