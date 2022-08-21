import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GetMovie, getMovie } from '../api';
import { makeImgUrl } from '../utils';

interface MovieModalProps {
  id: string;
}

const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
`;

const Modal = styled(motion.div)`
  position: absolute;
  top: 100px;
  background-color: #141414;
  max-width 800px;
  border-radius: 10px;
  min-height: 400px;
`;

const Img = styled(motion.img)`
  width: 100%;
  height: 400px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const Title = styled.h3`
  font-size: 30px;
  color: ${(props) => props.theme.white.light};
  background-color: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Overview = styled.p`
  color: ${(props) => props.theme.white.light};
  padding: 10px 20px;
  font-size: 18px;
  line-height: 1.25;
`;

const Tags = styled.ul`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Tag = styled.li`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.white.light};
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 8px 16px;
  margin-bottom: 10px;
`;

function MovieModal({ id }: MovieModalProps) {
  const { data, isLoading } = useQuery<GetMovie>(['movies', id], () =>
    getMovie(id),
  );
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/', { replace: true });
  };

  return (
    <AnimatePresence>
      <Overlay
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Modal layoutId={id}>
          {!isLoading && data && (
            <>
              <Img src={makeImgUrl(data.backdrop_path, 'w500')} />
              <Title>{data.title}</Title>
              <Overview>{data.overview}</Overview>
              <Tags>
                {data.genres.map(({ name }) => (
                  <Tag>{name}</Tag>
                ))}
              </Tags>
            </>
          )}
        </Modal>
      </Overlay>
    </AnimatePresence>
  );
}

export default MovieModal;
