import { Voter, User } from './types';

export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'admin@ec.gov.bd',
    role: 'admin',
    status: 'approved'
  },
  {
    id: '2',
    name: 'Officer Rahim',
    email: 'user@ec.gov.bd',
    role: 'user',
    status: 'approved'
  },
  {
    id: '3',
    name: 'Pending Officer',
    email: 'new@ec.gov.bd',
    role: 'user',
    status: 'pending'
  }
];

export const MOCK_VOTERS: Voter[] = [
  {
    id: 'v1',
    Serial_No: 1001,
    Name: 'Abdul Karim',
    Name_bn: 'আব্দুল করিম',
    Voter_No: '1990269440001',
    Father_Name: 'Rahim Uddin',
    Father_Name_bn: 'রহিম উদ্দিন',
    Mother_Name: 'Fatema Begum',
    Mother_Name_bn: 'ফাতেমা বেগম',
    Occupation: 'Farmer',
    DOB: '1980-05-15',
    Address: 'Village: Rupnagar, Thana: Savar, Dhaka',
    Address_bn: 'গ্রাম: রূপনগর, থানা: সাভার, ঢাকা'
  },
  {
    id: 'v2',
    Serial_No: 1002,
    Name: 'Nasreen Akhter',
    Name_bn: 'নাসরিন আক্তার',
    Voter_No: '1992269440002',
    Father_Name: 'Kamal Hossain',
    Father_Name_bn: 'কামাল হোসেন',
    Mother_Name: 'Jahanara Begum',
    Mother_Name_bn: 'জাহানারা বেগম',
    Occupation: 'Teacher',
    DOB: '1992-11-20',
    Address: 'House 12, Road 5, Dhanmondi, Dhaka',
    Address_bn: 'বাড়ি ১২, রোড ৫, ধানমন্ডি, ঢাকা'
  },
  {
    id: 'v3',
    Serial_No: 1003,
    Name: 'Bipul Chandra',
    Name_bn: 'বিপুল চন্দ্র',
    Voter_No: '1985269440003',
    Father_Name: 'Nirmal Chandra',
    Father_Name_bn: 'নির্মল চন্দ্র',
    Mother_Name: 'Geeta Rani',
    Mother_Name_bn: 'গীতা রানী',
    Occupation: 'Business',
    DOB: '1985-03-10',
    Address: '72 Station Road, Chittagong',
    Address_bn: '৭২ স্টেশন রোড, চট্টগ্রাম'
  },
  {
    id: 'v4',
    Serial_No: 1004,
    Name: 'Farhana Yeasmin',
    Name_bn: 'ফারহানা ইয়াসমিন',
    Voter_No: '1995269440004',
    Father_Name: 'Rafiqul Islam',
    Father_Name_bn: 'রফিকুল ইসলাম',
    Mother_Name: 'Salma Khatun',
    Mother_Name_bn: 'সালমা খাতুন',
    Occupation: 'Doctor',
    DOB: '1995-07-22',
    Address: 'Medical Staff Quarter, Sylhet',
    Address_bn: 'মেডিকেল স্টাফ কোয়ার্টার, সিলেট'
  },
  {
    id: 'v5',
    Serial_No: 1005,
    Name: 'Mohammad Ali',
    Name_bn: 'মোহাম্মদ আলী',
    Voter_No: '1978269440005',
    Father_Name: 'Sikandar Ali',
    Father_Name_bn: 'সিকান্দার আলী',
    Mother_Name: 'Ayesha Bibi',
    Mother_Name_bn: 'আয়েশা বিবি',
    Occupation: 'Driver',
    DOB: '1978-01-01',
    Address: 'Gabtoli, Mirpur, Dhaka',
    Address_bn: 'গাবতলী, মিরপুর, ঢাকা'
  }
];