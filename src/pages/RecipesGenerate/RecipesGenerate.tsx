import { RecipesAI } from 'components/RecipesAI/RecipesAI';
import { Sidebar } from 'components/Sidebar/Sidebar';

const RecipesGenerate = () => {
  return (
    <main>
      <div style={{ display: 'flex', height: '100vh', gap: '10px' }}>
        <Sidebar />
        <RecipesAI />
      </div>
    </main>
  );
};
export default RecipesGenerate;
