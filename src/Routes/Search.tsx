import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  GetMovies,
  getMoviesBySearching,
  GetTvShows,
  getTvShowsBySearching,
} from '../api';
import Modal from '../Components/Modal';
import Slider from '../Components/Slider';

const HeightFixer = styled.div`
  height: 200px;
  width: 100%;
`;

function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const type = (searchParams.get('t') as 'movie' | 'tv') || 'movie';
  const navigate = useNavigate();
  const { data: movies, isLoading: moviesLoading } = useQuery<GetMovies>(
    ['movies', 'search', keyword],
    () => getMoviesBySearching(keyword),
  );
  const { data: tvShows, isLoading: tvShowsLoading } = useQuery<GetTvShows>(
    ['tvShows', 'search', keyword],
    () => getTvShowsBySearching(keyword),
  );
  const params = useParams<{ id: string }>();

  const modalCond = !moviesLoading && !tvShowsLoading && params.id;

  if (!keyword) {
    navigate('/', { replace: true });
    return null;
  }

  return (
    <>
      <HeightFixer />
      {!moviesLoading && movies && (
        <Slider title={`"${keyword}" in movies`} data={movies} type="movie" />
      )}
      {!tvShowsLoading && tvShows && (
        <Slider title={`"${keyword}" in TV shows`} data={tvShows} type="tv" />
      )}
      {modalCond && <Modal type={type} id={params.id} />}
    </>
  );
}

export default Search;
