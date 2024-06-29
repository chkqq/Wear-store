import React from 'react'
import styles from './style.module.scss'
import Header from '../../widgets/header'
import Button from '../../ui/button'
import { useNavigate } from 'react-router-dom'
import CartListElement from '../../widgets/cartListElement'
import DeliveryForm from '../../widgets/deliveryForm'
import { useCartStore } from '../../store/cartStore'
const ShoppingCartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useCartStore()
  const navigate = useNavigate()

  const handleStoreClick = () => {
    navigate('/')
  }

  const handleRemoveFromCart = (id: number, size: string) => {
    removeFromCart(id, size)
  }

  const handleFormSubmit = (formData: { name: string; phone: string; email: string; address: string }) => {
    console.log('Form submitted:', formData)
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.shoppingCartMainBox}>
        <p className={styles.title}>Ваша корзина:</p>
        {cartItems.length === 0 ? (
          <div className={styles.emptyCartMessage}>
            <p>Корзина пуста...</p>
            <Button text='Посмотреть ещё' onClick={handleStoreClick} />
          </div>
        ) : (
         <div className={styles.listAndDeliveryForm}>
           <div className={styles.list}>
             {cartItems.map(item => (
               <CartListElement
                 key={`${item.id}-${item.size}`}
                 id={item.id}
                 name={item.name}
                 size={item.size}
                 quantity={item.quantity}
                 price={item.price}
                 image1={item.image1}
                 onRemove={handleRemoveFromCart}
               />
             ))}
           </div>
           <p className={styles.totalAmount}>Общая сумма: ${totalAmount}</p>
           <DeliveryForm onSubmit={handleFormSubmit} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage
