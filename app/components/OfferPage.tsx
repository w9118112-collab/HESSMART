interface OfferPageProps {
  onMainClick: (catId: string) => void;
}

export default function OfferPage({ onMainClick }: OfferPageProps) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <img
        src="/images/offer.jpg"
        alt="New Customer Offer"
        style={{ width: '100%', borderRadius: '24px', marginBottom: '30px' }}
      />
      <h1 style={{ fontSize: '48px', fontWeight: '900', marginBottom: '20px' }}>🎉 New Customer Exclusive 🎉</h1>
      <p style={{ fontSize: '24px', color: '#e11d48', fontWeight: '700', marginBottom: '20px' }}>
        20% off first order + free shipping
      </p>
      <div style={{ background: '#f3f4f6', padding: '20px', borderRadius: '12px', marginBottom: '30px' }}>
        <p style={{ fontSize: '18px', color: '#4b5563' }}>Promo code:</p>
        <p style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '4px', color: '#1f2937' }}>CLAIMITNOW</p>
      </div>
      <button
        onClick={() => onMainClick('best')}
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
        Shop now
      </button>
    </div>
  );
}
