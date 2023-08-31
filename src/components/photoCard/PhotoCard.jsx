import React, { useEffect, useState } from 'react'
import './photoCard.css'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { useDispatch } from 'react-redux'
import { saveThisPhotoToCollection } from '../../features/favourites/favouritesSlice'
import {
  fetch1Pic,
  removeThisPhotoFromHome,
} from '../../features/search/searchSlice'
import { Stack } from '@mui/material'
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
    const d = date.split('T')[0]
    const imgData = {
      index: index,
      id: id,
      date: d,
      width: width,
      height: height,
      description: description,
      altDescription: altDescription,
      photo: photo,
      likes: likes,
      downloadLink: downloadLink,
    }
    Swal.fire({
      position: 'bottom',
      icon: 'success',
      text: 'The photo has been successfully added to the collection',
      width: 'auto',
      heightAuto: true,
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: 1500,
    })
    setTimeout(() => {
      dispatch(saveThisPhotoToCollection(imgData))
      dispatch(fetch1Pic())
      dispatch(removeThisPhotoFromHome(id))
    }, 1500)
  }

  return (
    <>
      <Stack className='photo-card'>
        <section></section>
        <section className='imagen-section'>
          <img src={photo} alt='' />
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
          {/* <span className='full-screen'>
            <OpenInFullIcon fontSize='large' sx={{ color: '#4966A6' }} />
          </span> */}
        </section>
      </Stack>
    </>
  )
}

export default PhotoCard
