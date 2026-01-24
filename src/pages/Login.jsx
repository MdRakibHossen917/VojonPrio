import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { FaEnvelope, FaLock, FaArrowRight } from 'react-icons/fa'
import { FaGoogle } from 'react-icons/fa'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const { login, loginWithGoogle, isAuthenticated } = useAuth()
  const { notify } = useToast()
  const navigate = useNavigate()
  const location = useLocation()

  // Get the redirect path from location state, default to home
  const from = location.state?.from?.pathname || '/'

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    if (!email || !password) {
      notify('ইমেইল এবং পাসওয়ার্ড দিন', 'error')
      setIsLoading(false)
      return
    }

    const result = await login(email, password)

    if (result.success) {
      notify('সফলভাবে লগইন করা হয়েছে', 'success')
      // Navigation will happen automatically via useEffect
      navigate(from, { replace: true })
    } else {
      notify(result.message || 'লগইন ব্যর্থ হয়েছে', 'error')
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true)

    const result = await loginWithGoogle()

    if (result.success) {
      notify('Google এর মাধ্যমে লগইন সফল হয়েছে', 'success')
      navigate(from, { replace: true })
    } else {
      notify(result.message || 'Google লগইন ব্যর্থ হয়েছে', 'error')
      setIsGoogleLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>লগইন করুন - ভোজনপ্রিয়</title>
        <meta name="description" content="ভোজনপ্রিয় অ্যাকাউন্টে লগইন করুন এবং খাঁটি খাবার কিনুন।" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">লগইন করুন</h1>
                <p className="text-gray-600">আপনার অ্যাকাউন্টে প্রবেশ করুন</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2" />
                    ইমেইল
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      <FaLock className="inline mr-2" />
                      পাসওয়ার্ড
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-xs text-amber-600 hover:text-amber-700 font-semibold"
                    >
                      পাসওয়ার্ড ভুলে গেছেন?
                    </Link>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="পাসওয়ার্ড দিন"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-lg text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>লগইন হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <span>লগইন করুন</span>
                      <FaArrowRight />
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">অথবা</span>
                </div>
              </div>

              {/* Google Login Button */}
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading || isGoogleLoading}
                className="w-full bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 shadow-md flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isGoogleLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
                    <span>লগইন হচ্ছে...</span>
                  </>
                ) : (
                  <>
                    <FaGoogle className="text-xl text-red-500" />
                    <span>Google দিয়ে লগইন করুন</span>
                  </>
                )}
              </button>

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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
