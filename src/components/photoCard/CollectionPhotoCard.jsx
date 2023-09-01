import React, { useState } from 'react'
import './collectionPhotoCard.css'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import { useDispatch } from 'react-redux'
import { removeThisPhotoFromCollection } from '../../features/favourites/favouritesSlice'
import {
  Avatar,
  Box,
  Grid,
  Input,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Stack,
} from '@mui/material'
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import { green, pink } from '@mui/material/colors'
import DateRangeIcon from '@mui/icons-material/DateRange'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import Swal from 'sweetalert2'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import CloseIcon from '@mui/icons-material/Close'

const CollectionPhotoCard = ({
  index,
  id,
  date,
  width,
  height,
  description,
  altDescription,
  photo,
  likes,
  downloadLink,
}) => {
  const dispatch = useDispatch()
  const [editDescription, setEditDescription] = useState('')
  const [inputState, setInputState] = useState(true)

  const downloadPhoto = () => {
    const fileName = description
    const aTag = document.createElement('a')
    aTag.href = downloadLink
      .split('?')[0]
      .concat(`?force=true?ixit=${process.env.REACT_APP_ACCESS_KEY}`)
    aTag.setAttribute('download', fileName)
    document.body.appendChild(aTag)
    aTag.click()
    aTag.remove()
  }

  const handleToRemoveFromCollection = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeThisPhotoFromCollection(id))
        Swal.fire(
          'Deleted!',
          'The photo has been deleted from collection.',
          'success'
        )
      }
    })
  }

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
    color: '#4966A6',
    bgcolor: '#FABE58',
  }

  const keypress = (e) => {
    if (e.keyCode === 13) {
      setEditDescription(e.target.value)
      e.target.value = ''
    }
  }

  const handleClick = (e) => {
    setInputState(!inputState ? true : false)
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
    bgcolor: 'rgba(255, 255, 255, 0.85)',
    boxShadow: 24,
    p: 3,
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <Stack className='photo-card'>
        <section>
          <ListItemText
            sx={{
              textAlign: 'center',
              p: 1,
            }}
            disableTypography
            secondary={width + ' x ' + height}
          />
        </section>
        <section className='imagen-section'>
          <img src={photo} alt='' onClick={handleOpen} />
        </section>
        <section>
          <ListItemText
            sx={{
              textAlign: 'center',
              p: 1,
            }}
            disableTypography
            secondary={
              !description
                ? altDescription
                : !altDescription
                ? 'No description yet'
                : description
            }
          />
        </section>
        <section className='action-span'>
          <span className='download'>
            <DownloadForOfflineIcon
              onClick={downloadPhoto}
              fontSize='large'
              sx={{ color: '#4966A6' }}
            />
          </span>
          <span className='fav-icon'>
            <HeartBrokenIcon
              onClick={handleToRemoveFromCollection}
              className='heart-icon-liked'
              fontSize='large'
              sx={{ color: '#B65F9F', '&:hover': { color: '#4966A6' } }}
            />
          </span>
          <span className='full-screen'>
            <InfoRoundedIcon
              onClick={handleOpen}
              fontSize='large'
              sx={{ color: '#4966A6' }}
            />
          </span>
        </section>
      </Stack>
      {/* modal */}
      <Modal
        open={open}
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
                <img src={photo} alt='' />
              </section>
              {
                <Grid item>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar
                        variant='rounded'
                        sx={inputState ? editAvatar : onEditAvatar}
                      >
                        <EditRoundedIcon onClick={handleClick} />
                      </Avatar>
                    </ListItemAvatar>

                    <Input
                      placeholder='Edit description'
                      fullWidth
                      onKeyDown={keypress}
                      disabled={inputState}
                    />
                  </ListItem>
                  <ListItemText
                    primary={
                      editDescription
                        ? `Your custom description: ${editDescription}`
                        : editDescription
                    }
                    secondary={
                      !description
                        ? 'This image do not have a description yet'
                        : `Description: ${description}`
                    }
                  />
                </Grid>
              }
            </Grid>
            {/* likes+date+size */}
            <Grid container direction='row' justifyContent='center'>
              {
                <Grid item xs={12} sm={4} md={4} xl={4}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded' sx={likeAvatar}>
                        <ThumbUpRoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={likes} />
                  </ListItem>
                </Grid>
              }
              {
                <Grid item xs={12} sm={4} md={4} xl={4}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded' sx={dateAvatar}>
                        <DateRangeIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={date} />
                  </ListItem>
                </Grid>
              }
              {
                <Grid item xs={12} sm={4} md={4} xl={4}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded' sx={dateAvatar}>
                        <AspectRatioIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={width + ' x ' + height} />
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

export default CollectionPhotoCard
