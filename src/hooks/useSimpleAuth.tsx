import { useState, useEffect } from 'react';

interface SimpleUser {
  id: string;
  full_name: string;
  age: number;
  gender: string;
  occupation: string;
  created_at: string;
  last_login: string;
}

export const useSimpleAuth = () => {
  const [user, setUser] = useState<SimpleUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('simple_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('simple_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData: SimpleUser) => {
    setUser(userData);
    localStorage.setItem('simple_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('simple_user');
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };
};