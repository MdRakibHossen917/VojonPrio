import { useToast } from '../context/ToastContext'
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa'

const Toast = () => {
  const { showToast, toastMessage, toastType } = useToast()

  if (!showToast) return null

  const isSuccess = toastType === 'success'

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-slide-up">
      <div
        className={`
          ${isSuccess ? 'bg-green-500' : 'bg-red-500'} 
          text-white px-6 py-4 rounded-lg shadow-2xl flex items-center space-x-3 min-w-[300px]
        `}
      >
        {isSuccess ? (
          <FaCheckCircle className="text-2xl" />
        ) : (
          <FaExclamationCircle className="text-2xl" />
        )}
        <span className="font-medium">{toastMessage}</span>
      </div>
    </div>
  )
}

export default Toast

