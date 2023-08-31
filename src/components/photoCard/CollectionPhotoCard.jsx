import React, { useState } from 'react'
import './collectionPhotoCard.css'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { useDispatch } from 'react-redux'
import { removeThisPhotoFromCollection } from '../../features/favourites/favouritesSlice'
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
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded'
import { green, pink } from '@mui/material/colors'
import DateRangeIcon from '@mui/icons-material/DateRange'
import AspectRatioIcon from '@mui/icons-material/AspectRatio'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import Swal from 'sweetalert2'

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

  const handleClick = () => {
    setEditDescription(description)
  }

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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'fit-content',
    maxWidth: '80vw',
    height: 'fit-content',
    maxHeight: '80vh',
    borderRadius: 1,
    bgcolor: 'rgba(255, 255, 255, 0.85)',
    boxShadow: 24,
    p: 6,
  }

  const likeAvatar = {
    bgcolor: pink[500],
  }
  const dateAvatar = {
    bgcolor: green[500],
  }
  const editAvatar = {
    bgcolor: '#4966A6',
  }
  const onEditAvatar = {
    color: '#4966A6',
    bgcolor: '#FABE58',
  }

  const keypress = (e) => {
    if (e.keyCode === 13) {
      setEditDescription(e.target.value)
    }
  }

  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <div className='photo-card'>
        <section className='imagen-section'>
          <img src={photo} alt='' onClick={handleOpen} />
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
            <FavoriteIcon
              onClick={handleToRemoveFromCollection}
              className='heart-icon-liked'
              fontSize='large'
              sx={{ color: '#B65F9F', '&:hover': { color: '#4966A6' } }}
            />
          </span>
          <span className='full-screen'>
            <OpenInFullIcon
              onClick={handleOpen}
              fontSize='large'
              sx={{ color: '#4966A6' }}
            />
          </span>
        </section>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={modalStyle}>
          <Grid
            container
            direction='row'
            justifyContent='space-evenly'
            alignItems='center'
          >
            <Grid item>
              <section className='modal-imagen-section'>
                <img src={photo} alt='' />
              </section>
              {
                <Grid item>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar variant='rounded' sx={editAvatar}>
                        <EditRoundedIcon onClick={handleClick} />
                      </Avatar>
                    </ListItemAvatar>
                    <TextField
                      fullWidth
                      onKeyDown={keypress}
                      id='outlined-basic'
                      label={editDescription}
                      variant='outlined'
                    />
                  </ListItem>
                  <ListItemText secondary={editDescription} />
                </Grid>
              }
            </Grid>
            <Grid
              item
              container
              justifyContent='space-evenly'
              alignItems='center'
              direction='row'
            >
              {
                <Grid item>
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
                <Grid item>
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
                <Grid item>
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
