import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import {
  GetMovies,
  getMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from '../api';
import { makeImgUrl, summarizeText } from '../utils';
import MovieSlider from '../Components/MovieSlider';
import MovieModal from '../Components/MovieModal';
import { useParams } from 'react-router-dom';

const Banner = styled.div<{ imgUrl: string }>`
  height: 70vh;
  width: 100%;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.3)
    ),
    url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.white.light};
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled.p`
  color: ${(props) => props.theme.white.light};
  font-size: 30px;
  width: 65%;
  line-height: 1.2;
`;

function Home() {
  const { data: movies, isLoading: moviesLoading } = useQuery<GetMovies>(
    ['movies'],
    getMovies,
  );
  const { data: topRatedMovies, isLoading: topRatedMoviesLoading } =
    useQuery<GetMovies>(['movies', 'topRated'], getTopRatedMovies);
  const { data: upcomingMovies, isLoading: upcomingMoviesLoading } =
    useQuery<GetMovies>(['movies', 'upcoming'], getUpcomingMovies);
  const params = useParams<{ id: string }>();

  return (
    <>
      <Banner imgUrl={makeImgUrl(movies?.results[0].backdrop_path || '')}>
        <Title>{movies?.results[0].title}</Title>
        <Overview>{summarizeText(movies?.results[0].overview || '')}</Overview>
      </Banner>
      {!moviesLoading && movies && (
        <MovieSlider
          title="Now playing movies"
          data={{ ...movies, results: movies.results.slice(1) }}
          type="movie"
        />
      )}
      {!topRatedMoviesLoading && topRatedMovies && (
        <MovieSlider
          title="Top rated movies"
          data={topRatedMovies}
          type="movie"
        />
      )}
      {!upcomingMoviesLoading && upcomingMovies && (
        <MovieSlider
          title="Upcoming movies"
          data={upcomingMovies}
          type="movie"
        />
      )}
      {params.id && <MovieModal type="movie" id={params.id} />}
    </>
  );
}

export default Home;
