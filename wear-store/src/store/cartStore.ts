import create from 'zustand'

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  size: string
  image1: string
}

interface CartState {
  cartItems: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number, size: string) => void
}

const getInitialCartItems = (): CartItem[] => {
  const storedCartItems = localStorage.getItem('cartItems')
  return storedCartItems ? JSON.parse(storedCartItems) : []
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: getInitialCartItems(),
  addToCart: (product) =>
    set((state) => {
      const updatedCartItems = [...state.cartItems];
      const item = updatedCartItems.find(
        (item) => item.id === product.id && item.size === product.size
      )
      if (item) {
        item.quantity += 1
      } else {
        updatedCartItems.push({ ...product, quantity: 1 })
      }
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
      return { cartItems: updatedCartItems }
    }),
  removeFromCart: (id, size) =>
    set((state) => {
      const updatedCartItems = state.cartItems.filter(
        (item) => item.id !== id || item.size !== size
      )
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems))
      return { cartItems: updatedCartItems }
    }),
}))
