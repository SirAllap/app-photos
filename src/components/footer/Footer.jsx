import React from 'react'
import './footer.css'
import GitHubIcon from '@mui/icons-material/GitHub'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Link, Typography, Stack } from '@mui/material'

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <span>
          <Stack direction='row' alignItems='center' gap={1}>
            <Typography sx={{ fontSize: '1rem' }}>Made with</Typography>
            <FavoriteIcon fontSize='medium' style={{ color: '#9d81b6' }} />
            <Typography sx={{ fontSize: '1rem' }}>
              and{' '}
              <Link
                color={{ color: 'rgb(49, 49, 49)' }}
                underline='hover'
                href='https://unsplash.com/'
                target='_blank'
              >
                Unsplash
              </Link>
            </Typography>
          </Stack>
        </span>
        <span>
          <Stack direction='row' alignItems='center' gap={1}>
            <Link
              color={{ color: 'rgb(49, 49, 49)' }}
              underline='hover'
              href='https://github.com/SirAllap'
              target='_blank'
            >
              <Typography sx={{ fontSize: '1rem' }}>DavidPR</Typography>
            </Link>
            <GitHubIcon fontSize='medium' />
          </Stack>
        </span>
      </div>
    </>
  )
}

export default Footer
