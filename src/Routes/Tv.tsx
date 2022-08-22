import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import {
  getAiringTodayTvShows,
  GetMovies,
  getMovies,
  getOnTheAirTvShows,
  getPopularTvShows,
  getTopRatedMovies,
  getTopRatedTvShows,
  GetTvShows,
  getUpcomingMovies,
} from '../api';
import { makeImgUrl, summarizeText } from '../utils';
import MovieSlider from '../Components/MovieSlider';
import MovieModal from '../Components/MovieModal';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

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

function Tv() {
  const { data: onTheAirTvShows, isLoading: onTheAirTvShowsLoading } =
    useQuery<GetTvShows>(['tvShows', 'onTheAir'], getOnTheAirTvShows);
  const { data: airingTodayTvShows, isLoading: airingTodayTvShowsLoading } =
    useQuery<GetTvShows>(['tvShows', 'airingToday'], getAiringTodayTvShows);
  const { data: popularTvShows, isLoading: popularTvShowsLoading } =
    useQuery<GetTvShows>(['shows', 'popular'], getPopularTvShows);
  const { data: topRatedTvShows, isLoading: topRatedTvShowsLoading } =
    useQuery<GetTvShows>(['TvShows', 'topRated'], getTopRatedTvShows);
  const params = useParams<{ id: string }>();

  return (
    <>
      <Banner
        imgUrl={makeImgUrl(onTheAirTvShows?.results[0].backdrop_path || '')}
      >
        <Title>{onTheAirTvShows?.results[0].name}</Title>
        <Overview>
          {summarizeText(onTheAirTvShows?.results[0].overview || '')}
        </Overview>
      </Banner>
      {!onTheAirTvShowsLoading && onTheAirTvShows && (
        <MovieSlider
          title="On the air TV shows"
          data={{
            ...onTheAirTvShows,
            results: onTheAirTvShows.results.slice(1),
          }}
        />
      )}
      {!airingTodayTvShowsLoading && airingTodayTvShows && (
        <MovieSlider title="Airing today TV shows" data={airingTodayTvShows} />
      )}
      {!popularTvShowsLoading && popularTvShows && (
        <MovieSlider title="Popular TV shows" data={popularTvShows} />
      )}
      {!topRatedTvShowsLoading && topRatedTvShows && (
        <MovieSlider title="Top rated TV shows" data={topRatedTvShows} />
      )}
      {params.id && <MovieModal type="tv" id={params.id} />}
    </>
  );
}

export default Tv;
