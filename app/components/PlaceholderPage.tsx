import { navCategories } from '../data/navCategories';

interface PlaceholderPageProps {
  mainCategory: string;
}

export default function PlaceholderPage({ mainCategory }: PlaceholderPageProps) {
  return (
    <div style={{ textAlign: 'center', padding: '100px 0' }}>
      <h2 style={{ fontSize: '40px', fontWeight: '900' }}>{navCategories.find((c) => c.id === mainCategory)?.name || mainCategory.toUpperCase()}</h2>
      <p style={{ color: '#9ca3af', marginTop: '20px' }}>No subcategories available for this section. Please choose from the navigation bar.</p>
    </div>
  );
}
