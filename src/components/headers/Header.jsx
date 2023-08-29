import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import AppsIcon from '@mui/icons-material/Apps'
import HomeIcon from '@mui/icons-material/Home'
import Button from '@mui/material/Button'
import SearchBar from '../searchBar/SearchBar'
// Mui colors
import { purple } from '@mui/material/colors'
import { Grid } from '@mui/material'
import Chips from '../chips/Chips'

function header({ chips, button }) {
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
              {button === 'collection' ? (
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
              ) : (
                <Link className='buttonTo' to='../'>
                  <Button
                    sx={{
                      height: '56px',
                    }}
                    style={{ color: purple[400] }}
                    color='secondary'
                    variant='outlined'
                    endIcon={<HomeIcon />}
                  >
                    Home
                  </Button>
                </Link>
              )}
            </Grid>

            <Grid item xs={0} sm={0} md={1} xl={1}></Grid>
          </Grid>
          {chips && (
            <Grid
              sx={{
                margin: '10px auto 20px auto',
                width: '50%',
              }}
              container
              direction='row'
              justifyContent='space-evenly'
              alignItems='center'
            >
              <Chips />
            </Grid>
          )}
        </Grid>
      </div>
    </>
  )
}

export default header
