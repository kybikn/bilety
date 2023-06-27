'use client';
import Image from 'next/image'
import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { BasketCount } from '../BasketCount/BasketCount';
import { Filters } from '../Filters/Filters';
import { Films } from '../Films/Films';

export const Main = () => {

  return (
    <div className={styles.main}>
      <Filters />
      <Films />
    </div>
  )
}