/**
 * Formats duration and unit into a user-friendly string.
 * Supporting:
 * - "Days" -> "X Days"
 * - "Hours" -> "X Hours"
 * - "Days & Nights" -> "X Days (X-1) Nights"
 */
export const formatDuration = (duration, unit) => {
  if (!duration) return '';
  const num = parseInt(duration, 10);
  
  // If duration is not a number (e.g. "12-15"), return as-is
  if (isNaN(num)) {
    return `${duration} ${unit || ''}`.trim();
  }

  if (unit === 'Days & Nights') {
    if (num <= 1) return `${num} Day`;
    return `${num} Days ${num - 1} Nights`;
  }
  
  // Pluralize units nicely
  const displayUnit = num === 1 
    ? (unit === 'Days' ? 'Day' : unit === 'Hours' ? 'Hour' : unit || '')
    : (unit || 'Days');

  return `${num} ${displayUnit}`.trim();
};
