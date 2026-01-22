import React from 'react';
import { useData } from '../services/store';
import { Users, UserCheck, UserX, TrendingUp, Activity, FileText } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { voters, users } = useData();

  const totalVoters = voters.length;
  const pendingUsers = users.filter(u => u.status === 'pending').length;
  const approvedUsers = users.filter(u => u.status === 'approved').length;

  const occupationData = voters.reduce((acc: any, curr) => {
    const occ = curr.Occupation;
    acc[occ] = (acc[occ] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(occupationData).map(key => ({
    name: key,
    value: occupationData[key]
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Administrator Dashboard</h1>
        <span className="text-sm text-slate-500">{new Date().toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                <Users size={24} />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">Total Voters</p>
                <p className="text-2xl font-bold text-slate-900">{totalVoters.toLocaleString()}</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center">
                <UserCheck size={24} />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
                <p className="text-2xl font-bold text-slate-900">{pendingUsers}</p>
            </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Activity size={24} />
            </div>
            <div>
                <p className="text-sm font-medium text-slate-500">Active System Users</p>
                <p className="text-2xl font-bold text-slate-900">{approvedUsers}</p>
            </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp size={18} className="text-slate-400" />
                Voter Demographics (Occupation)
            </h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <RechartsTooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
             <div className="flex flex-wrap justify-center gap-2 mt-4">
                {chartData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs text-slate-600">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                        {entry.name}
                    </div>
                ))}
            </div>
        </div>

         <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText size={18} className="text-slate-400" />
                Recent System Activity
            </h3>
            <div className="space-y-4">
                {[1,2,3,4].map((_, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                        <div className="w-2 h-2 mt-2 rounded-full bg-slate-300"></div>
                        <div>
                            <p className="text-sm text-slate-800 font-medium">New voter registration added</p>
                            <p className="text-xs text-slate-500">2 hours ago by Officer Rahim</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export const UserManagement: React.FC = () => {
    const { users, approveUser } = useData();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {users.length} Total Users
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">User</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Role</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.map(u => (
                                <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold uppercase">
                                                {u.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-slate-900">{u.name}</p>
                                                <p className="text-xs text-slate-500">{u.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-800'}`}>
                                            {u.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                                            ${u.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 
                                              u.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                            {u.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {u.status === 'pending' && (
                                            <button 
                                                onClick={() => approveUser(u.id)}
                                                className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 justify-end ml-auto"
                                            >
                                                <UserCheck size={16} /> Approve
                                            </button>
                                        )}
                                        {u.status === 'approved' && u.role !== 'admin' && (
                                            <span className="text-slate-400 text-xs italic">No actions</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}