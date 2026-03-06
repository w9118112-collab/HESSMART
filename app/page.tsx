'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
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
import OrderPage from './components/OrderPage';

export default function HessMartPage() {
  // Route state: current main category (home means landing page)
  const [mainCategory, setMainCategory] = useState('home');
  // Subcategory (used when a specific subcategory is selected)
  const [subCategory, setSubCategory] = useState<string | null>(null);
  // Selected product details
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Dropdown hover state (main category)
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  const [checkoutProducts, setCheckoutProducts] = useState<Product[] | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const [topHeight, setTopHeight] = useState(120);
  const updateTopHeight = useCallback(() => {
    if (topRef.current) {
      setTopHeight(Math.ceil(topRef.current.getBoundingClientRect().height));
    }
  }, []);

  // Handle main-category click
  const handleMainClick = (catId: string) => {
    setMainCategory(catId);
    setSubCategory(null);
    setSelectedProduct(null);
    setCheckoutProducts(null);
    setHoveredCat(null);
  };

  // Handle subcategory click
  const handleSubClick = (catId: string, subId: string) => {
    setMainCategory(catId);
    setSubCategory(subId);
    setSelectedProduct(null);
    setCheckoutProducts(null);
    setHoveredCat(null);
  };

  // Back to home
  const goHome = () => {
    setMainCategory('home');
    setSubCategory(null);
    setSelectedProduct(null);
    setCheckoutProducts(null);
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

    // Checkout page
    if (checkoutProducts && checkoutProducts.length > 0) {
      return <OrderPage products={checkoutProducts} onBack={() => setCheckoutProducts(null)} />;
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
    return (
      <PlaceholderPage
        key={mainCategory}
        mainCategory={mainCategory}
        topOffset={0}
        onCheckout={(products) => setCheckoutProducts(products)}
      />
    );
  };

  const hasCatalogFrame =
    mainCategory !== 'home' &&
    mainCategory !== 'why' &&
    mainCategory !== 'offer' &&
    Boolean(subsMap[mainCategory]);
  const isCheckoutView = Boolean(checkoutProducts && checkoutProducts.length > 0);
  const isPlaceholderView =
    mainCategory !== 'home' &&
    mainCategory !== 'why' &&
    mainCategory !== 'offer' &&
    !selectedProduct &&
    !isCheckoutView &&
    !hasCatalogFrame;
  const isCategoryView = hasCatalogFrame && !selectedProduct;

  useEffect(() => {
    updateTopHeight();
    window.addEventListener('resize', updateTopHeight);
    return () => window.removeEventListener('resize', updateTopHeight);
  }, [updateTopHeight]);

  useEffect(() => {
    updateTopHeight();
  }, [updateTopHeight, mainCategory, selectedProduct, isPlaceholderView]);

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
      {!isPlaceholderView && (
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
          {!isCheckoutView && (
            <NavBar
              mainCategory={mainCategory}
              hoveredCat={hoveredCat}
              onMainClick={handleMainClick}
              onSubClick={handleSubClick}
              onHoverCat={setHoveredCat}
            />
          )}
        </div>
      )}

      {/* Main content area - remove top padding for category layout */}
      <main style={{
        height: isCategoryView ? `calc(100vh - ${topHeight}px)` : 'auto',
        minHeight: isCategoryView ? 0 : undefined,
        display: hasCatalogFrame ? 'flex' : 'block',
        maxWidth: '1400px',
        margin: '0 auto',
        marginTop: isPlaceholderView ? '0' : `${topHeight}px`,
        padding: hasCatalogFrame ? '0' : isPlaceholderView ? '0 24px 24px' : '40px 24px',
        width: '100%'
      }}>
        {renderContent()}
      </main>
    </div>
  );
}
