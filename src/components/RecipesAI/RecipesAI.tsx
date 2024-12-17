import React, { useState } from 'react';
import {
  Box,
  TextField,
  CircularProgress,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import axios from 'axios';
import { VscSend } from 'react-icons/vsc';

import { RecipeAiContainer } from './RecipesAI.styled';

const apiUrl = import.meta.env.VITE_API_URL;

export const RecipesAI: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recipe, setRecipe] = useState<string | null>(null);

  const handleSubmit = async () => {
    const ingredientsArray = ingredients.split(',').map(ing => ing.trim());
    const payload = { ingredients: ingredientsArray };

    setLoading(true);
    setError(null);
    setRecipe(null);
    setIngredients('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token is missing.');
      }

      const response = await axios.post(
        `${apiUrl}/recipes/generate/`,
        payload,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      const formattedRecipe = formatRecipeText(response.data.recipe);

      setRecipe(formattedRecipe || 'No recipe found.');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message ||
            err.message ||
            'An unexpected error occurred.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const formatRecipeText = (text: string | null) => {
    if (!text) return '';
    const formattedText = text.replace(
      /(\d+)\.(.*?)(?=\d+\.|$)/g,
      (number, content) =>
        `<li><strong>${number}.</strong> ${content.trim()}</li>`
    );
    return `<ol>${formattedText}</ol>`;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !loading && ingredients.trim()) {
      handleSubmit();
    }
  };

  return (
    <RecipeAiContainer>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          margin: '0 auto',
          textAlign: 'center',
          backgroundColor: 'rgba(44, 42, 42, 0.9)',
          borderRadius: '25px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
          minHeight: '300px',
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '10px',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            borderRadius: '10px',
            width: '100%',
            maxWidth: '1400px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          {error && (
            <Typography
              variant="body1"
              color="error"
              sx={{ fontWeight: 'bold', fontSize: '18px' }}
            >
              {error}
            </Typography>
          )}
          {recipe && (
            <Typography
              variant="body1"
              sx={{
                fontWeight: '500',
                fontFamily: 'Inter',
                fontSize: '18px',
                lineHeight: '1.5',
                textShadow: '1px 1px 4px rgba(0, 0, 0, 0.6)',
                animation: 'fadeIn 0.5s ease-in-out',
                textAlign: 'left',
                whiteSpace: 'pre-line',
              }}
              dangerouslySetInnerHTML={{ __html: recipe }}
            />
          )}
        </Box>

        {/* Інпут для введення даних */}
        <TextField
          variant="outlined"
          placeholder="Введіть інгредієнти (наприклад: рис, курка, морква)"
          value={ingredients}
          onChange={e => setIngredients(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleSubmit}
                  disabled={loading || !ingredients.trim()}
                  sx={{
                    color: 'white',
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    <VscSend size={24} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            width: '600px',
            fontWeight: '600',
            '& .MuiOutlinedInput-root': {
              color: 'white',
              '& fieldset': {
                borderColor: 'white',
                borderWidth: '4px',
              },
              '&:hover fieldset': {
                borderColor: '#e0e0e0',
                borderWidth: '4px',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#e0e0e0',
                borderWidth: '4px',
              },
            },
            '& .MuiInputBase-input': {
              color: 'white',
            },
          }}
        />
      </Box>
    </RecipeAiContainer>
  );
};
