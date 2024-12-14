import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface PublicRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

export const PublicRoute: FC<PublicRouteProps> = ({
  component,
  redirectTo = '/',
}) => {
  const [hasToken, setHasToken] = useState<boolean | null>(null); // null для початкового стану

  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Перевіряємо наявність токена
    setHasToken(!!token); // Конвертуємо в булеве значення
  }, []);

  if (hasToken === null) {
    // Показуємо індикатор завантаження або нічого, поки перевіряємо токен
    return <div>Loading...</div>;
  }

  // Якщо токен є, перенаправляємо на redirectTo
  return hasToken ? <Navigate to={redirectTo} /> : component;
};
