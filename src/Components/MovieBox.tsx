import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { makeImgUrl } from '../utils';
import { Link } from 'react-router-dom';

interface MovieBoxProps {
  id: string;
  imageUrl: string;
  title: string;
}

const Box = styled(motion.li)`
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

function MovieBox({ id, imageUrl, title }: MovieBoxProps) {
  return (
    <Box
      key={id}
      layoutId={id + ''}
      variants={boxVariants}
      initial="normal"
      whileHover="hover"
    >
      <Link to={`/movies/${id}`}>
        <Img src={makeImgUrl(imageUrl, 'w500')} />
        <Info variants={infoVariants}>
          <Title>{title}</Title>
        </Info>
      </Link>
    </Box>
  );
}

export default MovieBox;
