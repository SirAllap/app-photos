import React, { useEffect, useState } from 'react'
import './photoCard.css'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { useDispatch } from 'react-redux'
import { saveThisPhotoToCollection } from '../../store/slices/favouritesSlice'
import {
  fetch1Pic,
  removeThisPhotoFromHome,
  removeThisPhotoFromTheSearchHome,
} from '../../store/slices/searchSlice'

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
    dispatch(saveThisPhotoToCollection(imgData))
    // dispatch(fetch1Pic())
    dispatch(removeThisPhotoFromHome(id))
  }

  return (
    <>
      <div className='photo-card'>
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
          <span className='full-screen'>
            <OpenInFullIcon fontSize='large' sx={{ color: '#4966A6' }} />
          </span>
        </section>
      </div>
    </>
  )
}

export default PhotoCard
