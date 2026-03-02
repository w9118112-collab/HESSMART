'use client';

import { useEffect, useRef, useState } from 'react';
import { Product } from './types';
import { subsMap, productsMapByCategory } from './data/products';
import TopBanner from './components/TopBanner';
import Header from './components/Header';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import WhyUsPage from './components/WhyUsPage';
import OfferPage from './components/OfferPage';
import ProductDetail from './components/ProductDetail';
import CategoryLayout from './components/CategoryLayout';
import PlaceholderPage from './components/PlaceholderPage';

export default function HessMartPage() {
  // Route state: current main category (home means landing page)
  const [mainCategory, setMainCategory] = useState('home');
  // Subcategory (used when a specific subcategory is selected)
  const [subCategory, setSubCategory] = useState<string | null>(null);
  // Selected product details
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Dropdown hover state (main category)
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const [topHeight, setTopHeight] = useState(120);

  // Handle main-category click
  const handleMainClick = (catId: string) => {
    setMainCategory(catId);
    setSubCategory(null);
    setSelectedProduct(null);
    setHoveredCat(null);
  };

  // Handle subcategory click
  const handleSubClick = (catId: string, subId: string) => {
    setMainCategory(catId);
    setSubCategory(subId);
    setSelectedProduct(null);
    setHoveredCat(null);
  };

  // Back to home
  const goHome = () => {
    setMainCategory('home');
    setSubCategory(null);
    setSelectedProduct(null);
  };

  // ---------- Render content ----------
  const renderContent = () => {
    // Home page
    if (mainCategory === 'home') {
      return <HomePage onMainClick={handleMainClick} />;
    }

    // Why Us page
    if (mainCategory === 'why') {
      return <WhyUsPage onMainClick={handleMainClick} />;
    }

    // Offer page
    if (mainCategory === 'offer') {
      return <OfferPage onMainClick={handleMainClick} />;
    }

    // Product detail view
    if (selectedProduct) {
      return (
        <ProductDetail
          product={selectedProduct}
          mainCategory={mainCategory}
          subCategory={subCategory}
          onBack={() => setSelectedProduct(null)}
          onChangeImage={(product) => setSelectedProduct(product)}
        />
      );
    }

    // Category layout: main categories with subcategories use split layout
    const subs = subsMap[mainCategory];
    const productsMap = productsMapByCategory[mainCategory];
    if (subs && productsMap) {
      return (
        <CategoryLayout
          mainCatId={mainCategory}
          subs={subs}
          productsMap={productsMap}
          subCategory={subCategory}
          onSubClick={handleSubClick}
          onClearSub={() => setSubCategory(null)}
          onSelectProduct={setSelectedProduct}
        />
      );
    }

    // Fallback for categories without subcategories (e.g. best, new)
    return <PlaceholderPage mainCategory={mainCategory} />;
  };

  const hasCatalogFrame =
    mainCategory !== 'home' &&
    mainCategory !== 'why' &&
    mainCategory !== 'offer' &&
    Boolean(subsMap[mainCategory]);
  const isCategoryView = hasCatalogFrame && !selectedProduct;

  useEffect(() => {
    const updateTopHeight = () => {
      if (topRef.current) {
        setTopHeight(Math.ceil(topRef.current.getBoundingClientRect().height));
      }
    };

    updateTopHeight();
    window.addEventListener('resize', updateTopHeight);
    return () => window.removeEventListener('resize', updateTopHeight);
  }, []);

  // ---------- Render page ----------
  return (
    <div style={{
      height: isCategoryView ? '100vh' : 'auto',
      minHeight: '100vh',
      display: 'block',
      overflow: isCategoryView ? 'hidden' : 'visible',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      fontFamily: 'sans-serif'
    }}>
      {/* Fixed top section */}
      <div
        ref={topRef}
        style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        borderBottom: hasCatalogFrame ? '2px solid #111827' : '1px solid #e5e7eb'
      }}>
        <TopBanner />
        <Header onGoHome={goHome} />
        <NavBar
          mainCategory={mainCategory}
          hoveredCat={hoveredCat}
          onMainClick={handleMainClick}
          onSubClick={handleSubClick}
          onHoverCat={setHoveredCat}
        />
      </div>

      {/* Main content area - remove top padding for category layout */}
      <main style={{
        height: isCategoryView ? `calc(100vh - ${topHeight}px)` : 'auto',
        minHeight: isCategoryView ? 0 : undefined,
        display: hasCatalogFrame ? 'flex' : 'block',
        maxWidth: '1400px',
        margin: '0 auto',
        marginTop: `${topHeight}px`,
        padding: hasCatalogFrame ? '0' : '40px 24px',
        width: '100%'
      }}>
        {renderContent()}
      </main>
    </div>
  );
}
