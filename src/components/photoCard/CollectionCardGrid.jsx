import React from 'react'
import './collectionCardGrid.css'
import CollectionPhotoCard from './CollectionPhotoCard'
import { useSelector } from 'react-redux'

const CollectionCardGrid = (initialPics) => {
  const savedPics = useSelector((state) => state.favouritesPhotos.savedPhotos)

  return (
    <>
      <div className='photo-grid'>
        {savedPics.length === 0 ? (
          <img
            className='nothing-added'
            src={require('../../assets/images/nothingAdded.png')}
            alt='logo'
          />
        ) : (
          savedPics.map((e, i) => (
            <CollectionPhotoCard
              index={i}
              id={e.id}
              date={e.date}
              width={e.width}
              height={e.height}
              description={e.description}
              altDescription={e.descriptionFromAlt}
              photo={e.photo}
              likes={e.likes}
              downloadLink={e.downloadLink}
              key={i}
            />
          ))
        )}
      </div>
    </>
  )
}

export default CollectionCardGrid
