import { atom } from 'recoil';

export const movieIdState = atom<string>({
  key: 'movieIdState',
  default: '',
});
