import React, { useEffect, useState } from 'react'
import './cardGrid.css'
import PhotoCard from './PhotoCard'
import { useSelector } from 'react-redux'
import {
  initialPhotos,
  searchedPicsByUserInput,
  selectStatus,
} from '../../features/search/searchSlice'
import Intro from '../intro/Intro'
import Swal from 'sweetalert2'

const CardGrid = (initialPics) => {
  const fetchInitialPhotos = useSelector(initialPhotos)
  const fetchSearchedPicsByUserInput = useSelector(searchedPicsByUserInput)
  const fetchStatus = useSelector(selectStatus)
  const [photoList, setPhotoList] = useState('')

  useEffect(() => {
    if (fetchStatus === 'succeeded') {
      setPhotoList('loadData')
    } else if (fetchStatus === 'loading') {
      setPhotoList('loading')
    } else if (fetchStatus === 'failed') {
      setPhotoList('noMoreCallsToApi')
    }
  }, [fetchStatus])

  const noMoreCalls = () => {
    Swal.fire({
      title: 'Sorry!',
      text: 'We apologize, but this free service has a limited number of requests. Please wait a few minutes!',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  return (
    <>
      {photoList === 'noMoreCallsToApi' ? (
        <span className='alert-container'>{noMoreCalls()}</span>
      ) : photoList === 'loading' ? (
        <h1>Loading Pics</h1>
      ) : (
        <div className='photo-grid'>
          <Intro />
          {fetchSearchedPicsByUserInput.length === 0
            ? fetchInitialPhotos.map((e, i) => (
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
            : fetchSearchedPicsByUserInput.map((e, i) => (
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
      )}
      {/* {photoList === 'loading' && } */}
    </>
  )
}

export default CardGrid
