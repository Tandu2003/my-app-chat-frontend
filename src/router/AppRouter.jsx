import React from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import ChatPage from '../pages/ChatPage'
import FriendsPage from '../pages/FriendsPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import RegisterPage from '../pages/RegisterPage'

// RequireAuth: Nếu chưa đăng nhập thì chuyển hướng sang /login
function RequireAuth({ children }) {
  const user = useSelector((state) => state.user.user)
  const location = useLocation()
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}

// RedirectIfAuth: Nếu đã đăng nhập thì chuyển hướng về home
function RedirectIfAuth({ children }) {
  const user = useSelector((state) => state.user.user)
  const location = useLocation()
  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }
  return children
}

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <ChatPage />
          </RequireAuth>
        }
      />
      <Route
        path="/login"
        element={
          <RedirectIfAuth>
            <LoginPage />
          </RedirectIfAuth>
        }
      />
      <Route
        path="/register"
        element={
          <RedirectIfAuth>
            <RegisterPage />
          </RedirectIfAuth>
        }
      />
      <Route
        path="/friends"
        element={
          <RequireAuth>
            <FriendsPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter
