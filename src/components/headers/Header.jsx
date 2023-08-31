import React, { useEffect } from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import AppsIcon from '@mui/icons-material/Apps'
import HomeIcon from '@mui/icons-material/Home'
import Button from '@mui/material/Button'
import SearchBar from '../searchBar/SearchBar'
import { AppBar, Grid } from '@mui/material'
import Chips from '../chips/Chips'

const Header = ({ chips, button, mobile }) => {
  return (
    <>
      <AppBar
        position='sticky'
        top='0px'
        style={{ background: 'rgba(255, 255, 255, 0.62)', boxShadow: 'none' }}
        className='container'
      >
        <Grid
          container
          spacing={0}
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid item xs={0.2} sm={0.2} md={0.5} xl={0.5}></Grid>
          {/* LOGO */}
          <Grid item xs={12} sm={0} md={3} xl={3}>
            <Link className='logoImg' to='../'>
              <img src={require('../../assets/images/logo.png')} alt='logo' />
            </Link>
          </Grid>

          {/* SEARCH BAR */}
          <Grid item xs={12} sm={12} md={4} xl={6}>
            <SearchBar />
          </Grid>

          {/* BUTTON */}
          <Grid item xs={1} sm={1} md={1} xl={1}>
            {button === 'collection' ? (
              <Link className='buttonTo' to='../collection'>
                <Button
                  sx={{
                    height: '56px',
                    fontWeight: 'bold',
                  }}
                  style={{ color: '#4966A6' }}
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
                    fontWeight: 'bold',
                  }}
                  style={{ color: '#4966A6' }}
                  variant='outlined'
                  endIcon={<HomeIcon />}
                >
                  Home
                </Button>
              </Link>
            )}
          </Grid>

          <Grid item xs={0} sm={0} md={1} xl={1}></Grid>
          {/* CHIPS */}
          {chips && mobile === false && (
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
      </AppBar>
    </>
  )
}

export default Header
