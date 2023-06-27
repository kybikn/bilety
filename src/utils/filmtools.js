import slugify from "slugify";
import { genresMap } from '@/mock/genres';

export function addCinemasInfo(movies, cinemas) {
    const newMovies = movies.map(movie => {
        const movieCinemaNames = cinemas.reduce((accum, cinema) => {
            if (cinema.movieIds.includes(movie.id)) { return [...accum, cinema.name] }
            return accum;
        }, [])
        const movieCinemas = movieCinemaNames?.join(', ') || "";
        const newData = {
            genreRu: genresMap[movie.genre] || movie.genre,
            slug: slugify(movie.title),
            cinemas: movieCinemas,
        }
        const newMovie = {
            ...movie,
            ...newData
        }
        return newMovie
    })
    return newMovies
}