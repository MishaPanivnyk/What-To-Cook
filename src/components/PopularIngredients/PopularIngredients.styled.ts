import styled from 'styled-components';
export const SectionContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 15px 30px;
  /* margin: 20px; */
  backdrop-filter: blur(20px);
  box-shadow: 0px 0px 30px rgba(227, 228, 237, 0.37);
  border: 2px solid rgba(255, 255, 255, 0.18);
`;

export const PopularRecipesTitle = styled.h2`
  height: 270px;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  background-color: rgba(44, 42, 42, 0.8);
  color: #ffffff;
  border-radius: 25px;
  padding: 48px 8px;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
`;

export const CardsContainer = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  gap: 16px;
`;
