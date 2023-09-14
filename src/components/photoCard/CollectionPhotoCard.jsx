import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './collectionPhotoCard.css'
import { removeThisPhotoFromCollection } from '../../features/favourites/favouritesSlice'
import { manageModalView } from '../../features/favourites/favouritesSlice'
import { Link, Stack, Typography } from '@mui/material'
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined'
import HeartBrokenIcon from '@mui/icons-material/HeartBroken'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
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
  downloadLocationLink,
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

  const [urlToDownload, setUrlToDOwnload] = useState('')

  const downloadPhoto = () => {
    Swal.fire({
      position: 'top-end',
      icon: 'info',
      text: 'Downloading',
      width: 'auto',
      heightAuto: true,
      showConfirmButton: false,
      timer: 1000,
      timerProgressBar: 1000,
      backdrop: false,
    })
    return setUrlToDOwnload(downloadLink)
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

  const handleOpen = () => {
    dispatch(manageModalView({ id: id, bol: true }))
  }

  return (
    <>
      <Stack sx={{ mb: 2 }} className='photo-card-collection'>
        <section className='card-items-collection'>
          <section className='imagen-section-collection'>
            <Typography
              align='justify'
              variant='p'
              component='p'
              sx={{ ml: 2, mr: 2, mt: 0.5, mb: 1 }}
            >
              {width + ' x ' + height}
            </Typography>

            <img src={photo} alt='' onClick={handleOpen} />

            <Typography
              align='justify'
              variant='p'
              component='p'
              sx={{ ml: 2, mr: 2, mt: 1 }}
            >
              {fetchDescription}
            </Typography>
          </section>
          <section className='action-span-collection'>
            <span className='download-collection'>
              <Link
                href={urlToDownload}
                underline='none'
                color='inherit'
                onClick={downloadPhoto}
              >
                <FileDownloadOutlinedIcon
                  fontSize='large'
                  sx={{ color: '#7d4aa9' }}
                />
              </Link>
            </span>
            <span className='fav-icon-collection'>
              <HeartBrokenIcon
                onClick={handleToRemoveFromCollection}
                className='heart-icon-liked-collection'
                fontSize='large'
                sx={{ color: '#7d4aa999', '&:hover': { color: '#7d4aa975' } }}
              />
            </span>
            <span className='full-screen-collection'>
              <TroubleshootOutlinedIcon
                onClick={handleOpen}
                fontSize='large'
                sx={{ color: '#7d4aa9' }}
              />
            </span>
          </section>
        </section>
      </Stack>
    </>
  )
}

export default CollectionPhotoCard
