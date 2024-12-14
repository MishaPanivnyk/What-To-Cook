import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 190px;
  height: 270px;
  border-radius: 25px;
  overflow: hidden;
  background-color: #333;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
`;

export const CardImage = styled.image<{ imageUrl: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-position: center;
  filter: brightness(0.7);
`;

export const CardContent = styled.div`
  z-index: 2;
  border-radius: 0px 0px 25px 25px;
  background: rgba(44, 42, 42, 0.8);
  color: white;
  text-align: center;
  padding: 20px;
  height: 85px;
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
`;
