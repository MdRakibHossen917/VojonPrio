import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle, FaUser, FaPhone, FaMapMarkerAlt, FaEnvelope, FaStickyNote } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const { user, currentUser, isLoading } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    note: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Pre-fill user data when user is loaded
  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        name: user?.name || currentUser.displayName || '',
        email: user?.email || currentUser.email || '',
        phone: user?.phone || '',
      }))
    }
  }, [user, currentUser])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically send the order to a backend
    console.log('Order submitted:', { formData, cartItems, total: getTotalPrice() })
    setIsSubmitted(true)
    clearCart()

    // Redirect to home after 3 seconds
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  if (cartItems.length === 0 && !isSubmitted) {
    return (
      <>
        <Helmet>
          <title>চেকআউট - ভোজনপ্রিয়</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                আপনার কার্ট খালি
              </h2>
              <button
                onClick={() => navigate('/products')}
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300"
              >
                পণ্য দেখুন
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>অর্ডার সফল - ভোজনপ্রিয়</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl p-12 text-center max-w-2xl">
            <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              অর্ডার সফল হয়েছে!
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              আপনার অর্ডার গ্রহণ করা হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
            </p>
            <p className="text-lg text-gray-700 mb-8">
              অর্ডার নম্বর: #{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <p className="text-gray-500">
              হোম পেজে ফিরে যাচ্ছে...
            </p>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Helmet>
        <title>চেকআউট - ভোজনপ্রিয়</title>
        <meta name="description" content="আপনার অর্ডার সম্পন্ন করুন। ডেলিভারি ঠিকানা এবং যোগাযোগের তথ্য দিন।" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">চেকআউট</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  গ্রাহক তথ্য
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name - Read Only */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-2">
                      <FaUser className="inline mr-2" />
                      নাম
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      readOnly
                      className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed focus:outline-none"
                      placeholder="আপনার নাম"
                      title="নাম পরিবর্তন করা যাবে না"
                    />
                  </div>

                  {/* Email - Read Only */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-2">
                      <FaEnvelope className="inline mr-2" />
                      ইমেইল
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      readOnly
                      className="w-full px-4 py-3 border-2 border-gray-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed focus:outline-none"
                      placeholder="আপনার ইমেইল"
                      title="ইমেইল পরিবর্তন করা যাবে না"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-2">
                      <FaPhone className="inline mr-2" />
                      ফোন নম্বর
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="01XXXXXXXXX"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-2">
                      <FaMapMarkerAlt className="inline mr-2" />
                      ঠিকানা
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                    />
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-2">
                      <FaStickyNote className="inline mr-2" />
                      নোট (ঐচ্ছিক)
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-amber-500 focus:outline-none transition-colors"
                      placeholder="কোনো বিশেষ নির্দেশনা বা নোট লিখুন (ঐচ্ছিক)"
                    />
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="block text-lg font-semibold text-gray-800 mb-4">
                      পেমেন্ট পদ্ধতি
                    </label>
                    <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          id="cod"
                          name="payment"
                          value="cod"
                          defaultChecked
                          className="w-5 h-5 text-amber-600"
                        />
                        <label htmlFor="cod" className="text-lg font-semibold text-gray-800">
                          ক্যাশ অন ডেলিভারি (COD)
                        </label>
                      </div>
                      <p className="text-gray-600 mt-2 ml-8">
                        পণ্য পেয়ে তারপর পেমেন্ট করুন
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    অর্ডার নিশ্চিত করুন
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  অর্ডার সারাংশ
                </h2>

                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-semibold">
                        {item.price * item.quantity}৳
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>মোট মূল্য:</span>
                    <span className="text-amber-600">{getTotalPrice()}৳</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout

