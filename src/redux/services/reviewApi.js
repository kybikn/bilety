import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/' }),
  endpoints: (builder) => ({
    getReviewsByMovieId: builder.query({
      query: (movieId) => `reviews?movieId=${movieId}`,
    }),
  }),
});

export const { useGetReviewsByMovieIdQuery } = reviewApi;
