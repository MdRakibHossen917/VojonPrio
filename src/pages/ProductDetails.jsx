import { useParams, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaArrowLeft, FaCheck } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useState } from 'react'
import productsData from '../data/products.json'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const product = productsData.find((p) => p.id === parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">পণ্য পাওয়া যায়নি</h2>
          <button
            onClick={() => navigate('/products')}
            className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
          >
            পণ্য পেজে ফিরে যান
          </button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors"
        >
          <FaArrowLeft />
          <span>পিছনে যান</span>
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-xl"
              />
            </div>

            {/* Details */}
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-gray-600 mb-6">{product.nameEn}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold text-amber-600">
                  {product.price}৳
                </span>
                <span className="text-gray-600 ml-2">/ {product.unit}</span>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  বিবরণ
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.fullDescription}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  উপকারিতা
                </h3>
                <ul className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                  পরিমাণ
                </label>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-700 w-10 h-10 rounded-lg font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-800 w-16 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-amber-100 hover:bg-amber-200 text-amber-700 w-10 h-10 rounded-lg font-bold transition-colors"
                  >
                    +
                  </button>
                  <span className="text-gray-600 ml-4">
                    মোট: <span className="font-bold text-amber-600">{product.price * quantity}৳</span>
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <FaShoppingCart />
                <span>কার্টে যোগ করুন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails

