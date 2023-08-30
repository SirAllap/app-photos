import React from 'react'
import './cardGrid.css'
import PhotoCard from './PhotoCard'
import { useSelector } from 'react-redux'

const CardGrid = (initialPics) => {
  const initialPhotos = useSelector((state) => state.browsedImages.initialFetch)
  const searchedPicsByUserInput = useSelector(
    (state) => state.browsedImages.search.pics
  )
  return (
    <>
      <div className='photo-grid'>
        {searchedPicsByUserInput.length === 0
          ? initialPhotos.map((e, i) => (
              <PhotoCard
                key={i}
                index={i}
                photo={e.uriMedium}
                id={e.id}
                downloadLink={e.download}
              />
            ))
          : searchedPicsByUserInput.map((e, i) => (
              <PhotoCard
                key={i}
                index={i}
                photo={e.uriMedium}
                id={e.id}
                downloadLink={e.download}
              />
            ))}
      </div>
    </>
  )
}

export default CardGrid
