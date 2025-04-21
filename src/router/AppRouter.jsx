import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatPage from '../pages/ChatPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import FriendsPage from '../pages/FriendsPage'
import SentFriendRequestsPage from '../pages/SentFriendRequestsPage'
import ReceivedFriendRequestsPage from '../pages/ReceivedFriendRequestsPage'
import NotFoundPage from '../pages/NotFoundPage'

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/friends" element={<FriendsPage />} />
      <Route
        path="/friend-requests/sent"
        element={<SentFriendRequestsPage />}
      />
      <Route
        path="/friend-requests/received"
        element={<ReceivedFriendRequestsPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
)

export default AppRouter
