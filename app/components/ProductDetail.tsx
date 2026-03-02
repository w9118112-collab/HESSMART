import { useState } from 'react';
import { Product } from '../types';
import { navCategories } from '../data/navCategories';
import { subsMap } from '../data/products';

interface ProductDetailProps {
  product: Product;
  mainCategory: string;
  subCategory: string | null;
  onBack: () => void;
  onChangeImage: (product: Product) => void;
}

export default function ProductDetail({ product, mainCategory, subCategory, onBack, onChangeImage }: ProductDetailProps) {
  const mainCategoryName = navCategories.find((cat) => cat.id === mainCategory)?.name || mainCategory;
  const subCategoryName = subCategory ? subsMap[mainCategory]?.find((sub) => sub.id === subCategory)?.name || subCategory : null;
  const thumbs = product.images && product.images.length > 0 ? product.images : [product.image];
  const previewBase = Array.from(new Set([product.image, ...thumbs]));
  const previewImages = [...previewBase, ...previewBase, ...previewBase].slice(0, 3);
  const styleOptions = [product.name, `${product.name} Classic`, `${product.name} Premium`];
  const packOptions = ['Single', `${thumbs.length}-Image Pack`, 'Bundle'];
  const [selectedStyle, setSelectedStyle] = useState(0);
  const [selectedPack, setSelectedPack] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '100%', background: '#fff', position: 'relative' }}>
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '16px',
          left: '24px',
          zIndex: 2,
          color: '#111827',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '600',
          padding: 0,
        }}
      >
        ← Back to products
      </button>
      <div style={{ display: 'flex', width: '100%', borderBottom: '2px solid #111827', minHeight: 'calc(100vh - 210px)' }}>
        <div style={{ width: '26%', borderRight: '2px solid #111827', display: 'flex', flexDirection: 'column', padding: '72px 12px 24px', gap: '12px' }}>
          {previewImages.map((img, index) => (
            <button
              key={`${img}-${index}`}
              onClick={() => onChangeImage({ ...product, image: img })}
              style={{
                width: '100%',
                minHeight: '300px',
                border: 'none',
                background: 'transparent',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: product.image === img ? 1 : 0.92,
              }}
            >
              <img
                src={img}
                alt={`${product.name}-${index + 1}`}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', display: 'block' }}
              />
            </button>
          ))}
        </div>
        <div style={{ width: '74%', display: 'grid', gridTemplateColumns: '1fr 280px' }}>
          <div style={{ padding: '28px 32px 28px' }}>
            <div style={{ color: '#6b7280', fontSize: '15px', marginBottom: '12px' }}>
              {mainCategoryName}
              {subCategoryName ? `  ›  ${subCategoryName}` : ''}
            </div>

            <h1 style={{ fontSize: '24px', fontWeight: 900, lineHeight: 1.18, margin: 0, color: '#111827' }}>{product.name}</h1>
            <div style={{ marginTop: '12px', marginBottom: '14px', display: 'inline-flex', alignItems: 'center', background: '#fef3c7', color: '#92400e', padding: '6px 10px', fontWeight: '700', fontSize: '18px' }}>
              {mainCategoryName} Best Sellers No.1
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#374151', fontSize: '18px', marginBottom: '14px' }}>
              <span style={{ fontWeight: '700' }}>5.0</span>
              <span style={{ color: '#dc2626' }}>★</span>
              <span>({thumbs.length * 13}) · Weekly sales 900+</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '42px', color: '#dc2626', fontWeight: '900', lineHeight: 1 }}>${product.price.toFixed(2)}</span>
              <span style={{ fontSize: '18px', color: '#4b5563' }}>${(product.price / Math.max(thumbs.length, 1)).toFixed(2)}/item</span>
              <span style={{ fontSize: '18px', color: '#6b7280', textDecoration: 'line-through' }}>${(product.price * 1.08).toFixed(2)}</span>
              <span style={{ fontSize: '18px', color: '#6b7280' }}>{Math.round((product.price / (product.price * 1.08)) * 100)}% off</span>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '22px', color: '#374151', marginBottom: '10px', fontWeight: '600' }}>Style</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {styleOptions.map((option, index) => (
                  <button
                    key={option}
                    onClick={() => setSelectedStyle(index)}
                    style={{
                      border: '1px solid #d1d5db',
                      background: selectedStyle === index ? '#111827' : '#fff',
                      color: selectedStyle === index ? '#fff' : '#374151',
                      fontSize: '16px',
                      padding: '10px 14px',
                      cursor: 'pointer',
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '22px', color: '#374151', marginBottom: '10px', fontWeight: '600' }}>Size</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {packOptions.map((option, index) => (
                  <button
                    key={option}
                    onClick={() => setSelectedPack(index)}
                    style={{
                      border: '1px solid #d1d5db',
                      background: selectedPack === index ? '#111827' : '#fff',
                      color: selectedPack === index ? '#fff' : '#111827',
                      fontSize: '16px',
                      padding: '10px 14px',
                      cursor: 'pointer',
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ fontSize: '18px', color: '#dc2626', fontWeight: '700' }}>
              Product ID {product.id}
            </div>
            {(product.detailedDescription || product.description) && (
              <p style={{ marginTop: '12px', fontSize: '16px', color: '#4b5563', lineHeight: 1.7 }}>
                {product.detailedDescription || product.description}
              </p>
            )}
          </div>

          <aside style={{ borderLeft: '1px solid #e5e7eb', padding: '34px 20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280', fontSize: '17px' }}>
              <span>Add to favorites</span>
              <span style={{ color: '#dc2626', fontSize: '20px' }}>♡</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '17px', color: '#111827', marginTop: '6px' }}>
              <span>Quantity</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <button style={{ border: 'none', background: 'none', fontSize: '28px', color: '#9ca3af' }}>−</button>
                <span>1</span>
                <button style={{ border: 'none', background: 'none', fontSize: '28px', color: '#dc2626' }}>+</button>
              </div>
            </div>
            <button
              style={{
                width: '100%',
                border: 'none',
                background: '#dc2626',
                color: '#fff',
                fontSize: '20px',
                fontWeight: '800',
                padding: '14px 0',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                alert('Added to cart (demo)');
              }}
            >
              Add to cart
            </button>
            <div style={{ border: '2px solid #111827', padding: '14px', fontSize: '16px', color: '#374151', lineHeight: 1.7 }}>
              <div style={{ marginBottom: '10px', fontWeight: 700 }}>Sold by HESSMART</div>
              <div>Deliver to walnut 91789</div>
              <div style={{ color: '#dc2626' }}>Estimated delivery: tomorrow</div>
              <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '14px', paddingTop: '14px' }}>
                <div>Free shipping over $49</div>
                <div>Easy returns</div>
                <div>Ships from local warehouse</div>
              </div>
            </div>
          </aside>
        </div>
      </div>

    </div>
  );
}
