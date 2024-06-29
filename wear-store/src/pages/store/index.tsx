import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './style.module.scss';
import Header from '../../widgets/header';

interface Product {
  id: number;
  name: string;
  price: number;
  image1: string;
  image2: string;
  description: string;
  sizes: string[];
}

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/src/dataBase/storeDataBase.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.storeMainBox}>
        <div className={styles.productCardList}>
          {products.map(product => (
            <div key={product.id} className={styles.productCard}>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
