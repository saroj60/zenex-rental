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

export const getAddonsList = (data) => {
  if (!data) return [];
  const raw = data.addons || data.addOns || data.add_ons || data.extraOptions || [];
  if (!Array.isArray(raw)) return [];
  return raw.map(item => {
    if (typeof item === 'string') return { title: item, price: '', details: '' };
    if (typeof item === 'object' && item !== null) {
      const priceStr = item.price ? (String(item.price).startsWith('$') || String(item.price).startsWith('US$') ? item.price : `US$${item.price}`) : '';
      return {
        title: item.title || item.name || item.text || item.label || String(item),
        price: priceStr,
        details: item.details || item.description || item.desc || ''
      };
    }
    return { title: String(item), price: '', details: '' };
  }).filter(item => item.title && item.title.trim() !== '');
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
