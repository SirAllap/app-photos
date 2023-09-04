import { useDispatch } from 'react-redux'
import './App.css'
import Routes from './router/Routes'
import { useEffect } from 'react'
import { fetchInitialPics } from './features/search/searchThunks'

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
