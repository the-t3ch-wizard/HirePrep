import { Route, Routes } from 'react-router-dom'
import { HomeLayout } from './app/HomeLayout'
import { Home } from './app/Home'
import { Conversations } from './app/c/Conversations'
import { Conversation } from './app/c/id/Conversation'
import { AboutUs } from './app/about-us/AboutUs'
import { ContactUs } from './app/contact-us/ContactUs'
import { useAppSelector } from './lib/store/hooks/hooks'
import { NotFound } from './app/404-not-found/NotFound'
import { AboutConversation} from './app/c/a/id/AboutConversation'
import { AboutUser } from './app/a/id/AboutUser'

function App() {

  const loggedInStatus = useAppSelector((state) => state.user.loggedInStatus)

  return (
    <Routes>
      <Route path="/" element={<HomeLayout />} >
        <Route path="" element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
        <Route path="contact-us" element={<ContactUs />} />
        {
          loggedInStatus ?
          <>
            {/* c : chat */}
            <Route path="c" element={<Conversations />} />
            <Route path="c/:id" element={<Conversation />} />
            {/* a : about */}
            <Route path="c/a/:id" element={<AboutConversation />} />

            <Route path="a/:id" element={<AboutUser />} />
          </> :
          null
        }
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
