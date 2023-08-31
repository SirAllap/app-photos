import { useEffect } from 'react'
import './App.css'
import Routes from './router/Routes'
import { fetchInitialPics } from './features/search/searchSlice'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()

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
