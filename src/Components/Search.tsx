import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Form = styled.form`
  display: flex;
  align-items: center;
`;

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

interface SearchData {
  keyword: string;
}

function Search() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = () => setSearchOpen((prev) => !prev);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<SearchData>({ reValidateMode: 'onSubmit' });

  const onSubmit = ({ keyword }: SearchData) => {
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
  };

  useEffect(() => {
    if (errors.keyword) {
      const type = errors.keyword.type;
      const message =
        type === 'required' || type === 'minLength'
          ? 'Please search at least 2 characters.'
          : 'You are exceeding the limit.';

      toast.error(message);
    }
  }, [errors.keyword]);

  useEffect(() => {
    searchOpen && setFocus('keyword');
  }, [searchOpen]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <SearchBar
        {...register('keyword', {
          required: true,
          minLength: 2,
          maxLength: 100,
        })}
        transition={{ type: 'linear' }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: searchOpen ? 1 : 0 }}
        placeholder="Search something..."
      />
      <SearchButton
        type="button"
        animate={{ x: searchOpen ? -180 : 0 }}
        transition={{ type: 'linear' }}
        onClick={toggleSearch}
      >
        <SearchIcon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z" />
        </SearchIcon>
      </SearchButton>
      <ToastContainer position="top-center" theme="dark" />
    </Form>
  );
}

export default Search;
