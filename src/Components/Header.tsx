import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

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

const PageLink = styled(NavLink)`
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

const SearchBar = styled(motion.input)`
  height: 36px;
  background-color: transparent;
  border: 1px solid ${(props) => props.theme.white.light};
  width: 210px;
  color: ${(props) => props.theme.white.light};
  padding: 0 10px 0 40px;
  transform-origin: right;
  position: absolute;
  right: 0;
`;

const SearchButton = styled(motion.button)`
  display: flex;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
`;

const SearchIcon = styled(motion.svg)`
  width: 20px;
  height: 20px;
  fill: ${(props) => props.theme.white.light};
`;

function Header() {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 1)'],
  );

  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen((prev) => !prev);

  return (
    <>
      <Nav style={{ backgroundColor }}>
        <Menu>
          <Logo
            variants={logoVariants}
            animate="normal"
            whileHover="active"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-153.6 -69.1855 1331.2 415.113"
          >
            <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676L44.051 119.724v151.073C28.647 272.418 14.594 274.58 0 276.742V0h41.08l56.212 157.021V0h43.511zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461V0h119.724v43.241h-76.482zm237.284-58.104h-44.862V242.15c-14.594 0-29.188 0-43.239.539V43.242h-44.862V0H463.22zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433V0h120.808v43.241h-78.375zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676V0h43.24zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242V0h-42.43zM1024 0l-54.863 131.615L1024 276.742c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75L871.576 0h46.482l28.377 72.699L976.705 0z" />
          </Logo>
          <Items>
            <Item>
              <PageLink
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                to="/"
              >
                {({ isActive }) => (
                  <>Home{isActive && <Circle layoutId="circle" />}</>
                )}
              </PageLink>
            </Item>
            <Item>
              <PageLink
                className={({ isActive }) => (isActive ? 'active' : undefined)}
                to="/tv"
              >
                {({ isActive }) => (
                  <>TV Shows{isActive && <Circle layoutId="circle" />}</>
                )}
              </PageLink>
            </Item>
          </Items>
        </Menu>
        <Menu>
          <Items>
            <Item>
              <SearchBar
                transition={{ type: 'linear' }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: searchOpen ? 1 : 0 }}
                type="search"
                placeholder="Search something..."
              />
              <SearchButton
                animate={{ x: searchOpen ? -180 : 0 }}
                transition={{ type: 'linear' }}
                onClick={toggleSearch}
              >
                <SearchIcon
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
                </SearchIcon>
              </SearchButton>
            </Item>
          </Items>
        </Menu>
      </Nav>
    </>
  );
}

export default Header;
