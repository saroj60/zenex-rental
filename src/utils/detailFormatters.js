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

export const formatMarkdownToHTML = (text) => {
  if (!text) return '';
  if (typeof text !== 'string') return String(text);

  let html = text;

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
  html = html.replace(/\n\n+/g, '<br/><br/>');
  html = html.replace(/\n/g, ' ');

  // 8. Safety cleanup: remove any orphan double asterisks ** or ###
  html = html.replace(/\*\*/g, '');
  html = html.replace(/###/g, '');

  return html;
};

