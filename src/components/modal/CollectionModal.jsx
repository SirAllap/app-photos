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
  ListItemText,
  Modal,
  TextField,
} from '@mui/material'
import { green, pink } from '@mui/material/colors'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import DateRangeIcon from '@mui/icons-material/DateRange'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import CloseIcon from '@mui/icons-material/Close'
import SaveAsIcon from '@mui/icons-material/SaveAs'

const CollectionModal = () => {
  const dispatch = useDispatch()
  const [editDescription, setEditDescription] = useState('')
  const [previousCustomDescription, setPreviousCustomDescription] = useState('')
  const [fetchDescription, setFetchDescription] = useState('')
  const [inputState, setInputState] = useState(true)
  const modalViewCollection = useSelector(modalViewState)
  const modalCurrentPhotoOfTheModal = useSelector(currentPhotoOfTheModal)
  const description = modalCurrentPhotoOfTheModal.description
  const altDescription = modalCurrentPhotoOfTheModal.altDescription
  const customDescription = modalCurrentPhotoOfTheModal.customDescription
  const id = modalCurrentPhotoOfTheModal.id

  useEffect(() => {
    if (editDescription !== '') {
      setFetchDescription(editDescription)
    } else if (editDescription === '' && description !== null) {
      setFetchDescription(description)
    } else if (
      editDescription === '' &&
      description === null &&
      altDescription !== null
    ) {
      setFetchDescription(altDescription)
    } else {
      setFetchDescription('This image do not have a description yet')
    }
    customDescription && setPreviousCustomDescription(customDescription)
  }, [modalViewCollection, editDescription, altDescription, description])

  const inputOnChange = (e) => {
    setInputState(false)
    setEditDescription(e.target.value)
  }

  const handleClickAndSave = (e) => {
    setInputState(true)
    setFetchDescription(editDescription)
    dispatch(manageNewDescription({ id: id, str: editDescription }))
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
            {/* closeBtn */}
            <Avatar variant='rounded' sx={closeAvatar} onClick={handleClose}>
              <CloseIcon />
            </Avatar>

            {/* img+edit */}
            <Grid item>
              <section className='modal-imagen-collection-section'>
                <img src={modalCurrentPhotoOfTheModal.photo} alt='' />
              </section>
              {
                <Grid item>
                  <ListItem>
                    <ListItemAvatar>
                      {inputState ? (
                        //? edition buttons
                        <Avatar
                          variant='rounded'
                          sx={inputState ? editAvatar : onEditAvatar}
                        >
                          <EditRoundedIcon onClick={inputOnChange} />
                        </Avatar>
                      ) : (
                        <Avatar
                          variant='rounded'
                          sx={inputState ? editAvatar : onEditAvatar}
                        >
                          <SaveAsIcon onClick={handleClickAndSave} />
                        </Avatar>
                      )}
                    </ListItemAvatar>

                    <TextField
                      //? text edit input
                      defaultValue={'Edit'}
                      hiddenLabel
                      fullWidth
                      onChange={inputOnChange}
                      onKeyDown={(event) => {
                        if (event.keyCode === 13) {
                          event.preventDefault()
                          setInputState(true)
                          setFetchDescription(editDescription)
                          dispatch(
                            manageNewDescription({
                              id: id,
                              str: editDescription,
                            })
                          )
                        }
                      }}
                      disabled={inputState}
                      variant='standard'
                    />
                  </ListItem>

                  <ListItemText
                    secondary={
                      !previousCustomDescription
                        ? null
                        : `Custom: ${previousCustomDescription}`
                    }
                  />
                  <ListItemText
                    secondary={`Original: ${
                      !description ? altDescription : description
                    }`}
                  />
                </Grid>
              }
            </Grid>
            {/* likes+date+size */}
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
                    <ListItemText primary={modalCurrentPhotoOfTheModal.likes} />
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
                    <ListItemText primary={modalCurrentPhotoOfTheModal.date} />
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
                    <ListItemText
                      primary={
                        modalCurrentPhotoOfTheModal.width +
                        ' x ' +
                        modalCurrentPhotoOfTheModal.height
                      }
                    />
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

const likeAvatar = {
  bgcolor: pink[500],
}
const dateAvatar = {
  bgcolor: green[500],
}
const editAvatar = {
  cursor: 'pointer',
  bgcolor: '#4966A6',
}
const onEditAvatar = {
  cursor: 'pointer',
  color: '#4966A6',
  bgcolor: '#FABE58',
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
