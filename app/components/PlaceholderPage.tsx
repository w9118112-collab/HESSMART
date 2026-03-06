'use client';

import { useState, useCallback, useMemo } from 'react';
import { navCategories } from '../data/navCategories';
import { productsMapByCategory } from '../data/products';
import { Product } from '../types';

interface PlaceholderPageProps {
  mainCategory: string;
  topOffset?: number;
  onCheckout?: (products: Product[]) => void;
}

// ── 把某个主分类下所有子分类的真实产品拉平，并循环填充到 100 个 ──
function getRealProducts(categoryId: string): Product[] {
  const flattenProducts = (map: Record<string, Product[]>): Product[] => {
    const all: Product[] = [];
    for (const sub of Object.values(map)) {
      all.push(...sub);
    }
    return all;
  };

  const shuffle = <T,>(list: T[]): T[] => {
    const copied = [...list];
    for (let i = copied.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copied[i], copied[j]] = [copied[j], copied[i]];
    }
    return copied;
  };

  const categoryKeys = Object.keys(productsMapByCategory);
  const allCatalogProducts = categoryKeys.flatMap((key) => flattenProducts(productsMapByCategory[key]));

  if (categoryId === 'random') {
    const mixed = shuffle(allCatalogProducts);
    if (mixed.length === 0) return [];
    const result: Product[] = [];
    for (let i = 0; i < 100; i++) {
      const src = mixed[i % mixed.length];
      result.push({
        ...src,
        id: 9000000 + i + 1,
        name: src.name + (i >= mixed.length ? ` #${Math.floor(i / mixed.length) + 1}` : ''),
      });
    }
    return result;
  }

  const fallbackCategory = Object.keys(productsMapByCategory)[0];
  const resolvedCategory = productsMapByCategory[categoryId] ? categoryId : fallbackCategory;
  const all = flattenProducts(productsMapByCategory[resolvedCategory]);

  if (all.length === 0) return [];
  const categoryOffset =
    (Math.max(categoryKeys.indexOf(resolvedCategory), 0) + 1) * 100000;
  // 循环填充到 100 个（5 页 x 20 个）
  const result: Product[] = [];
  for (let i = 0; i < 100; i++) {
    const src = all[i % all.length];
    result.push({
      ...src,
      // 通过分类偏移避免跨分类切换时 id 冲突
      id: categoryOffset + i + 1,
      name: src.name + (i >= all.length ? ` #${Math.floor(i / all.length) + 1}` : ''),
    });
  }
  return result;
}

// ── 假数据：分析统计 ──
interface SelectedProductStats {
  product: Product;
  rank: number;
  medal: string;
  monthlySales: number;
  revenue: string;
  profitMargin: string;
  rating: number;
  reviews: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent: string;
}

function generateStats(products: Product[]): SelectedProductStats[] {
  const salesData = [
    { sales: 18420, rev: '$183,816', margin: '34.2%', rating: 4.8, reviews: 2341, trend: 'up' as const, tp: '+23.5%' },
    { sales: 12850, rev: '$96,375', margin: '28.7%', rating: 4.6, reviews: 1856, trend: 'up' as const, tp: '+15.2%' },
    { sales: 9630, rev: '$72,225', margin: '41.3%', rating: 4.5, reviews: 1203, trend: 'stable' as const, tp: '+2.1%' },
    { sales: 7210, rev: '$50,470', margin: '22.8%', rating: 4.3, reviews: 967, trend: 'down' as const, tp: '-5.3%' },
    { sales: 5890, rev: '$35,340', margin: '31.5%', rating: 4.7, reviews: 743, trend: 'up' as const, tp: '+8.7%' },
  ];
  const medals = ['🥇', '🥈', '🥉', '4th', '5th'];

  return products.map((p, i) => ({
    product: p,
    rank: i + 1,
    medal: medals[i] || `${i + 1}th`,
    monthlySales: salesData[i]?.sales ?? 3000,
    revenue: salesData[i]?.rev ?? '$30k',
    profitMargin: salesData[i]?.margin ?? '25.0%',
    rating: salesData[i]?.rating ?? 4.2,
    reviews: salesData[i]?.reviews ?? 500,
    trend: salesData[i]?.trend ?? 'stable',
    trendPercent: salesData[i]?.tp ?? '+0%',
  }));
}

// ── Apple Watch 蜂窝布局 ──
function getHoneycombPositions(count: number, circleSize: number, gap: number) {
  const positions: { x: number; y: number }[] = [];
  const cols = 5;
  const rowHeight = circleSize + gap * 0.55;
  const colWidth = circleSize + gap * 0.55;

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const offsetX = row % 2 === 1 ? colWidth * 0.5 : 0;
    positions.push({
      x: col * colWidth + offsetX,
      y: row * rowHeight,
    });
  }
  return positions;
}

// ── 主组件 ──
export default function PlaceholderPage({ mainCategory, topOffset = 0, onCheckout }: PlaceholderPageProps) {
  const availableCategories = useMemo(() => {
    return [
      ...Object.keys(productsMapByCategory).map((id) => ({
        id,
        name: navCategories.find((c) => c.id === id)?.name || id.toUpperCase(),
      })),
      { id: 'random', name: 'Random' },
    ];
  }, []);
  const defaultCategory = useMemo(
    () => (productsMapByCategory[mainCategory] ? mainCategory : Object.keys(productsMapByCategory)[0]),
    [mainCategory]
  );
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const allProducts = useMemo(() => getRealProducts(activeCategory), [activeCategory]);

  const ITEMS_PER_PAGE = 20;
  const TOTAL_PAGES = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [hoveredProduct, setHoveredProduct] = useState<Product | null>(null);
  const [animatingOut, setAnimatingOut] = useState(false);
  const [animatingIn, setAnimatingIn] = useState(false);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  // 记录图片加载失败的 id
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());
  const menuHeight = 132;

  const pageProducts = allProducts.slice(currentPage * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE + ITEMS_PER_PAGE);

  // 加大圆圈尺寸
  const circleSize = 110;
  const gap = 14;
  const positions = getHoneycombPositions(ITEMS_PER_PAGE, circleSize, gap);

  const maxX = positions.length > 0 ? Math.max(...positions.map((p) => p.x)) + circleSize : circleSize;
  const maxY = positions.length > 0 ? Math.max(...positions.map((p) => p.y)) + circleSize : circleSize;

  // 翻页动画
  const switchPage = useCallback((newPage: number) => {
    if (newPage === currentPage || animatingOut || animatingIn) return;
    setAnimatingOut(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setAnimatingOut(false);
      setAnimatingIn(true);
      setTimeout(() => setAnimatingIn(false), 350);
    }, 300);
  }, [currentPage, animatingOut, animatingIn]);

  // 选择产品
  const handleSelect = (product: Product) => {
    if (selectedProducts.find((p) => p.id === product.id)) return;
    if (selectedProducts.length >= 5) return;
    setSelectedProducts((prev) => [...prev, product]);
    setSelectedPages((prev) => new Set(prev).add(currentPage));
  };

  const stats = useMemo(
    () => (selectedProducts.length === 5 ? generateStats(selectedProducts) : null),
    [selectedProducts],
  );

  // 重置
  const handleReset = () => {
    setSelectedProducts([]);
    setCurrentPage(0);
    setSelectedPages(new Set());
  };

  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
    setHoveredProduct(null);
    setCurrentPage(0);
  };

  const isSelected = (id: number) => selectedProducts.some((p) => p.id === id);

  // 获取产品名首字母作为 fallback
  const getInitials = (name: string) => {
    return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  };

  return (
    <div style={{
      width: '100%',
      minHeight: 'calc(100vh - 160px)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '12px 20px 16px',
      position: 'relative',
    }}>
      {/* ── 动画 ── */}
      <style>{`
        @keyframes bubbleIn {
          0% { transform: scale(0) rotate(-30deg); opacity: 0; }
          60% { transform: scale(1.08) rotate(2deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes bubbleOut {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(0) rotate(20deg); opacity: 0; }
        }
        @keyframes slideUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          80% { transform: scale(1.15); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes previewIn {
          0% { opacity: 0; transform: translateY(10px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .watch-circle:hover {
          transform: scale(1.15) !important;
          z-index: 10 !important;
          box-shadow: 0 8px 30px rgba(0,0,0,0.25) !important;
        }
        .watch-circle:active {
          transform: scale(0.92) !important;
        }
        .page-dot:hover {
          transform: scale(1.3);
        }
      `}</style>

      {/* ── Placeholder 专属菜单栏 ── */}
      <div style={{
        position: 'fixed',
        top: `${topOffset}px`,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(1200px, calc(100vw - 48px))',
        zIndex: 900,
        paddingTop: '8px',
      }}>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          padding: '10px 12px',
          borderRadius: '14px',
          border: '1px solid #e5e7eb',
          background: 'rgba(249,250,251,0.97)',
          backdropFilter: 'blur(4px)',
        }}>
          {availableCategories.map((cat) => {
            const isActive = cat.id === activeCategory;
            const isRandom = cat.id === 'random';
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                style={{
                  border: isActive
                    ? '1px solid #111827'
                    : isRandom
                      ? '1px solid #7c3aed'
                      : '1px solid #d1d5db',
                  background: isActive
                    ? isRandom
                      ? 'linear-gradient(90deg, #111827 0%, #7c3aed 100%)'
                      : '#111827'
                    : '#fff',
                  color: isActive ? '#fff' : isRandom ? '#6d28d9' : '#374151',
                  borderRadius: '999px',
                  fontSize: '13px',
                  fontWeight: isRandom ? 800 : 700,
                  padding: '8px 14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isRandom ? '0 4px 10px rgba(124,58,237,0.14)' : 'none',
                }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ width: '100%', maxWidth: '1200px', height: `${menuHeight}px`, flexShrink: 0 }} />

      {/* ── 主布局 ── */}
      <div style={{
        display: 'flex',
        gap: '24px',
        marginTop: '8px',
        alignItems: 'flex-start',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1200px',
      }}>

        {/* ── 左侧：产品显示区域 ── */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 0, position: 'relative' }}>
          <div style={{
            width: maxX,
            height: maxY,
            position: 'relative',
            overflow: 'visible',
          }}>
            {pageProducts.map((product, idx) => {
              const pos = positions[idx];
              if (!pos) return null;
              const selected = isSelected(product.id);
              const hasBrokenImg = imgErrors.has(product.id);
              return (
                <div
                  key={`${currentPage}-${product.id}`}
                  className="watch-circle"
                  onClick={() => !selected && handleSelect(product)}
                  onMouseEnter={() => setHoveredProduct(product)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  style={{
                    position: 'absolute',
                    left: pos.x,
                    top: pos.y,
                    width: circleSize,
                    height: circleSize,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: selected ? 'default' : 'pointer',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: selected
                      ? 'inset 0 2px 8px rgba(0,0,0,0.2)'
                      : '0 4px 14px rgba(0,0,0,0.12)',
                    opacity: selected ? 0.45 : 1,
                    animation: animatingOut
                      ? `bubbleOut 0.3s ease forwards`
                      : animatingIn
                        ? `bubbleIn 0.35s ease ${idx * 18}ms both`
                        : `bubbleIn 0.4s ease ${idx * 22}ms both`,
                    border: selected ? '3px solid #9ca3af' : '3px solid rgba(255,255,255,0.9)',
                    background: '#f3f4f6',
                  }}
                >
                  {/* 产品图片 */}
                  {!hasBrokenImg ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={() => setImgErrors(prev => new Set(prev).add(product.id))}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        filter: selected ? 'grayscale(80%)' : 'none',
                      }}
                    />
                  ) : (
                    /* 图片加载失败时的 fallback */
                    <div style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      background: `linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      filter: selected ? 'grayscale(80%)' : 'none',
                    }}>
                      <span style={{ fontSize: '22px', fontWeight: 800, color: '#6366f1' }}>
                        {getInitials(product.name)}
                      </span>
                    </div>
                  )}

                  {/* 产品名悬浮底栏 */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                    padding: '14px 4px 5px',
                    textAlign: 'center',
                  }}>
                    <span style={{
                      fontSize: '9px',
                      fontWeight: 700,
                      color: 'white',
                      textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                      lineHeight: 1,
                      display: 'block',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {product.name}
                    </span>
                    <span style={{
                      fontSize: '8px',
                      color: 'rgba(255,255,255,0.8)',
                      fontWeight: 600,
                    }}>
                      ${product.price}
                    </span>
                  </div>

                  {/* 已选中标记 */}
                  {selected && (
                    <div style={{
                      position: 'absolute',
                      top: 4, right: 4,
                      width: 20, height: 20,
                      borderRadius: '50%',
                      background: '#10b981',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      color: 'white',
                      zIndex: 5,
                      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    }}>✓</div>
                  )}
                </div>
              );
            })}

          </div>

          {/* Hover 大弹窗 */}
          {hoveredProduct && (
            <div style={{
              position: 'absolute',
              top: 8,
              right: 0,
              width: 320,
              borderRadius: 18,
              overflow: 'hidden',
              border: '1px solid #d1d5db',
              background: 'rgba(255,255,255,0.98)',
              boxShadow: '0 20px 45px rgba(15,23,42,0.22)',
              pointerEvents: 'none',
              zIndex: 40,
              animation: 'previewIn 0.2s ease',
              backdropFilter: 'blur(6px)',
            }}>
              <div style={{
                position: 'relative',
                height: 190,
                background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
              }}>
                {!imgErrors.has(hoveredProduct.id) ? (
                  <img
                    src={hoveredProduct.image}
                    alt={hoveredProduct.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 52,
                    fontWeight: 900,
                    color: '#6366f1',
                  }}>
                    {getInitials(hoveredProduct.name)}
                  </div>
                )}
                <div style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  padding: '5px 10px',
                  borderRadius: 999,
                  fontSize: 11,
                  fontWeight: 800,
                  color: 'white',
                  background: isSelected(hoveredProduct.id) ? '#059669' : '#111827',
                }}>
                  {isSelected(hoveredProduct.id) ? '已选中' : '点击选择'}
                </div>
              </div>

              <div style={{ padding: '14px 14px 16px' }}>
                <div style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#111827',
                  lineHeight: 1.25,
                  marginBottom: 6,
                }}>
                  {hoveredProduct.name}
                </div>
                <div style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: '#dc2626',
                  marginBottom: 8,
                }}>
                  ${hoveredProduct.price}
                </div>
                <div style={{
                  fontSize: 12,
                  color: '#4b5563',
                  lineHeight: 1.5,
                }}>
                  {hoveredProduct.description || hoveredProduct.detailedDescription || 'High demand product with strong sell-through potential and healthy margins.'}
                </div>
              </div>
            </div>
          )}

          {/* ── 翻页指示器 ── */}
          <div style={{
            display: 'flex',
            gap: '10px',
            marginTop: '14px',
            alignItems: 'center',
          }}>
            {Array.from({ length: TOTAL_PAGES }).map((_, i) => {
              const hasSelection = selectedPages.has(i);
              return (
                <button
                  key={i}
                  className="page-dot"
                  onClick={() => switchPage(i)}
                  style={{
                    width: currentPage === i ? 30 : 10,
                    height: 10,
                    borderRadius: 5,
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: currentPage === i
                      ? 'linear-gradient(90deg, #111827, #374151)'
                      : hasSelection
                        ? '#10b981'
                        : '#d1d5db',
                  }}
                  title={`第 ${i + 1} 页${hasSelection ? '（已选）' : ''}`}
                />
              );
            })}
          </div>
          <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '6px' }}>
            第 {currentPage + 1} 页 / 共 {TOTAL_PAGES} 页 · 已选 {selectedProducts.length}/5
          </p>
        </div>

        {/* ── 右侧：已选产品面板 ── */}
        <div style={{
          width: '320px',
          minHeight: '200px',
          flexShrink: 0,
        }}>
          {/* 已选产品区 */}
          <div style={{
            background: '#f9fafb',
            borderRadius: '16px',
            padding: '16px',
            border: '1px solid #e5e7eb',
            minHeight: '80px',
          }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 700,
              color: '#6b7280',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              已选产品 ({selectedProducts.length}/5)
            </div>

            {selectedProducts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '20px 0',
                color: '#9ca3af',
                fontSize: '13px',
              }}>
                点击圆圈选择产品
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {selectedProducts.map((p, i) => (
                  <div key={p.id} style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    border: '2px solid white',
                    animation: `popIn 0.3s ease ${i * 50}ms both`,
                    position: 'relative',
                    background: '#f3f4f6',
                  }}>
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
                {/* 空位 */}
                {Array.from({ length: 5 - selectedProducts.length }).map((_, i) => (
                  <div key={`empty-${i}`} style={{
                    width: 52,
                    height: 52,
                    borderRadius: '50%',
                    border: '2px dashed #d1d5db',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#d1d5db',
                    fontSize: '16px',
                  }}>
                    ?
                  </div>
                ))}
              </div>
            )}

            {selectedProducts.length > 0 && selectedProducts.length < 5 && (
              <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '10px', textAlign: 'center' }}>
                再选 {5 - selectedProducts.length} 个即可查看数据分析
              </p>
            )}

            {selectedProducts.length > 0 && (
              <button
                onClick={() => onCheckout?.(selectedProducts)}
                style={{
                  marginTop: '12px',
                  width: '100%',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '11px 14px',
                  background: 'linear-gradient(90deg, #e11d48, #be123c)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  letterSpacing: '0.2px',
                }}
              >
                去下单
              </button>
            )}
          </div>

          {/* ── 数据分析面板 ── */}
          {stats && (
            <div style={{
              marginTop: '16px',
              background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
              borderRadius: '16px',
              padding: '20px',
              color: 'white',
              animation: 'slideUp 0.4s ease',
            }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 700,
                marginBottom: '16px',
              }}>
                <span style={{
                  background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontSize: '16px',
                  fontWeight: 800,
                }}>
                  销量排名
                </span>
              </div>

              {stats.map((s, i) => (
                <div key={s.product.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 0',
                  borderBottom: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                  animation: `slideUp 0.3s ease ${i * 80}ms both`,
                }}>
                  {/* 奖牌 */}
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: i === 0 ? 'linear-gradient(135deg, #fbbf24, #d97706)'
                      : i === 1 ? 'linear-gradient(135deg, #d1d5db, #9ca3af)'
                      : i === 2 ? 'linear-gradient(135deg, #d97706, #92400e)'
                      : 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: i < 3 ? '16px' : '12px',
                    fontWeight: 700,
                    color: i < 3 ? undefined : '#9ca3af',
                    flexShrink: 0,
                  }}>
                    {s.medal}
                  </div>

                  {/* 产品图片小圆 */}
                  <div style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: '#374151',
                  }}>
                    <img
                      src={s.product.image}
                      alt={s.product.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>

                  {/* 产品信息 */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {s.product.name}
                    </div>
                    <div style={{
                      fontSize: '11px',
                      color: '#9ca3af',
                      marginTop: '2px',
                    }}>
                      {s.monthlySales.toLocaleString()} 月销 · {s.revenue}
                    </div>
                  </div>

                  {/* 趋势 */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      color: s.trend === 'up' ? '#34d399' : s.trend === 'down' ? '#f87171' : '#9ca3af',
                    }}>
                      {s.trend === 'up' ? '↑' : s.trend === 'down' ? '↓' : '→'} {s.trendPercent}
                    </div>
                    <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>
                      利润率 {s.profitMargin}
                    </div>
                  </div>
                </div>
              ))}

              {/* 评分汇总 */}
              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px',
              }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#9ca3af',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginBottom: '8px',
                }}>
                  评分 & 评论
                </div>
                {stats.map((s) => (
                  <div key={s.product.id + '-rating'} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '4px 0',
                    fontSize: '12px',
                  }}>
                    <span style={{ color: '#d1d5db', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>
                      {s.product.name}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#fbbf24' }}>
                        {'★'.repeat(Math.floor(s.rating))}
                        {s.rating % 1 >= 0.5 ? '½' : ''}
                      </span>
                      <span style={{ color: '#6b7280', fontSize: '10px' }}>
                        {s.rating.toFixed(1)} ({s.reviews.toLocaleString()})
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              {/* 重置按钮 */}
              <button
                onClick={handleReset}
                style={{
                  marginTop: '16px',
                  width: '100%',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#d1d5db',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  e.currentTarget.style.color = '#d1d5db';
                }}
              >
                重置 & 重新开始
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
