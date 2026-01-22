import React from 'react';
import { useAuth } from '../services/store';
import { LogOut, LayoutDashboard, Users, FileText, Menu, X, Search, List } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  if (!user) {
    return <>{children}</>;
  }

  const isActive = (path: string) => location.pathname === path;

  const NavItem = ({ to, icon: Icon, label }: { to: string; icon: any; label: string }) => (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        isActive(to)
          ? 'bg-bd-green/10 text-bd-green font-medium'
          : 'text-slate-600 hover:bg-slate-50 hover:text-bd-green'
      }`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <Icon size={20} />
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 fixed h-full z-20">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-bd-green flex items-center justify-center text-white font-bold">
            BD
          </div>
          <span className="text-xl font-bold text-slate-800">VoteSearch</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem to="/search" icon={Search} label="Search Voters" />
          <NavItem to="/voters" icon={List} label="Voter List" />
          
          {user.role === 'admin' && (
            <>
              <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Administration
              </div>
              <NavItem to="/admin/users" icon={Users} label="Manage Users" />
            </>
          )}
        </nav>

        <div className="p-4 border-t border-slate-100">
            <div className="flex items-center gap-3 px-4 py-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                    {user.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-medium text-slate-900 truncate">{user.name}</p>
                    <p className="text-xs text-slate-500 truncate capitalize">{user.role}</p>
                </div>
            </div>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-2 w-full text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white border-b border-slate-200 z-30 flex items-center justify-between p-4">
         <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-bd-green flex items-center justify-center text-white font-bold">
            BD
          </div>
          <span className="text-lg font-bold text-slate-800">VoteSearch</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600">
            {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-20 pt-20 px-4 flex flex-col gap-4">
           <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
           <NavItem to="/search" icon={Search} label="Search Voters" />
           <NavItem to="/voters" icon={List} label="Voter List" />
           {user.role === 'admin' && (
             <NavItem to="/admin/users" icon={Users} label="Manage Users" />
           )}
           <hr />
           <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 bg-red-50 rounded-lg"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${user ? 'md:ml-64 pt-20 md:pt-0' : ''}`}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};