import { FavoriteContent } from 'components/FavoriteContent/FavoriteContent';
import { Sidebar } from 'components/Sidebar/Sidebar';

const FavoritePage = () => {
  return (
    <main>
      <div style={{ display: 'flex', height: '100vh', gap: '10px' }}>
        <Sidebar />
        <FavoriteContent />
      </div>
    </main>
  );
};
export default FavoritePage;
