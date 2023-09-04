import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './cardGrid.css'

//? COMPONENTS
import PhotoCard from './PhotoCard'
import Intro from '../intro/Intro'

//? SELECTORS
import {
  initialPhotos,
  selectStatus,
  searchedPicsByUserInput,
} from '../../features/search/searchSlice'

//? MUI COMPONENTS
import { LinearProgress } from '@mui/material'

//? SWEET ALERT
import Swal from 'sweetalert2'

const CardGrid = () => {
  const fetchInitialPhotos = useSelector(initialPhotos)
  const fetchStatus = useSelector(selectStatus)
  const fetchSearchedPicsByUserInput = useSelector(searchedPicsByUserInput)
  const [photoList, setPhotoList] = useState('')

  useEffect(() => {
    if (fetchStatus === 'rejected') {
      setPhotoList('rejected')
    }
    // else if (fetchStatus === 'pending') {
    //   setPhotoList('pending')
    // }
    else if (fetchStatus === 'fulfilled') {
      setPhotoList('fulfilled')
    }
  }, [fetchStatus])

  const noMoreCalls = () => {
    Swal.fire({
      text: 'We apologize, but this free service has a limited number of requests. Please wait a few minutes!',
      imageUrl: 'https://unsplash.it/400/200',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }
  return (
    <>
      {photoList === 'rejected' ? (
        <span className='alert-container'>{noMoreCalls()}</span>
      ) : photoList === 'pending' ? (
        <LinearProgress color='secondary' />
      ) : (
        photoList === 'fulfilled' && (
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
        )
      )}
    </>
  )
}

export default CardGrid
