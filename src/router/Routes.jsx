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
	}, [dispatch])

	return (
		<>
			<Routes>
				<Route path='/' element={<Home />} />

				<Route path='/app-photos' element={<Home />} />
				<Route path='*' element={<Home />} />

				<Route path='/collection' element={<Collection />} />
			</Routes>
		</>
	)
}

export default Router
