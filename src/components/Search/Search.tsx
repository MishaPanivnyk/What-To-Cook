import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
} from '@mui/material';
import { IoSearchOutline } from 'react-icons/io5';
import { RecipeCard } from 'components/RecipeCard/RecipeCard';
import { SearchContentContainer } from './Search.styled';
const apiUrl = import.meta.env.VITE_API_URL;
type Recipe = {
  id: number;
  title: string;
  photo: string;
};

export const SearchContent: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (searchTerm.length < 3) {
        setRecipes([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<Recipe[]>(
          `${apiUrl}/recipes/search/?query=${searchTerm}`
        );
        setRecipes(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchRecipes();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <SearchContentContainer>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          mb: 4,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoSearchOutline
                  style={{ color: 'white', width: '30px', height: '30px' }}
                />
              </InputAdornment>
            ),
          }}
          sx={{
            width: '400px',
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
            '& .MuiInputAdornment-root': {
              color: 'white',
            },
            '& .MuiInputLabel-root': {
              color: 'white',
            },
          }}
        />
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography variant="body1" color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {!loading && !error && recipes.length === 0 && searchTerm.length >= 3 && (
        <Typography
          variant="body1"
          sx={{ mt: 2, color: 'white', textAlign: 'center', fontWeight: '600' }}
        >
          No recipes found for "{searchTerm}".
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 4,
          mt: 4,
        }}
      >
        {recipes.map(recipe => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            imageUrl={recipe.photo}
          />
        ))}
      </Box>
    </SearchContentContainer>
  );
};
