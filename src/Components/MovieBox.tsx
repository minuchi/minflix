import styled from 'styled-components';
import { motion, Variants } from 'framer-motion';
import { makeImgUrl } from '../utils';

interface MovieBoxProps {
  id: number;
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

const Img = styled.img`
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

function MovieBox({ id, imageUrl, title }: MovieBoxProps) {
  return (
    <Box key={id} variants={boxVariants} initial="normal" whileHover="hover">
      <Img src={makeImgUrl(imageUrl, 'w500')} />
      <Info variants={infoVariants}>
        <Title>{title}</Title>
      </Info>
    </Box>
  );
}

export default MovieBox;
