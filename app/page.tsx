'use client';

import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  detailedDescription?: string;
}

export default function HessMartPage() {
  // 路由状态：当前主分类 (home 表示首页)
  const [mainCategory, setMainCategory] = useState('home');
  // 子分类（当选中具体子分类时使用）
  const [subCategory, setSubCategory] = useState<string | null>(null);
  // 选中的商品详情
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // 下拉菜单悬停状态（主分类）
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);
  // 二级悬停状态（子分类）
  const [hoveredSub, setHoveredSub] = useState<string | null>(null);

  // 处理主分类点击
  const handleMainClick = (catId: string) => {
    setMainCategory(catId);
    setSubCategory(null);
    setSelectedProduct(null);
    setHoveredCat(null);
    setHoveredSub(null);
  };

  // 处理子分类点击
  const handleSubClick = (catId: string, subId: string) => {
    setMainCategory(catId);
    setSubCategory(subId);
    setSelectedProduct(null);
    setHoveredCat(null);
    setHoveredSub(null);
  };

  // 返回首页
  const goHome = () => {
    setMainCategory('home');
    setSubCategory(null);
    setSelectedProduct(null);
  };

  // ---------- 导航数据结构（包含子分类和图标）----------
  const navCategories = [
    { id: 'home', name: 'HOME', icon: '/icon/home.png', subCategories: null },
    {
      id: 'fashion',
      name: '服饰',
      icon: '/icon/fashion.png',
      subCategories: [
        { id: 'women', name: '女装' },
        { id: 'men', name: '男装' },
        { id: 'kids', name: '童装' },
        { id: 'accessories', name: '配饰' },
      ],
    },
    {
      id: 'auto',
      name: '车载用品',
      icon: '/icon/auto.jpg',
      subCategories: [
        { id: 'cleaners', name: '清洁养护' },
        { id: 'electronics', name: '车载电子' },
        { id: 'interior', name: '内饰精品' },
      ],
    },
    {
      id: 'pet',
      name: '宠物用品',
      icon: '/icon/pet.jpg',
      subCategories: [
        { id: 'dogs', name: '狗狗' },
        { id: 'cats', name: '猫咪' },
        { id: 'fish', name: '水族' },
        { id: 'smallpets', name: '小宠' },
      ],
    },
    {
      id: 'shoes',
      name: '鞋',
      icon: '/icon/shoes.jpg',
      subCategories: [
        { id: 'sneakers', name: '运动鞋' },
        { id: 'boots', name: '靴子' },
        { id: 'sandals', name: '凉鞋' },
        { id: 'formal', name: '正装鞋' },
      ],
    },
    {
      id: 'muslim',
      name: '穆斯林用品',
      icon: '/icon/muslim.jpg',
      subCategories: [
        { id: 'prayer', name: '礼拜用品' },
        { id: 'clothing', name: '服饰' },
        { id: 'books', name: '书籍' },
        { id: 'food', name: '清真食品' },
      ],
    },
    {
      id: 'cosmetics',
      name: '化妆品',
      icon: '/icon/cosmetics.jpg',
      subCategories: [
        { id: 'face', name: '面部' },
        { id: 'eyes', name: '眼部' },
        { id: 'lips', name: '唇部' },
        { id: 'sets', name: '套装' },
      ],
    },
    {
      id: 'skincare',
      name: '护肤品',
      icon: '/icon/skincare.jpg',
      subCategories: [
        { id: 'cleanser', name: '洁面' },
        { id: 'toner', name: '爽肤水' },
        { id: 'moisturizer', name: '乳液/面霜' },
        { id: 'mask', name: '面膜' },
      ],
    },
  ];

  // ---------- 商品数据（每个分类的子分类商品）----------
  // 服饰 (fashion)
  const fashionSubs = [
    { id: 'women', name: '女装', icon: '👗' },
    { id: 'men', name: '男装', icon: '👔' },
    { id: 'kids', name: '童装', icon: '🧸' },
    { id: 'accessories', name: '配饰', icon: '🧣' },
  ];

  const productsByFashionSubCategory: Record<string, Product[]> = {
    women: [
      {
        id: 101,
        name: 'NILCE NEW 蜜桃提臀瑜伽裤',
        price: 9.99,
        image: '/women/shangpin1/0_2.jpg',
        images: ['/women/shangpin1/0_2.jpg', '/women/shangpin1/0_3.jpg'],
        description: '高腰Y字提臀+无T线精研版型',
        detailedDescription: '专为亚洲女性身材设计，3cm臀线+15°臀型提升，打造自然翘臀曲线。',
      },
      { id: 102, name: '半身裙', price: 39.99, image: '/fashion/women/skirt.jpg' },
    ],
    men: [
      { id: 201, name: 'T恤', price: 29.99, image: '/fashion/men/tshirt.jpg' },
      { id: 202, name: '牛仔裤', price: 59.99, image: '/fashion/men/jeans.jpg' },
    ],
    kids: [{ id: 301, name: '儿童外套', price: 35.99, image: '/fashion/kids/coat.jpg' }],
    accessories: [{ id: 401, name: '围巾', price: 15.99, image: '/fashion/accessories/scarf.jpg' }],
  };

  // 车载用品 (auto)
  const autoSubs = [
    { id: 'cleaners', name: '清洁养护', icon: '🧼' },
    { id: 'electronics', name: '车载电子', icon: '📡' },
    { id: 'interior', name: '内饰精品', icon: '🪑' },
  ];

  const productsByAutoSubCategory: Record<string, Product[]> = {
    cleaners: [
      { id: 501, name: '全能清洁剂', price: 12.99, image: '/auto/cleaner.jpg' },
      { id: 502, name: '内饰泡沫清洁剂', price: 9.99, image: '/auto/interior-cleaner.jpg' },
    ],
    electronics: [
      { id: 601, name: '车载充电器', price: 19.99, image: '/auto/charger.jpg' },
      { id: 602, name: '行车记录仪', price: 89.99, image: '/auto/dashcam.jpg' },
    ],
    interior: [
      { id: 701, name: '记忆棉腰靠', price: 29.99, image: '/auto/backrest.jpg' },
      { id: 702, name: '车载香薰', price: 14.99, image: '/auto/airfreshener.jpg' },
    ],
  };

  // 宠物用品 (pet)
  const petSubs = [
    { id: 'dogs', name: '狗狗', icon: '🐶' },
    { id: 'cats', name: '猫咪', icon: '🐱' },
    { id: 'fish', name: '水族', icon: '🐠' },
    { id: 'smallpets', name: '小宠', icon: '🐹' },
  ];

  const productsByPetSubCategory: Record<string, Product[]> = {
    dogs: [
      {
        id: 8,
        name: '宠物JOJO JiO 樱桃派对系列绳结玩具',
        price: 9.99,
        image: '/1_2.jpg',
        images: ['/1_2.jpg', '/1_3.jpg'],
        description: '可爱的樱桃造型绳结玩具',
        detailedDescription: '专为中大型犬设计的耐咬棉绳拉扯玩具。',
      },
      { id: 802, name: '狗粮（鸡肉味）', price: 29.99, image: '/pet/dogfood.jpg' },
    ],
    cats: [
      { id: 901, name: '猫抓板', price: 15.99, image: '/pet/catscratch.jpg' },
      { id: 902, name: '逗猫棒', price: 5.99, image: '/pet/catwand.jpg' },
    ],
    fish: [{ id: 1001, name: '鱼饲料', price: 8.99, image: '/pet/fishfood.jpg' }],
    smallpets: [{ id: 1101, name: '仓鼠跑轮', price: 19.99, image: '/pet/hamsterwheel.jpg' }],
  };

  // 鞋 (shoes)
  const shoesSubs = [
    { id: 'sneakers', name: '运动鞋', icon: '👟' },
    { id: 'boots', name: '靴子', icon: '👢' },
    { id: 'sandals', name: '凉鞋', icon: '👡' },
    { id: 'formal', name: '正装鞋', icon: '👞' },
  ];

  const productsByShoesSubCategory: Record<string, Product[]> = {
    sneakers: [
      { id: 1201, name: '轻量跑鞋', price: 79.99, image: '/shoes/running.jpg' },
      { id: 1202, name: '复古板鞋', price: 69.99, image: '/shoes/skate.jpg' },
    ],
    boots: [
      { id: 1301, name: '马丁靴', price: 99.99, image: '/shoes/martin.jpg' },
      { id: 1302, name: '雪地靴', price: 89.99, image: '/shoes/uggs.jpg' },
    ],
    sandals: [{ id: 1401, name: '人字拖', price: 19.99, image: '/shoes/flipflop.jpg' }],
    formal: [{ id: 1501, name: '商务皮鞋', price: 129.99, image: '/shoes/oxford.jpg' }],
  };

  // 穆斯林用品 (muslim)
  const muslimSubs = [
    { id: 'prayer', name: '礼拜用品', icon: '🕌' },
    { id: 'clothing', name: '服饰', icon: '🧕' },
    { id: 'books', name: '书籍', icon: '📖' },
    { id: 'food', name: '清真食品', icon: '🥘' },
  ];

  const productsByMuslimSubCategory: Record<string, Product[]> = {
    prayer: [
      { id: 1601, name: '礼拜毯', price: 29.99, image: '/muslim/prayermat.jpg' },
      { id: 1602, name: '泰斯比哈（赞珠）', price: 12.99, image: '/muslim/tasbih.jpg' },
    ],
    clothing: [
      { id: 1701, name: '希贾布头巾', price: 24.99, image: '/muslim/hijab.jpg' },
      { id: 1702, name: '长袍', price: 49.99, image: '/muslim/abaya.jpg' },
    ],
    books: [{ id: 1801, name: '古兰经', price: 39.99, image: '/muslim/quran.jpg' }],
    food: [{ id: 1901, name: '清真牛肉肠', price: 6.99, image: '/muslim/halalsausage.jpg' }],
  };

  // 化妆品 (cosmetics)
  const cosmeticsSubs = [
    { id: 'face', name: '面部', icon: '💄' },
    { id: 'eyes', name: '眼部', icon: '👁️' },
    { id: 'lips', name: '唇部', icon: '💋' },
    { id: 'sets', name: '套装', icon: '🎁' },
  ];

  const productsByCosmeticsSubCategory: Record<string, Product[]> = {
    face: [
      { id: 2001, name: '粉底液', price: 35.99, image: '/cosmetics/foundation.jpg' },
      { id: 2002, name: '遮瑕膏', price: 19.99, image: '/cosmetics/concealer.jpg' },
    ],
    eyes: [
      { id: 2101, name: '眼影盘', price: 45.99, image: '/cosmetics/eyeshadow.jpg' },
      { id: 2102, name: '眼线笔', price: 15.99, image: '/cosmetics/eyeliner.jpg' },
    ],
    lips: [
      { id: 2201, name: '口红', price: 29.99, image: '/cosmetics/lipstick.jpg' },
      { id: 2202, name: '唇釉', price: 24.99, image: '/cosmetics/lipgloss.jpg' },
    ],
    sets: [{ id: 2301, name: '彩妆套装', price: 89.99, image: '/cosmetics/set.jpg' }],
  };

  // 护肤品 (skincare)
  const skincareSubs = [
    { id: 'cleanser', name: '洁面', icon: '🧼' },
    { id: 'toner', name: '爽肤水', icon: '💧' },
    { id: 'moisturizer', name: '乳液/面霜', icon: '🧴' },
    { id: 'mask', name: '面膜', icon: '🎭' },
  ];

  const productsBySkincareSubCategory: Record<string, Product[]> = {
    cleanser: [
      { id: 2401, name: '氨基酸洁面乳', price: 18.99, image: '/skincare/cleanser.jpg' },
      { id: 2402, name: '卸妆水', price: 14.99, image: '/skincare/makeupremover.jpg' },
    ],
    toner: [
      { id: 2501, name: '保湿爽肤水', price: 22.99, image: '/skincare/toner.jpg' },
      { id: 2502, name: '祛痘调理水', price: 19.99, image: '/skincare/acnetoner.jpg' },
    ],
    moisturizer: [
      { id: 2601, name: '保湿面霜', price: 32.99, image: '/skincare/moisturizer.jpg' },
      { id: 2602, name: '眼霜', price: 27.99, image: '/skincare/eycream.jpg' },
    ],
    mask: [{ id: 2701, name: '片状面膜（10片）', price: 15.99, image: '/skincare/sheetmask.jpg' }],
  };

  // ---------- 辅助函数：根据主分类和子分类获取商品列表 ----------
  function getCurrentProducts(): Product[] {
    if (mainCategory === 'fashion' && subCategory && productsByFashionSubCategory[subCategory]) {
      return productsByFashionSubCategory[subCategory];
    }
    if (mainCategory === 'auto' && subCategory && productsByAutoSubCategory[subCategory]) {
      return productsByAutoSubCategory[subCategory];
    }
    if (mainCategory === 'pet' && subCategory && productsByPetSubCategory[subCategory]) {
      return productsByPetSubCategory[subCategory];
    }
    if (mainCategory === 'shoes' && subCategory && productsByShoesSubCategory[subCategory]) {
      return productsByShoesSubCategory[subCategory];
    }
    if (mainCategory === 'muslim' && subCategory && productsByMuslimSubCategory[subCategory]) {
      return productsByMuslimSubCategory[subCategory];
    }
    if (mainCategory === 'cosmetics' && subCategory && productsByCosmeticsSubCategory[subCategory]) {
      return productsByCosmeticsSubCategory[subCategory];
    }
    if (mainCategory === 'skincare' && subCategory && productsBySkincareSubCategory[subCategory]) {
      return productsBySkincareSubCategory[subCategory];
    }
    return [];
  }

  // 获取子分类显示名称
  function getSubCategoryName(): string {
    const subsMap: Record<string, { id: string; name: string; icon?: string }[]> = {
      fashion: fashionSubs,
      auto: autoSubs,
      pet: petSubs,
      shoes: shoesSubs,
      muslim: muslimSubs,
      cosmetics: cosmeticsSubs,
      skincare: skincareSubs,
    };
    const subs = subsMap[mainCategory];
    if (subs) {
      return subs.find((s) => s.id === subCategory)?.name || '';
    }
    return '';
  }

  // ---------- 渲染分类概览页（显示所有子分类及其商品）----------
  const renderCategoryOverview = (
    mainCatId: string,
    subs: { id: string; name: string; icon: string }[],
    productsMap: Record<string, Product[]>
  ) => {
    return (
      <div>
        <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '30px' }}>
          {navCategories.find((c) => c.id === mainCatId)?.name} 全部分类
        </h2>
        {subs.map((sub) => {
          const products = productsMap[sub.id] || [];
          if (products.length === 0) return null;
          return (
            <div key={sub.id} style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{sub.icon}</span> {sub.name}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {products.map((product) => (
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
                    <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>{product.name}</h4>
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
          );
        })}
      </div>
    );
  };

  // ---------- 渲染内容主体 ----------
  const renderContent = () => {
    // 首页
    if (mainCategory === 'home') {
      return (
        <div>
          {/* 原有的两个卡片 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
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
                onClick={() => handleMainClick('why')}
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
                onClick={() => handleMainClick('best')}
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

          {/* 新增的优惠图片 */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <img
              src="/images/offer.jpg" // 请将图片放在 public/images/offer.jpg
              alt="New Customer Offer: 20% OFF + FREE SHIPPING"
              style={{ maxWidth: '100%', borderRadius: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              onClick={() => handleMainClick('offer')}
            />
          </div>
        </div>
      );
    }

    // Why Us 页面
    if (mainCategory === 'why') {
      return (
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontSize: '48px', fontWeight: '900', fontStyle: 'italic', textAlign: 'center', marginBottom: '40px' }}>
            WE DID THE RESEARCH. <br />
            <span style={{ color: '#e11d48' }}>YOU DO THE PROFITING.</span>
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
                  onClick={() => handleMainClick('best')}
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
      );
    }

    // 新增的优惠页面
    if (mainCategory === 'offer') {
      return (
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <img
            src="/images/offer.jpg" // 同样使用该图片，也可以放大
            alt="New Customer Offer"
            style={{ width: '100%', borderRadius: '24px', marginBottom: '30px' }}
          />
          <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px' }}>🎉 新用户专享 🎉</h1>
          <p style={{ fontSize: '24px', color: '#e11d48', fontWeight: '700', marginBottom: '20px' }}>
            首单 20% 折扣 + 包邮
          </p>
          <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
            <p style={{ fontSize: '18px', color: '#4b5563' }}>优惠码：</p>
            <p style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '4px', color: '#1f2937' }}>CLAIMITNOW</p>
          </div>
          <button
            onClick={() => handleMainClick('best')}
            style={{
              background: '#e11d48',
              color: '#fff',
              border: 'none',
              padding: '16px 48px',
              borderRadius: '40px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            立即选购
          </button>
        </div>
      );
    }

    // 商品详情视图
    if (selectedProduct) {
      return (
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
      );
    }

    // 分类概览页（当主分类有子分类且未选中具体子分类时）
    if (mainCategory === 'fashion' && !subCategory) {
      return renderCategoryOverview('fashion', fashionSubs, productsByFashionSubCategory);
    }
    if (mainCategory === 'auto' && !subCategory) {
      return renderCategoryOverview('auto', autoSubs, productsByAutoSubCategory);
    }
    if (mainCategory === 'pet' && !subCategory) {
      return renderCategoryOverview('pet', petSubs, productsByPetSubCategory);
    }
    if (mainCategory === 'shoes' && !subCategory) {
      return renderCategoryOverview('shoes', shoesSubs, productsByShoesSubCategory);
    }
    if (mainCategory === 'muslim' && !subCategory) {
      return renderCategoryOverview('muslim', muslimSubs, productsByMuslimSubCategory);
    }
    if (mainCategory === 'cosmetics' && !subCategory) {
      return renderCategoryOverview('cosmetics', cosmeticsSubs, productsByCosmeticsSubCategory);
    }
    if (mainCategory === 'skincare' && !subCategory) {
      return renderCategoryOverview('skincare', skincareSubs, productsBySkincareSubCategory);
    }

    // 其他分类（如 best, new 等）无子分类，显示占位
    if (!subCategory) {
      return (
        <div style={{ textAlign: 'center', padding: '100px 0' }}>
          <h2 style={{ fontSize: '40px', fontWeight: '900' }}>{navCategories.find((c) => c.id === mainCategory)?.name || mainCategory.toUpperCase()}</h2>
          <p style={{ color: '#9ca3af', marginTop: '20px' }}>该分类暂无具体子分类，请从导航栏选择</p>
        </div>
      );
    }

    // 有具体子分类时，显示该子分类的商品列表
    const products = getCurrentProducts();
    return (
      <div>
        <button
          onClick={() => setSubCategory(null)}
          style={{ marginBottom: '20px', color: '#e11d48', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          ← 返回 {navCategories.find((c) => c.id === mainCategory)?.name} 全部分类
        </button>
        <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '20px' }}>{getSubCategoryName()}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {products.map((product) => (
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
    );
  };

  // ---------- 渲染整体页面 ----------
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', color: '#1a1a1a', fontFamily: 'sans-serif' }}>
      {/* 顶部红色条 */}
      <div style={{ backgroundColor: '#e11d48', padding: '10px 0', color: '#ffffff', textAlign: 'center', fontWeight: '900', fontSize: '12px' }}>
        WE DID THE RESEARCH. YOU DO THE PROFITING.
      </div>

      {/* Header 第一行：Logo + 搜索 + 用户操作 */}
      <header style={{ borderBottom: '1px solid #f3f4f6', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={goHome}>
            <img src="/logo.png" alt="HessMart" style={{ height: '50px', width: 'auto' }} />
          </div>

          {/* 搜索框 */}
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

          {/* 用户操作 */}
          <div style={{ display: 'flex', gap: '24px', fontSize: '11px', fontWeight: '700', color: '#9ca3af' }}>
            <span>👤 LOGIN</span>
            <span>ACCOUNT</span>
            <span>CART (0)</span>
          </div>
        </div>
      </header>

      {/* Header 第二行：纯文字导航 + 图片图标 */}
      <div style={{ borderBottom: '1px solid #f3f4f6', padding: '0 24px', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', position: 'relative' }}>
            <span style={{ color: '#d1d5db', padding: '0 10px', fontSize: '20px' }}>☰</span>

            {navCategories.map((cat) => (
              <div
                key={cat.id}
                style={{ position: 'relative' }}
                onMouseEnter={() => cat.subCategories && setHoveredCat(cat.id)}
                onMouseLeave={() => {
                  setHoveredCat(null);
                  setHoveredSub(null);
                }}
              >
                <button
                  onClick={() => handleMainClick(cat.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '16px 12px',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: mainCategory === cat.id ? '#e11d48' : '#4b5563',
                    borderBottom: mainCategory === cat.id ? '2px solid #e11d48' : '2px solid transparent',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  <img src={cat.icon} alt={cat.name} style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
                  {cat.name}
                </button>

                {/* 下拉菜单 - 有子分类且悬停时显示 */}
                {hoveredCat === cat.id && cat.subCategories && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      backgroundColor: '#fff',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                      borderRadius: '8px',
                      padding: '12px 0',
                      minWidth: '180px',
                      zIndex: 20,
                    }}
                  >
                    {cat.subCategories.map((sub) => {
                      // 获取该子分类下的商品列表
                      let productList: Product[] = [];
                      if (cat.id === 'fashion') productList = productsByFashionSubCategory[sub.id] || [];
                      else if (cat.id === 'auto') productList = productsByAutoSubCategory[sub.id] || [];
                      else if (cat.id === 'pet') productList = productsByPetSubCategory[sub.id] || [];
                      else if (cat.id === 'shoes') productList = productsByShoesSubCategory[sub.id] || [];
                      else if (cat.id === 'muslim') productList = productsByMuslimSubCategory[sub.id] || [];
                      else if (cat.id === 'cosmetics') productList = productsByCosmeticsSubCategory[sub.id] || [];
                      else if (cat.id === 'skincare') productList = productsBySkincareSubCategory[sub.id] || [];

                      return (
                        <div
                          key={sub.id}
                          style={{ position: 'relative' }}
                          onMouseEnter={() => setHoveredSub(sub.id)}
                          onMouseLeave={() => setHoveredSub(null)}
                        >
                          <div
                            onClick={() => handleSubClick(cat.id, sub.id)}
                            style={{
                              padding: '8px 20px',
                              fontSize: '13px',
                              fontWeight: '500',
                              color: '#1f2937',
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              backgroundColor: hoveredSub === sub.id ? '#f3f4f6' : 'transparent',
                            }}
                          >
                            {sub.name}
                          </div>

                          {/* 二级菜单：显示商品名称列表 */}
                          {hoveredSub === sub.id && productList.length > 0 && (
                            <div
                              style={{
                                position: 'absolute',
                                left: '100%',
                                top: 0,
                                backgroundColor: '#fff',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                borderRadius: '8px',
                                padding: '12px',
                                minWidth: '220px',
                                maxWidth: '300px',
                                zIndex: 30,
                              }}
                            >
                              <h4 style={{ fontSize: '12px', fontWeight: '700', marginBottom: '8px', color: '#e11d48' }}>
                                {sub.name} 商品
                              </h4>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '300px', overflowY: 'auto' }}>
                                {productList.slice(0, 8).map((product) => (
                                  <li
                                    key={product.id}
                                    style={{
                                      padding: '6px 8px',
                                      fontSize: '12px',
                                      color: '#4b5563',
                                      borderBottom: '1px solid #f3f4f6',
                                      cursor: 'pointer',
                                      whiteSpace: 'normal',
                                      wordBreak: 'break-word',
                                    }}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setSelectedProduct(product);
                                      setHoveredCat(null);
                                      setHoveredSub(null);
                                      window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9fafb')}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                                  >
                                    {product.name}
                                  </li>
                                ))}
                              </ul>
                              {productList.length > 8 && (
                                <div style={{ padding: '6px 8px', fontSize: '11px', color: '#9ca3af', textAlign: 'center' }}>
                                  还有 {productList.length - 8} 件商品...
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 右侧图片链接 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '1px', height: '30px', backgroundColor: '#eee' }}></div>
            <img
              src="/pick.png"
              alt="Cart & Profit"
              onClick={() => handleMainClick('why')}
              style={{ height: '60px', width: 'auto', cursor: 'pointer' }}
            />
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px' }}>{renderContent()}</main>
    </div>
  );
}