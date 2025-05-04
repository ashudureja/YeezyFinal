
import React, { createContext, useCallback, useState } from 'react'
import { Songs } from '../Constants/Songs'

export const CartContext = createContext()

const CartProvider = ({ children }) => {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [audioplaying, Setaudioplaying] = useState(false);
  const[index,setIndex]=useState(0)
  const[currentSong,setSong]=useState(Songs[index])
  const[product,setProduct]=useState(null)


  const addItem = useCallback((product) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
    
  }, [])

  const removeItem = useCallback((productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId, quantity) => {
    if (quantity < 1) {
      removeItem(productId)
      return
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }, [removeItem])

 

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const cartTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )

  const currentProduct=(product)=>{
    setProduct(product)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        audioplaying,
        Setaudioplaying,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        cartTotal,
        Songs,
        currentSong,
        setSong,
        index,
        setIndex,
        product,
        currentProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
