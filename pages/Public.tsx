import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../services/store';
import { PublicFooter } from '../components/PublicFooter';
import { Lock, Mail, User, ShieldCheck, Search, Database, ArrowRight, CheckCircle, BarChart3, Globe, Zap, Menu, X, Fingerprint } from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-bd-green/20">
      {/* Navigation */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-10 h-10 rounded-full bg-bd-green flex items-center justify-center text-white font-bold shadow-lg shadow-bd-green/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
                BD
             </div>
             <span className={`text-2xl font-bold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-slate-900'}`}>
               Vote<span className="text-bd-green">Search</span>
             </span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-bd-green font-medium transition-colors">Features</a>
            <a href="#stats" className="text-slate-600 hover:text-bd-green font-medium transition-colors">Data</a>
            <a href="#process" className="text-slate-600 hover:text-bd-green font-medium transition-colors">Process</a>
            <div className="h-6 w-px bg-slate-200"></div>
            <Link to="/login" className="text-slate-600 hover:text-bd-green font-medium transition-colors">Login</Link>
            <Link to="/register" className="px-5 py-2.5 bg-bd-green text-white rounded-full hover:bg-bd-green/90 transition-all font-medium shadow-lg shadow-bd-green/25 hover:shadow-bd-green/40 hover:-translate-y-0.5">
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-slate-700" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-4">
                <a href="#features" className="text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Features</a>
                <a href="#stats" className="text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Data</a>
                <Link to="/login" className="text-slate-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="text-bd-green font-bold" onClick={() => setMobileMenuOpen(false)}>Register Now</Link>
            </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm text-sm font-semibold text-bd-green">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Official Election Commission Database
               </div>
               
               <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight tracking-tight">
                  Verify Identity <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-bd-green via-teal-500 to-emerald-600">
                    With Confidence
                  </span>
               </h1>
               
               <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                 The most secure and comprehensive platform for searching, verifying, and managing voter information across Bangladesh. Empowering transparency with 3D-secure technology.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/login" className="px-8 py-4 bg-bd-green text-white rounded-2xl text-lg font-bold hover:bg-bd-green/90 transition-all shadow-xl shadow-bd-green/30 flex items-center justify-center gap-2 group">
                      Search Database <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                   <a href="#features" className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl text-lg font-bold hover:border-bd-green/50 hover:text-bd-green transition-all shadow-sm flex items-center justify-center">
                      Learn How
                  </a>
               </div>

               <div className="pt-8 flex items-center gap-6 text-slate-400">
                  <div className="flex -space-x-3">
                     {[1,2,3,4].map(i => (
                         <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                            {['A','B','C','D'][i-1]}
                         </div>
                     ))}
                  </div>
                  <div className="text-sm">
                      <strong className="text-slate-900 block">Trusted by officials</strong>
                      <span>across 64 districts</span>
                  </div>
               </div>
            </div>

            {/* 3D Illustration */}
            <div className="relative perspective-1000 hidden lg:block">
               <div className="relative w-full aspect-square transform-style-3d animate-float">
                  {/* Floating Card Back */}
                  <div className="absolute top-10 right-10 w-3/4 h-3/4 bg-slate-900 rounded-3xl shadow-2xl opacity-10 transform translate-z-[-50px] rotate-6"></div>
                  
                  {/* Main Glass Card */}
                  <div className="absolute inset-10 bg-white/40 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-6 flex flex-col justify-between transform rotate-y-12 rotate-x-12 transition-transform hover:rotate-0">
                      <div className="flex justify-between items-start">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-bd-green to-teal-400 flex items-center justify-center text-white shadow-lg">
                              <ShieldCheck size={32} />
                          </div>
                          <div className="bg-white/80 px-3 py-1 rounded-full text-xs font-bold text-bd-green shadow-sm">
                              VERIFIED
                          </div>
                      </div>
                      <div className="space-y-3">
                          <div className="h-4 bg-slate-800/10 rounded w-1/2"></div>
                          <div className="h-3 bg-slate-800/10 rounded w-3/4"></div>
                          <div className="h-3 bg-slate-800/10 rounded w-2/3"></div>
                      </div>
                      <div className="pt-6 border-t border-white/20 flex justify-between items-center">
                          <div className="text-xs font-mono text-slate-600">NID: 1990269440001</div>
                          <Fingerprint size={32} className="text-slate-800/20" />
                      </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -right-4 top-1/3 bg-white p-4 rounded-2xl shadow-xl animate-float-delayed">
                      <CheckCircle className="text-bd-green w-8 h-8" />
                  </div>
                  <div className="absolute -left-4 bottom-1/3 bg-white p-4 rounded-2xl shadow-xl animate-float">
                      <Database className="text-blue-500 w-8 h-8" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div id="stats" className="py-20 bg-slate-900 text-white relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute w-96 h-96 bg-bd-green rounded-full blur-3xl -top-20 -left-20"></div>
            <div className="absolute w-96 h-96 bg-blue-600 rounded-full blur-3xl bottom-0 right-0"></div>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800/50">
               <div>
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2">119M+</div>
                  <div className="text-slate-400 font-medium">Registered Voters</div>
               </div>
               <div>
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2">64</div>
                  <div className="text-slate-400 font-medium">Districts Covered</div>
               </div>
               <div>
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2">99.9%</div>
                  <div className="text-slate-400 font-medium">Uptime Reliability</div>
               </div>
               <div>
                  <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2">24/7</div>
                  <div className="text-slate-400 font-medium">System Access</div>
               </div>
            </div>
         </div>
      </div>

      {/* Features Grid */}
      <div id="features" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h2 className="text-bd-green font-bold tracking-wide uppercase text-sm mb-3">System Capabilities</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Advanced Digital Infrastructure</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {[
                {
                    icon: Search,
                    title: "Instant Verification",
                    desc: "Real-time query processing allows authorized personnel to verify voter identity in milliseconds.",
                    color: "text-blue-500",
                    bg: "bg-blue-50"
                },
                {
                    icon: ShieldCheck,
                    title: "Bank-Grade Security",
                    desc: "End-to-end encryption ensures that sensitive demographic and biometric data remains tamper-proof.",
                    color: "text-bd-green",
                    bg: "bg-emerald-50"
                },
                {
                    icon: Globe,
                    title: "Nationwide Access",
                    desc: "Centralized cloud architecture provides consistent data access from any polling center in the country.",
                    color: "text-purple-500",
                    bg: "bg-purple-50"
                },
                {
                    icon: BarChart3,
                    title: "Demographic Analytics",
                    desc: "Administrators get visual insights into voter distribution by age, occupation, and location.",
                    color: "text-orange-500",
                    bg: "bg-orange-50"
                },
                {
                    icon: Zap,
                    title: "Fast Data Import",
                    desc: "Bulk upload capabilities allow rapid digitization of legacy voter lists via CSV integration.",
                    color: "text-yellow-500",
                    bg: "bg-yellow-50"
                },
                {
                    icon: User,
                    title: "Role-Based Control",
                    desc: "Granular permission settings ensure staff members only access data relevant to their jurisdiction.",
                    color: "text-pink-500",
                    bg: "bg-pink-50"
                }
            ].map((feature, idx) => (
                <div key={idx} className="group p-8 rounded-3xl bg-white border border-slate-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 card-3d-hover">
                    <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <feature.icon size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                </div>
            ))}
        </div>
      </div>

      {/* How it Works / Process */}
      <div id="process" className="py-24 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Streamlined for Efficiency</h2>
                      <p className="text-slate-600 text-lg mb-8">
                          The platform is designed to minimize administrative overhead while maximizing data accuracy. Here is how the ecosystem works.
                      </p>
                      
                      <div className="space-y-8">
                          {[
                              { step: "01", title: "Authorized Login", desc: "Secure authentication for election officials and administrators." },
                              { step: "02", title: "Smart Search", desc: "Use NID, Smart ID, or biometric serials to locate records instantly." },
                              { step: "03", title: "Data Management", desc: "Update records, verify status, or export reports for auditing." }
                          ].map((item, i) => (
                              <div key={i} className="flex gap-4">
                                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center font-bold text-bd-green shadow-sm">
                                      {item.step}
                                  </div>
                                  <div>
                                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                                      <p className="text-slate-600">{item.desc}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
                  <div className="relative">
                      {/* Abstract UI representation */}
                      <div className="bg-white p-2 rounded-xl shadow-2xl border border-slate-200 rotate-2 hover:rotate-0 transition-transform duration-500">
                          <div className="bg-slate-50 rounded-lg p-6 border border-slate-100 h-96 flex flex-col items-center justify-center text-slate-300">
                              <Search size={64} className="mb-4 opacity-50" />
                              <div className="w-3/4 h-4 bg-slate-200 rounded mb-2"></div>
                              <div className="w-1/2 h-4 bg-slate-200 rounded"></div>
                          </div>
                      </div>
                       <div className="absolute -bottom-10 -left-10 bg-bd-green p-8 rounded-2xl shadow-xl text-white max-w-xs animate-float">
                          <div className="text-4xl font-bold mb-1">0.2s</div>
                          <div className="opacity-80">Average query response time across the network.</div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-bd-green to-teal-600 rounded-[2.5rem] p-12 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-black opacity-10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
              
              <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">Ready to Access the Database?</h2>
              <p className="text-lg md:text-xl text-emerald-50 max-w-2xl mx-auto mb-10 relative z-10">
                  Join the official digital platform for voter management. Secure, fast, and reliable.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                  <Link to="/register" className="px-8 py-4 bg-white text-bd-green rounded-xl text-lg font-bold hover:bg-slate-100 transition-all shadow-lg">
                      Create Account
                  </Link>
                  <Link to="/login" className="px-8 py-4 bg-emerald-700/50 backdrop-blur-sm border border-emerald-500/30 text-white rounded-xl text-lg font-bold hover:bg-emerald-700 transition-all">
                      Login Portal
                  </Link>
              </div>
          </div>
      </div>
      
      {/* Footer */}
      <PublicFooter />
    </div>
  );
};

export const AuthPage: React.FC<{ type: 'login' | 'register' }> = ({ type }) => {
  const { login, register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Fake password for UI
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (type === 'login') {
      const success = await login(email);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or user not found. Try admin@ec.gov.bd');
      }
    } else {
      if (!name) return setError('Name is required');
      await register(name, email);
      navigate('/waiting');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute w-[800px] h-[800px] bg-bd-green/5 rounded-full blur-3xl -top-40 -right-40"></div>
          <div className="absolute w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl bottom-0 left-0"></div>
       </div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 relative z-10 border border-white">
        <div className="text-center mb-8">
           <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-bd-green to-emerald-600 flex items-center justify-center text-white mb-4 shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-500">
                {type === 'login' ? <Lock size={28} /> : <User size={28} />}
           </div>
           <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{type === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
           <p className="text-slate-500 mt-2">
             {type === 'login' ? 'Enter your credentials to access the portal' : 'Register for access to voter information'}
           </p>
        </div>

        {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl flex items-center gap-3 border border-red-100 animate-pulse">
                <ShieldCheck size={18} /> {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {type === 'register' && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <div className="relative group">
                <User className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-bd-green transition-colors" size={18} />
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-bd-green/10 focus:border-bd-green outline-none transition-all bg-slate-50 focus:bg-white"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-bd-green transition-colors" size={18} />
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-bd-green/10 focus:border-bd-green outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="you@ec.gov.bd"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3.5 top-3.5 text-slate-400 group-focus-within:text-bd-green transition-colors" size={18} />
              <input
                type="password"
                className="w-full pl-11 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-4 focus:ring-bd-green/10 focus:border-bd-green outline-none transition-all bg-slate-50 focus:bg-white"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-bd-green to-emerald-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-bd-green/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                type === 'login' ? 'Sign In' : 'Register Now'
            )}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          {type === 'login' ? (
            <>Don't have an account? <Link to="/register" className="text-bd-green font-bold hover:underline">Register here</Link></>
          ) : (
            <>Already have an account? <Link to="/login" className="text-bd-green font-bold hover:underline">Sign in</Link></>
          )}
        </div>
        
        {type === 'login' && (
            <div className="mt-6 pt-6 border-t border-slate-100 text-xs text-center text-slate-400">
                <p>Demo Admin: admin@ec.gov.bd</p>
                <p>Demo User: user@ec.gov.bd</p>
            </div>
        )}
      </div>
    </div>
  );
};

export const WaitingPage: React.FC = () => {
    const { logout } = useAuth();
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute w-[500px] h-[500px] bg-yellow-400/5 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
             </div>
            <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center relative z-10 border border-slate-100">
                <div className="w-24 h-24 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <ShieldCheck size={48} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Verification Pending</h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                    Your account has been successfully created. For security reasons, an administrator must manually approve your access to the voter database.
                </p>
                <div className="bg-slate-50 rounded-xl p-4 mb-8 text-sm text-slate-500 border border-slate-200">
                    Average approval time: <span className="font-semibold text-slate-700">2-4 hours</span>
                </div>
                <button 
                    onClick={logout}
                    className="text-slate-500 hover:text-slate-900 font-bold hover:underline transition-colors"
                >
                    Back to Login
                </button>
            </div>
        </div>
    );
}