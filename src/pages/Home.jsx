import React from 'react'
import Header from '../components/headers/Header'
import Footer from '../components/footer/Footer'
import CardGrid from '../components/photoCard/CardGrid'
import Intro from '../components/intro/Intro'

function Home() {
  return (
    <>
      <Header />
      <Intro />
      <CardGrid />
      <Footer />
    </>
  )
}

export default Home
