import { ReactNode } from 'react';
import { Wrapper } from './Container.styled';

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <Wrapper>{children}</Wrapper>;
};
