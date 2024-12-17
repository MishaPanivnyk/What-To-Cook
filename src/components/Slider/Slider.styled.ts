import styled from 'styled-components';

// Стилі для слайдера
export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  margin: auto;
  overflow: hidden;
  border-radius: 10px;
`;

export const Slide = styled.div<{ image: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  background: url(${props => props.image}) no-repeat center center/cover;
`;
export const SlideText = styled.h3`
  color: white;
  background-color: rgba(44, 42, 42, 0.5);
  padding: 10px 20px;
  bottom: 50px;
  right: 40px;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 25px;
  position: absolute;
`;
export const ArrowButton = styled.button<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  ${props => (props.left ? 'left: 10px;' : 'right: 10px;')}
  transform: translateY(-50%);
  background-color: inherit;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  font-size: 24px;
  padding: 8px 12px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  &:hover {
    background-color: rgba(196, 19, 19, 0.8);
  }
`;

export const DotContainer = styled.div`
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Dot = styled.div<{ active: boolean }>`
  width: 12px;
  height: 12px;
  margin: 0 5px;
  background-color: ${props => (props.active ? '#fff' : 'rgba(28, 39, 76, 1)')};
  border-radius: 50%;
  cursor: pointer;
`;
