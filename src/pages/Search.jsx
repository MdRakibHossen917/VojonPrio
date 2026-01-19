import { useSearchParams } from 'react-router-dom'
import { FaSearch, FaBox } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'

const Search = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  // Search function - searches in both Bangla and English names, description, and category
  const searchProducts = (searchQuery) => {
    if (!searchQuery.trim()) return []

    const lowerQuery = searchQuery.toLowerCase()
    
    return productsData.filter((product) => {
      const nameMatch = product.name.toLowerCase().includes(lowerQuery)
      const nameEnMatch = product.nameEn.toLowerCase().includes(lowerQuery)
      const descriptionMatch = product.description.toLowerCase().includes(lowerQuery)
      const categoryMatch = product.category?.toLowerCase().includes(lowerQuery)
      
      return nameMatch || nameEnMatch || descriptionMatch || categoryMatch
    })
  }

  const searchResults = searchProducts(query)

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {query ? `"${query}" এর জন্য ফলাফল` : 'পণ্য খুঁজুন'}
          </h1>
          {query && (
            <p className="text-lg text-gray-600">
              {searchResults.length > 0
                ? `${searchResults.length} টি পণ্য পাওয়া গেছে`
                : 'কোনো পণ্য পাওয়া যায়নি'}
            </p>
          )}
        </div>

        {!query ? (
          <div className="text-center py-20">
            <FaSearch className="text-6xl text-gray-400 mx-auto mb-6" />
            <p className="text-2xl text-gray-600 mb-4">
              পণ্য খুঁজতে সার্চ করুন
            </p>
            <p className="text-gray-500">
              পণ্যের নাম, বিবরণ বা ক্যাটাগরি দিয়ে খুঁজুন
            </p>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {searchResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <FaBox className="text-6xl text-gray-400 mx-auto mb-6" />
            <p className="text-2xl text-gray-600 mb-4">
              " {query} " এর জন্য কোনো পণ্য পাওয়া যায়নি
            </p>
            <p className="text-gray-500 mb-6">
              অনুগ্রহ করে অন্য কোনো শব্দ দিয়ে খুঁজুন
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full">
                সরিষার তেল
              </span>
              <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full">
                মধু
              </span>
              <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full">
                মাংস
              </span>
              <span className="bg-amber-100 text-amber-700 px-4 py-2 rounded-full">
                মিষ্টি
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search

