import {BrowserRouter, Route, Routes} from 'react-router'
import SignUpPage from './pages/SignUpPage'
import ChatAppPage from './pages/ChatAppPage'
import LoginPage from './pages/LoginPage'
import {Toaster} from 'sonner'
import ProtectedRoute from './components/auth/ProtectedRoute'

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
          <Route element={<ProtectedRoute/>}>
            <Route
              path='/'
              element={<ChatAppPage/>}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
