import React from 'react'
import './cardGrid.css'
import PhotoCard from './PhotoCard'
import { useSelector } from 'react-redux'

const CardGrid = (initialPics) => {
  const initialPhotos = useSelector((state) => state.browsedImages.initialFetch)

  return (
    <>
      <div className='photo-grid'>
        {initialPhotos.map((e, i) => (
          <PhotoCard key={i} index={i} photo={e.uriMedium} id={e.id} />
        ))}
      </div>
    </>
  )
}

export default CardGrid
