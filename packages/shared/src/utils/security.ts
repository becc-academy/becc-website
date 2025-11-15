/**
 * Frontend Security Utilities
 * Protects against XSS, CSRF, and other frontend vulnerabilities
 */

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
};

/**
 * Sanitize HTML to prevent XSS
 */
export const sanitizeHTML = (html: string): string => {
  const allowedTags = ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li'];
  const allowedAttributes = ['href', 'title'];

  const div = document.createElement('div');
  div.innerHTML = html;

  const removeUnallowedTags = (node: HTMLElement): void => {
    Array.from(node.children).forEach((child) => {
      const tagName = child.tagName.toLowerCase();

      if (!allowedTags.includes(tagName)) {
        child.remove();
      } else {
        // Remove unallowed attributes
        Array.from(child.attributes).forEach((attr) => {
          if (!allowedAttributes.includes(attr.name)) {
            child.removeAttribute(attr.name);
          }
        });
        // Recursively check children
        removeUnallowedTags(child as HTMLElement);
      }
    });
  };

  removeUnallowedTags(div);
  return div.innerHTML;
};

/**
 * Validate URL to prevent open redirect attacks
 */
export const isValidURL = (url: string): boolean => {
  try {
    const parsed = new URL(url, window.location.origin);
    // Only allow http, https, and mailto protocols
    return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
  } catch {
    return false;
  }
};

/**
 * Safe navigation - prevents open redirect attacks
 */
export const safeNavigate = (url: string): void => {
  if (isValidURL(url)) {
    window.location.href = url;
  } else {
    console.warn('Attempted navigation to invalid URL:', url);
  }
};

/**
 * Generate a CSRF token for forms
 */
export const generateCSRFToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Rate limiting for frontend actions
 */
class RateLimiter {
  private requests = new Map<string, number[]>();

  public isAllowed(key: string, maxRequests: number, windowMs: number): boolean {
    const now = Date.now();
    const timestamps = this.requests.get(key) ?? [];

    // Filter out old timestamps
    const recentTimestamps = timestamps.filter((time) => now - time < windowMs);

    if (recentTimestamps.length >= maxRequests) {
      return false;
    }

    recentTimestamps.push(now);
    this.requests.set(key, recentTimestamps);
    return true;
  }

  public reset(key: string): void {
    this.requests.delete(key);
  }
}

export const rateLimiter = new RateLimiter();

/**
 * Debounce function to prevent rapid repeated calls
 */
export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): void => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttle function to limit execution rate
 */
export const throttle = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;

  return (...args: Parameters<T>): void => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (basic)
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone);
};

/**
 * Remove potentially dangerous characters from input
 */
export const removeDangerousChars = (input: string): string => {
  return input.replace(/[<>'"]/g, '');
};
