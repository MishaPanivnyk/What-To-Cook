import React, { useState } from 'react';
import axios from 'axios';
import {
  RecipesContainer,
  RecipesSection,
  RecipesInput,
  TextArea,
  RecipesImgContainer,
  RecipesImgAdd,
  RecipesImgIngContainer,
  RecipesIngContainer,
  RecipesIngTitle,
  RecipesDescContainer,
  TextAreaInst,
} from './RecipesCreate.styled';
import { TextField, MenuItem, Box, Button } from '@mui/material';

import { toast } from 'react-toastify';
const apiUrl = import.meta.env.VITE_API_URL;
const categoriesData: Record<string, string[]> = {
  'Основні страви': [
    "М'ясні страви",
    'Рибні страви',
    'Вегетаріанські страви',
    'Страви з птиці',
    'Паста і макарони',
    'Піца',
    'Плов',
    'Запіканки',
    'Гриль-меню',
    'Страви на пару',
    'Гречка та інші крупи',
    'Тако і буріто',
    'Локшина по-східному',
    'Гуляш',
  ],
  Закуски: [
    'Холодні закуски',
    'Гарячі закуски',
    'Бутерброди',
    'Канапки',
    'Тарталетки',
    'Роли',
    'Закуски до пива',
    'Закуски на шпажках',
    'Діпи та соуси',
    'Овочеві закуски',
    'Паштети',
    'Закуски з сиру',
    'Закуски з авокадо',
  ],
  Супи: [
    'Борщі',
    'Крем-супи',
    'Рибні супи',
    "М'ясні супи",
    'Вегетаріанські супи',
    'Супи-пюре',
    'Окрошка',
    'Гарячі супи',
    'Холодні супи',
    'Супи з крупами',
    'Тайські супи',
    'Рамен',
  ],
  Салати: [
    'Овочеві салати',
    "М'ясні салати",
    'Рибні салати',
    'Фруктові салати',
    'Теплі салати',
    'Салати з морепродуктами',
    'Дієтичні салати',
    'Зернові салати',
    'Празникові салати',
    'Грецький салат',
    'Салати з сиром фета',
    'Капустні салати',
  ],
  Десерти: [
    'Торти',
    'Пироги',
    'Печиво',
    'Кекси',
    'Морожене',
    'Муса',
    'Желе',
    'Фруктові десерти',
    'Шоколадні десерти',
    'Тірамісу',
    'Цукерки ручної роботи',
    'Чізкейки',
    'Макаруни',
  ],
  Напої: [
    'Алкогольні коктейлі',
    'Безалкогольні коктейлі',
    'Чай та кава',
    'Компоти',
    'Смузі',
    'Фреші',
    'Молочні коктейлі',
    'Гарячий шоколад',
    'Лимонади',
    'Збитні',
    'Глінтвейн',
    "Трав'яні чаї",
  ],
  'Страви на сніданок': [
    'Омлети та яєшня',
    'Млинці та оладки',
    'Сирники',
    'Каші',
    'Тости',
    'Сендвічі',
    'Сніданки з яєць',
    'Сніданки з фруктів',
    'Сніданки з круп',
    'Гранола',
    'Пудинги на сніданок',
  ],
  Випічка: [
    'Дріжджове тісто',
    'Листкове тісто',
    'Прісне тісто',
    'Пироги',
    'Пиріжки',
    'Булочки',
    'Тарти',
    'Хліб',
    'Кекси',
    'Круасани',
    'Краффіни',
    'Багети',
  ],
  Морепродукти: [
    'Креветки',
    'Мідії',
    'Гребінці',
    'Осьминоги',
    'Кальмари',
    'Ракоподібні',
    'Суші та роли',
    'Рибні стейки',
    'Морська капуста',
    'Крабові палички',
    'Морський коктейль',
  ],
  'Соуси та маринади': [
    'Томатні соуси',
    'Сметанні соуси',
    'Часникові соуси',
    'Солодкі соуси',
    'Гострі соуси',
    "Маринади для м'яса",
    'Маринади для риби',
    'Соуси до пасти',
    'Соуси до салатів',
    'Азіатські соуси',
    'Соуси на основі майонезу',
  ],
  'Дієтичні страви': [
    'Страви з низьким вмістом калорій',
    'Безглютенові страви',
    'Веганські страви',
    'Фітнес страви',
    'Дієтичні десерти',
    'Детокс-супи',
    'Овочеві смузі',
    'Протеїнові страви',
    'Страви з кіноа',
    'Легкі салати',
  ],
  'Регіональні страви': [
    'Українські страви',
    'Італійські страви',
    'Французькі страви',
    'Китайські страви',
    'Японські страви',
    'Індійські страви',
    'Американські страви',
    'Мексиканські страви',
    'Східна кухня',
    'Середземноморська кухня',
    'Кавказькі страви',
  ],
};
export const RecipesCreatePage: React.FC = () => {
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: '',
    category: '',
    subcategory: '',
    author: 0,
  });
  const [image, setImage] = useState<string | null>(null);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Зміна категорії
  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedCategory(e.target.value);
    setFormData({ ...formData, category: e.target.value });
  };

  // Зміна підкатегорії
  const handleSubcategoryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const subcategory = e.target.value;
    setFormData({ ...formData, subcategory });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const {
        title,
        ingredients,
        instructions,
        category,
        subcategory,
        author,
      } = formData;

      const dataToSend = {
        title,
        ingredients,
        instructions,
        category,
        subcategory,
        author,
      };

      const response = await axios.post(
        `${apiUrl}/recipes/create/`,
        dataToSend,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      console.log('Recipe added:', response.data);
      toast.success('Рецепт успішно додано!');
    } catch (error) {
      console.error('Error adding recipe:', error);
      toast.error('Помилка при додаванні рецепту');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error('Файл занадто великий. Максимальний розмір файлу: 2 МБ.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <RecipesContainer>
      <RecipesSection>
        <RecipesImgIngContainer>
          <RecipesImgContainer>
            {image ? (
              <img
                src={image}
                alt="recipe"
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover',
                }}
              />
            ) : (
              <RecipesImgAdd htmlFor="image-upload">ДОДАТИ ФОТО</RecipesImgAdd>
            )}
            <input
              id="image-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={handleImageChange}
              accept="image/*"
            />
          </RecipesImgContainer>
          <RecipesIngContainer>
            <RecipesIngTitle>Інгредієнти</RecipesIngTitle>
            <TextArea
              name="ingredients"
              rows={5}
              value={formData.ingredients}
              onChange={handleChange}
              placeholder={`•\n•\n•\n•`}
              required
            />
          </RecipesIngContainer>
        </RecipesImgIngContainer>
        <RecipesDescContainer>
          <RecipesInput
            name="title"
            placeholder="Назва рецепту"
            value={formData.title}
            onChange={handleChange}
          />
          <TextAreaInst
            name="instructions"
            rows={7}
            placeholder={`Опишіть покроковий рецепт\n• Крок 1:\n• Крок 2:\n• Крок 3:`}
            value={formData.instructions}
            onChange={handleChange}
          />
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              select
              label="Категорія"
              value={selectedCategory}
              onChange={handleCategoryChange}
              fullWidth
              variant="outlined"
              InputLabelProps={{
                style: { color: 'white' },
              }}
              sx={{
                backgroundColor: 'rgba(44, 42, 42, 0.9)',
                borderRadius: '10px',
                border: 'none',
                color: '#fff',
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#aaa', border: 'none' },
                  '&:hover fieldset': { borderColor: '#666', border: 'none' },
                  '&.Mui-focused fieldset': {
                    borderColor: '#333',
                    border: 'none',
                  },
                },
              }}
            >
              {Object.keys(categoriesData).map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Підкатегорія"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleSubcategoryChange}
              fullWidth
              variant="outlined"
              disabled={!selectedCategory}
              InputLabelProps={{
                style: { color: 'white' },
              }}
              sx={{
                backgroundColor: 'rgba(44, 42, 42, 0.9)',
                borderRadius: '10px',
                border: 'none',
                color: '#fff',
                '& .MuiInputBase-input': { color: 'white' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': { borderColor: '#aaa', border: 'none' },
                  '&:hover fieldset': { borderColor: '#666', border: 'none' },
                  '&.Mui-focused fieldset': {
                    borderColor: '#333',
                    border: 'none',
                  },
                },
              }}
            >
              {selectedCategory &&
                categoriesData[selectedCategory].map(subcategory => (
                  <MenuItem key={subcategory} value={subcategory}>
                    {subcategory}
                  </MenuItem>
                ))}
            </TextField>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mt: 3,
            }}
          >
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={handleSubmit}
            >
              Додати рецепт
            </Button>
          </Box>
        </RecipesDescContainer>
      </RecipesSection>
    </RecipesContainer>
  );
};
