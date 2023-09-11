import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Collection from '../pages/Collection'
import { useDispatch } from 'react-redux'
import { fetchInitialPics } from '../features/search/searchThunks'

const Router = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInitialPics())
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* GH PAGES */}
        <Route path='/app-photos' element={<Home />} />
        <Route path='*' element={<Home />} />
        {/* GH PAGES */}

        <Route path='/collection' element={<Collection />} />
      </Routes>
    </>
  )
}

export default Router
