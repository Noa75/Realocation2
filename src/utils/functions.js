export const getLocalStorage=(key)=> {
    try {
      const jsonValue = localStorage.getItem(key);
      return jsonValue ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return null;
    }
  }

  export const setLocalStorage=(key, value) =>{
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving to localStorage', error);
    }
  }