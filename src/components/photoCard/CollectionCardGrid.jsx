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

const CollectionCardGrid = (initialPics) => {
  const dispatch = useDispatch()
  const savedPics = useSelector(savedPhotos)

  return (
    <>
      <Grid
        container
        sx={{ p: 4, width: '100%' }}
        justifyContent='space-between'
      >
        <Grid item xs={9}></Grid>

        <Grid item xs={2}>
          <FormControl size='small' variant='standard' fullWidth>
            <InputLabel>Sort by</InputLabel>
            <Select>
              <MenuItem onClick={() => dispatch(sortAllPhotosByWidth())}>
                Width
              </MenuItem>
              <MenuItem onClick={() => dispatch(sortAllPhotosByHeight())}>
                Heigth
              </MenuItem>
              <MenuItem onClick={() => dispatch(sortAllPhotosByDate())}>
                Date
              </MenuItem>
              <MenuItem onClick={() => dispatch(sortAllPhotosByLikes())}>
                Likes
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={1}></Grid>
      </Grid>
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
