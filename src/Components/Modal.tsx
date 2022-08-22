import { useQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useMatch, useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { GetMovie, getMovie, GetTVShow, getTvShow } from '../api';
import { makeImgUrl } from '../utils';

interface ModalProps {
  type: 'movie' | 'tv';
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
  z-index: 99;
`;

const ModalContainer = styled(motion.div)`
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

function Modal({ type, id }: ModalProps) {
  const ids = id.split('-');

  const { data, isLoading } = useQuery<GetMovie | GetTVShow>(
    [type, ids[1]],
    () => {
      if (type === 'movie') {
        return getMovie(ids[1]);
      } else {
        return getTvShow(ids[1]);
      }
    },
  );

  const isSearch = useMatch('/search/:id');
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const navigate = useNavigate();
  const handleClick = () => {
    const url = isSearch
      ? `/search?keyword=${encodeURIComponent(keyword)}`
      : type === 'movie'
      ? '/'
      : '/tv';
    navigate(url, { replace: true });
  };

  const handleModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    // Do not close modal when modal clicked...
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      <Overlay
        onClick={handleClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <ModalContainer layoutId={id} onClick={handleModalClick}>
          {!isLoading && data && (
            <>
              <Img
                src={makeImgUrl(data.backdrop_path || data.poster_path, 'w500')}
              />
              <Title>{(data as any).title || (data as any).name}</Title>
              <Overview>{data.overview}</Overview>
              <Tags>
                {data.genres.map(({ name }) => (
                  <Tag key={name}>{name}</Tag>
                ))}
              </Tags>
            </>
          )}
        </ModalContainer>
      </Overlay>
    </AnimatePresence>
  );
}

export default Modal;
