import parse from 'url-parse';

export function makeImgUrl(id: string, format: string = 'original') {
  return `https://image.tmdb.org/t/p/${format}${id}`;
}

export function summarizeText(text: string, size: number = 200) {
  return text.length > size ? text.slice(0, size) + '...' : text;
}

export function getPathnameFromURL(url?: string) {
  if (!url) {
    return '/';
  }
  const { pathname } = parse(url);

  return pathname;
};
