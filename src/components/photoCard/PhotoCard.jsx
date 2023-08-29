import React from 'react'
import './photoCard.css'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import OpenInFullIcon from '@mui/icons-material/OpenInFull'
// Mui colors
import { purple } from '@mui/material/colors'
import { blue } from '@mui/material/colors'

function PhotoCard({ index, photo }) {
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
