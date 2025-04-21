import { Alert, message as antdMessage, Button, Form, Input } from 'antd'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { apiRegister } from '../api/authApi'

const RegisterPage = () => {
  const user = useSelector((state) => state.user.user)
  const location = useLocation()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  const handleFinish = async (values) => {
    setError(null)
    setLoading(true)
    try {
      const res = await apiRegister(values)
      antdMessage.success(
        res.message ||
          'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.',
      )
      navigate('/login', {
        replace: true,
        state: {
          message:
            res.message ||
            'Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.',
        },
      })
    } catch (err) {
      let msg =
        err?.response?.data?.message ||
        (typeof err === 'string' ? err : 'Đăng ký thất bại')
      setError(msg)
      form.setFields([
        { name: 'fullName', errors: [] },
        { name: 'email', errors: [] },
        { name: 'password', errors: [] },
      ])
      antdMessage.error(msg)
    } finally {
      setLoading(false)
    }
  }

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
      <div className="w-full max-w-md rounded bg-white p-8 shadow">
        <h2 className="mb-6 text-center text-2xl font-bold">Đăng ký</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
          autoComplete="off"
          validateTrigger="onBlur"
        >
          <Form.Item
            label="Họ và tên"
            name="fullName"
            rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
          >
            <Input
              placeholder="Nhập họ và tên"
              className="h-10"
              onChange={() => {
                form.setFields([{ name: 'fullName', errors: [] }])
              }}
            />
          </Form.Item>
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
            Đăng ký
          </Button>
          {error && (
            <Alert className="!mt-4" message={error} type="error" showIcon />
          )}
        </Form>
        <div className="mt-4 text-center text-sm">
          Đã có tài khoản?{' '}
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => navigate('/login')}
          >
            Đăng nhập
          </span>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
