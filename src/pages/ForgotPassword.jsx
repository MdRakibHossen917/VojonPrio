import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { FaEnvelope, FaArrowLeft, FaPaperPlane } from 'react-icons/fa'
import { sendPasswordResetEmail } from 'firebase/auth'
import auth from '../firebase/config'
import { useToast } from '../context/ToastContext'

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const { notify } = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await sendPasswordResetEmail(auth, email)
            notify('আপনার ইমেইলে পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে', 'success')
            setEmail('')
        } catch (error) {
            console.error('Password reset error:', error)
            let errorMessage = 'কিছু ভুল হয়েছে, আবার চেষ্টা করুন'
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'এই ইমেইলে কোনো অ্যাকাউন্ট পাওয়া যায়নি'
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'সঠিক ইমেইল ঠিকানা দিন'
            }
            notify(errorMessage, 'error')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Helmet>
                <title>পাসওয়ার্ড ভুলে গেছেন? - ভোজনপ্রিয়</title>
                <meta name="description" content="পাসওয়ার্ড পুনরুদ্ধার করুন" />
            </Helmet>
            <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 flex items-center">
                <div className="container mx-auto px-4">
                    <div className="max-w-md mx-auto">
                        <div className="bg-white rounded-2xl shadow-2xl p-8">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">পাসওয়ার্ড পুনরুদ্ধার</h1>
                                <p className="text-gray-600">আপনার ইমেইল ঠিকানা দিন</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
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

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-lg text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>পাঠানো হচ্ছে...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>লিংক পাঠান</span>
                                            <FaPaperPlane />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-6 text-center">
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-amber-600 font-semibold flex items-center justify-center space-x-2 transition-colors"
                                >
                                    <FaArrowLeft />
                                    <span>লগইন পেজে ফিরে যান</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
