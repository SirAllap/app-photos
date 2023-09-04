import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './photoCard.css'

//? ACTIONS
import { saveThisPhotoToCollection } from '../../features/favourites/favouritesSlice'
import { removeThisPhotoFromHome } from '../../features/search/searchSlice'
import { fetch1Pic } from '../../features/search/searchThunks'

//? MUI COMPONENTS
import { Box, Grid, Modal, Stack } from '@mui/material'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'

//? SWEET ALERT
import Swal from 'sweetalert2'

const PhotoCard = ({
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

  const downloadPhoto = () => {
    Swal.fire({
      position: 'bottom-end',
      icon: 'info',
      text: 'Downloading',
      width: 'auto',
      heightAuto: true,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: 1000,
      backdrop: false,
    })
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

  const handleSave2Collection = () => {
    const formattedDate = date.split('T')[0]
    const imgData = {
      index: index,
      id: id,
      date: formattedDate,
      width: width,
      height: height,
      description: description,
      altDescription: altDescription,
      photo: photo,
      likes: likes,
      downloadLink: downloadLink,
    }
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      text: 'The photo has been successfully added to the collection',
      width: 'auto',
      heightAuto: true,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: 1000,
      backdrop: false,
    })
    setTimeout(() => {
      dispatch(saveThisPhotoToCollection(imgData))
      dispatch(fetch1Pic())
      dispatch(removeThisPhotoFromHome(id))
    }, 500)
  }

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    maxWidth: '90%',
    maxHeight: '90%',
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Stack className='photo-card'>
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
              onClick={handleSave2Collection}
              className='heart-icon-liked'
              fontSize='large'
              sx={{ color: '#4966A6' }}
            />
          </span>
          <span className='full-screen'>
            <OpenInFullIcon
              fontSize='large'
              sx={{ color: '#4966A6' }}
              onClick={handleOpen}
            />
          </span>
        </section>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        BackdropProps={{
          style: { backgroundColor: 'hsla(0, 0%, 98%, 0.8)' },
        }}
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
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}

export default PhotoCard
