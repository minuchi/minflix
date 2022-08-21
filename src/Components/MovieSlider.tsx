import { useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { GetMovies } from '../api';
import MovieBox from './MovieBox';

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

const offset = 6;

const rowVariants: Variants = {
  hidden: { x: window.innerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.innerWidth - 5 },
};

interface MovieSliderProps {
  data: GetMovies;
}

function MovieSlider({ data }: MovieSliderProps) {
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
    <Slider onClick={NextPage}>
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
                id={movie.id}
                imageUrl={movie.backdrop_path || movie.poster_path}
                title={movie.title}
              />
            ))}
        </Row>
      </AnimatePresence>
    </Slider>
  );
}

export default MovieSlider;
