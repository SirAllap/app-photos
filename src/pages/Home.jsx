import Header from '../components/headers/Header'
import Footer from '../components/footer/Footer'
import CardGrid from '../components/photoCard/CardGrid'
import Intro from '../components/intro/Intro'

function Home() {
  function handleResize() {
    return window.innerWidth < 900 ? true : false
  }

  window.addEventListener('resize', handleResize)

  return (
    <>
      <Header chips={true} button='collection' mobile={handleResize()} />
      <Intro />
      <CardGrid />
      <Footer />
    </>
  )
}

export default Home
