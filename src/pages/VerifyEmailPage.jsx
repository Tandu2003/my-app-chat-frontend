import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { apiVerifyEmail } from '../api/authApi'

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const token = searchParams.get('token')
    if (!token) {
      navigate('/login', {
        state: { message: 'Thiếu token xác thực.', type: 'error' },
        replace: true,
      })
      return
    }
    apiVerifyEmail(token)
      .then((res) => {
        navigate('/login', {
          state: {
            message: res.message || 'Xác thực email thành công.',
            type: 'success',
          },

          replace: true,
        })
      })
      .catch((err) => {
        navigate('/login', {
          state: {
            message:
              err.response?.data?.message ||
              'Xác thực email thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.',
            type: 'error',
          },
          replace: true,
        })
      })
  }, [searchParams, navigate])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md rounded bg-white p-8 text-center shadow">
        <h2 className="mb-4 text-2xl font-bold">Xác thực Email</h2>
        <div>Đang xác thực...</div>
      </div>
    </div>
  )
}

export default VerifyEmailPage
