import { useState, useEffect } from 'react';

interface Profile {
  id: string;
  full_name: string;
  age: number;
  gender: string; // 'ชาย', 'หญิง', 'อื่นๆ'
  occupation: string;
  cpr_experience: string[];
  created_at?: string;
  last_login?: string;
  updated_at?: string;
}

export const useSimpleAuth = () => {
  const [user, setUser] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('profile_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored profile:', error);
        localStorage.removeItem('profile_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (profileData: Profile) => {
    setUser(profileData);
    localStorage.setItem('profile_user', JSON.stringify(profileData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('profile_user');
  };

  return {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };
};

// Export alias สำหรับ backward compatibility
export const useProfileAuth = useSimpleAuth;
