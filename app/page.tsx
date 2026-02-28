'use client';

import { Images } from 'lucide-react';
import React, { useState } from 'react';

export default function HessMartPage() {
  const [route, setRoute] = useState('home');
  const [subCategory, setSubCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 切换路由时重置子分类和选中商品
  const handleRouteChange = (newRoute) => {
    setRoute(newRoute);
    setSubCategory(null);
    setSelectedProduct(null);
  };

  // 类目数据：图片路径已替换为自定义线条图片（请确保图片存放在 public/icon/ 下）
  const categories = [
    { id: 'home', name: "HOME", icon: "/icon/home.jpg" },
    { id: 'snacks', name: "SNACKS", icon: "/icon/snacks.jpg" },
    { id: 'groceries', name: "GROCERIES", icon: "/icon/groceries.jpg" },
    { id: 'beverages', name: "BEVERAGES", icon: "/icon/beverages.jpg" },
    { id: 'beauty', name: "BEAUTY", icon: "/icon/beauty.jpg" },
    { id: 'digital', name: "DIGITAL", icon: "/icon/digital.jpg" },
    { id: 'fashion', name: "FASHION", icon: "/icon/fashion.jpg" },
    { id: 'japan', name: "JAPAN", icon: "/icon/japan.jpg" },
    { id: 'korea', name: "KOREA", icon: "/icon/korea.jpg" },
    { id: 'best', name: "BEST SELLERS", icon: "/icon/best.jpg" },
    { id: 'new', name: "NEW ARRIVALS", icon: "/icon/new.jpg" }
  ];

  // GROCERIES 子分类（图标暂为 emoji，可按需替换为图片）
  const grocerySubs = [
    { id: 'fruits', name: '水果', icon: '🍎' },
    { id: 'vegetables', name: '蔬菜', icon: '🥦' },
    { id: 'drinks', name: '饮料', icon: '🧃' },
    { id: 'pet', name: '宠物用品', icon: '🐶' },
  ];

  // GROCERIES 商品数据
  const productsBySubCategory = {
    fruits: [
      { id: 1, name: '苹果', price: 5.99, image: '/apple.jpg' },
      { id: 2, name: '香蕉', price: 3.99, image: '/banana.jpg' },
      { id: 3, name: '橙子', price: 4.99, image: '/orange.jpg' },
    ],
    vegetables: [
      { id: 4, name: '西兰花', price: 6.99, image: '/broccoli.jpg' },
      { id: 5, name: '胡萝卜', price: 2.99, image: '/carrot.jpg' },
    ],
    drinks: [
      { id: 6, name: '可乐', price: 1.99, image: '/coke.jpg' },
      { id: 7, name: '矿泉水', price: 0.99, image: '/water.jpg' },
    ],
    pet: [
      { 
        id: 8, 
        name: '宠物JOJO JiO 樱桃派对系列绳结玩具', 
        price: 9.99, 
        image: '/1_2.jpg',
        images: [ '/1_2.jpg', '/1_3.jpg', '/1_5.png', '/1_6.png', '/1_7.png', '/1_8.png', '/1_9.png' ],
        description: '可爱的樱桃造型绳结玩具，适合狗狗啃咬玩耍，环保材料，耐用安全。',
        detailedDescription: 'JOJO JiO 樱桃派对系列绳结玩具是专为中大型犬（如灵缇、惠比特）设计的耐咬棉绳拉扯玩具，结实编织不易散开且温和护牙，配以可爱樱桃造型吊球，激发狗狗追逐、撕咬与互动乐趣，完美适合活跃、爱玩的宠物主人作为日常耐玩陪伴玩具。'
      },
    ],
  };

  // FASHION 子分类（图标暂为 emoji）
  const fashionSubs = [
    { id: 'women', name: '女装', icon: '👗' },
    { id: 'men', name: '男装', icon: '👔' },
    { id: 'kids', name: '童装', icon: '🧸' },
    { id: 'accessories', name: '配饰', icon: '🧣' },
  ];

  // FASHION 商品数据（请替换为实际图片路径）
  const productsByFashionSubCategory = {
    women: [
      { 
        id: 101, 
        name: 'NILCE NEW 蜜桃提臀瑜伽裤采用高腰Y字提臀+无T线精研版型', 
        price: 9.99, 
        image: '/women/shangpin1/0_2.jpg',
        images: [ '/women/shangpin1/0_2.jpg', '/women/shangpin1/0_3.jpg', '/women/shangpin1/0_5.jpg', '/women/shangpin1/0_6.png', '/women/shangpin1/0_7.jpg', '/women/shangpin1/0_8.png', '/women/shangpin1/0_9.jpg','/women/shangpin1/0_10.png' ],
        description: 'NILCE NEW 蜜桃提臀瑜伽裤采用高腰Y字提臀+无T线精研版型',
        detailedDescription: 'NILCE NEW 蜜桃提臀瑜伽裤采用高腰Y字提臀+无T线精研版型，专为亚洲女性身材设计，3cm臀线+15°臀型提升，打造自然翘臀曲线，柔软透气不勒痕，适合追求完美臀部线条的健身女孩、瑜伽爱好者及日常显瘦穿搭的年轻女性。'
      },
      { id: 102, name: '半身裙', price: 39.99, image: '/fashion/women/skirt.jpg' },
    ],
    men: [
      { id: 201, name: 'T恤', price: 29.99, image: '/fashion/men/tshirt.jpg' },
      { id: 202, name: '牛仔裤', price: 59.99, image: '/fashion/men/jeans.jpg' },
    ],
    kids: [
      { id: 301, name: '儿童外套', price: 35.99, image: '/fashion/kids/coat.jpg' },
    ],
    accessories: [
      { id: 401, name: '围巾', price: 15.99, image: '/fashion/accessories/scarf.jpg' },
    ],
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#1a1a1a', fontFamily: 'sans-serif' }}>
      {/* 顶部红色条 */}
      <div style={{ backgroundColor: '#e11d48', padding: '10px 0', color: '#ffffff', textAlign: 'center', fontWeight: '900', fontSize: '12px' }}>
        WE DID THE RESEARCH. YOU DO THE PROFITING.
      </div>

      {/* Header 第一行 */}
      <header style={{ borderBottom: '1px solid #f3f4f6', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => handleRouteChange('home')}>
            <img src="/logo.png" alt="HessMart" style={{ height: '50px', width: 'auto' }} />
          </div>

          <input
            type="text"
            placeholder="Search winners products..."
            style={{
              flexGrow: 1,
              maxWidth: '500px',
              margin: '0 40px',
              height: '40px',
              backgroundColor: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '20px',
              padding: '0 20px',
              outline: 'none',
            }}
          />

          <div style={{ display: 'flex', gap: '24px', fontSize: '11px', fontWeight: '700', color: '#9ca3af' }}>
            <span>👤 LOGIN</span>
            <span>ACCOUNT</span>
            <span>CART (0)</span>
          </div>
        </div>
      </header>

      {/* Header 第二行: 导航栏 */}
      <div style={{ borderBottom: '1px solid #f3f4f6', padding: '12px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ color: '#d1d5db', padding: '0 10px', fontSize: '20px' }}>☰</span>
            {categories.map((item) => (
              <button
                key={item.id}
                onClick={() => handleRouteChange(item.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                <img src={item.icon} alt={item.name} style={{ width: '20px', height: '20px' }} />
                <span
                  style={{
                    fontSize: '9px',
                    fontWeight: '900',
                    color: route === item.id ? '#e11d48' : '#9ca3af',
                    marginTop: '4px',
                  }}
                >
                  {item.name}
                </span>
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '1px', height: '30px', backgroundColor: '#eee' }}></div>
            <img
              src="/pick.png"
              alt="Cart & Profit"
              onClick={() => handleRouteChange('why')}
              style={{ height: '60px', width: 'auto', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
        {/* 首页 */}
        {route === 'home' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
            <div
              style={{
                backgroundColor: '#fdf2e9',
                borderRadius: '48px',
                padding: '60px',
                height: '460px',
                border: '1px solid #eee',
              }}
            >
              <h2 style={{ fontSize: '50px', fontWeight: '900', fontStyle: 'italic' }}>
                BACK TO <br /> RHYTHM
              </h2>
              <button
                onClick={() => handleRouteChange('why')}
                style={{
                  backgroundColor: '#e11d48',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 40px',
                  borderRadius: '30px',
                  fontWeight: '900',
                  marginTop: '20px',
                  cursor: 'pointer',
                }}
              >
                WHY US?
              </button>
            </div>
            <div
              style={{
                backgroundColor: '#e3f2fd',
                borderRadius: '48px',
                padding: '60px',
                height: '460px',
                border: '1px solid #eee',
              }}
            >
              <h2 style={{ fontSize: '50px', fontWeight: '900', fontStyle: 'italic' }}>
                SHOP THE <br /> <span style={{ color: '#e11d48' }}>WINNERS</span>
              </h2>
              <button
                onClick={() => handleRouteChange('best')}
                style={{
                  backgroundColor: '#e11d48',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 40px',
                  borderRadius: '30px',
                  fontWeight: '900',
                  marginTop: '20px',
                  cursor: 'pointer',
                }}
              >
                EXPLORE
              </button>
            </div>
          </div>
        )}

        {/* Why Us 内容页 */}
        {route === 'why' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '48px', fontWeight: '900', fontStyle: 'italic', textAlign: 'center', marginBottom: '40px' }}>
              "WE DID THE RESEARCH. <br />
              <span style={{ color: '#e11d48' }}>YOU DO THE PROFITING.</span>"
            </p>
            <div style={{ backgroundColor: '#fff', padding: '60px', borderRadius: '40px', border: '1px solid #eee' }}>
              <p style={{ fontSize: '26px', color: '#6b7280', fontStyle: 'italic', lineHeight: '1.5', marginBottom: '40px' }}>
                Starting or expanding your shop doesn’t have to mean hours of product hunting. Our team has leveraged{' '}
                <strong>deep industry experience</strong> to select 1,000+ ready-to-sell winners products.
              </p>
              <div style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '900' }}>
                  YOUR FAST TRACK TO SUCCESS STARTS&nbsp;
                  <span
                    onClick={() => handleRouteChange('best')}
                    style={{
                      color: '#e11d48',
                      textDecoration: 'underline',
                      textDecorationThickness: '4px',
                      textUnderlineOffset: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    HERE <span style={{ fontSize: '60px', verticalAlign: 'middle', display: 'inline-block' }}>→</span>
                  </span>
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* GROCERIES 分类页面 */}
        {route === 'groceries' && (
          <div>
            {selectedProduct ? (
              // 商品详情
              <div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{ marginBottom: '20px', color: '#e11d48', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                >
                  ← 返回商品列表
                </button>
                <div style={{ display: 'flex', gap: '40px', background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #eee' }}>
                  <div style={{ flex: 1 }}>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', marginBottom: '20px' }}
                    />
                    {selectedProduct.images && selectedProduct.images.length > 0 && (
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingBottom: '10px' }}>
                        {selectedProduct.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${selectedProduct.name} - ${index + 1}`}
                            onClick={() => setSelectedProduct({ ...selectedProduct, image: img })}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              border: selectedProduct.image === img ? '2px solid #e11d48' : '1px solid #eee',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '20px' }}>{selectedProduct.name}</h1>
                    <p style={{ fontSize: '28px', color: '#e11d48', fontWeight: '900', marginBottom: '20px' }}>
                      ${selectedProduct.price.toFixed(2)}
                    </p>
                    <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.6', marginBottom: '30px' }}>
                      {selectedProduct.detailedDescription || selectedProduct.description || '暂无商品描述'}
                    </p>
                    <button
                      style={{
                        background: '#e11d48',
                        color: '#fff',
                        border: 'none',
                        padding: '15px 40px',
                        borderRadius: '30px',
                        fontSize: '18px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('已加入购物车（演示）');
                      }}
                    >
                      加入购物车
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // 子分类或商品列表
              <>
                {!subCategory ? (
                  // 显示子分类卡片
                  <div>
                    <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '30px' }}>GROCERIES 分类</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                      {grocerySubs.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setSubCategory(sub.id)}
                          style={{
                            background: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            borderRadius: '16px',
                            padding: '30px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <span style={{ fontSize: '48px' }}>{sub.icon}</span>
                          <span style={{ fontSize: '20px', fontWeight: '600' }}>{sub.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // 显示选中子分类的商品列表
                  <div>
                    <button
                      onClick={() => setSubCategory(null)}
                      style={{ marginBottom: '20px', color: '#e11d48', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      ← 返回所有分类
                    </button>
                    <h2 style={{ fontSize: '28px', fontWeight: '900' }}>
                      {grocerySubs.find((s) => s.id === subCategory)?.name}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                      {productsBySubCategory[subCategory]?.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          style={{ border: '1px solid #eee', borderRadius: '12px', padding: '15px', cursor: 'pointer' }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                          />
                          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '5px' }}>{product.name}</h3>
                          <p style={{ color: '#e11d48', fontWeight: '900' }}>${product.price.toFixed(2)}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`已将 ${product.name} 加入购物车（演示）`);
                            }}
                            style={{
                              background: '#e11d48',
                              color: '#fff',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '20px',
                              marginTop: '10px',
                              cursor: 'pointer',
                            }}
                          >
                            加入购物车
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* FASHION 分类页面 */}
        {route === 'fashion' && (
          <div>
            {selectedProduct ? (
              // 商品详情（结构与 groceries 相同）
              <div>
                <button
                  onClick={() => setSelectedProduct(null)}
                  style={{ marginBottom: '20px', color: '#e11d48', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                >
                  ← 返回商品列表
                </button>
                <div style={{ display: 'flex', gap: '40px', background: '#fff', padding: '40px', borderRadius: '24px', border: '1px solid #eee' }}>
                  <div style={{ flex: 1 }}>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      style={{ width: '100%', borderRadius: '16px', objectFit: 'cover', marginBottom: '20px' }}
                    />
                    {selectedProduct.images && selectedProduct.images.length > 0 && (
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', paddingBottom: '10px' }}>
                        {selectedProduct.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`${selectedProduct.name} - ${index + 1}`}
                            onClick={() => setSelectedProduct({ ...selectedProduct, image: img })}
                            style={{
                              width: '80px',
                              height: '80px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              border: selectedProduct.image === img ? '2px solid #e11d48' : '1px solid #eee',
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h1 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '20px' }}>{selectedProduct.name}</h1>
                    <p style={{ fontSize: '28px', color: '#e11d48', fontWeight: '900', marginBottom: '20px' }}>
                      ${selectedProduct.price.toFixed(2)}
                    </p>
                    <p style={{ fontSize: '18px', color: '#4b5563', lineHeight: '1.6', marginBottom: '30px' }}>
                      {selectedProduct.detailedDescription || selectedProduct.description || '暂无商品描述'}
                    </p>
                    <button
                      style={{
                        background: '#e11d48',
                        color: '#fff',
                        border: 'none',
                        padding: '15px 40px',
                        borderRadius: '30px',
                        fontSize: '18px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert('已加入购物车（演示）');
                      }}
                    >
                      加入购物车
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // 子分类或商品列表
              <>
                {!subCategory ? (
                  // 显示子分类卡片
                  <div>
                    <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '30px' }}>FASHION 分类</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                      {fashionSubs.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setSubCategory(sub.id)}
                          style={{
                            background: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            borderRadius: '16px',
                            padding: '30px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '10px',
                          }}
                        >
                          <span style={{ fontSize: '48px' }}>{sub.icon}</span>
                          <span style={{ fontSize: '20px', fontWeight: '600' }}>{sub.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // 显示选中子分类的商品列表
                  <div>
                    <button
                      onClick={() => setSubCategory(null)}
                      style={{ marginBottom: '20px', color: '#e11d48', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      ← 返回所有分类
                    </button>
                    <h2 style={{ fontSize: '28px', fontWeight: '900' }}>
                      {fashionSubs.find((s) => s.id === subCategory)?.name}
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                      {productsByFashionSubCategory[subCategory]?.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            setSelectedProduct(product);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          style={{ border: '1px solid #eee', borderRadius: '12px', padding: '15px', cursor: 'pointer' }}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }}
                          />
                          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '5px' }}>{product.name}</h3>
                          <p style={{ color: '#e11d48', fontWeight: '900' }}>${product.price.toFixed(2)}</p>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              alert(`已将 ${product.name} 加入购物车（演示）`);
                            }}
                            style={{
                              background: '#e11d48',
                              color: '#fff',
                              border: 'none',
                              padding: '8px 16px',
                              borderRadius: '20px',
                              marginTop: '10px',
                              cursor: 'pointer',
                            }}
                          >
                            加入购物车
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* 其他分类占位页 */}
        {route !== 'home' && route !== 'why' && route !== 'groceries' && route !== 'fashion' && (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '900' }}>{route.toUpperCase()} CONTENT</h2>
            <p style={{ color: '#9ca3af', marginTop: '20px' }}>此处内容留给你填充子链接或商品</p>
          </div>
        )}
      </main>
    </div>
  );
}