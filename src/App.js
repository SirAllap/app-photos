import { useDispatch } from 'react-redux'
import './App.css'
import Routes from './router/Routes'
import { useEffect } from 'react'
import { fetchInitialPics } from './features/search/searchThunks'
import { useMediaQuery } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  const matches = useMediaQuery('(max-width:900px)')

  useEffect(() => {
    dispatch(fetchInitialPics())
  }, [dispatch])

  return (
    <>
      <Routes />
    </>
  )
}
export default App
