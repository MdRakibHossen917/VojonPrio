import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingBag, FaArrowRight } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'

const Cart = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const navigate = useNavigate()

  if (cartItems.length === 0) {
    return (
      <>
        <Helmet>
          <title>কার্ট - ভোজনপ্রিয়</title>
        </Helmet>
        <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center py-20">
            <FaShoppingBag className="text-6xl text-gray-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              আপনার কার্ট খালি
            </h2>
            <p className="text-gray-600 mb-8">
              কিছু পণ্য কার্টে যোগ করুন
            </p>
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              পণ্য দেখুন
            </Link>
          </div>
        </div>
      </div>
    </>
    )
  }

  return (
    <>
      <Helmet>
        <title>কার্ট - ভোজনপ্রিয়</title>
        <meta name="description" content="আপনার কার্টে থাকা পণ্যগুলো দেখুন এবং চেকআউট করুন।" />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">আপনার কার্ট</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                অর্ডার সারাংশ
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>মোট পণ্য:</span>
                  <span className="font-semibold">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)} টি
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>মোট মূল্য:</span>
                    <span className="text-amber-600">{getTotalPrice()}৳</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/login', { state: { from: { pathname: '/checkout' } } })}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-4 rounded-lg text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 mb-4"
              >
                <span>চেকআউট করুন</span>
                <FaArrowRight />
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                কার্ট খালি করুন
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default Cart

