import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import AppsIcon from '@mui/icons-material/Apps'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Paper } from '@mui/material'

// export default function BasicButtons() {
//   return (
//     <Stack spacing={2} direction="row">
//       <Button variant="text">Text</Button>
//       <Button variant="contained">Contained</Button>
//       <Button variant="outlined">Outlined</Button>
//     </Stack>
//   );
// }

function header() {
  return (
    <>
      <div className='container'>
        <Link className='logoImg' to='../'>
          <img src={require('../../assets/images/logo.png')} alt='logo' />
        </Link>
        <Link className='buttonTo' to='../collection'>
          <Button variant='outlined' endIcon={<AppsIcon />}>
            Collection
          </Button>
        </Link>
      </div>
    </>
  )
}

export default header
