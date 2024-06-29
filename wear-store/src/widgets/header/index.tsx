import styles from './style.module.scss'
import Button from '../../ui/button'
import ShoppingBagIcon from './icons/shopping-bag.png'
import { Link, useNavigate } from 'react-router-dom';
const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleShoppingCartClick = () => {
        navigate('/cart');
    };

    return(
        <div className = {styles.header}>
        <Link to="/" className={styles.title}>WEAR-SHOP</Link>
        <div className= {styles.buttons}>
            <Button icon={ShoppingBagIcon} onClick={handleShoppingCartClick} ></Button>
        </div>

    </div>
    )
}

export default Header