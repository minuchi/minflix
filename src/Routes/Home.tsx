import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { GetMovies, getMovies } from '../api';
import { makeImgUrl, summarizeText } from '../utils';
import MovieSlider from '../Components/MovieSlider';

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
  const { data, isLoading } = useQuery<GetMovies>(['movies'], getMovies);

  return isLoading || !data ? null : (
    <>
      <Banner imgUrl={makeImgUrl(data.results[0].backdrop_path || '')}>
        <Title>{data.results[0].title}</Title>
        <Overview>{summarizeText(data.results[0].overview)}</Overview>
      </Banner>
      <MovieSlider data={data} />
    </>
  );
}

export default Home;
