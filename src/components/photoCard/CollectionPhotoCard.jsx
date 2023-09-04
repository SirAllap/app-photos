import React, { useEffect, useState } from 'react'
import './collectionPhotoCard.css'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
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
import SaveAsIcon from '@mui/icons-material/SaveAs'

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
  const [fetchDescription, setFetchDescription] = useState('')
  const [inputState, setInputState] = useState(true)

  useEffect(() => {
    editDescription
      ? setFetchDescription(editDescription)
      : !editDescription && description
      ? setFetchDescription(description)
      : !editDescription && !description && altDescription
      ? setFetchDescription(altDescription)
      : setFetchDescription('This image do not have a description yet')
  }, [editDescription, altDescription, description])

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
    cursor: 'pointer',
    color: '#4966A6',
    bgcolor: '#FABE58',
  }

  const inputOnChange = (e) => {
    setInputState(false)
    setEditDescription(e.target.value)
  }

  const handleClickAndSave = (e) => {
    setInputState(true)
    console.log(editDescription)
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
      {/* <Stack>
        <Paper
          elevation={0}
          sx={{
            marginBottom: '20px',
            marginTop: '10px',
            backgroundColor: '#fafafa',
            fontWeight: 600,
          }}
        ></Paper>
        <section className='helper-text'>
          <Paper
            elevation={0}
            sx={{
              marginTop: '15px',
              backgroundColor: '#fafafa',
              fontWeight: 600,
            }}
          >
            <Typography variant='p' align='center' gutterBottom>
              {fetchDescription}
            </Typography>
          </Paper>
        </section>
      </Stack> */}

      <Stack className='photo-card-collection'>
        <section className='card-items-collection'>
          <section className='imagen-section-collection'>
            <p>{width + ' x ' + height}</p>

            <img src={photo} alt='' onClick={handleOpen} />

            <p>{fetchDescription}</p>
          </section>
          <section className='action-span-collection'>
            <span className='download-collection'>
              <DownloadForOfflineIcon
                onClick={downloadPhoto}
                fontSize='large'
                sx={{ color: '#4966A6' }}
              />
            </span>
            <span className='fav-icon-collection'>
              <HeartBrokenIcon
                onClick={handleToRemoveFromCollection}
                className='heart-icon-liked-collection'
                fontSize='large'
                sx={{ color: '#B65F9F', '&:hover': { color: '#4966A6' } }}
              />
            </span>
            <span className='full-screen-collection'>
              <InfoRoundedIcon
                onClick={handleOpen}
                fontSize='large'
                sx={{ color: '#4966A6' }}
              />
            </span>
          </section>
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
                        {inputState ? (
                          <EditRoundedIcon onClick={inputOnChange} />
                        ) : (
                          <SaveAsIcon onClick={handleClickAndSave} />
                        )}
                      </Avatar>
                    </ListItemAvatar>

                    <Input
                      defaultValue={fetchDescription}
                      fullWidth
                      onChange={inputOnChange}
                      disabled={inputState}
                    />
                  </ListItem>
                  <ListItemText primary={fetchDescription} />
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
                    <ListItemText primary={likes} />
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
                    <ListItemText primary={date} />
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
