import { FaFacebook, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-amber-800 to-amber-900 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">ভোজনপ্রিয়</h3>
            <p className="text-amber-100">
              খাঁটি খাবারের বিশ্বস্ত ঠিকানা। আমরা সরাসরি গ্রাম থেকে সংগ্রহ করে
              আপনাকে পৌঁছে দিই 100% খাঁটি ও স্বাস্থ্যসম্মত পণ্য।
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">যোগাযোগ</h3>
            <div className="space-y-3">
              <a href="tel:+8801300981501" className="flex items-center space-x-2 hover:text-amber-200 transition-colors">
                <FaPhone className="text-amber-300" />
                <span>+8801300981501</span>
              </a>
              <a href="mailto:mdrakibhossencse@gmail.com" className="flex items-center space-x-2 hover:text-amber-200 transition-colors">
                <FaEnvelope className="text-amber-300" />
                <span>mdrakibhossencse@gmail.com</span>
              </a>
              <div className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-amber-300 mt-1" />
                <span>ঢাকা, বাংলাদেশ</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-4">সামাজিক যোগাযোগ</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/in/rakibhossen917/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-700 hover:bg-amber-600 p-3 rounded-full transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a
                href="https://github.com/MdRakibHossen917"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-700 hover:bg-amber-600 p-3 rounded-full transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="text-xl" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-700 hover:bg-amber-600 p-3 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="text-xl" />
              </a>
            </div>
            <div className="mt-6">
              <h4 className="font-bold mb-2">কেন আমাদের বেছে নেবেন?</h4>
              <ul className="text-amber-100 space-y-1 text-sm">
                <li>✓ 100% খাঁটি পণ্য</li>
                <li>✓ সরাসরি গ্রাম থেকে সংগ্রহ</li>
                <li>✓ স্বাস্থ্যসম্মত ও নিরাপদ</li>
                <li>✓ দ্রুত ডেলিভারি</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-amber-700 mt-8 pt-8 text-center text-amber-100">
          <p>&copy; 2024 ভোজনপ্রিয়। সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

