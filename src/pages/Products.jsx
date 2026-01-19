import { useState } from 'react'
import { FaFilter } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'

const Products = () => {
  // Get unique categories
  const categories = ['সব', ...new Set(productsData.map((product) => product.category))]
  const [selectedCategory, setSelectedCategory] = useState('সব')

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === 'সব'
      ? productsData
      : productsData.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">আমাদের পণ্য</h1>
          <p className="text-xl text-gray-600">
            খাঁটি ও স্বাস্থ্যসম্মত খাবারের সংগ্রহ
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Category Sidebar - Left */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <FaFilter className="text-amber-600 text-xl" />
                <h2 className="text-2xl font-bold text-gray-800">ক্যাটাগরি</h2>
              </div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-right px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md transform scale-105'
                        : 'bg-amber-50 text-gray-700 hover:bg-amber-100 hover:transform hover:scale-105'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid - Right */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 items-stretch">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-2xl text-gray-600">এই ক্যাটাগরিতে কোনো পণ্য নেই</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
