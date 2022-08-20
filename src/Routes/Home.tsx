import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';
import { GetMovies, getMovies } from '../api';
import { makeImgUrl, summarizeText } from '../utils';
import { AnimatePresence, motion, Variants } from 'framer-motion';

interface BannerProps {
  imgUrl: string;
}

const Banner = styled.div<BannerProps>`
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

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.li)<BannerProps>`
  height: 200px;
  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
  background-position: center;
`;

const offset = 6;

const rowVariants: Variants = {
  hidden: { x: window.innerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.innerWidth - 5 },
};

function Home() {
  const { data, isLoading } = useQuery<GetMovies>(['movies'], getMovies);

  const [page, setPage] = useState(0);
  const [isPaging, setIsPaging] = useState(false);
  const NextPage = () => {
    if (data) {
      if (isPaging) return;
      toggleIsPaging();
      const totalLength = data.results.length - 1;
      const lastPage = Math.floor(totalLength / offset) - 1;
      setPage((prev) => (prev === lastPage ? 0 : prev + 1));
    }
  };
  const toggleIsPaging = () => setIsPaging((prev) => !prev);

  return isLoading || !data ? null : (
    <>
      <Banner
        onClick={NextPage}
        imgUrl={makeImgUrl(data.results[0].backdrop_path || '')}
      >
        <Title>{data.results[0].title}</Title>
        <Overview>{summarizeText(data.results[0].overview)}</Overview>
      </Banner>
      <Slider>
        <AnimatePresence initial={false} onExitComplete={toggleIsPaging}>
          <Row
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}
            key={page}
          >
            {data.results
              .slice(1)
              .slice(page * offset, page * offset + offset)
              .map((movie) => (
                <Box
                  key={movie.id}
                  imgUrl={makeImgUrl(movie.backdrop_path, 'w500')}
                />
              ))}
          </Row>
        </AnimatePresence>
      </Slider>
    </>
  );
}

export default Home;
