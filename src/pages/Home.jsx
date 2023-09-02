import Header from '../components/headers/Header'
import Footer from '../components/footer/Footer'
import CardGrid from '../components/photoCard/CardGrid'

function Home() {
  return (
    <>
      <Header chips={true} button='collection' />
      <CardGrid />
      <Footer />
    </>
  )
}

export default Home
