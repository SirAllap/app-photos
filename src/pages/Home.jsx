import Header from '../components/headers/Header'
import Footer from '../components/footer/Footer'
import CardGrid from '../components/photoCard/CardGrid'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchInitialPics } from '../features/search/searchSlice'

function Home() {
  // force reload to apply the movbil view.
  function handleResize() {
    return window.innerWidth < 900 ? window.location.reload(false) : false
  }
  window.addEventListener('resize', handleResize)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchInitialPics())
  }, [dispatch])

  return (
    <>
      <Header chips={true} button='collection' />
      <CardGrid />
      <Footer />
    </>
  )
}

export default Home
