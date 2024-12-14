import { FC, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  component: JSX.Element;
  redirectTo?: string;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
  component,
  redirectTo = '/auth',
}) => {
  const [hasToken, setHasToken] = useState<boolean | null>(null); // `null` для початкового стану, щоб уникнути флешу контенту

  useEffect(() => {
    const token = localStorage.getItem('token'); // Перевіряємо наявність токена
    setHasToken(!!token); // Конвертуємо в булеве значення
  }, []);

  if (hasToken === null) {
    // Показуємо індикатор завантаження або нічого, поки перевіряємо токен
    return <div>Loading...</div>;
  }

  return hasToken ? component : <Navigate to={redirectTo} />;
};
