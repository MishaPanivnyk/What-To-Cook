import React from 'react';
import {
  MainContentContainer,
  // MainContentList,
} from './MainContent.styled';
import { PopularRecipes } from 'components/PopularRecipes/PopularRecipes';
import { PopularIngredients } from 'components/PopularIngredients/PopularIngredients';
import { Slider } from 'components/Slider/Slider';

export const MainContent: React.FC = () => {
  return (
    <MainContentContainer>
      <Slider />
      <PopularRecipes />
      <PopularIngredients />
    </MainContentContainer>
  );
};
