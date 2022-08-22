import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
  GetTvShows,
} from '../api';
import Modal from '../Components/Modal';
import Slider from '../Components/Slider';
import { makeImgUrl, summarizeText } from '../utils';

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
    useQuery<GetTvShows>(['tvShows', 'popular'], getPopularTvShows);
  const { data: topRatedTvShows, isLoading: topRatedTvShowsLoading } =
    useQuery<GetTvShows>(['tvShows', 'topRated'], getTopRatedTvShows);
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
        <Slider
          title="On the air TV shows"
          data={{
            ...onTheAirTvShows,
            results: onTheAirTvShows.results.slice(1),
          }}
          type="tv"
        />
      )}
      {!airingTodayTvShowsLoading && airingTodayTvShows && (
        <Slider
          title="Airing today TV shows"
          data={airingTodayTvShows}
          type="tv"
        />
      )}
      {!popularTvShowsLoading && popularTvShows && (
        <Slider title="Popular TV shows" data={popularTvShows} type="tv" />
      )}
      {!topRatedTvShowsLoading && topRatedTvShows && (
        <Slider title="Top rated TV shows" data={topRatedTvShows} type="tv" />
      )}
      {params.id && <Modal type="tv" id={params.id} />}
    </>
  );
}

export default Tv;
