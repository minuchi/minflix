import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { GetMovies, GetTvShows } from '../api';
import Box from './Box';

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

const Container = styled.div`
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

type SliderProps =
  | {
      title: string;
      data: GetMovies;
      type: 'movie';
    }
  | {
      title: string;
      data: GetTvShows;
      type: 'tv';
    };

function Slider({ title, data, type }: SliderProps) {
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
      <Container>
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
              .slice(page * offset, page * offset + offset)
              .map((movie: any) => (
                <Box
                  key={movie.id}
                  id={
                    title.toLowerCase().replace(/[^a-z0-9-]/g, '') +
                    '-' +
                    movie.id
                  }
                  imageUrl={movie.backdrop_path || movie.poster_path}
                  title={type === 'movie' ? movie.title : movie.name}
                  type={type}
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
      </Container>
      <HeightFixer />
    </Wrapper>
  );
}

export default Slider;
