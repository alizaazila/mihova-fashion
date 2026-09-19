// User Profile Management for MIHOVA
// Stores user preferences, style data, and learning

export const defaultUserProfile = {
  // Basic Info
  id: null, // Generated on first save
  name: 'User',
  createdAt: null,

  // Style DNA (from quiz)
  styleDNA: null, // 'classic', 'minimalist', 'bold', 'bohemian'
  styleDescription: null,

  // Body Type
  bodyType: null, // 'pear', 'apple', 'hourglass', 'rectangle', 'triangle'
  bodyTypeDescription: null,

  // Preferences
  preferences: {
    favoriteColors: [],
    avoidColors: [],
    favoriteOccasions: [],
    budgetLevel: 'balanced', // 'budget_friendly', 'balanced', 'premium'
    skinTone: null, // 'fair', 'medium', 'olive', 'deep'
  },

  // Wardrobe Stats
  wardrobeStats: {
    totalItems: 0,
    lastUpdated: null,
    mostWornColor: null,
    mostWornType: null,
  },

  // Favorite Outfits
  favoriteOutfits: [], // Array of outfit IDs

  // Learning Data (AI improvement)
  history: {
    outfitsCreated: 0,
    recommendationsLiked: [],
    recommendationsDisliked: [],
  },

  // Settings
  settings: {
    notifications: true,
    autoSave: true,
    dataCollection: true,
  }
};

// User Profile Manager Class
export class UserProfileManager {
  constructor() {
    this.profile = this.loadProfile();
  }

  // Load profile from localStorage
  loadProfile() {
    const saved = localStorage.getItem('mihova_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (error) {
        console.error('Error loading profile:', error);
        return { ...defaultUserProfile };
      }
    }
    return { ...defaultUserProfile };
  }

  // Save profile to localStorage
  saveProfile() {
    try {
      localStorage.setItem('mihova_user_profile', JSON.stringify(this.profile));
      return true;
    } catch (error) {
      console.error('Error saving profile:', error);
      return false;
    }
  }

  // Update style DNA from quiz
  updateStyleDNA(styleDNA, description) {
    this.profile.styleDNA = styleDNA;
    this.profile.styleDescription = description;
    this.saveProfile();
    return this.profile;
  }

  // Update body type
  updateBodyType(bodyType, description) {
    this.profile.bodyType = bodyType;
    this.profile.bodyTypeDescription = description;
    this.saveProfile();
    return this.profile;
  }

  // Update preferences
  updatePreferences(preferences) {
    this.profile.preferences = {
      ...this.profile.preferences,
      ...preferences
    };
    this.saveProfile();
    return this.profile;
  }

  // Add favorite outfit
  addFavoriteOutfit(outfitId) {
    if (!this.profile.favoriteOutfits.includes(outfitId)) {
      this.profile.favoriteOutfits.push(outfitId);
      this.saveProfile();
    }
    return this.profile.favoriteOutfits;
  }

  // Remove favorite outfit
  removeFavoriteOutfit(outfitId) {
    this.profile.favoriteOutfits = this.profile.favoriteOutfits.filter(id => id !== outfitId);
    this.saveProfile();
    return this.profile.favoriteOutfits;
  }

  // Record outfit creation
  recordOutfitCreated() {
    this.profile.history.outfitsCreated += 1;
    this.saveProfile();
  }

  // Record liked recommendation
  recordLikedRecommendation(recommendation) {
    this.profile.history.recommendationsLiked.push({
      id: recommendation.id,
      timestamp: new Date().toISOString()
    });
    this.saveProfile();
  }

  // Record disliked recommendation
  recordDislikedRecommendation(recommendation) {
    this.profile.history.recommendationsDisliked.push({
      id: recommendation.id,
      timestamp: new Date().toISOString()
    });
    this.saveProfile();
  }

  // Update wardrobe stats
  updateWardrobeStats(totalItems, mostWornColor, mostWornType) {
    this.profile.wardrobeStats = {
      totalItems,
      lastUpdated: new Date().toISOString(),
      mostWornColor,
      mostWornType
    };
    this.saveProfile();
  }

  // Get complete profile
  getProfile() {
    return this.profile;
  }

  // Get profile summary for display
  getProfileSummary() {
    return {
      name: this.profile.name,
      styleDNA: this.profile.styleDNA,
      bodyType: this.profile.bodyType,
      favoriteColors: this.profile.preferences.favoriteColors,
      outfitsCreated: this.profile.history.outfitsCreated,
      favoriteOutfits: this.profile.favoriteOutfits.length
    };
  }

  // Reset profile (start over)
  resetProfile() {
    this.profile = { ...defaultUserProfile };
    this.saveProfile();
    return this.profile;
  }

  // Export profile as JSON (for backup)
  exportProfile() {
    return JSON.stringify(this.profile, null, 2);
  }

  // Import profile from JSON
  importProfile(jsonString) {
    try {
      const imported = JSON.parse(jsonString);
      this.profile = { ...this.profile, ...imported };
      this.saveProfile();
      return true;
    } catch (error) {
      console.error('Error importing profile:', error);
      return false;
    }
  }
}

// Singleton instance - use this everywhere
export const userProfile = new UserProfileManager();