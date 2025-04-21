import { Alert, message as antdMessage, Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { apiLogin } from '../api/authApi'
import { setUser } from '../slices/userSlice'

const LoginPage = () => {
  const user = useSelector((state) => state.user.user)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(location.state?.message) // lưu message vào state

  const [messageApi, contextHolder] = antdMessage.useMessage()

  useEffect(() => {
    if (message) {
      // Hiển thị message là error nếu có từ khóa lỗi, ngược lại là success
      messageApi.open({
        type:
          message.toLowerCase().includes('lỗi') ||
          message.toLowerCase().includes('thất bại')
            ? 'error'
            : 'success',
        content: message,
        duration: 5,
      })
      setMessage(null)
      // Xóa message khỏi history state để không lặp lại khi quay lại trang này
      if (window.history.replaceState) {
        const { pathname, search } = window.location
        window.history.replaceState({}, '', pathname + search)
      }
    }
    // eslint-disable-next-line
  }, [message])

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  // Xử lý submit
  const handleFinish = async (values) => {
    setError(null)
    setLoading(true)
    try {
      const res = await apiLogin(values)
      dispatch(setUser(res.user))
      navigate('/', {
        replace: true,
        state: {
          message: res.message,
        },
      })
    } catch (err) {
      let msg =
        err?.response?.data?.message ||
        (typeof err === 'string' ? err : 'Đăng nhập thất bại')
      setError(msg)
      form.setFields([
        { name: 'email', errors: [] },
        { name: 'password', errors: [] },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Khi submit lỗi, đánh dấu các trường đã chạm để hiển thị lỗi
  const handleFinishFailed = ({ errorFields }) => {
    if (errorFields && errorFields.length > 0) {
      form.setFields(
        errorFields.map((field) => ({
          name: field.name,
          touched: true,
        })),
      )
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      {contextHolder}
      <div className="w-full max-w-md rounded bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-bold">Đăng nhập</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          autoComplete="off"
          validateTrigger="onBlur"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input
              placeholder="Nhập email"
              className="h-10"
              onChange={() => {
                form.setFields([{ name: 'email', errors: [] }])
              }}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[
              { required: true, message: 'Vui lòng nhập mật khẩu!' },
              { min: 6, message: 'Mật khẩu tối thiểu 6 ký tự!' },
            ]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu"
              className="h-10"
              onChange={() => {
                form.setFields([{ name: 'password', errors: [] }])
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="mt-2 w-full"
            loading={loading}
            size="large"
          >
            Đăng nhập
          </Button>
          {/* Hiển thị lỗi dưới nút đăng nhập */}
          {error && (
            <Alert className="!mt-4" message={error} type="error" showIcon />
          )}
        </Form>
        <div className="mt-4 text-center text-sm">
          Chưa có tài khoản?{' '}
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => navigate('/register')}
          >
            Đăng ký
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
