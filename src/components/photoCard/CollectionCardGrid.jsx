import React from 'react'
import './collectionCardGrid.css'
import CollectionPhotoCard from './CollectionPhotoCard'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  savedPhotos,
  sortAllPhotosByDate,
  sortAllPhotosByHeight,
  sortAllPhotosByLikes,
  sortAllPhotosByWidth,
} from '../../features/favourites/favouritesSlice'
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import SearchBar from '../searchBar/SearchBar'
import FilterListIcon from '@mui/icons-material/FilterList'

const CollectionCardGrid = (initialPics) => {
  const [sortSelection, setSortSelection] = React.useState('')
  const dispatch = useDispatch()
  const savedPics = useSelector(savedPhotos)

  const handleChange = (e) => {
    setSortSelection(e.target.value)
    // setSortSelection(event.target as string);
  }
  return (
    <>
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
                <MenuItem
                  value='Width'
                  onClick={() => dispatch(sortAllPhotosByWidth())}
                >
                  Width
                </MenuItem>
                <MenuItem
                  value='Heigth'
                  onClick={() => dispatch(sortAllPhotosByHeight())}
                >
                  Heigth
                </MenuItem>
                <MenuItem
                  value='Date'
                  onClick={() => dispatch(sortAllPhotosByDate())}
                >
                  Date
                </MenuItem>
                <MenuItem
                  value='Likes'
                  onClick={() => dispatch(sortAllPhotosByLikes())}
                >
                  Likes
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={1}></Grid>
        </Grid>
        <SearchBar isMobile={true} />
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
              altDescription={e.altDescription}
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
