'use client';

import React, { useState } from 'react';

export default function HessMartPage() {
  const [route, setRoute] = useState('home');

  // 类目数据：确保 HOME 唯一且在最左
  const categories = [
    { id: 'home', name: "HOME", icon: "🏠" },
    { id: 'snacks', name: "SNACKS", icon: "🍟" },
    { id: 'groceries', name: "GROCERIES", icon: "🛒" },
    { id: 'beverages', name: "BEVERAGES", icon: "🥤" },
    { id: 'beauty', name: "BEAUTY", icon: "💄" },
    { id: 'digital', name: "DIGITAL", icon: "🎧" },
    { id: 'fashion', name: "FASHION", icon: "👗" },
    { id: 'japan', name: "JAPAN", icon: "🗾" },
    { id: 'korea', name: "KOREA", icon: "🇰🇷" },
    { id: 'best', name: "BEST SELLERS", icon: "🏆" },
    { id: 'new', name: "NEW ARRIVALS", icon: "🆕" }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#1a1a1a', fontFamily: 'sans-serif' }}>
      {/* 顶部红色条 */}
      <div style={{ backgroundColor: '#e11d48', padding: '10px 0', color: '#ffffff', textAlign: 'center', fontWeight: '900', fontSize: '12px' }}>
        WE DID THE RESEARCH. YOU DO THE PROFITING.
      </div>

      {/* Header 第一行 */}
      <header style={{ borderBottom: '1px solid #f3f4f6', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo 🛒 标识 */}
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setRoute('home')}>
  <img 
    src="/logo.png" 
    alt="HessMart" 
    style={{ height: '50px', width: 'auto' }} 
  />
</div>
          
          <input type="text" placeholder="Search winners products..." style={{ flexGrow: 1, maxWidth: '500px', margin: '0 40px', height: '40px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '20px', padding: '0 20px', outline: 'none' }} />

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
            {/* HOME 绝对在最左边第一个 */}
            {categories.map((item) => (
              <button 
                key={item.id} 
                onClick={() => setRoute(item.id)}
                style={{ background: 'none', border: 'none', padding: '8px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
              >
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{ fontSize: '9px', fontWeight: '900', color: route === item.id ? '#e11d48' : '#9ca3af', marginTop: '4px' }}>{item.name}</span>
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

            <div style={{ width: '1px', height: '30px', backgroundColor: '#eee' }}></div>

            <img 
              src="/pick.png"
              alt="Cart & Profit" 
              onClick={() => setRoute('why')} 
              style={{
                height: '60px',
                width: 'auto',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>
      </div>

      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>
        {/* 首页 */}
        {route === 'home' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            <div style={{ backgroundColor: '#fdf2e9', borderRadius: '48px', padding: '60px', height: '460px', border: '1px solid #eee' }}>
              <h2 style={{ fontSize: '50px', fontWeight: '900', fontStyle: 'italic' }}>BACK TO <br/> RHYTHM</h2>
              <button onClick={() => setRoute('why')} style={{ backgroundColor: '#e11d48', color: '#fff', border: 'none', padding: '14px 40px', borderRadius: '30px', fontWeight: '900', marginTop: '20px', cursor: 'pointer' }}>WHY US?</button>
            </div>
            <div style={{ backgroundColor: '#e3f2fd', borderRadius: '48px', padding: '60px', height: '460px', border: '1px solid #eee' }}>
              <h2 style={{ fontSize: '50px', fontWeight: '900', fontStyle: 'italic' }}>SHOP THE <br/> <span style={{ color: '#e11d48' }}>WINNERS</span></h2>
              <button onClick={() => setRoute('best')} style={{ backgroundColor: '#e11d48', color: '#fff', border: 'none', padding: '14px 40px', borderRadius: '30px', fontWeight: '900', marginTop: '20px', cursor: 'pointer' }}>EXPLORE</button>
            </div>
          </div>
        )}

        {/* Why Us 内容页 (包含 HERE → 跳转逻辑) */}
        {route === 'why' && (
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ fontSize: '48px', fontWeight: '900', fontStyle: 'italic', textAlign: 'center', marginBottom: '40px' }}>"WE DID THE RESEARCH. <br /><span style={{ color: '#e11d48' }}>YOU DO THE PROFITING.</span>"</p>
            <div style={{ backgroundColor: '#fff', padding: '60px', borderRadius: '40px', border: '1px solid #eee' }}>
              <p style={{ fontSize: '26px', color: '#6b7280', fontStyle: 'italic', lineHeight: '1.5', marginBottom: '40px' }}>
                Starting or expanding your shop doesn’t have to mean hours of product hunting. Our team has leveraged <strong>deep industry experience</strong> to select 1,000+ ready-to-sell winners products.
              </p>
              <div style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
                <h2 style={{ fontSize: '36px', fontWeight: '900' }}>
                  YOUR FAST TRACK TO SUCCESS STARTS&nbsp;
                  {/* HERE 现在点击可以跳转到 Best Sellers 页面 */}
                  <span 
                    onClick={() => setRoute('best')}
                    style={{ color: '#e11d48', textDecoration: 'underline', textDecorationThickness: '4px', textUnderlineOffset: '8px', cursor: 'pointer' }}
                  >
                    HERE <span style={{ fontSize: '60px', verticalAlign: 'middle', display: 'inline-block' }}>→</span>
                  </span>
                </h2>
              </div>
            </div>
          </div>
        )}

        {/* 分类占位页 */}
        {route !== 'home' && route !== 'why' && (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h2 style={{ fontSize: '40px', fontWeight: '900' }}>{route.toUpperCase()} CONTENT</h2>
            <p style={{ color: '#9ca3af', marginTop: '20px' }}>此处内容留给你填充子链接或商品</p>
          </div>
        )}
      </main>
    </div>
  );
}