import { Sidebar } from 'components/Sidebar/Sidebar';
import { RecipesCreatePage } from 'components/RecipesCreate/RecipesCreate';
const RecipesCreate = () => {
  return (
    <main>
      <div style={{ display: 'flex', height: '100vh', gap: '10px' }}>
        <Sidebar />
        <RecipesCreatePage />
      </div>
    </main>
  );
};
export default RecipesCreate;
