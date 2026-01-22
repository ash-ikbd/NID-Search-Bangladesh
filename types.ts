export type Role = 'admin' | 'user';
export type Status = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
}

export interface Voter {
  id: string;
  Serial_No: number;
  Name: string;
  Name_bn: string;
  Voter_No: string;
  Father_Name: string;
  Father_Name_bn: string;
  Mother_Name: string;
  Mother_Name_bn: string;
  Occupation: string;
  DOB: string;
  Address: string;
  Address_bn: string;
  Image?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface Stats {
  totalVoters: number;
  totalUsers: number;
  pendingUsers: number;
  votersByOccupation: { name: string; value: number }[];
}