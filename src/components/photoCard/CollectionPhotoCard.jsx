import React, { useState } from 'react'
import './collectionPhotoCard.css'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { useDispatch } from 'react-redux'
import { removeThisPhotoFromCollection } from '../../store/slices/favouritesSlice'
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
    let disable = false
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
    dispatch(removeThisPhotoFromCollection(id))
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    height: 'fit-content',
    borderRadius: 1,
    bgcolor: 'rgba(255, 255, 255, 0.92)',
    boxShadow: 24,
    p: 4,
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
        <section></section>
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
              sx={{ color: '#B65F9F' }}
            />
          </span>
          <span className='full-screen'>
            <OpenInFullIcon
              onClick={handleOpen}
              fontSize='large'
              sx={{ color: '#4966A6' }}
            />
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Grid
                  container
                  direction='column'
                  justifyContent='space-evenly'
                  alignItems='center'
                >
                  <Grid item>
                    <section className='modal-imagen-section'>
                      <img src={photo} alt='' />
                    </section>
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justifyContent='start'
                    alignItems='center'
                  >
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
                      <Grid item xs={12} sm={8} md={8} xl={8}>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar variant='rounded' sx={editAvatar}>
                              <EditRoundedIcon onClick={handleClick} />
                            </Avatar>
                          </ListItemAvatar>
                          <TextField
                            onKeyDown={keypress}
                            id='outlined-basic'
                            label={editDescription}
                            variant='outlined'
                            on
                          />
                        </ListItem>
                        <ListItemText secondary={editDescription} />
                      </Grid>
                    }
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justifyContent='start'
                    alignItems='center'
                  >
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
                  </Grid>
                  <Grid
                    container
                    direction='row'
                    justifyContent='start'
                    alignItems='center'
                  >
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
                {/* <Typography
                  id='modal-modal-description'
                  sx={{ width: 170, mt: 2 }}
                >
                  Duis mollis, est non commodo luctus, nisi erat porttitor
                  ligula.
                </Typography> */}
              </Box>
            </Modal>
          </span>
        </section>
      </div>
    </>
  )
}

export default CollectionPhotoCard
