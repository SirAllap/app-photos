import React from 'react'
import Header from '../components/headers/Header'
import Footer from '../components/footer/Footer'
import CollectionCardGrid from '../components/photoCard/CollectionCardGrid'

function Collection() {
  return (
    <>
      <Header chips={false} button='home' />
      <CollectionCardGrid />
      <Footer />
    </>
  )
}

export default Collection
