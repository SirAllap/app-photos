import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './collectionCardGrid.css'

//? COMPONENTS
import CollectionPhotoCard from './CollectionPhotoCard'
import CollectionModal from '../modal/CollectionModal'

//? ACTIONS
import { savedPhotos } from '../../features/favourites/favouritesSlice'

//? MUI COMPONENTS
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'

const CollectionCardGrid = (initialPics) => {
  const [sortSelection, setSortSelection] = useState('')
  const [sortedPhotos, setSortedPhotos] = useState([])
  const savedPics = useSelector(savedPhotos)

  useEffect(() => {
    setSortedPhotos(savedPics)
  }, [savedPics])

  const handleChange = (e) => {
    setSortSelection(e.target.value)
  }

  const handleSort = (type) => {
    switch (type) {
      case 'width':
        let widthResult = [...sortedPhotos]
        widthResult.sort((a, b) => (a.width < b.width ? 1 : -1))
        setSortedPhotos(widthResult)
        break
      case 'heigth':
        let heightResult = [...sortedPhotos]
        heightResult.sort((a, b) => (a.height < b.height ? 1 : -1))
        setSortedPhotos(heightResult)
        break
      case 'date':
        let dateResult = [...sortedPhotos]
        dateResult.sort((a, b) => (a.date < b.widdateth ? 1 : -1))
        setSortedPhotos(dateResult)
        break
      case 'likes':
        let likesResult = [...sortedPhotos]
        likesResult.sort((a, b) => (a.likes < b.likes ? 1 : -1))
        setSortedPhotos(likesResult)
        break
      default:
        break
    }
  }

  return (
    <>
      <CollectionModal />
      <div className='photo-grid'>
        <Grid
          container
          sx={{ p: 4, width: '100%' }}
          justifyContent='space-between'
        >
          <Grid item xs={1} sm={9} md={9} xl={9}></Grid>

          <Grid item xs={12} sm={2} md={2} xl={2}>
            <FormControl size='small' variant='standard' fullWidth>
              <InputLabel id='demo-simple-select'>Sort by</InputLabel>
              <Select
                IconComponent={FilterListIcon}
                id='demo-simple-select'
                onChange={handleChange}
                value={sortSelection}
              >
                <MenuItem value='Width' onClick={() => handleSort('width')}>
                  Width
                </MenuItem>
                <MenuItem value='Heigth' onClick={() => handleSort('heigth')}>
                  Heigth
                </MenuItem>
                <MenuItem value='Date' onClick={() => handleSort('date')}>
                  Date
                </MenuItem>
                <MenuItem value='Likes' onClick={() => handleSort('likes')}>
                  Likes
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={1}></Grid>
        </Grid>
        {savedPics.length === 0 ? (
          <img
            className='nothing-added'
            src={require('../../assets/images/nothingAdded.png')}
            alt='logo'
          />
        ) : sortedPhotos ? (
          sortedPhotos.map((e, i) => (
            <CollectionPhotoCard
              index={i}
              id={e.id}
              date={e.date}
              width={e.width}
              height={e.height}
              description={e.description}
              altDescription={e.altDescription}
              photo={e.photo}
              likes={e.likes}
              downloadLink={e.downloadLink}
              downloadLocationLink={e.downloadLocationLink}
              key={i}
              customDescription={
                e.customDescription !== '' ? e.customDescription : ''
              }
            />
          ))
        ) : (
          savedPics.map((e, i) => (
            <CollectionPhotoCard
              index={i}
              id={e.id}
              date={e.date}
              width={e.width}
              height={e.height}
              description={e.description}
              altDescription={e.altDescription}
              photo={e.photo}
              likes={e.likes}
              downloadLink={e.downloadLink}
              downloadLocationLink={e.downloadLocationLink}
              key={i}
              customDescription={
                e.customDescription !== '' ? e.customDescription : ''
              }
            />
          ))
        )}
      </div>
    </>
  )
}

export default CollectionCardGrid
