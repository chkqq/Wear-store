import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import Header from '../../widgets/header';
import { useCartStore } from '../../store/cartStore';
import Button from '../../ui/button';
import Modal from '../../widgets/Modal';
import PriceChart from '../../features/priceChart';
import Reviews from '../../features/reviews';

interface Product {
  id: number;
  name: string;
  price: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  description: string;
  sizes: string[];
  details: string;
  care_instructions: string;
  compound: string;
}


interface PriceHistory {
  productId: number;
  priceHistory: { date: string; price: number }[];
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [priceHistory, setPriceHistory] = useState<{ date: string; price: number }[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetch('/src/dataBase/storeDataBase.json')
        .then(response => response.json())
        .then(data => {
          const foundProduct = data.find((p: Product) => p.id === parseInt(id, 10));
          setProduct(foundProduct);
        })
        .catch(error => console.error('Error loading product:', error));

      fetch('/src/dataBase/priceHistory.json')
        .then(response => response.json())
        .then(data => {
          const productPriceHistory = data.find((ph: PriceHistory) => ph.productId === parseInt(id, 10));
          if (productPriceHistory) {
            setPriceHistory(productPriceHistory.priceHistory);
          }
        })
        .catch(error => console.error('Error loading price history:', error));
    }
  }, [id]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setError(null);
  };

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart({ ...product, size: selectedSize });
      setTimeout(() => {
        navigate('/');
      }, 200);
    } else {
      setError('Пожалуйста, выберите размер перед добавлением в корзину!');
    }
  };

  const handleImageClick = (index: number) => {
    setCurrentImage(index);
    setIsModalOpen(true);
  };

  const handleNextImage = () => {
    if (product) {
      setCurrentImage((prevIndex) => (prevIndex + 1) % productImages.length);
    }
  };

  const handlePrevImage = () => {
    if (product) {
      setCurrentImage((prevIndex) => (prevIndex - 1 + productImages.length) % productImages.length);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const productImages = [product.image1, product.image2, product.image3, product.image4];

  return (
    <div className={styles.background}>
      <Header />
      <div className={styles.productPageMainBox}>
        <div className={styles.productImagesAndBuyForm}>
          <div className={styles.productImages}>
            {productImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={product.name}
                onClick={() => handleImageClick(index)}
                className={styles.productImage}
              />
            ))}
          </div>
          <div className={styles.productBuyForm}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div className={styles.sizeSelector}>
              <p>Выберите размер:</p>
              <div className={styles.sizeOptions}>
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={selectedSize === size ? styles.selectedSize : ''}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <Button onClick={handleAddToCart} text='Добавить в корзину' />
            </div>
          </div>
        </div>
        <div className={styles.productDetailsAndPriceHistory}>
          <div className={styles.productDetails}>
            <h3>Описание:</h3>
            <p>{product.details}</p>
            <h3>Рекомендации по уходу:</h3>
            <p>{product.care_instructions}</p>
            <h3>Состав:</h3>
            <p>{product.compound}</p>
          </div>
          <PriceChart data={priceHistory} />
        </div>
        <Reviews />
        {error && <div className={styles.error}>{error}</div>}
      </div>
      {isModalOpen && (
        <Modal
          images={productImages}
          currentImageIndex={currentImage}
          onClose={() => setIsModalOpen(false)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
        />
      )}
    </div>
  );
};

export default ProductPage;
