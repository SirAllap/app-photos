import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

//? ACTIONS + SELECTORS
import { findPicsByUserInput } from '../../features/search/searchThunks'
import { selectInputStatus } from '../../features/search/searchSlice'

//? MUI COMPONENTS
import { Divider, IconButton, InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

//? SWEET ALERT
import Swal from 'sweetalert2'

const SearchBar = ({ isMobile }) => {
  const dispatch = useDispatch()
  const [userInput, setUserInput] = useState(' ')
  const [inputChecked, setInputChecked] = useState(' ')
  const [latestInput, setLatestInput] = useState(' ')
  const requestStatus = useSelector(selectInputStatus)

  const keypress = (e, str) => {
    console.log(str)
    let currentValue = e.target.value
    if (e.keyCode === 13) {
      if (currentValue === '') {
        setUserInput('Empty input!!')
      } else {
        dispatch(findPicsByUserInput(currentValue))
        if (inputChecked === 'rejected' && latestInput !== e.target.value) {
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
          setLatestInput(e.target.value)
        }
      }
    }
  }

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
      setUserInput('e.g: Black cat')
    }
  }, [searchedInput, requestStatus])

  return (
    <>
      <TextField
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Divider sx={{ height: 28, m: 1 }} orientation='vertical' />
              <IconButton
                type='button'
                sx={{ p: '10px' }}
                aria-label='search'
                onClick={() => {}}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
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
