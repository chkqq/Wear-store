import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './style.module.scss'
import Header from '../../widgets/header'
import { useCartStore } from '../../store/cartStore'
import Button from '../../ui/button'

interface Product {
  id: number
  name: string
  price: number
  image1: string
  image2: string
  image3: string
  image4: string
  description: string
  sizes: string[]
}

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (id) {
      fetch('/src/dataBase/storeDataBase.json')
        .then(response => response.json())
        .then(data => {
          const foundProduct = data.find((p: Product) => p.id === parseInt(id, 10))
          setProduct(foundProduct);
        })
        .catch(error => console.error('Error loading product:', error))
    }
  }, [id])

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setError(null)
  }

  const handleAddToCart = () => {
    if (product && selectedSize) {
      addToCart({ ...product, size: selectedSize });
    } else {
      setError('Пожалуйста, выберите размер перед добавлением в корзину!')
    }
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.productPage}>
        <div className={styles.productImages}>
          <img src={product.image1} alt={product.name} />
          <img src={product.image2} alt={product.name} />
          <img src={product.image3} alt={product.name} />
          <img src={product.image4} alt={product.name} />
        </div>
        <div className={styles.productDetails}>
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
      {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  )
}

export default ProductPage;
