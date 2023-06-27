'use client';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/redux/feature/cart';
import { selectProductAmount } from '@/redux/feature/cart/selector';
import Portal from '../../Portals/Portal/Portal';
import DeleteModal from '@/Portals/DeleteConfirmation/DeleteModal';

export const Counter = ({ movieId, showDelete }) => {
  const dispatch = useDispatch();
  const amount = useSelector((state) => selectProductAmount(state, movieId))

  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  function handleDecrement() {
    if (amount === 1) {
      setIsConfirmDeleteOpen(true)
    } else { dispatch(cartActions.decrement(movieId)) }
  }

  function handleDelete() {
    setIsConfirmDeleteOpen(true)
  }

  function handleConfirm(id) {
    setIsConfirmDeleteOpen(false)
    dispatch(cartActions.delete(movieId))
  }

  function handleCancel(id) {
    setIsConfirmDeleteOpen(false)
  }

  useEffect(() => { }, [isConfirmDeleteOpen])

  return (
    <div className={styles.counter}>
      {isConfirmDeleteOpen && (
        <Portal>
          <DeleteModal
            id={movieId}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        </Portal>)}
      <button
        className={styles.button}
        onClick={handleDecrement}>-</button>
      {amount}
      <button
        className={styles.button}
        onClick={() => dispatch(cartActions.increment(movieId))}>+</button>
      {!!showDelete && !!amount && <div className={styles.deleteBtn} onClick={handleDelete}> X </div>}
    </div>
  )
}