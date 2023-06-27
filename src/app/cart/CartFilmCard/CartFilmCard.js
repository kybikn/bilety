'use client';
// import { useCount } from '@/hooks/useCount';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Counter } from '../../../components/Counter/Counter';
import styles from './styles.module.css';
import Link from 'next/link';
import { FilmCard } from '@/components/FilmCard/FilmCard';
import { useGetMovieQuery } from '@/redux/services/movieApi';

export const CartFilmCard = ({ movieId }) => {

  const [movie, setMovie] = useState()
  const { data, isLoading, error } = useGetMovieQuery(movieId);

  useEffect(() => {
    if (data) {
      console.log('data:', data);
      setMovie(data)
    }
  }, [data])

  if (isLoading) {
    return <div>Информация о фильме загружается...</div>
  }

  if (!movie || error) {
    return <div>Не найдены</div>
  }

  return (
    <FilmCard
      key={movieId}
      id={movieId}
      title={movie.title}
      genre={movie.genre}
      rating={movie.rating}
      seasonCount={movie.seasonCount}
      posterUrl={movie.posterUrl}
      movieCinemas={movie.cinemas}
      showDelete={true}
    />
  );
};
