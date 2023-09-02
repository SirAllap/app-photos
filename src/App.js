import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import Routes from './router/Routes'
import { useEffect, useState } from 'react'
import { fetchInitialPics, initialPhotos } from './features/search/searchSlice'

const App = () => {
  const dispatch = useDispatch()
  // const fetchInitialPhotos = useSelector(initialPhotos)
  // // force reload to apply the movbil view.
  // // function handleResize() {
  // //   return window.innerWidth < 900 ? window.location.reload(false) : false
  // // }
  // // window.addEventListener('resize', handleResize)

  // const [photoList, setPhotoList] = useState([])

  // useEffect(() => {
  //   setPhotoList(fetchInitialPhotos)
  //   photoList.length <= 0 && dispatch(fetchInitialPics())
  // }, [photoList, fetchInitialPhotos, dispatch])
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
