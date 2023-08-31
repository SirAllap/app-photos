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
                index={i}
                id={e.id}
                date={e.date}
                width={e.width}
                height={e.height}
                description={e.description}
                altDescription={e.descriptionFromAlt}
                photo={e.uriMedium}
                likes={e.likes}
                downloadLink={e.download}
                key={i}
              />
            ))
          : searchedPicsByUserInput.map((e, i) => (
              <PhotoCard
                index={i}
                id={e.id}
                date={e.date}
                width={e.width}
                height={e.height}
                description={e.description}
                altDescription={e.descriptionFromAlt}
                photo={e.uriMedium}
                likes={e.likes}
                downloadLink={e.download}
                key={i}
              />
            ))}
      </div>
    </>
  )
}

export default CardGrid
