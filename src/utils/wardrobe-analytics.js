// Track outfit wears and dates
export const initializeAnalytics = () => {
  return {
    outfitWears: {}, // outfitId: { count: 5, lastWorn: "2026-09-12" }
    itemWears: {}, // itemId: { count: 10, lastWorn: "2026-09-10" }
  };
};

export const recordWear = (analytics, outfitItems) => {
  const today = new Date().toISOString().split('T')[0];
  
  // Create outfit ID
  const outfitId = Object.values(outfitItems)
    .filter(item => item)
    .map(item => item.id)
    .sort()
    .join('-');

  // Update outfit wears
  if (!analytics.outfitWears[outfitId]) {
    analytics.outfitWears[outfitId] = { count: 0, lastWorn: null, items: outfitItems };
  }
  analytics.outfitWears[outfitId].count += 1;
  analytics.outfitWears[outfitId].lastWorn = today;

  // Update item wears
  Object.values(outfitItems).forEach(item => {
    if (item) {
      if (!analytics.itemWears[item.id]) {
        analytics.itemWears[item.id] = { count: 0, lastWorn: null, name: item.name };
      }
      analytics.itemWears[item.id].count += 1;
      analytics.itemWears[item.id].lastWorn = today;
    }
  });

  return analytics;
};

export const getAnalyticsInsights = (analytics, wardrobe) => {
  const totalCombos = Object.keys(analytics.outfitWears).length;
  const totalWears = Object.values(analytics.outfitWears).reduce((sum, outfit) => sum + outfit.count, 0);
  
  // Find underutilized items (owned but rarely worn)
  const underutilized = wardrobe.filter(item => {
    const wears = analytics.itemWears[item.id]?.count || 0;
    return wears < 3;
  });

  // Find favorite outfits (most worn)
  const favorites = Object.entries(analytics.outfitWears)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 3);

  // Find last worn items
  const recentWears = Object.values(analytics.itemWears)
    .sort((a, b) => new Date(b.lastWorn) - new Date(a.lastWorn))
    .slice(0, 5);

  return {
    totalCombos,
    totalWears,
    underutilized,
    favorites,
    recentWears,
    wearingPercentage: Math.round((totalWears / (wardrobe.length * 5)) * 100) // Rough estimate
  };
};

export const getDaysSinceLastWear = (lastWornDate) => {
  if (!lastWornDate) return '∞';
  const today = new Date();
  const lastWorn = new Date(lastWornDate);
  const days = Math.floor((today - lastWorn) / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Today';
  if (days === 1) return 'Yesterday';
  return `${days} days ago`;
};