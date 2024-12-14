import { SearchContent } from 'components/Search/Search';
import { Sidebar } from 'components/Sidebar/Sidebar';

const SearchPage = () => {
  return (
    <main>
      <div style={{ display: 'flex', height: '100vh', gap: '10px' }}>
        <Sidebar />
        <SearchContent />
      </div>
    </main>
  );
};
export default SearchPage;
