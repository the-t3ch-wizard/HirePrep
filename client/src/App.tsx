import { Route, Routes } from 'react-router-dom'
import { HomeLayout } from './app/HomeLayout'
import { Home } from './app/Home'
import { Conversations } from './app/c/Conversations'
import { Conversation } from './app/c/id/Conversation'
import { AboutUs } from './app/about-us/AboutUs'
import { ContactUs } from './app/contact-us/ContactUs'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} >
        <Route path="" element={<Home />} />
        <Route path="c" element={<Conversations />} />
        <Route path="c/:id" element={<Conversation />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
      </Route>
    </Routes>
  )
}

export default App
