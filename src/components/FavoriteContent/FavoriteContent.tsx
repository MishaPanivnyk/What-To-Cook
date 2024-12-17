import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FavoriteContentContainer,
  LoaderWrapper,
} from './FavoriteContent.styled';
import { RecipeCard } from 'components/RecipeCard/RecipeCard';
import { Loader } from 'components/Loader/Loader';

const apiUrl = import.meta.env.VITE_API_URL;

type Recipe = {
  id: number;
  title: string;
  photo: string;
};

export const FavoriteContent: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get<Recipe[]>(`${apiUrl}/recipes/`);
        setRecipes(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || 'Failed to fetch recipes.');
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <FavoriteContentContainer>
      {loading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
      {error && <div>{error}</div>}
      {!loading && !error && recipes.length === 0 && (
        <div>No recipes available.</div>
      )}
      {!loading &&
        !error &&
        recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            imageUrl={recipe.photo}
          />
        ))}
    </FavoriteContentContainer>
  );
};
