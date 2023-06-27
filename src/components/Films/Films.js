'use client';
import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { FilmCard } from '../FilmCard/FilmCard';
import { useGetRichMoviesQuery, useGetRichMoviesUniversalQuery } from '@/redux/services/movieApi';
import { selectCinemaFilter, selectGenreFilter, selectNameFilter } from '@/redux/feature/filter/selector';
import { useSelector } from 'react-redux';

export const Films = () => {

  const [moviesToShow, setMoviesToShow] = useState([])
  const nameFilter = useSelector((state) => selectNameFilter(state))
  const genreFilter = useSelector((state) => selectGenreFilter(state))
  const cinemaFilter = useSelector((state) => selectCinemaFilter(state))
  const { data, isLoading, error } = useGetRichMoviesUniversalQuery(cinemaFilter);

  useEffect(() => {
    console.log()
    if (data) {
      const filteredData = data
        .filter(movie => genreFilter ? movie.genre === genreFilter : true)
      setMoviesToShow(filteredData);
    }
  }, [data, genreFilter, nameFilter])

  if (isLoading) {
    return <div>Информация о фильмах загружается...</div>
  }
  if (!data || error) {
    return <div>Не найдены</div>
  }

  return (
    <div className={styles.position}>
      <div className={styles.films}>
        {moviesToShow.map(movie => <FilmCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          genre={movie.genre}
          rating={movie.rating}
          seasonCount={movie.seasonCount}
          posterUrl={movie.posterUrl}
          movieCinemas={movie.cinemas}
          slug={movie.slug}
          className={movie.pos}
        />)}
      </div>
    </div>
  )
}