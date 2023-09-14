import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './photoCard.css'
import { saveThisPhotoToCollection } from '../../features/favourites/favouritesSlice'
import { removeLikedPic } from '../../features/search/searchSlice'
import { fetch1Pic } from '../../features/search/searchThunks'
import { Box, Grid, Link, Modal, Stack, Zoom } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined'
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
  downloadLocationLink,
  userName,
  downloads,
  views,
}) => {
  const dispatch = useDispatch()

  const [urlToDownload, setUrlToDOwnload] = useState('')

  const downloadPhoto = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      text: 'Downloading',
      width: 'auto',
      heightAuto: true,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: 1000,
      backdrop: false,
    })
    return setUrlToDOwnload(downloadLink)
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
      downloadLocationLink: downloadLocationLink,
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
      dispatch(removeLikedPic(id))
    }, 500)
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Zoom in={true} style={{ transitionDelay: '450ms' }}>
        <Stack sx={{ mb: 2 }} className='photo-card'>
          <section className='photo-info-home'>
            <p>
              Photo by{' '}
              <Link
                color={{ color: 'rgb(49, 49, 49)' }}
                underline='hover'
                href={
                  'https://unsplash.com/@' +
                  userName +
                  '?utm_source=OxygenAcademyPhotoApp&utm_medium=referral'
                }
              >
                {userName}
              </Link>{' '}
              on{' '}
              <Link
                color={{ color: 'rgb(49, 49, 49)' }}
                underline='hover'
                href='https://unsplash.com/?utm_source=OxygenAcademyPhotoApp&utm_medium=referral'
              >
                Unsplash
              </Link>
            </p>
          </section>
          <section className='imagen-section'>
            <img src={photo} alt={altDescription} onClick={handleOpen} />
          </section>
          <section className='photo-info-home'>
            {views && downloads && (
              <p>
                Views: {views} || Downloads: {downloads}
              </p>
            )}
          </section>
          <section className='action-span'>
            <span className='download'>
              <Link
                href={urlToDownload}
                underline='none'
                color='inherit'
                onClick={downloadPhoto}
              >
                <FileDownloadOutlinedIcon
                  fontSize='large'
                  sx={{ color: '#7d4aa9' }}
                />
              </Link>
            </span>
            <span className='fav-icon'>
              <FavoriteBorderOutlinedIcon
                onClick={handleSave2Collection}
                className='heart-icon-liked'
                fontSize='large'
                sx={{ color: '#7d4aa9' }}
              />
            </span>
            <span className='full-screen'>
              <CropSquareOutlinedIcon
                fontSize='large'
                sx={{ color: '#7d4aa9' }}
                onClick={handleOpen}
              />
            </span>
          </section>
        </Stack>
      </Zoom>
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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100vw',
  maxWidth: '90%',
  maxHeight: '90%',
}
