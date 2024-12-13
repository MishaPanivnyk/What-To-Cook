import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  min-width: 320px;
  /* @media screen and (max-width: 767px) {
    max-width: 320px;
  } */
  @media only screen and (min-width: 768px) {
    padding-left: 50px;
    padding-right: 50px;
    width: 768px;
  }
  @media only screen and (min-width: 1440px) {
    padding-left: 134px;
    padding-right: 134px;
    width: 1440px;
  }
`;
