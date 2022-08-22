import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Link, useMatch } from 'react-router-dom';
import styled from 'styled-components';
import Search from './Search';

const Nav = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px 0 50px;
  width: 100%;
  z-index: 20;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 120px;
  margin-right: 20px;
  cursor: pointer;
  fill: ${(props) => props.theme.red};
`;

const Items = styled.ul`
  display: flex;
`;

const Item = styled.li`
  margin-left: 20px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Circle = styled(motion.div)`
  position: absolute;
  bottom: -12px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 5px;
  height: 5px;
  border-radius: 3px;
  background-color: ${(props) => props.theme.white.light};
`;

const PageLink = styled(Link)`
  position: relative;
  text-align: center;
  color: ${(props) => props.theme.white.default};
  transition: color 0.4s ease;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 5px;

  &.active {
    color: ${(props) => props.theme.white.light};
  }

  &:hover,
  &:active {
    color: ${(props) => props.theme.white.dark};
  }
`;

const logoVariants: Variants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transition: {
      repeat: Infinity,
    },
  },
};

function Header() {
  const isHomeActive = useMatch('/');
  const isMovieActive = useMatch('/movies/*');
  const isTvActive = useMatch('/tv/*');

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'],
  );

  return (
    <>
      <Nav style={{ backgroundColor }}>
        <Menu>
          <Link to="/">
            <Logo
              variants={logoVariants}
              animate="normal"
              whileHover="active"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-153.6 -69.1855 1331.2 415.113"
            >
              <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676L44.051 119.724v151.073C28.647 272.418 14.594 274.58 0 276.742V0h41.08l56.212 157.021V0h43.511zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461V0h119.724v43.241h-76.482zm237.284-58.104h-44.862V242.15c-14.594 0-29.188 0-43.239.539V43.242h-44.862V0H463.22zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433V0h120.808v43.241h-78.375zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676V0h43.24zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242V0h-42.43zM1024 0l-54.863 131.615L1024 276.742c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75L871.576 0h46.482l28.377 72.699L976.705 0z" />
            </Logo>
          </Link>
          <Items>
            <Item>
              <PageLink
                className={isHomeActive || isMovieActive ? 'active' : ''}
                to="/"
              >
                Home
                {(isHomeActive || isMovieActive) && (
                  <Circle layoutId="circle" />
                )}
              </PageLink>
            </Item>
            <Item>
              <PageLink className={isTvActive ? 'active' : ''} to="/tv">
                TV Shows{isTvActive && <Circle layoutId="circle" />}
              </PageLink>
            </Item>
          </Items>
        </Menu>
        <Menu>
          <Items>
            <Item>
              <Search />
            </Item>
          </Items>
        </Menu>
      </Nav>
    </>
  );
}

export default Header;
