interface HomePageProps {
  onMainClick: (catId: string) => void;
}

export default function HomePage({ onMainClick }: HomePageProps) {
  return (
    <div>
      {/* Existing two cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '40px' }}>
        <div
          style={{
            gridColumn: '2 / 3',
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
            onClick={() => onMainClick('why')}
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
            gridColumn: '3 / 4',
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
            onClick={() => onMainClick('best')}
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

      {/* New offer image */}
      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <img
          src="/images/offer.jpg"
          alt="New Customer Offer: 20% OFF + FREE SHIPPING"
          style={{ width: '72%', maxWidth: '760px', borderRadius: '16px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', display: 'block', margin: '0 auto' }}
          onClick={() => onMainClick('offer')}
        />
      </div>
    </div>
  );
}
