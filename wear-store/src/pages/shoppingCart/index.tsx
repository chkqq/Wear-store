import React from 'react';
import styles from './style.module.scss';
import Header from '../../widgets/header';
import Button from '../../ui/button';
import DeleteIcon from './icons/delete.png';
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';
const ShoppingCartPage: React.FC = () => {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleStoreClick = () => {
    navigate('/');
  };

  const handleRemoveFromCart = (id: number, size: string) => {
    removeFromCart(id, size);
  };

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
               <div key={`${item.id}-${item.size}`} className={styles.listElement}>
                 <img src={item.image1} alt={item.name} className={styles.productImage} />
                 <span>{item.name} (Размер: {item.size}, Количество:{item.quantity}) - ${item.price * item.quantity}</span>
                 <Button icon={DeleteIcon} onClick={() => handleRemoveFromCart(item.id, item.size)} />
               </div>
             ))}
           </div>
           <div className={styles.deliveryForm}>
             <input className={styles.textInput} placeholder='Фамилия Имя Отчество'/>
             <input className={styles.textInput} placeholder='+7 123 456 7890'/>
             <input className={styles.textInput} placeholder='email'/>
             <input className={styles.textInput} placeholder='Ваш адрес'/>
             <Button text='Заказать'/>
           </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShoppingCartPage;
