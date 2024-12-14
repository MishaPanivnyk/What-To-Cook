import React from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import MainPage from 'pages/MainPage/MainPage';
import FavoritePage from 'pages/Favorite/Favorite';
import { PublicRoute } from '../utils/Routes/PublicRoute';
import { PrivateRoute } from '../utils/Routes/PrivateRoute';
import AuthPage from 'pages/Auth/Auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchPage from 'pages/Search/Search';
const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route
          path="/auth"
          element={<PublicRoute component={<AuthPage />} />}
        />
        <Route path="/" element={<PrivateRoute component={<MainPage />} />} />
        <Route
          path="/search"
          element={<PrivateRoute component={<SearchPage />} />}
        />
        <Route
          path="/favorite"
          element={<PrivateRoute component={<FavoritePage />} />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
