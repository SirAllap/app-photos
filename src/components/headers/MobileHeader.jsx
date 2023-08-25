import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

function MobileHeader() {
  return (
    <>
      <div className='container'>
        <h1>MOBILE-HEADER</h1>
        <Link to='../'>
          <button> Home</button>
        </Link>
      </div>
    </>
  )
}

export default MobileHeader
