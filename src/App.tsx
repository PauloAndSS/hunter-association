import './App.css'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { JSX } from 'react/jsx-runtime'
import HomePage from './pages/Home'
import LoginPage from './pages/Login'
import { getSession } from './lib/session'

function RequireAuth({ children }: { children: JSX.Element }): JSX.Element {
  const session = getSession()
  if (!session) return <Navigate to="/login" replace />
  return children
}

function App() {
  return (
    <HashRouter>
      <div className="scanlines" aria-hidden="true" />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route
          path='/'
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path='*' element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

export default App
