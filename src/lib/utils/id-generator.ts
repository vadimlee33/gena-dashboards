/**
 * Utility functions for generating unique IDs
 */

/**
 * Generates a random string of specified length
 */
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generates a unique dashboard ID
 */
export function generateDashboardId(): string {
  return `dashboard_${generateRandomString(8)}`;
}

/**
 * Generates a unique chart ID
 */
export function generateChartId(): string {
  return `chart_${generateRandomString(8)}`;
}

/**
 * Generates a unique ID with custom prefix
 */
export function generateId(prefix: string): string {
  return `${prefix}_${generateRandomString(8)}`;
} 