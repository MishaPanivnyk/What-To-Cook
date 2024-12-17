import styled from 'styled-components';

export const MainContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* padding: 60px; */
  /* backdrop-filter: blur(20px);
  box-shadow: 0px 0px 30px rgba(227, 228, 237, 0.37);
  border: 2px solid rgba(255, 255, 255, 0.18); */
  @media only screen and (min-width: 768px) {
  }

  @media only screen and (min-width: 1440px) {
  }
`;
export const MainContentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media only screen and (min-width: 768px) {
  }

  @media only screen and (min-width: 1440px) {
  }
`;
export const MainContentItem = styled.div`
  width: 100%;
  height: 310px;

  background: rgba(79, 79, 79, 0.83);

  border-radius: 25px 0px 0px 25px;
  backdrop-filter: blur(30px);
  box-shadow: 0px 0px 30px rgba(227, 228, 237, 0.37);
  border: 2px solid rgba(255, 255, 255, 0.18);
  @media only screen and (min-width: 768px) {
  }

  @media only screen and (min-width: 1440px) {
  }
`;
