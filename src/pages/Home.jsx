import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/headers/Header'
import Footer from '../components/footer/Footer'
import CardGrid from '../components/photoCard/CardGrid'

function Home() {
  return (
    <>
      <Header />
      <h2 style={{ marginTop: '170px' }}>
        Embark on a journey of creativity as our app grants you unlimited access
        to a captivating realm of high-quality, free-to-download stock photos,
        empowering you to paint your projects with the vibrant hues of
        imagination.
      </h2>
      <CardGrid />
      <Footer />
    </>
  )
}

export default Home
