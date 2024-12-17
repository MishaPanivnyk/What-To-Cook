import styled from 'styled-components';

export const FavoriteContentContainer = styled.section`
  flex: 1;
  display: flex;
  gap: 20px;
  padding: 60px;
  backdrop-filter: blur(20px);
  flex-wrap: wrap;
  position: relative;
  box-shadow: 0px 0px 30px rgba(227, 228, 237, 0.37);
  border: 2px solid rgba(255, 255, 255, 0.18);
  @media only screen and (min-width: 768px) {
  }

  @media only screen and (min-width: 1440px) {
  }
`;
export const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
