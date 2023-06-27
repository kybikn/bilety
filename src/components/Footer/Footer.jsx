'use client';
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link';

export const Footer = () => {

  return (
    <footer className={styles.footer}>
      <Link className={styles.footerText} href="/faq/">Вопросы-ответы</Link>
      <Link className={styles.footerText} href="/about/">О нас</Link>
    </footer>
  )
}