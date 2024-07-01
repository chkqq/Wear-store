import styles from './style.module.scss'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

interface Review {
  id: number
  rating: number
  comment: string
  date: string
}

const Reviews: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState<number | null>(null)

  useEffect(() => {
    if (id) {
      fetch('/src/dataBase/reviewsDataBase.json')
        .then(response => response.json())
        .then(data => {
          const productReviews = data.find((r: { productId: number }) => r.productId === parseInt(id, 10))
          if (productReviews) {
            setReviews(productReviews.reviews)
            const totalRating = productReviews.reviews.reduce((sum: number, review: Review) => sum + review.rating, 0)
            const average = totalRating / productReviews.reviews.length;
            setAverageRating(average)
          }
        })
        .catch(error => console.error('Error loading reviews:', error))
    }
  }, [id])

  return (
    <div className={styles.reviewsContainer}>
      <h3 className={styles.title}>Отзывы пользователей:</h3>
      {averageRating !== null && (
        <div className={styles.averageRating}>
          <p>Средняя оценка: {averageRating.toFixed(1)}</p>
        </div>
      )}
      {reviews.length === 0 ? (
        <p className={styles.noReviews}>Пока нет отзывов для этого товара.</p>
      ) : (
        <div className={styles.reviews}>
          {reviews.map(review => (
            <div key={review.id} className={styles.review}>
              <div className={styles.rating}>
                <p className={styles.ratingLabel}>Оценка:</p>
                <div className={styles.stars}>
                  {[...Array(review.rating)].map((_, index) => (
                    <span key={index} className={styles.star}>&#9733;</span>
                  ))}
                </div>
              </div>
              <p className={styles.comment}>Комментарий: {review.comment}</p>
              <p className={styles.date}>Дата: {review.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Reviews
