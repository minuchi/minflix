import { motion, Variants } from 'framer-motion';
import { Link, useMatch, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { makeImgUrl } from '../utils';

interface BoxProps {
  id: string;
  imageUrl: string;
  title: string;
  type: 'movie' | 'tv';
}

const BoxContainer = styled(motion.li)`
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Img = styled.img`
  height: 250px;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const Info = styled(motion.div)`
  position: relative;
  top: -5px;
  background-color: #141414;
  opacity: 0;
`;

const Title = styled.h4`
  font-size: 18px;
  padding: 15px 5px;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.white.dark};
`;

const boxVariants: Variants = {
  normal: {
    scale: 1,
    transition: {
      type: 'tween',
    },
  },
  hover: {
    scale: 1.2,
    y: -50,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.2,
    },
  },
};

const infoVariants: Variants = {
  hover: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.2,
      delay: 0.2,
    },
  },
};

function Box({ id, imageUrl, title, type }: BoxProps) {
  const isSearch = useMatch('/search');
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';
  const url = isSearch
    ? `/search/${id}?keyword=${encodeURIComponent(keyword)}&t=${type}`
    : `/${type === 'movie' ? 'movies' : 'tv'}/${id}`;
  return (
    <BoxContainer
      key={id}
      layoutId={id + ''}
      variants={boxVariants}
      initial="normal"
      whileHover="hover"
    >
      <Link to={url}>
        <Img src={makeImgUrl(imageUrl, 'w500')} />
        <Info variants={infoVariants}>
          <Title>{title}</Title>
        </Info>
      </Link>
    </BoxContainer>
  );
}

export default Box;
