import { MainContent } from 'components/MainContent/MainContent';

import { Sidebar } from 'components/Sidebar/Sidebar';

const MainPage = () => {
  return (
    <main>
      <div style={{ display: 'flex', height: '100vh', gap: '10px' }}>
        <Sidebar />
        <MainContent />
      </div>
    </main>
  );
};
export default MainPage;
