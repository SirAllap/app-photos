import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './collectionModal.css'
import {
  currentPhotoOfTheModal,
  manageModalView,
  manageNewDescription,
  modalViewState,
} from '../../features/favourites/favouritesSlice'
import {
  Avatar,
  Box,
  Grid,
  ListItem,
  ListItemAvatar,
  Modal,
  TextField,
  Typography,
  styled,
} from '@mui/material'
import { pink } from '@mui/material/colors'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import DateRangeIcon from '@mui/icons-material/DateRange'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import CloseIcon from '@mui/icons-material/Close'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import Swal from 'sweetalert2'

const CollectionModal = () => {
  const dispatch = useDispatch()
  const [currentEditDescription, setCurrentEditDescription] = useState('')
  const [inputState, setInputState] = useState(true)
  const modalViewCollection = useSelector(modalViewState)
  const modalCurrentPhotoOfTheModal = useSelector(currentPhotoOfTheModal)
  const description = modalCurrentPhotoOfTheModal.description
  const altDescription = modalCurrentPhotoOfTheModal.altDescription
  const customDescriptionFromTheImage =
    modalCurrentPhotoOfTheModal.customDescription
  const id = modalCurrentPhotoOfTheModal.id

  useEffect(() => {
    setCurrentEditDescription(customDescriptionFromTheImage)
  }, [customDescriptionFromTheImage])

  const inputOnChange = (e) => {
    setInputState(false)
    setCurrentEditDescription(e.target.value)
  }

  const handleClickAndSave = () => {
    setInputState(true)
    Swal.fire({
      position: 'bottom',
      icon: 'success',
      text: 'Saved!',
      heightAuto: true,
      showConfirmButton: false,
      timer: 600,
      timerProgressBar: 600,
      backdrop: false,
    })
    return dispatch(
      manageNewDescription({ id: id, str: currentEditDescription })
    )
  }

  const handleClose = () => {
    dispatch(manageModalView({ id: null, bol: false }))
  }

  return (
    <>
      <Modal
        children
        open={modalViewCollection}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={collectionModalStyle}>
          <Grid
            container
            direction='column'
            justifyContent='space-evenly'
            alignItems='center'
          >
            <Avatar variant='rounded' sx={closeAvatar} onClick={handleClose}>
              <CloseIcon />
            </Avatar>

            <Grid item>
              <Typography
                align='justify'
                variant='p'
                component='p'
                sx={{ m: 1, ml: 0 }}
              >
                {description ? description : altDescription}
              </Typography>
              <section className='modal-imagen-collection-section'>
                <img src={modalCurrentPhotoOfTheModal.photo} alt='' />
              </section>
              <Typography
                align='justify'
                variant='p'
                component='p'
                sx={{ m: 1, ml: 0 }}
              >
                <mark className='modal-highlight'>Custom description:</mark>{' '}
                {customDescriptionFromTheImage
                  ? `${customDescriptionFromTheImage}`
                  : 'No custom description yet!'}
              </Typography>

              {
                <Grid item>
                  <ListItem>
                    <CssTextFieldDescriptionInput
                      //? text edit input
                      placeholder={
                        !customDescriptionFromTheImage
                          ? 'No custom description yet!'
                          : customDescriptionFromTheImage
                      }
                      hiddenLabel
                      fullWidth
                      onChange={inputOnChange}
                      onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                          event.preventDefault()
                          setInputState(true)
                          dispatch(
                            manageNewDescription({
                              id: id,
                              str: currentEditDescription,
                            })
                          )
                        }
                      }}
                      disabled={inputState}
                      variant='outlined'
                      size='small'
                      focused={!inputState}
                      style={{ color: '#4966A6' }}
                    />
                    <ListItemAvatar sx={editListItemAvatar}>
                      {inputState ? (
                        //? edition buttons
                        <Avatar
                          variant='rounded'
                          sx={inputState ? editAvatar : onEditAvatar}
                          onClick={inputOnChange}
                        >
                          <EditRoundedIcon />
                        </Avatar>
                      ) : (
                        <Avatar
                          variant='rounded'
                          sx={inputState ? editAvatar : onEditAvatar}
                          onClick={handleClickAndSave}
                        >
                          <SaveAsIcon />
                        </Avatar>
                      )}
                    </ListItemAvatar>
                  </ListItem>
                </Grid>
              }
            </Grid>
            <Grid container direction='row' justifyContent='center'>
              {<Grid item xs={0} sm={1} md={1} xl={1}></Grid>}
              {
                <Grid item xs={12} sm={3} md={3} xl={3}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded' sx={likeAvatar}>
                        <ThumbUpRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Typography variant='p' sx={{ p: 1 }}>
                      {modalCurrentPhotoOfTheModal.likes}
                    </Typography>
                  </ListItem>
                </Grid>
              }
              {
                <Grid item xs={12} sm={3} md={3} xl={3}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded' sx={dateAvatar}>
                        <DateRangeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <Typography variant='p' sx={{ p: 1 }}>
                      {modalCurrentPhotoOfTheModal.date}
                    </Typography>
                  </ListItem>
                </Grid>
              }
              {
                <Grid item xs={12} sm={3} md={3} xl={3}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded' sx={dateAvatar}>
                        <AspectRatioIcon />
                      </Avatar>
                    </ListItemAvatar>

                    <Typography variant='p' sx={{ p: 1 }}>
                      {modalCurrentPhotoOfTheModal.width +
                        ' x ' +
                        modalCurrentPhotoOfTheModal.height}
                    </Typography>
                  </ListItem>
                </Grid>
              }
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default CollectionModal

const closeAvatar = {
  cursor: 'pointer',
  position: 'absolute',
  top: '5px',
  right: '5px',
  bgcolor: 'rgba(160, 160, 160, 0.50)',
  color: 'rgba(64, 64, 64)',
  fontWeight: 'bold',
}

const CssTextFieldDescriptionInput = styled(TextField)({
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

const editListItemAvatar = {
  p: 0,
  paddingLeft: 3,
}
const likeAvatar = {
  bgcolor: pink[500],
  '&:hover': {
    bgcolor: pink[300],
  },
  width: 50,
  height: 50,
}
const dateAvatar = {
  bgcolor: '#9d81b6',
  '&:hover': {
    bgcolor: '#9d81b699',
  },
  width: 50,
  height: 50,
}
const editAvatar = {
  cursor: 'pointer',
  color: '#ffffff85',
  bgcolor: '#FABE5885',
  width: 40,
  height: 40,
  '&:hover': {
    color: '#fff',
    bgcolor: '#FABE58',
    transition: '500ms',
    transform: 'scale(1.1)',
  },
}
const onEditAvatar = {
  cursor: 'pointer',
  color: '#fff',
  bgcolor: '#FABE58',
  width: 40,
  height: 40,
  '&:hover': {
    color: '#ffffff85',
    bgcolor: '#FABE5885',
    transition: '500ms',
    transform: 'scale(1.1)',
  },
}

const collectionModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '75%',
  height: 'fit-content',
  maxWidth: '95%',
  maxHeight: '95%',
  borderRadius: 1,
  bgcolor: 'rgba(255, 255, 255, 0.65)',
  backdropFilter: 'blur(15px)',
  p: 3,
}
