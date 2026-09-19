// Fashion Knowledge Base for MIHOVA AI
// This is the brain that powers intelligent recommendations

export const fashionKnowledge = {
  // Color Psychology & Combinations
  colorTheory: {
    colors: {
      black: {
        psychology: 'Elegant, powerful, slimming',
        occasions: ['formal', 'work', 'evening'],
        seasons: ['winter', 'fall'],
        bodyTypes: ['all'],
        complements: ['gold', 'silver', 'white', 'red', 'navy']
      },
      white: {
        psychology: 'Clean, fresh, pure',
        occasions: ['casual', 'summer', 'formal'],
        seasons: ['summer', 'spring'],
        bodyTypes: ['all'],
        complements: ['black', 'navy', 'pastels', 'earth tones']
      },
      navy: {
        psychology: 'Professional, trustworthy, slimming',
        occasions: ['work', 'formal', 'casual'],
        seasons: ['winter', 'fall'],
        bodyTypes: ['all'],
        complements: ['white', 'gold', 'cream', 'red', 'gray']
      },
      gold: {
        psychology: 'Luxurious, warm, confidence',
        occasions: ['evening', 'party', 'formal'],
        seasons: ['winter', 'fall'],
        bodyTypes: ['all'],
        complements: ['black', 'navy', 'burgundy', 'cream', 'brown']
      },
      pastels: {
        psychology: 'Soft, approachable, dreamy',
        occasions: ['casual', 'spring', 'summer'],
        seasons: ['spring', 'summer'],
        bodyTypes: ['all'],
        complements: ['white', 'pastels', 'gold', 'silver']
      },
      earth_tones: {
        psychology: 'Grounded, natural, warm',
        occasions: ['casual', 'outdoor', 'creative'],
        seasons: ['fall', 'spring'],
        bodyTypes: ['all'],
        complements: ['white', 'black', 'cream', 'gold']
      },
      jewel_tones: {
        psychology: 'Rich, sophisticated, bold',
        occasions: ['evening', 'party', 'formal'],
        seasons: ['winter'],
        bodyTypes: ['all'],
        complements: ['gold', 'silver', 'black', 'white', 'cream']
      }
    }
  },

  // Occasion Types
  occasions: {
    work: {
      description: 'Professional office environment',
      outfit_requirements: ['structured', 'polished', 'appropriate_length'],
      recommended_colors: ['navy', 'black', 'white', 'gray', 'earth_tones'],
      avoid_colors: ['bright_neon'],
      item_types: ['blazer', 'dress_pants', 'neutral_top', 'closed_shoes'],
      formality: 'high'
    },
    casual: {
      description: 'Relaxed everyday wear',
      outfit_requirements: ['comfortable', 'casual_fit'],
      recommended_colors: ['pastels', 'earth_tones', 'jeans_blue', 'white', 'black'],
      avoid_colors: ['none'],
      item_types: ['jeans', 't_shirt', 'casual_top', 'sneakers'],
      formality: 'low'
    },
    formal: {
      description: 'Black tie, evening, special events',
      outfit_requirements: ['elegant', 'structured', 'luxurious'],
      recommended_colors: ['black', 'navy', 'gold', 'jewel_tones'],
      avoid_colors: ['casual_prints'],
      item_types: ['evening_dress', 'tuxedo', 'heels', 'dress_shoes'],
      formality: 'very_high'
    },
    party: {
      description: 'Social gatherings, celebrations',
      outfit_requirements: ['fun', 'fashionable', 'statement_piece'],
      recommended_colors: ['jewel_tones', 'gold', 'bold_colors', 'metallics'],
      avoid_colors: ['dull_neutrals'],
      item_types: ['dress', 'fashion_top', 'accessories', 'heels_sandals'],
      formality: 'medium'
    },
    outdoor: {
      description: 'Outdoor activities, nature',
      outfit_requirements: ['practical', 'comfortable', 'weather_appropriate'],
      recommended_colors: ['earth_tones', 'white', 'pastels', 'denim'],
      avoid_colors: ['none'],
      item_types: ['athletic_wear', 'sneakers', 'comfortable_bottoms'],
      formality: 'low'
    },
    date: {
      description: 'Romantic outing',
      outfit_requirements: ['flattering', 'confident', 'slightly_dressy'],
      recommended_colors: ['jewel_tones', 'pastels', 'gold', 'red'],
      avoid_colors: ['overly_casual'],
      item_types: ['dress', 'nice_top', 'jeans_or_skirt', 'nice_shoes'],
      formality: 'medium'
    },
    interview: {
      description: 'Job interview',
      outfit_requirements: ['professional', 'polished', 'confident'],
      recommended_colors: ['navy', 'black', 'gray', 'white'],
      avoid_colors: ['bright_colors', 'casual_prints'],
      item_types: ['blazer', 'dress_pants_skirt', 'conservative_top', 'dress_shoes'],
      formality: 'very_high'
    }
  },

  // Weather-Based Recommendations
  weather: {
    sunny: {
      description: 'Bright, hot day',
      outfit_adjustments: ['lightweight', 'breathable', 'sun_protection'],
      recommended_items: ['light_colors', 'summer_dress', 'sunglasses', 'hat'],
      avoid_items: ['heavy_sweaters', 'long_layers'],
      fabric_types: ['cotton', 'linen', 'silk']
    },
    rainy: {
      description: 'Wet, cool conditions',
      outfit_adjustments: ['waterproof', 'layered', 'practical'],
      recommended_items: ['raincoat', 'umbrella', 'waterproof_shoes', 'layers'],
      avoid_items: ['open_shoes', 'delicate_fabrics'],
      fabric_types: ['waterproof', 'quick_dry', 'durable']
    },
    cold: {
      description: 'Freezing weather',
      outfit_adjustments: ['layered', 'insulating', 'protective'],
      recommended_items: ['winter_coat', 'sweater', 'boots', 'scarf', 'gloves'],
      avoid_items: ['sleeveless', 'thin_fabrics'],
      fabric_types: ['wool', 'fleece', 'insulated']
    },
    warm: {
      description: 'Cool but not cold',
      outfit_adjustments: ['layerable', 'versatile'],
      recommended_items: ['cardigan', 'light_jacket', 'long_sleeves', 'comfortable_shoes'],
      avoid_items: ['too_heavy'],
      fabric_types: ['cotton', 'lightweight_knit']
    }
  },

  // Body Type Guidance
  bodyTypes: {
    pear: {
      name: 'Pear Shape',
      description: 'Wider hips than shoulders',
      flattering_styles: ['dark_bottoms', 'bright_tops', 'a_line_skirts', 'wide_leg_pants'],
      avoid_styles: ['tight_bottoms', 'pattern_bottoms', 'clingy_fabrics'],
      colors: ['top: bright/jewel_tones', 'bottom: dark/neutral'],
      emphasis: 'draw attention to upper body'
    },
    apple: {
      name: 'Apple Shape',
      description: 'Fuller midsection',
      flattering_styles: ['wrap_dresses', 'flowing_tops', 'dark_middles', 'structured_jackets'],
      avoid_styles: ['tight_middles', 'horizontal_stripes', 'cropped'],
      colors: ['avoid: light_middles', 'prefer: vertical_lines'],
      emphasis: 'define waist, elongate'
    },
    hourglass: {
      name: 'Hourglass Shape',
      description: 'Balanced curves',
      flattering_styles: ['fitted_clothes', 'wrap_dresses', 'belted_styles', 'defined_waist'],
      avoid_styles: ['oversized', 'boxy'],
      colors: ['anything works'],
      emphasis: 'show off curves with fitted silhouettes'
    },
    rectangle: {
      name: 'Rectangle Shape',
      description: 'Similar width shoulders and hips',
      flattering_styles: ['peplum', 'ruching', 'layers', 'defined_waist'],
      avoid_styles: ['straight_cuts'],
      colors: ['create_curves_with_patterns'],
      emphasis: 'create curves and definition'
    },
    triangle: {
      name: 'Triangle Shape',
      description: 'Wider shoulders than hips',
      flattering_styles: ['wide_leg_pants', 'flared_skirts', 'dark_tops', 'light_bottoms'],
      avoid_styles: ['shoulder_emphasis', 'tight_bottoms'],
      colors: ['top: dark', 'bottom: light/bright'],
      emphasis: 'balance by emphasizing lower body'
    }
  },

  // Seasonal Trends
  seasons: {
    spring: {
      colors: ['pastels', 'light_colors', 'white', 'earth_tones'],
      fabrics: ['cotton', 'linen', 'lightweight'],
      items: ['light_jacket', 'flowy_dress', 'sandals', 'denim'],
      mood: 'Fresh, light, renewal'
    },
    summer: {
      colors: ['bright_colors', 'white', 'pastels', 'bold_tones'],
      fabrics: ['cotton', 'linen', 'silk', 'breathable'],
      items: ['sundress', 'shorts', 'sandals', 'sunglasses'],
      mood: 'Carefree, vibrant, minimal'
    },
    fall: {
      colors: ['earth_tones', 'gold', 'burgundy', 'dark_tones'],
      fabrics: ['wool', 'cotton', 'leather', 'suede'],
      items: ['sweater', 'boots', 'jacket', 'layers'],
      mood: 'Warm, cozy, sophisticated'
    },
    winter: {
      colors: ['jewel_tones', 'black', 'navy', 'gold', 'white'],
      fabrics: ['wool', 'fleece', 'cashmere', 'insulated'],
      items: ['coat', 'sweater', 'boots', 'scarf', 'gloves'],
      mood: 'Rich, luxe, warm tones'
    }
  },

  // Style DNA to Recommendations
  styleDNAGuide: {
    classic: {
      name: 'Classic Elegance',
      characteristics: ['timeless', 'structured', 'quality', 'polished'],
      recommended_occasions: ['work', 'formal', 'date'],
      recommended_colors: ['navy', 'black', 'white', 'cream', 'gold'],
      recommended_items: ['blazer', 'tailored_pants', 'classic_dress', 'structured_bags'],
      avoid_trends: ['overly_bold', 'loud_patterns']
    },
    minimalist: {
      name: 'Minimalist Chic',
      characteristics: ['simple', 'functional', 'clean_lines', 'essentials'],
      recommended_occasions: ['work', 'casual', 'everyday'],
      recommended_colors: ['neutrals', 'monochrome', 'one_accent'],
      recommended_items: ['plain_tees', 'tailored_trousers', 'neutral_palette'],
      avoid_trends: ['too_many_colors', 'excessive_accessories']
    },
    bold: {
      name: 'Bold Trendsetter',
      characteristics: ['experimental', 'playful', 'confident', 'fashion_forward'],
      recommended_occasions: ['party', 'casual', 'creative_events'],
      recommended_colors: ['jewel_tones', 'bright_colors', 'bold_patterns'],
      recommended_items: ['statement_piece', 'bold_prints', 'fashion_accessories'],
      avoid_trends: ['boring_basics']
    },
    bohemian: {
      name: 'Bohemian Spirit',
      characteristics: ['eclectic', 'artistic', 'relaxed', 'unique'],
      recommended_occasions: ['casual', 'outdoor', 'creative'],
      recommended_colors: ['earth_tones', 'warm_colors', 'jewel_tones'],
      recommended_items: ['flowy_dress', 'layered_jewelry', 'comfortable_sandals'],
      avoid_trends: ['too_structured', 'overly_formal']
    }
  },

  // Smart Combination Rules
  combinationRules: {
    color_harmony: [
      { rule: 'Monochromatic', description: 'Different shades of same color' },
      { rule: 'Complementary', description: 'Opposite colors on color wheel' },
      { rule: 'Analogous', description: 'Colors next to each other' },
      { rule: 'Triadic', description: 'Three colors evenly spaced' }
    ],
    style_balance: [
      { rule: 'fitted_top_loose_bottom', description: 'Balance proportions' },
      { rule: 'bold_top_neutral_bottom', description: 'Let statement shine' },
      { rule: 'simple_statement_piece', description: 'One hero item' }
    ]
  }
};

// AI Recommendation Function
export function generateFashionRecommendation(userProfile, occasion, weather, wardrobe) {
  const knowledge = fashionKnowledge;
  const recommendations = {
    colors: [],
    items: [],
    styles: [],
    tips: [],
    score: 0
  };

  // Get occasion requirements
  if (knowledge.occasions[occasion]) {
    recommendations.colors = knowledge.occasions[occasion].recommended_colors;
    recommendations.styles = knowledge.occasions[occasion].outfit_requirements;
  }

  // Apply weather adjustments
  if (knowledge.weather[weather]) {
    recommendations.items = knowledge.weather[weather].recommended_items;
  }

  // Apply body type guidance
  if (userProfile.bodyType && knowledge.bodyTypes[userProfile.bodyType]) {
    const bodyGuide = knowledge.bodyTypes[userProfile.bodyType];
    recommendations.tips.push(`Flattering styles: ${bodyGuide.flattering_styles.join(', ')}`);
  }

  // Apply style DNA
  if (userProfile.styleDNA && knowledge.styleDNAGuide[userProfile.styleDNA]) {
    const styleGuide = knowledge.styleDNAGuide[userProfile.styleDNA];
    recommendations.tips.push(`Your style: ${styleGuide.characteristics.join(', ')}`);
  }

  // Calculate confidence score
  recommendations.score = Math.min(100, 
    (recommendations.colors.length * 15) + 
    (recommendations.items.length * 10) + 
    (recommendations.styles.length * 20)
  );

  return recommendations;
}