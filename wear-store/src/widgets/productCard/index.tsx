import React from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';

interface Product {
  id: number;
  name: string;
  price: number;
  image1: string;
  image2: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className={styles.productCard}>
      <Link to={`/product/${product.id}`} className={styles.productCardLink}>
        <div className={styles.productCardPicture}>
          <img src={product.image1} alt={product.name} className={styles.productCardImage} />
          <img src={product.image2} alt={product.name} className={styles.productCardImageHover} />
        </div>
        <div className={styles.ProductCardNameAndPriceBox}>
          <p className={styles.productCardName}>{product.name}</p>
          <p className={styles.productCardPrice}>${product.price}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard
