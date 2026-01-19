import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { FaUser, FaLock, FaArrowRight } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Get the redirect path from location state, default to checkout
  const from = location.state?.from?.pathname || '/checkout'

  // If already logged in, redirect back
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!phone || !password) {
      setError('ফোন নম্বর এবং পাসওয়ার্ড দিন')
      return
    }

    const result = login(phone, password)
    
    if (result.success) {
      // Small delay to ensure state updates
      setTimeout(() => {
        navigate(from, { replace: true })
      }, 100)
    } else {
      setError(result.message || 'লগইন ব্যর্থ হয়েছে')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">লগইন করুন</h1>
              <p className="text-gray-600">চেকআউট সম্পন্ন করতে লগইন করুন</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaUser className="inline mr-2" />
                  ফোন নম্বর
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaLock className="inline mr-2" />
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="পাসওয়ার্ড দিন"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-lg text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
              >
                <span>লগইন করুন</span>
                <FaArrowRight />
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                অ্যাকাউন্ট নেই?{' '}
                <Link
                  to="/register"
                  className="text-amber-600 hover:text-amber-700 font-semibold"
                >
                  রেজিস্টার করুন
                </Link>
              </p>
            </div>

            <div className="mt-6 p-4 bg-amber-50 rounded-lg">
              <p className="text-sm text-gray-600 text-center">
                <strong>ডেমো:</strong> যেকোনো ফোন নম্বর এবং পাসওয়ার্ড দিয়ে লগইন করতে পারবেন
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

