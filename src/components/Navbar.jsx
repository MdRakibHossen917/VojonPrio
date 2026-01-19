import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaHome, FaBox, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import productsData from '../data/products.json'

const Navbar = () => {
  const { getTotalItems } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()
  const searchRef = useRef(null)
  const suggestionsRef = useRef(null)
  const userMenuRef = useRef(null)

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const lowerQuery = searchQuery.toLowerCase()
      const filtered = productsData
        .filter((product) => {
          const nameMatch = product.name.toLowerCase().includes(lowerQuery)
          const nameEnMatch = product.nameEn.toLowerCase().includes(lowerQuery)
          const descriptionMatch = product.description.toLowerCase().includes(lowerQuery)
          const categoryMatch = product.category?.toLowerCase().includes(lowerQuery)
          return nameMatch || nameEnMatch || descriptionMatch || categoryMatch
        })
        .slice(0, 5) // Show max 5 suggestions
      setSuggestions(filtered)
      setShowSuggestions(filtered.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setShowSuggestions(false)
      }
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = (e) => {
    e.preventDefault()
    e.stopPropagation()
    logout()
    setShowUserMenu(false)
    // Navigate immediately
    navigate('/', { replace: true })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (product) => {
    navigate(`/products/${product.id}`)
    setSearchQuery('')
    setShowSuggestions(false)
  }

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group flex-shrink-0">
            <div className="bg-white rounded-full p-2 group-hover:scale-110 transition-transform">
              <FaBox className="text-amber-600 text-xl" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white">ভোজনপ্রিয়</span>
          </Link>

          {/* Search Bar - Middle */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 relative" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true)
                }}
                placeholder="পণ্য খুঁজুন..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-full bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-md"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-1 rounded-full text-sm font-semibold transition-colors"
              >
                খুঁজুন
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-amber-200 overflow-hidden z-50 max-h-96 overflow-y-auto"
              >
                {suggestions.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleSuggestionClick(product)}
                    className="flex items-center gap-4 p-4 hover:bg-amber-50 cursor-pointer transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-800 mb-1 truncate">{product.name}</h4>
                      <p className="text-sm text-gray-600 truncate">{product.description}</p>
                      <p className="text-amber-600 font-semibold mt-1">{product.price}৳</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
            <Link
              to="/"
              className="text-white hover:text-amber-100 font-medium transition-colors flex items-center space-x-1"
            >
              <FaHome />
              <span>হোম</span>
            </Link>
            <Link
              to="/products"
              className="text-white hover:text-amber-100 font-medium transition-colors flex items-center space-x-1"
            >
              <FaBox />
              <span>পণ্য</span>
            </Link>
            <Link
              to="/cart"
              className="relative text-white hover:text-amber-100 font-medium transition-colors flex items-center space-x-1"
            >
              <FaShoppingCart className="text-xl" />
              <span>কার্ট</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* Login/User Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-white hover:text-amber-100 font-medium transition-colors"
                >
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <FaUser />
                  </div>
                  <span className="hidden lg:inline">{user?.name || 'User'}</span>
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-amber-50 transition-colors flex items-center space-x-2"
                    >
                      <FaSignOutAlt />
                      <span>লগআউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-amber-100 font-medium transition-colors flex items-center space-x-1 bg-white/20 px-4 py-2 rounded-full hover:bg-white/30"
              >
                <FaUser />
                <span>লগইন</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center space-x-4 flex-shrink-0">
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="text-white hover:text-amber-100 transition-colors"
                >
                  <FaUser className="text-xl" />
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                      <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        logout()
                        setShowUserMenu(false)
                        navigate('/', { replace: true })
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-amber-50 transition-colors flex items-center space-x-2"
                    >
                      <FaSignOutAlt />
                      <span>লগআউট</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-amber-100 transition-colors"
              >
                <FaUser className="text-xl" />
              </Link>
            )}
            <Link
              to="/cart"
              className="relative text-white hover:text-amber-100 transition-colors"
            >
              <FaShoppingCart className="text-xl" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden mt-4 flex justify-center items-center space-x-6">
          <Link
            to="/"
            className="text-white hover:text-amber-100 font-medium transition-colors text-sm"
          >
            হোম
          </Link>
          <Link
            to="/products"
            className="text-white hover:text-amber-100 font-medium transition-colors text-sm"
          >
            পণ্য
          </Link>
          {!isAuthenticated && (
            <Link
              to="/login"
              className="text-white hover:text-amber-100 font-medium transition-colors text-sm"
            >
              লগইন
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
