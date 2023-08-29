import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import AppsIcon from '@mui/icons-material/Apps'
import Button from '@mui/material/Button'
import SearchBar from '../searchBar/SearchBar'
// Mui colors
import { purple } from '@mui/material/colors'
import { Grid } from '@mui/material'

function header() {
  return (
    <>
      <div className='container'>
        <Grid
          container
          spacing={0}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item xs={0} sm={0} md={1} xl={1}></Grid>

          <Grid item xs={2} sm={2} md={3} xl={3}>
            <Link className='logoImg' to='../'>
              <img src={require('../../assets/images/logo.png')} alt='logo' />
            </Link>
          </Grid>

          <Grid item xs={2} sm={2} md={4} xl={6}>
            <SearchBar />
          </Grid>

          <Grid item item xs={1} sm={1} md={1} xl={1}>
            <Link className='buttonTo' to='../collection'>
              <Button
                sx={{
                  height: '56px',
                }}
                style={{ color: purple[400] }}
                color='secondary'
                variant='outlined'
                endIcon={<AppsIcon />}
              >
                Collection
              </Button>
            </Link>
          </Grid>

          <Grid item xs={0} sm={0} md={1} xl={1}></Grid>
        </Grid>
      </div>
    </>
  )
}

export default header
