/**
 * Utility functions to robustly extract and normalize detail page data
 * (inclusions, exclusions, add-ons, highlights) regardless of database key casing or object vs string formatting.
 */

export const getInclusionsList = (data) => {
  if (!data) return [];
  const raw = data.inclusions || data.costIncludes || data.includes || data.cost_includes || data.included || [];
  if (!Array.isArray(raw)) return [];
  return raw.map(item => {
    if (typeof item === 'string') return { title: item, description: '' };
    if (typeof item === 'object' && item !== null) {
      return {
        title: item.title || item.name || item.text || item.label || String(item),
        description: item.description || item.desc || item.details || ''
      };
    }
    return { title: String(item), description: '' };
  }).filter(item => item.title && item.title.trim() !== '');
};

export const getExclusionsList = (data) => {
  if (!data) return [];
  const raw = data.exclusions || data.costExcludes || data.excludes || data.cost_excludes || data.excluded || [];
  if (!Array.isArray(raw)) return [];
  return raw.map(item => {
    if (typeof item === 'string') return { title: item, description: '' };
    if (typeof item === 'object' && item !== null) {
      return {
        title: item.title || item.name || item.text || item.label || String(item),
        description: item.description || item.desc || item.details || ''
      };
    }
    return { title: String(item), description: '' };
  }).filter(item => item.title && item.title.trim() !== '');
};

export const getAddonsList = (data, isTrek = false) => {
  const custom = [];
  if (data) {
    const raw = data.addons || data.addOns || data.add_ons || data.extraOptions || data.optionalActivities || [];
    if (Array.isArray(raw)) {
      raw.forEach(item => {
        if (typeof item === 'string') {
          const priceMatch = item.match(/\(([^)]+)\)$/);
          const title = item.replace(/\s*\([^)]+\)$/, '').trim();
          const price = priceMatch ? priceMatch[1] : '';
          custom.push({ title, price, details: '' });
        } else if (typeof item === 'object' && item !== null) {
          const priceStr = item.price ? (String(item.price).startsWith('$') || String(item.price).startsWith('US$') || String(item.price).startsWith('+') ? item.price : `+ US$${item.price}`) : '';
          custom.push({
            title: item.title || item.name || item.text || item.label || String(item),
            price: priceStr,
            details: item.details || item.description || item.desc || ''
          });
        }
      });
    }
  }

  const titleText = data?.title || '';
  const isTrekPackage = isTrek || 
    data?.category === 'Treks' || 
    data?.category === 'Trek' || 
    data?.type === 'Trek' || 
    titleText.toLowerCase().includes('trek');

  const defaultTourUpgrades = [
    {
      title: "Upgrade to 4-Star Hotel Accommodation",
      price: "+ US$150 / person",
      details: "Upgrade all city hotel stays to verified 4-Star boutique & heritage hotels with upgraded breakfast buffet & amenities."
    },
    {
      title: "Upgrade to 5-Star Luxury Hotel Accommodation",
      price: "+ US$350 / person",
      details: "Upgrade to premium 5-Star luxury hotels (The Soaltee Kathmandu / Sarangkot Mountain Lodge / Mystic Mountain) with full spa & luxury perks."
    },
    {
      title: "Kathmandu Everest Scenic Mountain Flight",
      price: "+ US$250 / person",
      details: "1-Hour guaranteed window-seat flight over Mt. Everest, Lhotse, Makalu & Shishapangma with airport transfers."
    },
    {
      title: "Private Airport Luxury Vehicle Transfer",
      price: "+ US$35 / transfer",
      details: "Chauffeur-driven executive private air-conditioned vehicle pick-up & drop-off at Tribhuvan International Airport."
    }
  ];

  const defaultTrekUpgrades = [
    {
      title: "Upgrade to 4-Star Hotel Accommodation (Pre/Post Trek)",
      price: "+ US$120 / person",
      details: "Upgrade pre/post-trek Kathmandu & Pokhara hotel stays to 4-Star boutique hotels with buffet breakfast."
    },
    {
      title: "Upgrade to 5-Star Luxury Hotel Accommodation (Pre/Post Trek)",
      price: "+ US$280 / person",
      details: "Upgrade pre/post-trek Kathmandu & Pokhara hotel stays to 5-Star luxury hotels (The Soaltee / Mystic Mountain)."
    },
    {
      title: "Helicopter Return Transfer Upgrade",
      price: "+ US$450 / person",
      details: "Scenic high-altitude helicopter fly-back transfer directly back to Lukla / Pokhara / Kathmandu avoiding retracing steps."
    },
    {
      title: "Dedicated Personal Porter Service",
      price: "+ US$22 / day",
      details: "Dedicated personal porter to carry up to 15kg of your main duffel bag throughout the trekking itinerary."
    }
  ];

  const defaultUpgrades = isTrekPackage ? defaultTrekUpgrades : defaultTourUpgrades;
  // Filter out any explicit helicopter tour items from custom add-ons if present
  const result = custom.filter(a => !a.title.toLowerCase().includes('helicopter tour'));

  // Ensure 4-Star upgrade is present
  const has4Star = result.some(a => a.title.toLowerCase().includes('4-star') || a.title.toLowerCase().includes('4 star'));
  if (!has4Star) {
    result.unshift(defaultUpgrades[0]);
  }

  // Ensure 5-Star upgrade is present
  const has5Star = result.some(a => a.title.toLowerCase().includes('5-star') || a.title.toLowerCase().includes('5 star'));
  if (!has5Star) {
    const index4 = result.findIndex(a => a.title.toLowerCase().includes('4-star') || a.title.toLowerCase().includes('4 star'));
    if (index4 !== -1) {
      result.splice(index4 + 1, 0, defaultUpgrades[1]);
    } else {
      result.unshift(defaultUpgrades[1]);
    }
  }

  // Append remaining default upgrades if not already present
  defaultUpgrades.slice(2).forEach(defAdd => {
    const defTitleLower = defAdd.title.toLowerCase();
    const isAlreadyPresent = result.some(a => {
      const aTitleLower = a.title.toLowerCase();
      return aTitleLower === defTitleLower || 
             (defTitleLower.includes('helicopter return') && aTitleLower.includes('helicopter return')) ||
             (defTitleLower.includes('porter') && aTitleLower.includes('porter')) ||
             (defTitleLower.includes('mountain flight') && aTitleLower.includes('mountain flight')) ||
             (defTitleLower.includes('airport') && aTitleLower.includes('airport'));
    });
    if (!isAlreadyPresent) {
      result.push(defAdd);
    }
  });

  return result.filter(item => item.title && item.title.trim() !== '');
};

export const getHighlightsList = (data) => {
  if (!data) return [];
  const raw = data.highlights || data.keyHighlights || data.tripHighlights || [];
  if (!Array.isArray(raw)) return [];
  return raw.map(item => {
    if (typeof item === 'string') return { title: item, description: '' };
    if (typeof item === 'object' && item !== null) {
      return {
        title: item.title || item.name || item.text || item.label || String(item),
        description: item.description || item.desc || item.details || ''
      };
    }
    return { title: String(item), description: '' };
  }).filter(item => item.title && item.title.trim() !== '');
};

export const getCleanExcerpt = (text, maxSentences = 2) => {
  if (!text || typeof text !== 'string') return '';
  // 1. Strip all HTML tags e.g. <h3>, <p>, <strong>, <span>, <a>
  let clean = text.replace(/<[^>]*>/g, ' ');
  // 2. Remove markdown headers e.g. ### Header
  clean = clean.replace(/###\s+[^\n.]+/g, '');
  // 3. Remove markdown list bullets and bold asterisks
  clean = clean.replace(/^[*\-]\s+/gm, '');
  clean = clean.replace(/\*\*(.*?)\*\*/g, '$1');
  clean = clean.replace(/\*(.*?)\*/g, '$1');
  clean = clean.replace(/###/g, '');
  clean = clean.replace(/-\s*Key Highlight:\s*/gi, '');
  // 4. Normalize whitespace
  clean = clean.replace(/\s+/g, ' ').trim();
  // 5. Extract first maxSentences sentences
  const sentences = clean.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 0) {
    return sentences.slice(0, maxSentences).join(' ').trim();
  }
  return clean.slice(0, 220).trim();
};

export const formatMarkdownToHTML = (text) => {
  if (!text) return '';
  if (typeof text !== 'string') return String(text);

  let html = text.trim();

  // 1. Normalize line endings
  html = html.replace(/\r\n/g, '\n');

  // 2. Fix inline markdown formatting where newlines were missing before ### or - ** or -
  html = html.replace(/([^\n])\s*###\s+/g, '$1\n\n### ');
  html = html.replace(/([^\n])\s*-\s+\*\*/g, '$1\n- **');
  html = html.replace(/([^\n])\s*-\s+([A-Z0-9])/gi, '$1\n- $2');

  // 3. Headings (#, ##, ###)
  html = html.replace(/^###\s+(.*?)$/gm, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h3>');
  html = html.replace(/^##\s+(.*?)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>');
  html = html.replace(/^#\s+(.*?)$/gm, '<h1 class="text-3xl font-extrabold text-gray-900 mt-8 mb-4">$1</h1>');

  // Catch any inline ### that didn't match start of line anchor
  html = html.replace(/\s*###\s+([^<\n]+)/g, '<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h3>');

  // 4. Bold & Italic (convert **text** to <strong>text</strong>)
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 5. Bullet list items
  html = html.replace(/^[*\-]\s+(.*?)$/gm, '<li class="ml-5 list-disc my-1.5 text-gray-700">$1</li>');

  // Catch any remaining inline "- " bullet items
  html = html.replace(/\s*-\s+(<strong>.*?<\/strong>.*?)(?=(?:\s*-\s+|<h[1-6]|<p|$))/g, '<li class="ml-5 list-disc my-1.5 text-gray-700">$1</li>');

  // 6. Wrap consecutive <li> items in <ul>
  html = html.replace(/((?:<li class="ml-5 list-disc my-1.5 text-gray-700">[\s\S]*?<\/li>\s*)+)/g, '<ul class="my-4 space-y-1.5 list-disc pl-5">\n$1</ul>\n');

  // 7. Paragraph breaks
  html = html.replace(/\n\n+/g, '</p><p class="mt-4 text-gray-700 leading-relaxed text-justify">');
  html = html.replace(/\n/g, ' ');

  // 8. Safety cleanup: remove any orphan double asterisks ** or ###
  html = html.replace(/\*\*/g, '');
  html = html.replace(/###/g, '');

  html = html.trim();
  if (!html.startsWith('<')) {
    html = `<p class="text-gray-700 leading-relaxed text-justify">${html}</p>`;
  }

  return html;
};

