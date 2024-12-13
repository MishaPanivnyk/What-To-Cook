import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { Loader } from 'components/Loader/Loader';
import { BackImg } from './SharedLayout.styled';
interface SharedLayoutProps {
  children?: React.ReactNode;
}

const SharedLayout: React.FC<SharedLayoutProps> = ({ children }) => {
  return (
    <>
      <BackImg>
        {/* <Header /> */}
        <Suspense fallback={<Loader />}>
          <Outlet />
          {children}
        </Suspense>
      </BackImg>
      {/* <Footer /> */}
    </>
  );
};

export default SharedLayout;
