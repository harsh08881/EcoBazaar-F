export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value)); 

};
  
export const getItem = (key) => {
    try {
      const value = localStorage.getItem(key);
      return value;
    } catch (error) {
      console.error(`Error parsing JSON from localStorage key "${key}":`, error);
      return null; // Return null if parsing fails
    }
  };


export const checkToken = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
};

export const logout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    console.log('User logged out successfully');
  };
  

    