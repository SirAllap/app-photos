import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './collectionPhotoCard.css'

//? ACTIONS
import { removeThisPhotoFromCollection } from '../../features/favourites/favouritesSlice'
import { manageModalView } from '../../features/favourites/favouritesSlice'

//? MUI COMPONENTS
import { Stack } from '@mui/material'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'

//? SWEET ALERT
import Swal from 'sweetalert2'

const CollectionPhotoCard = ({
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
  customDescription,
}) => {
  const dispatch = useDispatch()

  const [fetchDescription, setFetchDescription] = useState('')
  useEffect(() => {
    customDescription
      ? setFetchDescription(customDescription)
      : !customDescription && description
      ? setFetchDescription(description)
      : !customDescription && !description && altDescription
      ? setFetchDescription(altDescription)
      : setFetchDescription('This image do not have a description yet')
  }, [customDescription, altDescription, description])

  const downloadPhoto = () => {
    Swal.fire({
      position: 'bottom-end',
      icon: 'info',
      text: 'Downloading',
      width: 'auto',
      heightAuto: true,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: 1000,
      backdrop: false,
    })
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
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeThisPhotoFromCollection(id))
        Swal.fire(
          'Deleted!',
          'The photo has been deleted from collection.',
          'success'
        )
      }
    })
  }

  // This handle the open of the collection modal
  const handleOpen = () => {
    dispatch(manageModalView(id, true))
  }

  return (
    <>
      <Stack className='photo-card-collection'>
        <section className='card-items-collection'>
          <section className='imagen-section-collection'>
            <p>{width + ' x ' + height}</p>

            <img src={photo} alt='' onClick={handleOpen} />

            <p>{fetchDescription}</p>
          </section>
          <section className='action-span-collection'>
            <span className='download-collection'>
              <DownloadForOfflineIcon
                onClick={downloadPhoto}
                fontSize='large'
                sx={{ color: '#4966A6' }}
              />
            </span>
            <span className='fav-icon-collection'>
              <HeartBrokenIcon
                onClick={handleToRemoveFromCollection}
                className='heart-icon-liked-collection'
                fontSize='large'
                sx={{ color: '#B65F9F', '&:hover': { color: '#4966A6' } }}
              />
            </span>
            <span className='full-screen-collection'>
              <InfoRoundedIcon
                onClick={handleOpen}
                fontSize='large'
                sx={{ color: '#4966A6' }}
              />
            </span>
          </section>
        </section>
      </Stack>
    </>
  )
}

export default CollectionPhotoCard
