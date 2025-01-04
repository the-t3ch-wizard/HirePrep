import { Route, Routes } from 'react-router-dom'
import { HomeLayout } from './app/HomeLayout'
import { Home } from './app/Home'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} >
        <Route path="" element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
