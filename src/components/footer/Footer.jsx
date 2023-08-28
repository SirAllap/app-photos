import React from 'react'
import './footer.css'
import GitHubIcon from '@mui/icons-material/GitHub'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Link } from '@mui/material'

function footer() {
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

export default footer
