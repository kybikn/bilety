'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Counter } from '../Counter/Counter';
import styles from './styles.module.css';
import Link from 'next/link';

export const FilmCard = ({
  title,
  genre,
  rating,
  seasonCount,
  posterUrl,
  movieCinemas,
  id,
  slug,
  onClick,
  showDelete,
}) => {
  return (
    <div
      className={styles.filmInfo}
    >
      <Image
        className={styles.smallPoster}
        src={posterUrl}
        alt='Basket'
        width={32}
        height={32}
        priority
      />
      <div className={styles.filmInfoContent}>
        <Link className={styles.title} href={`/films/${id}`}>{title}</Link>
        <p>
          <b>Жанр: </b>
          {Boolean(genre) && <span>{genre}</span>}
        </p>
        <p>
          <b>Рейтинг: </b> {rating}
        </p>
        <p>
          <b>Кинотеатр: </b> {movieCinemas}
        </p>
        <p>
          <b>Сеанс:</b>
        </p>
      </div>
      <Counter movieId={id} showDelete={showDelete} />
    </div>
  );
};
