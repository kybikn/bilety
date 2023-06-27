'use client';
import styles from './cart.module.css'
import React from 'react'
import { CartFilmCard } from './CartFilmCard/CartFilmCard';
import { selectCartMovies, selectCartSum } from '@/redux/feature/cart/selector';
import { useSelector } from 'react-redux';

export const CartTotal = () => {
  const cartSum = useSelector((state) => selectCartSum(state));
  return (!!cartSum &&
    <div className={styles.cartTotal}>
      <div className={styles.totalTitle}>Итого билетов:</div>
      <div className={styles.totalSum}>{cartSum}</div>
    </div>
  )
}

export const Cart = () => {
  const cartMoviesIds = useSelector((state) => selectCartMovies(state));

  if (!cartMoviesIds || cartMoviesIds.length === 0) {
    return <div>В корзине нет фильмов</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.films}>
        {cartMoviesIds.map(movieId => <CartFilmCard key={movieId} movieId={movieId} />)}
      </div>
      <CartTotal />
    </div>
  )
}

export default Cart