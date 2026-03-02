import { Product } from '../types';
import { navCategories } from '../data/navCategories';
import { productsMapByCategory } from '../data/products';

interface NavBarProps {
  mainCategory: string;
  hoveredCat: string | null;
  onMainClick: (catId: string) => void;
  onSubClick: (catId: string, subId: string) => void;
  onHoverCat: (catId: string | null) => void;
}

export default function NavBar({
  mainCategory,
  hoveredCat,
  onMainClick,
  onSubClick,
  onHoverCat,
}: NavBarProps) {
  const categoriesWithSubs = navCategories.filter((cat) => cat.subCategories && cat.subCategories.length > 0);
  const activeDropdownCategory = categoriesWithSubs.find((cat) => cat.id === hoveredCat) || null;

  const activeProductsMap = activeDropdownCategory ? productsMapByCategory[activeDropdownCategory.id] || {} : {};

  return (
    <div
      style={{ borderBottom: '1px solid #f3f4f6', padding: '0 24px', backgroundColor: '#fff', position: 'relative' }}
      onMouseLeave={() => onHoverCat(null)}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
          <span style={{ color: '#d1d5db', padding: '0 10px', fontSize: '20px' }}>☰</span>

          {navCategories.map((cat) => (
            <div
              key={cat.id}
              style={{ position: 'relative' }}
              onMouseEnter={() => cat.subCategories && onHoverCat(cat.id)}
            >
              <button
                onClick={() => onMainClick(cat.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '10px 12px 8px',
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#4b5563',
                  borderBottom: '2px solid transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  lineHeight: 1.1,
                }}
              >
                <img src={cat.icon} alt={cat.name} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                {cat.name}
              </button>
            </div>
          ))}
        </nav>

        {/* Right-side image link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '1px', height: '30px', backgroundColor: '#eee' }}></div>
          <img
            src="/pick.png"
            alt="Cart & Profit"
            onClick={() => onMainClick('why')}
            style={{ height: '60px', width: 'auto', cursor: 'pointer' }}
          />
        </div>
      </div>

      {activeDropdownCategory && activeDropdownCategory.subCategories && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            height: '62vh',
            minHeight: '420px',
            maxHeight: 'calc(100vh - 140px)',
            backgroundColor: '#fff',
            boxShadow: '0 12px 28px rgba(0,0,0,0.1)',
            zIndex: 40,
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          <aside
            style={{
              width: '280px',
              borderRight: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              overflowY: 'auto',
              flexShrink: 0,
            }}
          >
            {categoriesWithSubs.map((cat) => (
              <button
                key={cat.id}
                onMouseEnter={() => onHoverCat(cat.id)}
                onClick={() => onMainClick(cat.id)}
                style={{
                  width: '100%',
                  border: 'none',
                  backgroundColor: cat.id === activeDropdownCategory.id ? '#ffffff' : 'transparent',
                  borderBottom: '1px solid #e5e7eb',
                  padding: '18px 20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  fontSize: '20px',
                  fontWeight: cat.id === activeDropdownCategory.id ? '800' : '700',
                  color: cat.id === activeDropdownCategory.id ? '#e11d48' : '#1f2937',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={cat.icon} alt={cat.name} style={{ width: '22px', height: '22px', objectFit: 'contain' }} />
                  {cat.name}
                </span>
                <span style={{ color: '#9ca3af' }}>›</span>
              </button>
            ))}
          </aside>

          <section style={{ flex: 1, padding: '24px 30px', overflowY: 'auto' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '18px', color: '#111827' }}>{activeDropdownCategory.name}</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(170px, 1fr))', gap: '16px 20px' }}>
              {activeDropdownCategory.subCategories.map((sub) => {
                const productList: Product[] = activeProductsMap[sub.id] || [];
                return (
                  <div key={sub.id}>
                    <div
                      onClick={() => onSubClick(activeDropdownCategory.id, sub.id)}
                      style={{
                        fontSize: '17px',
                        fontWeight: '800',
                        marginBottom: '8px',
                        color: '#111827',
                        cursor: 'pointer',
                      }}
                    >
                      {sub.name}
                    </div>
                    {productList.length === 0 ? (
                      <div style={{ color: '#9ca3af', fontSize: '13px' }}>No products</div>
                    ) : (
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: '6px' }}>
                        {productList.slice(0, 5).map((product) => (
                          <li
                            key={product.id}
                            onClick={() => {
                              onSubClick(activeDropdownCategory.id, sub.id);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            style={{
                              color: '#4b5563',
                              fontSize: '14px',
                              lineHeight: 1.35,
                              cursor: 'pointer',
                            }}
                          >
                            {product.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
