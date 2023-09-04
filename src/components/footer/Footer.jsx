import React from 'react'
import './footer.css'

//? MUI COMPONENTS
import GitHubIcon from '@mui/icons-material/GitHub'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { Link, Typography, Stack } from '@mui/material'

const Footer = () => {
  return (
    <>
      <div className='footer'>
        <Stack direction='row' alignItems='center' gap={1}>
          <Typography variant='body2'>Made with</Typography>
          <FavoriteIcon fontSize='medium' style={{ color: 'red' }} />
        </Stack>

        <Stack direction='row' alignItems='center' gap={1}>
          <Link
            href='https://github.com/SirAllap'
            underline='none'
            color='inherit'
            target='_blank'
          >
            <Typography variant='body2'>DavidPR</Typography>
          </Link>
          <GitHubIcon fontSize='medium' />
        </Stack>
      </div>
    </>
  )
}

export default Footer
