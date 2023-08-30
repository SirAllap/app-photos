import React, { useState } from 'react'
import './photoCard.css'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import FavoriteIcon from '@mui/icons-material/Favorite'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
import { useDispatch } from 'react-redux'
import {
  removeThisPhotoFromCollection,
  saveThisPhotoToCollection,
} from '../../store/slices/favouritesSlice'

const CollectionPhotoCard = ({
  index,
  id,
  width,
  height,
  description,
  altDescription,
  photo,
  likes,
  downloadLink,
}) => {
  const dispatch = useDispatch()
  const [clicked, setClicked] = useState(false)

  const handleIconClick = (id) => {
    setClicked(true)
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

  //   const handleSave2Collection = () => {
  //     const imgData = {
  //       index: index,
  //       id: id,
  //       width: width,
  //       height: height,
  //       description: description,
  //       altDescription: altDescription,
  //       photo: photo,
  //       likes: likes,
  //       downloadLink: downloadLink,
  //     }
  //     dispatch(saveThisPhotoToCollection(imgData))
  //   }

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
              onClick={handleToRemoveFromCollection}
              className='heart-icon-liked'
              fontSize='large'
              sx={{ color: '#B65F9F' }}
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

export default CollectionPhotoCard
