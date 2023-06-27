'use client';
import React, { useEffect, useState } from 'react';
import slugify from 'slugify';
import Image from 'next/image';
import styles from './styles.module.css';
import { movies } from '@/mock/mock';
import { Counter } from '@/components/Counter/Counter';
import { useGetMovieQuery } from '@/redux/services/movieApi';

const Page = ({ params }) => {
  const { data, isLoading, error } = useGetMovieQuery(params.id);

  if (isLoading) {
    return <div>Фильм загружается...</div>;
  }
  if (!data || error) {
    return <div>Не найдены</div>;
  }
  const {
    posterUrl,
    title,
    genre,
    releaseYear,
    rating,
    director,
    description,
    seasonCount,
    movieCinemas,
    id,
  } = data;

  return (
    <section className={styles.filmInfoContainer}>
      <div className={styles.filmInfo}>
        <Image
          className={styles.bigPoster}
          src={posterUrl}
          alt='Basket'
          width={32}
          height={32}
          priority
        />
        <div className={styles.descriptionContainer}>
          <div className={styles.title}>
            <h2 className={styles.textXXL}>{title || 'Unkwnown Film'}</h2>
            <Counter movieId={id} />
          </div>
          <div className={styles.description}>
            <p className={styles.textXL}>Жанр: </p>
            {Boolean(genre) && <p className={styles.textL}>{genre}</p>}
          </div>
          <div className={styles.description}>
            <p className={styles.textXL}>Год выпуска: </p>
            <p className={styles.textL}>{releaseYear}</p>
          </div>
          <div className={styles.description}>
            <p className={styles.textXL}>Рейтинг: </p>
            <p className={styles.textL}>{rating}</p>
          </div>
          <div className={styles.description}>
            <p className={styles.textXL}>Режиссер: </p>
            <p className={styles.textL}>{director}</p>
          </div>
          <div className={styles.description}>
            <p className={styles.textXL}>Описание</p>
          </div>
          <p className={styles.textL}>{description}</p>
        </div>
      </div>

      <div className={styles.comments}>
        <div className={styles.accordeon}>
          <div className={styles.menuGroup}>
            <Image
              className={styles.icon}
              src={'/empty.svg'}
              alt='arrow'
              width={100}
              height={100}
              priority
            />
            <div className={styles.messageContent}>
              <div className={styles.messageBox}>
                <p className={styles.textM}>Роман</p>
                <p className={styles.textS}>Оценка: {rating}</p>
              </div>

              <div>
                <p className={styles.textS}>
                  По счастью мне довелось посмотреть фильм раньше, чем прочесть
                  книгу. Это было около четырех лет назад, но тот момент я
                  вспоминаю и по сей день. До него я не был фанатом Джона
                  Толкина, как впрочем, и всего фентези в целом, однако стоило
                  мне посмотреть первые десять минут фильма и оставшиеся
                  пролетели на одном дыхании. Я словно погрузился в необычайный
                  мир, где добро борется со злом, где зеленые рощи перемежаются
                  с поросшими мхом статуями и древними развалинами, в мир, где
                  пробираясь лесною тропой можно встретить остроухих неувядающих
                  эльфов или мерзких орков – кому как повезет...
                </p>
              </div>
            </div>
          </div>
          <div className={styles.menuGroup}>
            <Image
              className={styles.icon}
              src={'/empty.svg'}
              alt='arrow'
              width={100}
              height={100}
              priority
            />
            <div className={styles.messageContent}>
              <div className={styles.messageBox}>
                <p className={styles.textM}>Роман</p>
                <p className={styles.textS}>Оценка: {rating}</p>
              </div>

              <div>
                <p className={styles.textS}>
                  По счастью мне довелось посмотреть фильм раньше, чем прочесть
                  книгу. Это было около четырех лет назад, но тот момент я
                  вспоминаю и по сей день. До него я не был фанатом Джона
                  Толкина, как впрочем, и всего фентези в целом, однако стоило
                  мне посмотреть первые десять минут фильма и оставшиеся
                  пролетели на одном дыхании. Я словно погрузился в необычайный
                  мир, где добро борется со злом, где зеленые рощи перемежаются
                  с поросшими мхом статуями и древними развалинами, в мир, где
                  пробираясь лесною тропой можно встретить остроухих неувядающих
                  эльфов или мерзких орков – кому как повезет...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
