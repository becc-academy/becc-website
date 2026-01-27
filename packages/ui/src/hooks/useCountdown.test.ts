import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { formatCountdown, useCountdown } from './useCountdown';

describe('useCountdown', () => {
  it('calculates countdown correctly for future date', () => {
    const futureDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 5); // 5 days from now
    const { result } = renderHook(() => useCountdown(futureDate));

    expect(result.current.days).toBeGreaterThan(4);
    expect(result.current.days).toBeLessThanOrEqual(5);
    expect(result.current.isExpired).toBe(false);
  });

  it('marks countdown as expired for past date', () => {
    const pastDate = new Date(Date.now() - 1000); // 1 second ago
    const { result } = renderHook(() => useCountdown(pastDate));

    expect(result.current.isExpired).toBe(true);
    expect(result.current.days).toBe(0);
    expect(result.current.hours).toBe(0);
    expect(result.current.minutes).toBe(0);
    expect(result.current.seconds).toBe(0);
  });

  it('updates countdown every second', async () => {
    vi.useFakeTimers();
    const futureDate = new Date(Date.now() + 5000); // 5 seconds from now
    const { result } = renderHook(() => useCountdown(futureDate));

    const initialSeconds = result.current.seconds;

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    await waitFor(() => {
      expect(result.current.seconds).not.toBe(initialSeconds);
    });

    vi.useRealTimers();
  });
});

describe('formatCountdown', () => {
  it('formats countdown with days, hours, and minutes', () => {
    const countdown = {
      days: 2,
      hours: 5,
      minutes: 30,
      seconds: 45,
      isExpired: false,
    };

    const formatted = formatCountdown(countdown);
    expect(formatted).toBe('2 days, 5 hours, 30 minutes');
  });

  it('formats countdown with only hours and minutes', () => {
    const countdown = {
      days: 0,
      hours: 3,
      minutes: 15,
      seconds: 20,
      isExpired: false,
    };

    const formatted = formatCountdown(countdown);
    expect(formatted).toBe('3 hours, 15 minutes');
  });

  it('includes seconds when less than an hour remaining', () => {
    const countdown = {
      days: 0,
      hours: 0,
      minutes: 45,
      seconds: 30,
      isExpired: false,
    };

    const formatted = formatCountdown(countdown);
    expect(formatted).toBe('45 minutes, 30 seconds');
  });

  it('returns "Event has started!" for expired countdown', () => {
    const countdown = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isExpired: true,
    };

    const formatted = formatCountdown(countdown);
    expect(formatted).toBe('Event has started!');
  });

  it('handles singular units correctly', () => {
    const countdown = {
      days: 1,
      hours: 1,
      minutes: 1,
      seconds: 1,
      isExpired: false,
    };

    const formatted = formatCountdown(countdown);
    expect(formatted).toBe('1 day, 1 hour, 1 minute');
  });
});
