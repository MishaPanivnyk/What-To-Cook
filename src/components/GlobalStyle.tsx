import { createGlobalStyle } from 'styled-components';
import 'modern-normalize';
import Background from '../img/background.jpeg';
export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-image: url(${Background});
      background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  }
body.auth-page {
 
    @media only screen and (min-width: 768px) {
       background-position: initial;
  }

}
body.auth-page::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); 
  z-index: -1;
}
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }
  h1,h2,h3,h4,h5,h6,p {
    margin: 0;
    padding: 0;
  }
  ul,ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  a {
    text-decoration: none
  }
`;
