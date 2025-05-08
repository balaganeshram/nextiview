export const saveToSession = (key, value) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
};

export const getFromSession = (key) => {
  if (typeof window !== "undefined") {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const removeFromSession = (key) => {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(key);
  }
};
