import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import Header from '../../widgets/header';
import ProductCard from '../../widgets/productCard';
import CategoryFilter from '../../widgets/categoryFilter';

interface Product {
  id: number;
  name: string;
  price: number;
  image1: string;
  image2: string;
  description: string;
  sizes: string[];
  category: string;
}

const StorePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  useEffect(() => {
    fetch('/src/dataBase/storeDataBase.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  const categories = ['Все', 'Верх', 'Низ', 'Обувь', 'Головные уборы'];

  const filteredProducts = selectedCategory === 'Все'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.categoriesBox}>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <div className={styles.storeMainBox}>
        <div className={styles.productCardList}>
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StorePage;
