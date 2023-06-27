'use client';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { Basket } from '../Basket/Basket';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link className={styles.logotext} href="/">Билетопоиск</Link>
      <Basket />
    </header>
  )
}