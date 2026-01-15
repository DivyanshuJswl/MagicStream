import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Format date to readable string
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Truncate text to specified length
 */
export function truncate(text, length = 100) {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
}

/**
 * Get YouTube thumbnail URL
 */
export function getYoutubeThumbnail(youtubeId, quality = 'maxresdefault') {
  return `https://img.youtube.com/vi/${youtubeId}/${quality}.jpg`;
}

/**
 * Debounce function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Get ranking color based on value
 */
export function getRankingColor(rankingValue) {
  if (rankingValue <= 2) return 'text-green-400';
  if (rankingValue <= 4) return 'text-blue-400';
  if (rankingValue <= 6) return 'text-yellow-400';
  if (rankingValue <= 8) return 'text-orange-400';
  return 'text-red-400';
}

/**
 * Get ranking badge style
 */
export function getRankingBadge(rankingName) {
  const badges = {
    excellent: 'bg-green-500/20 text-green-400 border-green-500/30',
    good: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    average: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    poor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    terrible: 'bg-red-500/20 text-red-400 border-red-500/30',
  };
  return badges[rankingName] || badges.average;
}
