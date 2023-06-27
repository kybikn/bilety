'use client';
import Image from 'next/image'
import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { BasketCount } from '../BasketCount/BasketCount';
import Link from 'next/link';

export const Basket = () => {

  return (

    <div
      className={styles.basket}
    >
      <BasketCount />
      <Link className={styles.footerText} href="/cart/">
        <Image
          src="/basket.svg"
          alt="Basket"
          className={styles.basketIcon}
          width={32}
          height={32}
          priority
        /></Link>

    </div>
  )
}