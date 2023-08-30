import React from 'react'
import './photoCard.css'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
// Mui colors
import { purple } from '@mui/material/colors'
import { blue } from '@mui/material/colors'

const PhotoCard = ({ index, photo, id, downloadLink }) => {
  const openPhoto = () => {}

  const downloadPhoto = () => {
    // const fileName = index
    const aTag = document.createElement('a')
    aTag.href = downloadLink
      .split('?')[0]
      .concat(`?force=true?ixit=${process.env.REACT_APP_ACCESS_KEY}`)
    // aTag.setAttribute('download', 'img')
    document.body.appendChild(aTag)
    aTag.click()
    aTag.remove()
  }

  return (
    <>
      <div className='photo-card'>
        <section></section>
        <section className='imagen-section'>
          <img src={photo} alt='' onClick={openPhoto} />
        </section>

        <section className='action-span'>
          <span className='download'>
            <DownloadForOfflineIcon
              onClick={downloadPhoto}
              fontSize='large'
              sx={{ color: '#4966A6' }}
            />
          </span>
          <span className='fav-non-stuffed'>
            <FavoriteBorderIcon fontSize='large' sx={{ color: '#4966A6' }} />
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
