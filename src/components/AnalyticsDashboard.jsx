import { useState } from 'react';
import { theme } from '../styles/theme';
import { getAnalyticsInsights, getDaysSinceLastWear } from '../utils/wardrobe-analytics';

export function AnalyticsDashboard({ analytics, wardrobe }) {
  const insights = getAnalyticsInsights(analytics, wardrobe);

  return (
    <div style={{ paddingBottom: '40px' }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.colors.primary} 0%, #4a2c5e 100%)`,
        color: theme.colors.white,
        padding: '40px',
        borderRadius: '15px',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontFamily: theme.fonts.heading,
          fontSize: '48px',
          margin: '0 0 10px 0'
        }}>
          Your Wardrobe Intelligence
        </h1>
        <p style={{ fontSize: '16px', margin: 0, opacity: 0.9 }}>
          Discover how you style
        </p>
      </div>

      {/* Key Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <StatCard 
          title="Outfit Combinations" 
          value={insights.totalCombos} 
          subtitle="unique looks created"
        />
        <StatCard 
          title="Total Wears" 
          value={insights.totalWears} 
          subtitle="outfits worn"
        />
        <StatCard 
          title="Active Pieces" 
          value={wardrobe.length} 
          subtitle="items in wardrobe"
        />
        <StatCard 
          title="Utilization" 
          value={`${insights.wearingPercentage}%`} 
          subtitle="wardrobe usage"
        />
      </div>

      {/* Underutilized Items */}
      {insights.underutilized.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontFamily: theme.fonts.heading,
            color: theme.colors.primary,
            fontSize: '28px',
            marginBottom: '20px'
          }}>
            ⚠️ Underutilized Pieces
          </h2>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            You own these items but rarely wear them. Consider styling them differently!
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: '15px'
          }}>
            {insights.underutilized.slice(0, 6).map(item => (
              <ItemCard key={item.id} item={item} analytics={analytics} />
            ))}
          </div>
        </div>
      )}

      {/* Recent Wears */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontFamily: theme.fonts.heading,
          color: theme.colors.primary,
          fontSize: '28px',
          marginBottom: '20px'
        }}>
          📅 Recently Worn
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: '15px'
        }}>
          {insights.recentWears.map(item => (
            <div
              key={item.name}
              style={{
                backgroundColor: theme.colors.gray,
                padding: '20px',
                borderRadius: '12px',
                border: `2px solid ${theme.colors.primary}`,
                textAlign: 'center'
              }}
            >
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16),
                margin: '0 auto 15px'
              }} />
              <p style={{ fontWeight: 'bold', color: theme.colors.primary, margin: '0 0 5px 0' }}>
                {item.name}
              </p>
              <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
                {getDaysSinceLastWear(item.lastWorn)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights */}
      <div style={{
        background: `linear-gradient(135deg, ${theme.colors.primary}20 0%, ${theme.colors.accent}10 100%)`,
        border: `2px solid ${theme.colors.primary}`,
        borderRadius: '12px',
        padding: '25px'
      }}>
        <h3 style={{ fontFamily: theme.fonts.heading, color: theme.colors.primary, marginTop: 0 }}>
          💡 AI Insights
        </h3>
        <ul style={{ color: '#666', lineHeight: '1.8', paddingLeft: '20px' }}>
          <li>You own <strong>{insights.totalCombos}</strong> outfit combinations</li>
          <li>Your most worn piece has been worn <strong>{Math.max(...Object.values(analytics.itemWears).map(i => i.count || 0))}</strong> times</li>
          {insights.underutilized.length > 0 && (
            <li>You have <strong>{insights.underutilized.length}</strong> pieces that deserve more love</li>
          )}
          <li>Try mixing pieces from different combinations for fresh looks!</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div style={{
      backgroundColor: theme.colors.gray,
      border: `3px solid ${theme.colors.accent}`,
      borderRadius: '12px',
      padding: '25px',
      textAlign: 'center'
    }}>
      <p style={{ color: '#666', margin: '0 0 10px 0', fontSize: '14px' }}>
        {title}
      </p>
      <p style={{
        fontFamily: theme.fonts.heading,
        fontSize: '42px',
        color: theme.colors.primary,
        margin: '10px 0',
        fontWeight: 'bold'
      }}>
        {value}
      </p>
      <p style={{ color: '#999', margin: 0, fontSize: '12px' }}>
        {subtitle}
      </p>
    </div>
  );
}

function ItemCard({ item, analytics }) {
  const wears = analytics.itemWears[item.id]?.count || 0;
  const lastWorn = analytics.itemWears[item.id]?.lastWorn;

  return (
    <div style={{
      backgroundColor: theme.colors.gray,
      border: `2px solid #ff6b6b`,
      borderRadius: '10px',
      padding: '15px',
      textAlign: 'center'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        backgroundColor: item.color,
        margin: '0 auto 10px',
        border: `3px solid ${theme.colors.primary}`
      }} />
      <p style={{ fontWeight: 'bold', color: theme.colors.primary, margin: '0 0 5px 0', fontSize: '14px' }}>
        {item.name}
      </p>
      <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>
        Worn {wears}x
      </p>
      {lastWorn && (
        <p style={{ fontSize: '11px', color: '#999', margin: '5px 0 0 0' }}>
          {getDaysSinceLastWear(lastWorn)}
        </p>
      )}
    </div>
  );
}