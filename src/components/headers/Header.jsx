import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './header.css'

//? COMPONENTS
import SearchBar from '../searchBar/SearchBar'
import Chips from '../chips/Chips'

//? SELECTORS
import { savedPhotos } from '../../features/favourites/favouritesSlice'

//? MUI COMPONENTS
import { AppBar, Badge, Grid, Button } from '@mui/material'
import AppsIcon from '@mui/icons-material/Apps'
import HomeIcon from '@mui/icons-material/Home'

const Header = ({ chips, button, mobile }) => {
  const [isMobile, setIsMobile] = useState()
  const favPics = useSelector(savedPhotos)

  const numPicsOnColl = () => {
    return favPics.length
  }
  useEffect(() => {
    window.innerWidth < 900 ? setIsMobile(true) : setIsMobile(false)
  }, [])

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
          <Grid item xs={0.5} sm={0.2} md={0.5} xl={0.5}></Grid>
          {/* LOGO */}
          <Grid item xs={9.5} sm={0} md={3} xl={3}>
            <Link className='logo-img' to='../'>
              <img src={require('../../assets/images/logo.png')} alt='logo' />
            </Link>
          </Grid>

          {/* BUTTON-MOBILE */}
          {isMobile && (
            <Grid item xs={2} sm={0} md={3} xl={3}>
              {button === 'collection' ? (
                <Link to='../collection'>
                  {!favPics ? (
                    <AppsIcon
                      sx={{ fontSize: 40 }}
                      style={{ color: '#4966A6' }}
                    />
                  ) : (
                    <Badge badgeContent={numPicsOnColl()} color='primary'>
                      <AppsIcon
                        sx={{ fontSize: 40 }}
                        style={{ color: '#4966A6' }}
                      />
                    </Badge>
                  )}
                </Link>
              ) : (
                <Link to='../'>
                  <HomeIcon
                    sx={{ fontSize: 40 }}
                    style={{ color: '#4966A6' }}
                  />
                </Link>
              )}
            </Grid>
          )}

          {/* SEARCH BAR */}
          {isMobile && button !== 'collection' ? null : isMobile ? (
            <Grid item xs={12} sm={12} md={4} xl={6}>
              <SearchBar isMobile={true} />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={4} xl={6}>
              <SearchBar isMobile={false} />
            </Grid>
          )}

          {/* BUTTON */}
          {!isMobile && (
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
                    endIcon={
                      !favPics ? (
                        <AppsIcon />
                      ) : (
                        <Badge badgeContent={numPicsOnColl()} color='primary'>
                          <AppsIcon />
                        </Badge>
                      )
                    }
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
          )}

          <Grid item xs={0} sm={0} md={1} xl={1}></Grid>
          {/* CHIPS */}
          {chips && !isMobile && (
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
