const API_KEY = 'a2a37b7c5c5eb28a869a0a98eb6bb9c1';
const BASE_PATH = 'https://api.themoviedb.org/3';

export interface GetMovies {
  dates: Dates;
  page: number;
  results: GetMoviesResult[];
  total_pages: number;
  total_results: number;
}

export interface GetMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
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

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface GetTvShows {
  page: number;
  results: GetTvShowsResult[];
  total_pages: number;
  total_results: number;
}

interface GetTvShowsResult {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface GetTVShow {
  adult: boolean;
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: any;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface LastEpisodeToAir {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface Network {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export async function getMovie(id: string | number) {
  return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}&region=KR`).then(
    (resp) => resp.json(),
  );
}

export async function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&region=KR`,
  ).then((resp) => resp.json());
}

export async function getTopRatedMovies() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&region=KR`,
  ).then((resp) => resp.json());
}

export async function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&region=KR`).then(
    (resp) => resp.json(),
  );
}

export async function getTvShow(id: string | number) {
  return fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}`).then((resp) =>
    resp.json(),
  );
}

export async function getOnTheAirTvShows() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}`).then((resp) =>
    resp.json(),
  );
}

export async function getAiringTodayTvShows() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`).then((resp) =>
    resp.json(),
  );
}

export async function getPopularTvShows() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((resp) =>
    resp.json(),
  );
}

export async function getTopRatedTvShows() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`).then((resp) =>
    resp.json(),
  );
}

export async function getMoviesBySearching(s: string) {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      s,
    )}`,
  ).then((resp) => resp.json());
}

export async function getTvShowsBySearching(s: string) {
  return fetch(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(s)}`,
  ).then((resp) => resp.json());
}
