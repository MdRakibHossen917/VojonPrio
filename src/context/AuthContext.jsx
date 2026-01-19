import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const login = useCallback((phone, password) => {
    // Simple login validation (in real app, this would be an API call)
    if (phone && password) {
      // Generate user name from phone (in real app, get from API)
      const userName = `User ${phone.slice(-4)}`
      const userData = {
        phone,
        name: userName,
        email: `${phone}@vojonprio.com`, // In real app, get from API
        isAuthenticated: true
      }
      // Store in localStorage first
      localStorage.setItem('user', JSON.stringify(userData))
      // Then update state
      setUser(userData)
      return { success: true, user: userData }
    }
    return { success: false, message: 'ফোন নম্বর এবং পাসওয়ার্ড প্রয়োজন' }
  }, [])

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('user')
      setUser(null)
      // Force state update
      return true
    } catch (error) {
      console.error('Logout error:', error)
      return false
    }
  }, [])

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing user data:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const value = useMemo(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading
  }), [user, login, logout, isLoading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

