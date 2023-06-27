import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { addCinemasInfo } from '@/utils/filmtools';
import slugify from "slugify";
import { genresMap } from '@/mock/genres';


export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: (builder) => ({
    getMovies: builder.query({ query: () => 'movies' }),
    getMoviesByCinema: builder.query({
      query: (cinemaId) => `movies?cinemaId=${cinemaId}`,
    }),
    getMovie: builder.query({
      query: (movieId) => `movie?movieId=${movieId}`,
    }),
    getRichMovies: builder.query(
      {
        async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
          const [movies, cinemas] = await Promise.all([fetchWithBQ('movies'), fetchWithBQ('cinemas')]);
          const error = movies.error || cinemas.error;
          if (error) return { error }
          const richMovies = addCinemasInfo(movies.data, cinemas.data)
          return richMovies ? { data: richMovies } : { error: error }
        }
      }),

    getRichMoviesUniversal: builder.query(
      {
        async queryFn(_arg, _queryApi, _extraOptions, fetchWithBQ) {
          const moviesPath = _arg ? `movies?cinemaId=${_arg}` : 'movies';
          const [movies, cinemas] = await Promise.all([fetchWithBQ(moviesPath), fetchWithBQ('cinemas')]);
          const error = movies.error || cinemas.error;
          if (error) return { error }
          const richMovies = addCinemasInfo(movies.data, cinemas.data)
          return richMovies ? { data: richMovies } : { error: error }
        }
      }),
  }),
});

export const { useGetMoviesQuery, useGetMovieQuery, useGetRichMoviesQuery, useGetRichMoviesbyCinemaQuery, useGetRichMoviesUniversalQuery } = movieApi;
