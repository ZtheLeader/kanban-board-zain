import { renderHook, act } from '@testing-library/react';

import { useLocalStorage } from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with the provided initial value', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    expect(result.current[0]).toBe('initialValue');
  });

  it('should retrieve an existing value from localStorage', () => {
    localStorage.setItem('testKey', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('should update the value in localStorage when setValue is called', () => {
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    act(() => {
      result.current[1]('newValue');
    });
    expect(localStorage.getItem('testKey')).toBe(JSON.stringify('newValue'));
    expect(result.current[0]).toBe('newValue');
  });

  it('should handle JSON parsing errors gracefully', () => {
    localStorage.setItem('testKey', 'invalidJSON');
    const { result } = renderHook(() => useLocalStorage('testKey', 'initialValue'));
    expect(result.current[0]).toBe('initialValue');
  });
});
