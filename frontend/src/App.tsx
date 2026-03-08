import {BrowserRouter, Route, Routes} from 'react-router'
import SignUpPage from './pages/SignUpPage'
import ChatAppPage from './pages/ChatAppPage'
import LoginPage from './pages/LoginPage'
import {Toaster} from 'sonner'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster richColors/>
        <Routes>
          {/* Public Routes */}
          <Route
            path='/login'
            element={<LoginPage/>}
          />
          <Route
            path='/signup'
            element={<SignUpPage/>}
          />
          {/* Private Routes */}
          <Route
            path='/'
            element={<ChatAppPage/>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
