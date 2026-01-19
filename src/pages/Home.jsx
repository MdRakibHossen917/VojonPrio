import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle, FaTruck, FaShieldAlt, FaLeaf, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import productsData from '../data/products.json'

const Home = () => {
  const featuredProducts = productsData.slice(0, 3)
  
  // Review carousel state
  const reviews = [
    {
      id: 1,
      name: 'রহিম উদ্দিন',
      location: 'ঢাকা',
      avatar: 'র',
      color: 'from-amber-400 to-amber-600',
      text: '"ভোজনপ্রিয় থেকে সরিষার তেল কিনেছি। সত্যিই খুবই ভালো মানের তেল। রান্নায় স্বাদও অনেক ভালো। আবার নিশ্চয়ই কিনব।"'
    },
    {
      id: 2,
      name: 'ফাতেমা খাতুন',
      location: 'চট্টগ্রাম',
      avatar: 'ফ',
      color: 'from-green-400 to-green-600',
      text: '"খাঁটি মধু পেয়েছি। স্বাদ এবং গুণগত মান দুটোই অসাধারণ। পরিবারের সবাই খুবই খুশি। ডেলিভারিও খুব দ্রুত হয়েছে।"'
    },
    {
      id: 3,
      name: 'কামাল হোসেন',
      location: 'সিলেট',
      avatar: 'ক',
      color: 'from-blue-400 to-blue-600',
      text: '"গরুর পায়া এবং মহিষের মাথা অর্ডার করেছিলাম। পণ্য খুবই তাজা এবং ভালো মানের। রান্না করে খেয়ে খুবই ভালো লেগেছে।"'
    },
    {
      id: 4,
      name: 'সালমা বেগম',
      location: 'রাজশাহী',
      avatar: 'স',
      color: 'from-purple-400 to-purple-600',
      text: '"টাঙ্গাইলের মিষ্টি কিনেছি। সত্যিই ঐতিহ্যবাহী স্বাদ। উপহার দেওয়ার জন্য নিখুঁত। সবাই খুবই প্রশংসা করেছে।"'
    },
    {
      id: 5,
      name: 'মোঃ আলী',
      location: 'খুলনা',
      avatar: 'ম',
      color: 'from-red-400 to-red-600',
      text: '"ভোজনপ্রিয়ের সব পণ্যই খুবই ভালো মানের। তারা সত্যিই খাঁটি পণ্য সরবরাহ করে। আমি নিয়মিত তাদের কাছ থেকে কেনাকাটা করি।"'
    },
    {
      id: 6,
      name: 'নাসির উদ্দিন',
      location: 'কুমিল্লা',
      avatar: 'ন',
      color: 'from-teal-400 to-teal-600',
      text: '"সেবা এবং পণ্যের মান দুটোই অসাধারণ। ডেলিভারি সময়মতো হয়েছে এবং পণ্য খুবই ভালো মানের। সবাইকে সুপারিশ করব।"'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (reviews.length - itemsPerView + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [reviews.length, itemsPerView])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (reviews.length - itemsPerView + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (reviews.length - itemsPerView + 1)) % (reviews.length - itemsPerView + 1))
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              ভোজনপ্রিয়
            </h1>
            <p className="text-2xl md:text-3xl mb-8 text-amber-100">
              খাঁটি খাবারের বিশ্বস্ত ঠিকানা
            </p>
            <p className="text-lg mb-10 text-amber-50">
              আমরা সরাসরি গ্রাম থেকে সংগ্রহ করে আপনাকে পৌঁছে দিই 100% খাঁটি ও
              স্বাস্থ্যসম্মত পণ্য
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-amber-600 px-8 py-4 rounded-full text-lg font-bold hover:bg-amber-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              এখনই কিনুন
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            কেন আমাদের বেছে নেবেন?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-amber-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                100% খাঁটি পণ্য
              </h3>
              <p className="text-gray-600">
                কোনো মিশ্রণ বা কৃত্রিম উপাদান ছাড়াই সম্পূর্ণ প্রাকৃতিক
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaLeaf className="text-green-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                সরাসরি গ্রাম থেকে সংগ্রহ
              </h3>
              <p className="text-gray-600">
                কৃষকদের কাছ থেকে সরাসরি সংগ্রহ করা হয়
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-blue-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                স্বাস্থ্যসম্মত ও নিরাপদ
              </h3>
              <p className="text-gray-600">
                স্বাস্থ্যসম্মত উপায়ে প্রক্রিয়াজাত ও প্যাকেজিং
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTruck className="text-purple-600 text-3xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                দ্রুত ডেলিভারি
              </h3>
              <p className="text-gray-600">
                আপনার দরজায় দ্রুত ও নিরাপদ ডেলিভারি
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Processing Section */}
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                আমাদের প্রক্রিয়াজাতকরণ
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                আমরা স্বাস্থ্যসম্মত ও নিরাপদ উপায়ে গরুর পায়া প্রক্রিয়াজাত করি। 
                আমাদের সম্পূর্ণ প্রক্রিয়াটি স্বচ্ছ এবং স্বাস্থ্যসম্মত।
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 rounded-full p-2 flex-shrink-0 mt-1">
                    <FaCheckCircle className="text-amber-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">স্বাস্থ্যসম্মত প্রক্রিয়াজাতকরণ</h3>
                    <p className="text-gray-600">
                      আমরা সবসময় স্বাস্থ্যসম্মত উপায়ে পণ্য প্রক্রিয়াজাত করি
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 rounded-full p-2 flex-shrink-0 mt-1">
                    <FaCheckCircle className="text-amber-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">তাজা পণ্য</h3>
                    <p className="text-gray-600">
                      সরাসরি সংগ্রহ করে দ্রুত প্রক্রিয়াজাত করা হয়
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 rounded-full p-2 flex-shrink-0 mt-1">
                    <FaCheckCircle className="text-amber-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">নিরাপদ প্যাকেজিং</h3>
                    <p className="text-gray-600">
                      স্বাস্থ্যসম্মত উপায়ে প্যাকেজিং করে আপনার কাছে পৌঁছে দেওয়া হয়
                    </p>
                  </div>
                </div>
              </div>

              <Link
                to="/products"
                className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-full text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                আমাদের পণ্য দেখুন
              </Link>
            </div>

            {/* Right Side - Video */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gray-900">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/vQR2fuBcdW4"
                    title="গরুর পায়া প্রক্রিয়াজাতকরণ"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              <p className="text-center text-gray-600 mt-4 text-sm">
                আমাদের প্রক্রিয়াজাতকরণ পদ্ধতি দেখুন
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            জনপ্রিয় পণ্য
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-amber-600 hover:to-amber-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              সব পণ্য দেখুন
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
            গ্রাহকদের মতামত
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            আমাদের গ্রাহকরা যা বলেছেন
          </p>

          {/* Carousel Container */}
          <div className="relative max-w-7xl mx-auto">
            {/* Carousel Wrapper */}
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`
                }}
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="min-w-full md:min-w-[50%] lg:min-w-[33.333%] px-4"
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full">
                      <div className="flex items-center mb-4">
                        <div className="flex text-amber-500 mr-2">
                          {[...Array(5)].map((_, i) => (
                            <FaStar key={i} className="text-sm fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">
                        {review.text}
                      </p>
                      <div className="flex items-center">
                        <div className={`w-12 h-12 bg-gradient-to-br ${review.color} rounded-full flex items-center justify-center text-white font-bold text-lg mr-3`}>
                          {review.avatar}
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-800">{review.name}</h4>
                          <p className="text-sm text-gray-600">{review.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-amber-600 hover:bg-amber-50 z-10"
              aria-label="Previous review"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-amber-600 hover:bg-amber-50 z-10"
              aria-label="Next review"
            >
              <FaChevronRight className="text-xl" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: reviews.length - itemsPerView + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 rounded-full ${
                    index === currentIndex
                      ? 'w-8 h-3 bg-amber-600'
                      : 'w-3 h-3 bg-gray-300 hover:bg-amber-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

