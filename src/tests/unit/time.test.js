import { formatTime, updateClock } from '../src/scripts/time.js';

describe('formatTime', () => {
  it('should format time correctly', () => {
    const date = new Date('2024-10-27T10:30:00Z');
    expect(formatTime(date)).toBe('2024年10月27日(土) 19:30:00'); 
  });

  it('should handle single-digit values', () => {
    const date = new Date('2024-01-01T01:02:03Z');
    expect(formatTime(date)).toBe('2024年01月01日(火) 10:02:03');
  });
});


describe('updateClock', () => {
  let clockElement;

  beforeEach(() => {
    clockElement = document.createElement('div');
    document.body.appendChild(clockElement);
    clockElement.id = 'clock'; // time.js が参照するIDを設定
  });

  afterEach(() => {
    document.body.removeChild(clockElement);
  });

  it('should update the clock element', () => {
    jest.useFakeTimers();
    const mockDate = new Date('2024-10-27T10:30:00Z');
    jest.setSystemTime(mockDate);

    updateClock();
    expect(clockElement.textContent).toBe('2024年10月27日(土) 19:30:00');

    jest.advanceTimersByTime(1000); 
    expect(clockElement.textContent).not.toBe('2024年10月27日(土) 19:30:00');

    jest.useRealTimers();
  });
});