import { useCart } from '../context/CartContext'
import { FaCheckCircle } from 'react-icons/fa'

const Toast = () => {
  const { showToast, toastMessage } = useCart()

  if (!showToast) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 min-w-[300px]">
        <FaCheckCircle className="text-2xl" />
        <span className="font-medium">{toastMessage}</span>
      </div>
    </div>
  )
}

export default Toast

