import React, { useEffect, useState } from 'react';
import {
  SectionContainer,
  CardsContainer,
  PopularRecipesTitle,
} from './PopularIngredients.styled';
import { RecipeCard } from 'components/RecipeCard/RecipeCard';
const apiUrl = import.meta.env.VITE_API_URL;

export const PopularIngredients: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [maxCards, setMaxCards] = useState<number>(6);

  interface Recipe {
    id: number;
    title: string;
    photo: string;
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${apiUrl}/recipes/`);
        if (!response.ok) throw new Error('Failed to fetch recipes');
        const data = await response.json();
        setRecipes(data);
      } catch (err: unknown) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const updateMaxCards = () => {
      if (window.innerWidth > 1440) {
        setMaxCards(8);
      } else {
        setMaxCards(6);
      }
    };

    updateMaxCards();
    window.addEventListener('resize', updateMaxCards);

    return () => window.removeEventListener('resize', updateMaxCards);
  }, []);

  if (loading)
    return (
      <SectionContainer style={{ color: '#fff' }}>
        Завантаження...
      </SectionContainer>
    );
  if (error)
    return (
      <SectionContainer style={{ color: '#fff' }}>
        Помилка: {error}
      </SectionContainer>
    );

  return (
    <SectionContainer>
      <PopularRecipesTitle>Інгредієнти</PopularRecipesTitle>
      <CardsContainer>
        {recipes.slice(0, maxCards).map(recipe => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            imageUrl={recipe.photo}
          />
        ))}
      </CardsContainer>
    </SectionContainer>
  );
};
