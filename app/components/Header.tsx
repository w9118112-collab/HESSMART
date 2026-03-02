interface HeaderProps {
  onGoHome: () => void;
}

export default function Header({ onGoHome }: HeaderProps) {
  return (
    <header style={{ borderBottom: '1px solid #f3f4f6', padding: '20px 24px' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={onGoHome}>
          <img src="/logo.png" alt="HessMart" style={{ height: '50px', width: 'auto' }} />
        </div>

        {/* Search box */}
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

        {/* User actions */}
        <div style={{ display: 'flex', gap: '24px', fontSize: '11px', fontWeight: '700', color: '#9ca3af' }}>
          <span>👤 LOGIN</span>
          <span>ACCOUNT</span>
          <span>CART (0)</span>
        </div>
      </div>
    </header>
  );
}
