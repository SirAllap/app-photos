import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

function header() {
  return (
    <>
      <div className='container'>
        <h1>HEADER</h1>
        <Link className='buttonTo' to='../collection'>
          <button>Collection</button>
        </Link>
      </div>
    </>
  )
}

export default header
