import { useEffect, useState } from 'react';
import { Product } from '../types';
import { navCategories } from '../data/navCategories';

interface CategoryLayoutProps {
  mainCatId: string;
  subs: { id: string; name: string; icon: string }[];
  productsMap: Record<string, Product[]>;
  subCategory: string | null;
  onSubClick: (catId: string, subId: string) => void;
  onClearSub: () => void;
  onSelectProduct: (product: Product) => void;
}

// Inline styles for custom scrollbar
const sidebarScrollStyle = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #9ca3af;
  }
`;

export default function CategoryLayout({
  mainCatId,
  subs,
  productsMap,
  subCategory,
  onSubClick,
  onClearSub,
  onSelectProduct,
}: CategoryLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeLeafId, setActiveLeafId] = useState<number | null>(null);

  const allProducts = Object.values(productsMap).flat();
  const subProducts = subCategory ? productsMap[subCategory] || [] : [];
  const displayProducts = subCategory
    ? (activeLeafId ? subProducts.filter((product) => product.id === activeLeafId) : subProducts)
    : allProducts;
  const mainCategoryName = navCategories.find((c) => c.id === mainCatId)?.name || mainCatId;
  const currentSubName = subCategory ? subs.find((s) => s.id === subCategory)?.name || subCategory : `All ${mainCategoryName}`;
  const activeLeafName =
    subCategory && activeLeafId
      ? (productsMap[subCategory] || []).find((product) => product.id === activeLeafId)?.name || null
      : null;
  const rightMainTitle = activeLeafName || currentSubName;

  useEffect(() => {
    setActiveLeafId(null);
  }, [mainCatId]);

  useEffect(() => {
    if (!subCategory || !activeLeafId) return;
    const existsInCurrentSub = (productsMap[subCategory] || []).some((product) => product.id === activeLeafId);
    if (!existsInCurrentSub) {
      setActiveLeafId(null);
    }
  }, [subCategory, activeLeafId, productsMap]);

  const isAllLevel = subCategory === null;
  const showLeafLevel = Boolean(subCategory && activeLeafName);
  const rightTitle = isAllLevel ? mainCategoryName : rightMainTitle;
  const breadcrumbParts = isAllLevel
    ? [mainCategoryName]
    : showLeafLevel
      ? [mainCategoryName, currentSubName]
      : [mainCategoryName];

  return (
    <>
      <style>{sidebarScrollStyle}</style>
      <div style={{ display: 'flex', flex: 1, minHeight: 0, width: '100%', gap: '0', backgroundColor: '#fff' }}>
        {/* Sidebar: Fixed width, flex column for fixed header + scrollable body */}
        <aside
          style={{
            width: '200px',
            flexShrink: 0,
            borderRight: '2px solid #111827',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            paddingRight: '10px' // Move scrollbar track away from the border, adjusted for smaller width
          }}
        >
          {/* Fixed Header of Sidebar */}
          <div
            onClick={() => setIsExpanded(!isExpanded)}
            style={{
              padding: '24px 20px 20px 16px',
              flexShrink: 0,
              cursor: 'pointer',
              userSelect: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            title="Expand/Collapse"
          >
            <span style={{ fontSize: '20px', fontWeight: '900', color: '#111827', letterSpacing: '1px' }}>{mainCategoryName}</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '6px',
                width: '14px',
                height: '14px',
              }}
            >
              {isExpanded ? (
                <svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect width="11" height="2" rx="1" fill="#374151" />
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <rect y="4.5" width="11" height="2" rx="1" fill="#374151" />
                  <rect x="4.5" width="2" height="11" rx="1" fill="#374151" />
                </svg>
              )}
            </div>
          </div>

          {/* Scrollable List of subcategories */}
          <div
            className="custom-scrollbar"
            style={{
              flex: 1,
              overflowY: 'auto',
              display: isExpanded ? 'block' : 'none',
              padding: '0 0px 20px 0'
            }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {/* Level 1: "All Categories" */}
              <li
                onClick={() => {
                  setActiveLeafId(null);
                  onClearSub();
                }}
                style={{
                  padding: '8px 16px 8px 16px', // 16px left padding
                  cursor: 'pointer',
                  fontSize: '17px',
                  fontWeight: subCategory === null ? '600' : '400',
                  color: subCategory === null ? '#dc2626' : '#111827',
                  transition: 'all 0.2s ease',
                  letterSpacing: '1px'
                }}
              >
                All {mainCategoryName}
              </li>

              {/* Level 2 + Level 3 */}
              {subs.map((sub) => (
                <li key={sub.id} style={{ marginTop: '8px' }}>
                  <div
                    onClick={() => {
                      setActiveLeafId(null);
                      onSubClick(mainCatId, sub.id);
                    }}
                    style={{
                      padding: '8px 16px 8px 16px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      lineHeight: 1.4,
                      fontWeight: '700',
                      color: '#1f2937',
                      transition: 'color 0.2s ease',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {sub.name}
                  </div>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '2px 0 0 0' }}>
                    {(productsMap[sub.id] || []).map((product) => {
                      const isActiveLeaf = subCategory === sub.id && activeLeafId === product.id;
                      return (
                        <li
                          key={product.id}
                          onClick={() => {
                            setActiveLeafId(product.id);
                            onSubClick(mainCatId, sub.id);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          style={{
                            padding: '6px 16px 6px 16px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            lineHeight: 1.35,
                            color: isActiveLeaf ? '#dc2626' : '#6b7280',
                            fontWeight: isActiveLeaf ? '600' : '400',
                            transition: 'color 0.2s ease',
                          }}
                          onMouseEnter={(e) => {
                            if (!isActiveLeaf) e.currentTarget.style.color = '#374151';
                          }}
                          onMouseLeave={(e) => {
                            if (!isActiveLeaf) e.currentTarget.style.color = '#6b7280';
                          }}
                        >
                          {product.name}
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content: Flex column for fixed header + scrollable products grid */}
        <section style={{ flex: 1, display: 'flex', flexDirection: 'column', backgroundColor: '#fff', overflow: 'hidden' }}>

          {/* Fixed Header of Main Content */}
          <div style={{ flexShrink: 0, padding: '12px 32px 10px 32px', borderBottom: '1px solid #f3f4f6' }}>
            {!isAllLevel && (
              <div style={{ color: '#6b7280', fontSize: '14px', fontWeight: '500', marginBottom: '8px', letterSpacing: '0.2px' }}>
                {breadcrumbParts.map((part, index) => (
                  <span key={`${part}-${index}`}>
                    {index > 0 && <span style={{ margin: '0 10px', color: '#9ca3af' }}>›</span>}
                    <span>{part}</span>
                  </span>
                ))}
                <span style={{ margin: '0 10px', color: '#9ca3af' }}>›</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px' }}>
              <h2
                style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#dc2626',
                  margin: 0,
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {rightTitle}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                <span style={{ fontSize: '14px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#111827', fontWeight: '700' }}>{displayProducts.length}</span> items
                </span>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search in results"
                    style={{
                      width: '360px',
                      height: '40px',
                      borderRadius: '8px',
                      border: 'none',
                      padding: '0 44px 0 14px',
                      fontSize: '14px',
                      outline: 'none',
                      backgroundColor: '#f3f4f6',
                      color: '#374151',
                    }}
                  />
                  <span style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#111827', fontSize: '16px' }}>⌕</span>
                </div>
                <span style={{ fontSize: '14px', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                  Sort <strong style={{ color: '#dc2626' }}>Recommended</strong>
                  <span style={{ fontSize: '12px', color: '#dc2626', transform: 'translateY(1px)' }}>⌄</span>
                </span>
              </div>
            </div>
          </div>

          {/* Scrollable Products Grid */}
          <div className="custom-scrollbar" style={{ flex: 1, overflowY: 'auto', padding: '24px 32px 40px 32px' }}>
            {displayProducts.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px', opacity: 0.5 }}>📦</div>
                <p style={{ fontSize: '16px', fontWeight: '500' }}>No products found</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px' }}>
                {displayProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      // scroll to top just in case for mobile or other views
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ cursor: 'pointer', transition: 'transform 0.2s ease', backgroundColor: '#fff' }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ borderRadius: '12px', overflow: 'hidden', backgroundColor: '#f3f4f6', marginBottom: '12px', aspectRatio: '1/1', mixBlendMode: 'multiply' }}>
                      <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <h3
                      style={{
                        fontSize: '14px',
                        color: '#374151',
                        lineHeight: 1.5,
                        margin: '0 0 8px 0',
                        height: '42px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        fontWeight: '500'
                      }}
                    >
                      {product.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                      <span style={{ fontSize: '14px', color: '#dc2626', fontWeight: '900' }}>$</span>
                      <span style={{ color: '#dc2626', fontWeight: '900', fontSize: '24px', margin: 0, letterSpacing: '-0.5px' }}>{product.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
