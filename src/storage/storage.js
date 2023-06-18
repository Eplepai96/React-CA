import { useEffect, useState } from 'react';

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const removeItem = (itemId) => {
    setValue((prevValue) => {
      const updatedValue = { ...prevValue };
      delete updatedValue[itemId];
      return updatedValue;
    });
  };

  const clearItems = () => {
    localStorage.removeItem(key);
    setValue(initialValue);
  };

  return [value, setValue, removeItem, clearItems];
}
