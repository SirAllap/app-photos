import './App.css'
import Routes from './router/Routes'

const { REACT_APP_ACCESS_KEY } = process.env
console.log('Im a test into App.js: ' + REACT_APP_ACCESS_KEY)


function App() {
  return (
    <>
      <Routes />
    </>
  )
}

export default App
