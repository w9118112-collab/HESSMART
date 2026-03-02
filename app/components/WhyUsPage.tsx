interface WhyUsPageProps {
  onMainClick: (catId: string) => void;
}

export default function WhyUsPage({ onMainClick }: WhyUsPageProps) {
  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <p style={{ fontSize: '48px', fontWeight: '900', fontStyle: 'italic', textAlign: 'center', marginBottom: '40px' }}>
        WE DID THE RESEARCH. <br />
        <span style={{ color: '#e11d48' }}>YOU DO THE PROFITING.</span>
      </p>
      <div style={{ backgroundColor: '#fff', padding: '60px', borderRadius: '40px', border: '1px solid #eee' }}>
        <p style={{ fontSize: '26px', color: '#6b7280', fontStyle: 'italic', lineHeight: '1.5', marginBottom: '40px' }}>
          Starting or expanding your shop doesn't have to mean hours of product hunting. Our team has leveraged{' '}
          <strong>deep industry experience</strong> to select 1,000+ ready-to-sell winners products.
        </p>
        <div style={{ borderTop: '1px solid #eee', paddingTop: '40px' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '900' }}>
            YOUR FAST TRACK TO SUCCESS STARTS&nbsp;
            <span
              onClick={() => onMainClick('best')}
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
