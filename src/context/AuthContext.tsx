import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { SEED_USERS } from '../data/seedData';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password?: string) => { success: boolean; error?: string };
  signup: (name: string, email: string, password: string, role: UserRole) => { success: boolean; error?: string };
  logout: () => void;
  switchRole: (role: UserRole) => void;
  quickLoginAs: (role: UserRole) => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  isAdmin: boolean;
  isEditor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_STORAGE_KEY = 'cms_app_users_v1';
const CURRENT_USER_KEY = 'cms_app_current_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const stored = localStorage.getItem(USERS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed reading users from localStorage', e);
    }
    return SEED_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(CURRENT_USER_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed reading current user from localStorage', e);
    }
    // Default to admin user for convenient first-run exploration
    return SEED_USERS[0];
  });

  // Sync users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (e) {
      console.error('Failed saving users to localStorage', e);
    }
  }, [users]);

  // Sync current user to localStorage
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    } catch (e) {
      console.error('Failed saving current user to localStorage', e);
    }
  }, [currentUser]);

  const login = (email: string, password?: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const foundUser = users.find((u) => u.email.toLowerCase() === trimmedEmail);

    if (!foundUser) {
      return { success: false, error: 'User with this email not found. Please sign up or try demo accounts.' };
    }

    if (password && foundUser.password && foundUser.password !== password) {
      return { success: false, error: 'Incorrect password. (Hint: default password is "password123")' };
    }

    setCurrentUser(foundUser);
    return { success: true };
  };

  const signup = (name: string, email: string, password: string, role: UserRole) => {
    const trimmedEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email.toLowerCase() === trimmedEmail)) {
      return { success: false, error: 'An account with this email already exists.' };
    }

    const newUser: User = {
      id: 'user_' + Date.now().toString(36),
      name: name.trim(),
      email: trimmedEmail,
      password: password,
      role: role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name.trim())}`,
      createdAt: new Date().toISOString(),
    };

    const updated = [...users, newUser];
    setUsers(updated);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const quickLoginAs = (role: UserRole) => {
    const target = users.find((u) => u.role === role) || SEED_USERS.find((u) => u.role === role);
    if (target) {
      setCurrentUser(target);
    }
  };

  const switchRole = (role: UserRole) => {
    if (!currentUser) {
      quickLoginAs(role);
      return;
    }
    const updatedUser = { ...currentUser, role };
    setCurrentUser(updatedUser);
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
    if (currentUser && currentUser.id === userId) {
      setCurrentUser((prev) => (prev ? { ...prev, role: newRole } : null));
    }
  };

  const isAdmin = currentUser?.role === 'admin';
  const isEditor = currentUser?.role === 'editor' || isAdmin;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        login,
        signup,
        logout,
        switchRole,
        quickLoginAs,
        updateUserRole,
        isAdmin,
        isEditor,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
