import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [showWelcome, setShowWelcome] = useState(false)

  function login(userData) {
    setUser(userData)
    setShowWelcome(true)
  }

  function logout() {
    setUser(null)
    setShowWelcome(false)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, showWelcome, setShowWelcome }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
