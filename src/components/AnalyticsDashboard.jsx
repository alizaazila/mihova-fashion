import { theme } from '../styles/theme';

export function AnalyticsDashboard({ analytics = {}, wardrobe = [] }) {
  const stats = {
    totalItems: wardrobe.length,
    totalOutfits: Object.keys(analytics.outfitWears || {}).length,
    mostWorn: wardrobe.length > 0 ? wardrobe[0].name : 'N/A',
    utilization: Math.round((wardrobe.length / Math.max(wardrobe.length, 1)) * 100)
  };

  return (
    <div>
      <h1 style={{ fontFamily: theme.fonts.heading, color: theme.colors.white, fontSize: '42px', marginBottom: '30px' }}>📊 Analytics Dashboard</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <StatCard label="Total Items" value={stats.totalItems} icon="👗" />
        <StatCard label="Total Outfits" value={stats.totalOutfits} icon="✨" />
        <StatCard label="Most Worn" value={stats.mostWorn} icon="🏆" />
        <StatCard label="Utilization" value={`${stats.utilization}%`} icon="📈" />
      </div>

      <div style={{ background: theme.gradients.card, padding: '30px', borderRadius: '15px', boxShadow: theme.shadows.medium }}>
        <h2 style={{ color: theme.colors.primary, marginTop: 0 }}>📈 Wardrobe Overview</h2>
        <p style={{ color: '#666', lineHeight: '1.8' }}>
          You have <strong>{stats.totalItems}</strong> items in your wardrobe with <strong>{stats.totalOutfits}</strong> outfit combinations created so far.
        </p>
        <p style={{ color: theme.colors.accent, fontWeight: 'bold' }}>Keep exploring new combinations and MIHOVA will learn your style! 🎨</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div style={{ background: theme.gradients.card, padding: '25px', borderRadius: '12px', boxShadow: theme.shadows.medium, textAlign: 'center', border: `2px solid ${theme.colors.accent}` }}>
      <div style={{ fontSize: '36px', marginBottom: '10px' }}>{icon}</div>
      <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>{label}</p>
      <h3 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, margin: 0, fontSize: '32px' }}>{value}</h3>
    </div>
  );
}