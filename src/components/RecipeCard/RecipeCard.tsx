import React from 'react';
import { CardContainer, CardImage, CardContent } from './RecipeCard.styled';

interface CardProps {
  title: string;
  imageUrl: string;
}
export const RecipeCard: React.FC<CardProps> = ({ title, imageUrl }) => {
  return (
    <CardContainer>
      <CardImage imageUrl={imageUrl} />
      <CardContent>{title}</CardContent>
    </CardContainer>
  );
};
