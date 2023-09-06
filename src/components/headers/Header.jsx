import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './header.css'
import SearchBar from '../searchBar/SearchBar'
import Chips from '../chips/Chips'
import { savedPhotos } from '../../features/favourites/favouritesSlice'
import {
  AppBar,
  Badge,
  Grid,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material'
import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined'
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined'

const Header = ({ chips, button, mobile }) => {
  const favPics = useSelector(savedPhotos)

  const matches = useMediaQuery('(max-width:900px)')

  const numPicsOnColl = () => {
    return favPics.length
  }

  return (
    <>
      <AppBar
        position='sticky'
        top='0px'
        style={{ background: 'rgba(255, 255, 255, 0.65)', boxShadow: 'none' }}
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
          <Grid item xs={9} sm={0} md={1} xl={1}>
            <Link className='logo-img' to='../'>
              <img src={require('../../assets/images/logo.png')} alt='logo' />
            </Link>
          </Grid>

          {/* BUTTON-MOBILE */}
          {matches && (
            <Grid item xs={2} sm={0} md={3} xl={3}>
              {button === 'collection' ? (
                <Link to='../collection'>
                  {!favPics ? (
                    <Avatar variant='rounded' sx={mobileMenuIcon}>
                      <PermMediaOutlinedIcon
                        sx={{ fontSize: 40 }}
                        style={{ color: '#9d81b6' }}
                      />
                    </Avatar>
                  ) : (
                    <Badge badgeContent={numPicsOnColl()} color='secondary'>
                      <Avatar variant='rounded' sx={mobileMenuIcon}>
                        <PermMediaOutlinedIcon
                          sx={{ fontSize: 40 }}
                          style={{ color: '#9d81b6' }}
                        />
                      </Avatar>
                    </Badge>
                  )}
                </Link>
              ) : (
                <Link to='../'>
                  <Avatar variant='rounded' sx={mobileMenuIcon}>
                    <CottageOutlinedIcon
                      sx={{ fontSize: 40 }}
                      style={{ color: '#9d81b6' }}
                    />
                  </Avatar>
                </Link>
              )}
            </Grid>
          )}
          <Grid item xs={0.5} sm={0.2} md={0.5} xl={0.5}></Grid>

          {/* SEARCH BAR */}
          {matches && button !== 'collection' ? null : matches ? (
            <Grid item xs={12} sm={12} md={4} xl={6}>
              <SearchBar matches={true} />
            </Grid>
          ) : (
            <Grid item xs={12} sm={12} md={4} xl={6}>
              <SearchBar matches={false} />
            </Grid>
          )}

          {/* BUTTON */}
          {!matches && (
            <Grid item xs={1} sm={1} md={1} xl={1}>
              {button === 'collection' ? (
                <Link to='../collection'>
                  <Button
                    sx={{
                      height: '56px',
                      fontWeight: 'bold',
                      borderColor: '#9d81b6',
                      backgroundColor: '#9d81b615',
                    }}
                    style={{ color: '#7d4aa9' }}
                    color='secondary'
                    variant='outlined'
                    endIcon={
                      !favPics ? (
                        <PermMediaOutlinedIcon />
                      ) : (
                        <Badge badgeContent={numPicsOnColl()} color='secondary'>
                          <PermMediaOutlinedIcon />
                        </Badge>
                      )
                    }
                  >
                    Collection
                  </Button>
                </Link>
              ) : (
                <Link to='../'>
                  <Button
                    sx={{
                      height: '56px',
                      fontWeight: 'bold',
                      borderColor: '#9d81b6',
                      backgroundColor: '#9d81b615',
                    }}
                    style={{ color: '#7d4aa9' }}
                    color='secondary'
                    variant='outlined'
                    endIcon={<CottageOutlinedIcon />}
                  >
                    Home
                  </Button>
                </Link>
              )}
            </Grid>
          )}

          <Grid item xs={0} sm={0} md={1} xl={1}></Grid>
          {/* CHIPS */}
          {chips && !matches && (
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

const mobileMenuIcon = {
  bgcolor: '#fafafa',
  p: 1.2,
}
