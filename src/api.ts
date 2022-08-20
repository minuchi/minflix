const API_KEY = 'a2a37b7c5c5eb28a869a0a98eb6bb9c1';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface GetMovies {
  dates: Dates;
  page: number;
  results: GetMoviesResult[];
  total_pages: number;
  total_results: number;
}

interface Dates {
  maximum: string;
  minimum: string;
}

interface GetMoviesResult {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export async function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (resp) => resp.json(),
  );
}
