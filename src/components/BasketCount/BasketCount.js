'use client';
import Image from 'next/image'
import styles from './styles.module.css'
import { useSelector } from 'react-redux';
import { selectCartSum } from '@/redux/feature/cart/selector';

export const BasketCount = () => {
  const cartSum = useSelector((state) => selectCartSum(state));
  return (
    !!cartSum && <div className={styles.basketCount}>
      {cartSum}
    </div>
  )
}