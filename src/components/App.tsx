import React from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Routes, Route } from 'react-router-dom';
import SharedLayout from 'components/SharedLayout/SharedLayout';
import MainPage from 'pages/MainPage/MainPage';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <SharedLayout>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </SharedLayout>
    </>
  );
};

export default App;
