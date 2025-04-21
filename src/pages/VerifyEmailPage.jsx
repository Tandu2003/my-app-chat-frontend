import React, { useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { apiVerifyEmail } from '../api/authApi'

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const didVerifyRef = useRef(false) // Thêm biến ref

  useEffect(() => {
    if (didVerifyRef.current) return // Đã xác thực rồi thì không làm lại
    didVerifyRef.current = true

    const token = searchParams.get('token')
    if (!token) {
      navigate('/login', {
        state: { message: 'Thiếu token xác thực.' },
        replace: true,
      })
      return
    }
    apiVerifyEmail(token)
      .then((res) => {
        navigate('/login', {
          state: { message: res.message || 'Xác thực email thành công.' },
          replace: true,
        })
      })
      .catch((err) => {
        navigate('/login', {
          state: {
            message:
              err.response?.data?.message ||
              'Xác thực email thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.',
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
