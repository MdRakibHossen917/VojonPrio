import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart()

  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col md:flex-row items-center gap-4 hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 text-center md:text-left">
        <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
        <p className="text-amber-600 font-semibold">{item.price}৳ / {item.unit}</p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-lg transition-colors"
        >
          <FaMinus />
        </button>
        <span className="text-xl font-bold text-gray-800 w-12 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="bg-amber-100 hover:bg-amber-200 text-amber-700 p-2 rounded-lg transition-colors"
        >
          <FaPlus />
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right">
        <p className="text-xl font-bold text-amber-600">
          {item.price * item.quantity}৳
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeFromCart(item.id)}
        className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-colors"
      >
        <FaTrash />
      </button>
    </div>
  )
}

export default CartItem

