import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCurrentUser } from './slices/userSlice'
import AppRouter from './router/AppRouter'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return <AppRouter />
}

export default App
