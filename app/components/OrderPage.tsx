'use client';

import { useMemo } from 'react';
import { Product } from '../types';

interface OrderPageProps {
  products: Product[];
  onBack: () => void;
}

export default function OrderPage({ products, onBack }: OrderPageProps) {
  const total = useMemo(
    () => products.reduce((sum, item) => sum + Number(item.price || 0), 0),
    [products],
  );

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '18px 0 30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
        <h2 style={{ margin: 0, fontSize: '30px', fontWeight: 900, color: '#111827' }}>Checkout</h2>
        <button
          onClick={onBack}
          style={{
            border: '1px solid #d1d5db',
            background: '#fff',
            color: '#374151',
            borderRadius: '10px',
            padding: '8px 14px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          返回继续选品
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', background: '#fff', padding: '14px' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#4b5563', marginBottom: '12px' }}>
            已选商品 ({products.length})
          </div>
          <div style={{ display: 'grid', gap: '12px' }}>
            {products.map((p) => (
              <div
                key={p.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr auto',
                  gap: '10px',
                  alignItems: 'center',
                  border: '1px solid #f1f5f9',
                  borderRadius: '12px',
                  padding: '8px',
                }}
              >
                <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', background: '#f3f4f6' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#111827', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {p.name}
                  </div>
                  <div style={{ marginTop: '2px', fontSize: '12px', color: '#6b7280' }}>
                    Qty: 1
                  </div>
                </div>
                <div style={{ fontWeight: 800, color: '#be123c' }}>${Number(p.price).toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '16px', background: '#fff', padding: '16px', height: 'fit-content' }}>
          <div style={{ fontSize: '14px', fontWeight: 800, color: '#4b5563', marginBottom: '12px' }}>
            订单信息
          </div>
          <div style={{ display: 'grid', gap: '10px' }}>
            <input placeholder="收货人姓名" style={{ border: '1px solid #d1d5db', borderRadius: '10px', padding: '10px 12px', fontSize: '14px' }} />
            <input placeholder="手机号" style={{ border: '1px solid #d1d5db', borderRadius: '10px', padding: '10px 12px', fontSize: '14px' }} />
            <input placeholder="收货地址" style={{ border: '1px solid #d1d5db', borderRadius: '10px', padding: '10px 12px', fontSize: '14px' }} />
          </div>
          <div style={{ marginTop: '14px', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4b5563' }}>
              <span>小计</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#4b5563', marginTop: '6px' }}>
              <span>运费</span>
              <span>$0.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '16px', fontWeight: 900, color: '#111827' }}>
              <span>总计</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            style={{
              marginTop: '14px',
              width: '100%',
              border: 'none',
              borderRadius: '10px',
              padding: '11px 14px',
              background: 'linear-gradient(90deg, #e11d48, #be123c)',
              color: '#fff',
              fontSize: '14px',
              fontWeight: 800,
              cursor: 'pointer',
            }}
          >
            提交订单
          </button>
        </div>
      </div>
    </div>
  );
}
