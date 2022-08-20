import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    red: string;
    white: {
      default: string;
      light: string;
      dark: string;
    };
  }
}
