import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { GetMovies } from '../api';
import MovieBox from './MovieBox';

const Wrapper = styled.div`
  position: relative;
  top: -100px;
  padding: 10px;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 700;
  color: ${(props) => props.theme.white.light};
  margin-bottom: 20px;
`;

const Slider = styled.div`
  position: relative;
`;

const Row = styled(motion.ul)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const ChangePageButton = styled.button`
  position: absolute;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s linear;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  top: 100px;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

const offset = 6;

const rowVariants: Variants = {
  hidden: { x: window.innerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.innerWidth - 5 },
};

const HeightFixer = styled.div`
  height: 250px;
  width: 100%;
`;

interface MovieSliderProps {
  title: string;
  data: GetMovies;
}

function MovieSlider({ title, data }: MovieSliderProps) {
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

  return (
    <Wrapper>
      <Title>{title}</Title>
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
                <MovieBox
                  key={movie.id}
                  id={title.toLowerCase().replace(/\s/g, '') + '-' + movie.id}
                  imageUrl={movie.backdrop_path || movie.poster_path}
                  title={movie.title}
                />
              ))}
          </Row>
          <ChangePageButton onClick={NextPage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="white"
              viewBox="0 0 320 512"
            >
              <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />
            </svg>
          </ChangePageButton>
        </AnimatePresence>
      </Slider>
      <HeightFixer />
    </Wrapper>
  );
}

export default MovieSlider;
