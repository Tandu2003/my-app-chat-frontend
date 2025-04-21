import { MessageOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Avatar, Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const location = useLocation()
  const active = (path) =>
    location.pathname === path
      ? 'bg-blue-100 text-blue-600'
      : 'hover:bg-gray-100 text-gray-600'

  return (
    <div className="flex h-screen w-20 flex-col justify-between bg-white shadow-lg">
      <div className="flex flex-col items-center gap-4 pt-6">
        <Tooltip title="Tin nhắn" placement="right">
          <button
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition ${active('/')}`}
            onClick={() => navigate('/')}
          >
            <MessageOutlined />
          </button>
        </Tooltip>
        <Tooltip title="Bạn bè" placement="right">
          <button
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition ${active('/friends')}`}
            onClick={() => navigate('/friends')}
          >
            <UsergroupAddOutlined />
          </button>
        </Tooltip>
      </div>
      <div className="mb-6 flex flex-col items-center">
        {user && (
          <Tooltip title={user.fullName} placement="right">
            <Avatar
              size={48}
              src={user.avatar}
              className="cursor-pointer border-2 border-blue-500"
            >
              {user.fullName?.[0]?.toUpperCase()}
            </Avatar>
          </Tooltip>
        )}
      </div>
    </div>
  )
}

export default Sidebar
