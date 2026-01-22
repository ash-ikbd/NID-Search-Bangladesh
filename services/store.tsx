import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Voter, Role } from '../types';
import { MOCK_USERS, MOCK_VOTERS } from '../constants';

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  login: (email: string) => Promise<boolean>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('auth_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, this would be an API call
  const login = async (email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate delay
    
    // Check against mock users or localStorage users
    const localUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    const allUsers = [...MOCK_USERS, ...localUsers];
    
    const foundUser = allUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('auth_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'user',
      status: 'pending' // Default status
    };
    
    // Save to "DB"
    const localUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    localUsers.push(newUser);
    localStorage.setItem('app_users', JSON.stringify(localUsers));
    
    // Auto login
    setUser(newUser);
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};


// --- Data Context ---
interface DataContextType {
  voters: Voter[];
  users: User[]; // For admin to manage
  addVoter: (voter: Omit<Voter, 'id'>) => Promise<void>;
  deleteVoter: (id: string) => Promise<void>;
  updateVoter: (voter: Voter) => Promise<void>;
  approveUser: (userId: string) => void;
  importVoters: (csvData: any[]) => Promise<void>; // Simplified for demo
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [voters, setVoters] = useState<Voter[]>(MOCK_VOTERS);
  const [users, setUsers] = useState<User[]>(MOCK_USERS);

  // Load any locally saved data on mount
  useEffect(() => {
    const savedVoters = localStorage.getItem('app_voters');
    if (savedVoters) setVoters(JSON.parse(savedVoters));
    
    const savedUsers = localStorage.getItem('app_users');
    if (savedUsers) {
        // Merge mock and saved (deduplicate by email for users)
        const parsed = JSON.parse(savedUsers);
        const unique = [...MOCK_USERS, ...parsed].filter((v,i,a)=>a.findIndex(t=>(t.email === v.email))===i);
        setUsers(unique);
    }
  }, []);

  const saveVoters = (newVoters: Voter[]) => {
    setVoters(newVoters);
    localStorage.setItem('app_voters', JSON.stringify(newVoters));
  };

  const addVoter = async (voterData: Omit<Voter, 'id'>) => {
    const newVoter = { ...voterData, id: Math.random().toString(36).substr(2, 9) };
    const newList = [newVoter, ...voters];
    saveVoters(newList);
  };

  const deleteVoter = async (id: string) => {
    const newList = voters.filter(v => v.id !== id);
    saveVoters(newList);
  };

  const updateVoter = async (voter: Voter) => {
    const newList = voters.map(v => v.id === voter.id ? voter : v);
    saveVoters(newList);
  };

  const approveUser = (userId: string) => {
    const updatedUsers = users.map(u => u.id === userId ? { ...u, status: 'approved' as const } : u);
    setUsers(updatedUsers);
    
    // Update local storage simulation
    // In a real app this is a PATCH request
    const localUsers = JSON.parse(localStorage.getItem('app_users') || '[]');
    const updatedLocal = localUsers.map((u: User) => u.id === userId ? { ...u, status: 'approved' } : u);
    localStorage.setItem('app_users', JSON.stringify(updatedLocal));
  };

  const importVoters = async (newVoters: any[]) => {
     // Mock mapping logic
     const mapped: Voter[] = newVoters.map((raw, idx) => ({
        id: `imported-${Date.now()}-${idx}`,
        Serial_No: voters.length + 1000 + idx,
        Name: raw.Name || 'Unknown',
        Name_bn: raw.Name_bn || 'অজানা',
        Voter_No: raw.Voter_No || `TEMP${Date.now()}`,
        Father_Name: raw.Father_Name || '',
        Father_Name_bn: raw.Father_Name_bn || '',
        Mother_Name: raw.Mother_Name || '',
        Mother_Name_bn: raw.Mother_Name_bn || '',
        Occupation: raw.Occupation || 'Other',
        DOB: raw.DOB || '1990-01-01',
        Address: raw.Address || '',
        Address_bn: raw.Address_bn || ''
     }));
     saveVoters([...mapped, ...voters]);
  };

  return (
    <DataContext.Provider value={{ voters, users, addVoter, deleteVoter, updateVoter, approveUser, importVoters }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error('useData must be used within DataProvider');
  return context;
};