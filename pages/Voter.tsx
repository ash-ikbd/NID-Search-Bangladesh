import React, { useState, useMemo } from 'react';
import { useData, useAuth } from '../services/store';
import { Search, Plus, Upload, X, ChevronLeft, Printer, Trash2, User as UserIcon, CreditCard, Eye, ListFilter, ArrowRight } from 'lucide-react';
import { Voter } from '../types';

// --- Shared Components ---

const DetailView: React.FC<{ voter: Voter; onClose: () => void }> = ({ voter, onClose }) => (
    <div className="space-y-6 animate-fade-in">
        <button 
            onClick={onClose}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
            <ChevronLeft size={20} /> Back to Results
        </button>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
            <div className="bg-bd-green/5 p-8 border-b border-bd-green/10 flex justify-between items-start">
                <div className="flex gap-6">
                    <div className="w-32 h-32 bg-slate-200 rounded-lg border-4 border-white shadow-md flex items-center justify-center text-slate-400 overflow-hidden">
                            {voter.Image ? (
                            <img src={voter.Image} alt={voter.Name} className="w-full h-full object-cover" />
                            ) : (
                            <UserIcon size={48} className="opacity-50" />
                            )}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-1">{voter.Name}</h2>
                        <h3 className="text-xl text-slate-600 font-bn">{voter.Name_bn}</h3>
                        <div className="mt-4 flex gap-4 text-sm">
                            <span className="bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-600">
                                Serial: <b>{voter.Serial_No}</b>
                            </span>
                            <span className="bg-bd-green/10 px-3 py-1 rounded-full border border-bd-green/20 text-bd-green font-semibold">
                                NID: {voter.Voter_No}
                            </span>
                        </div>
                    </div>
                </div>
                <button onClick={() => window.print()} className="p-2 text-slate-400 hover:text-bd-green transition-colors print:hidden">
                    <Printer size={24} />
                </button>
            </div>
            
            <div className="p-8 grid md:grid-cols-2 gap-x-12 gap-y-8">
                <DetailItem label="Father's Name" value={voter.Father_Name} valueBn={voter.Father_Name_bn} />
                <DetailItem label="Mother's Name" value={voter.Mother_Name} valueBn={voter.Mother_Name_bn} />
                <DetailItem label="Occupation" value={voter.Occupation} />
                <DetailItem label="Date of Birth" value={voter.DOB} />
                <div className="md:col-span-2">
                        <DetailItem label="Permanent Address" value={voter.Address} valueBn={voter.Address_bn} />
                </div>
            </div>

            <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 text-xs text-center text-slate-400">
                This is a computer-generated document. No signature is required.
            </div>
        </div>
    </div>
);

const VoterCard: React.FC<{ voter: Voter; onClick: () => void }> = ({ voter, onClick }) => (
  <div 
    onClick={onClick} 
    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 hover:border-bd-green/30 overflow-hidden group h-full flex flex-col relative transform hover:-translate-y-1"
  >
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-bd-green to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
    
    <div className="p-6 flex-1 flex flex-col">
       <div className="flex items-start gap-4 mb-5">
           <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 shrink-0 border-2 border-slate-100 group-hover:border-bd-green/20 transition-colors overflow-hidden relative shadow-inner">
               {voter.Image ? (
                   <img src={voter.Image} alt={voter.Name} className="w-full h-full object-cover" />
               ) : (
                   <UserIcon size={32} className="opacity-80" />
               )}
           </div>
           <div className="min-w-0 flex-1">
               <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-bd-green transition-colors truncate" title={voter.Name}>{voter.Name}</h3>
               <p className="font-bn text-slate-500 text-base mt-0.5 truncate" title={voter.Name_bn}>{voter.Name_bn}</p>
               {voter.Occupation && (
                   <span className="inline-block mt-2 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-semibold uppercase tracking-wider">
                       {voter.Occupation}
                   </span>
               )}
           </div>
       </div>
       
       <div className="mt-auto space-y-4">
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 group-hover:bg-bd-green/5 group-hover:border-bd-green/10 transition-colors">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">NID Number</span>
                    <CreditCard size={14} className="text-bd-green/60" />
                </div>
                <div className="font-mono text-base font-bold text-slate-700 tracking-wide">
                    {voter.Voter_No}
                </div>
            </div>
            
            <div className="px-1 border-l-2 border-slate-100 pl-3 group-hover:border-bd-green/30 transition-colors">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold mb-0.5">Father's Name</p>
                <p className="text-sm font-medium text-slate-700 truncate" title={voter.Father_Name}>{voter.Father_Name}</p>
            </div>
       </div>
    </div>
    
    <div className="bg-slate-50 p-3 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-500 group-hover:text-bd-green transition-colors font-medium text-sm">
        <span>View Full Profile</span>
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /> 
    </div>
  </div>
);

const DetailItem = ({ label, value, valueBn }: { label: string, value: string, valueBn?: string }) => (
    <div>
        <h4 className="text-xs uppercase tracking-wide text-slate-400 font-semibold mb-1">{label}</h4>
        <p className="text-lg text-slate-800 font-medium">{value}</p>
        {valueBn && <p className="text-base text-slate-500 font-bn mt-0.5">{valueBn}</p>}
    </div>
);

const Input = ({ label, name, type = "text", required = false, className = "" }: any) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <input name={name} type={type} required={required} className={`px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green outline-none ${className}`} />
    </div>
);

// --- Pages ---

export const VoterSearch: React.FC = () => {
    const { voters } = useData();
    const [search, setSearch] = useState('');
    const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);

    const filteredVoters = useMemo(() => {
        if (!search) return []; // Don't show all initially for search page
        return voters.filter(v => 
            v.Name.toLowerCase().includes(search.toLowerCase()) ||
            v.Voter_No.includes(search) ||
            v.Serial_No.toString().includes(search)
        );
    }, [voters, search]);

    if (selectedVoter) {
        return <DetailView voter={selectedVoter} onClose={() => setSelectedVoter(null)} />;
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4 py-8">
                <h1 className="text-3xl font-bold text-slate-900">Find Voter Information</h1>
                <p className="text-slate-500 max-w-xl mx-auto">Enter NID number, full name or serial number to search for voter details from the national database.</p>
            </div>

            <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="text-slate-400" size={24} />
                </div>
                <input 
                    type="text" 
                    placeholder="Search by NID, Name or Serial No..." 
                    className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border border-slate-200 shadow-sm focus:ring-4 focus:ring-bd-green/10 focus:border-bd-green outline-none transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    autoFocus
                />
            </div>

            {search.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-2">
                        <h2 className="text-lg font-semibold text-slate-700">Search Results</h2>
                        <span className="text-sm text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">{filteredVoters.length} found</span>
                    </div>
                    
                    {filteredVoters.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
                            {filteredVoters.map(voter => (
                                <VoterCard key={voter.id} voter={voter} onClick={() => setSelectedVoter(voter)} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                            <div className="inline-block p-4 rounded-full bg-slate-50 mb-3">
                                <Search size={24} className="text-slate-400" />
                            </div>
                            <p className="text-slate-500">No voters found matching "{search}"</p>
                        </div>
                    )}
                </div>
            )}

            {search.length === 0 && (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-30 pointer-events-none filter blur-[2px] select-none">
                     {/* Placeholder cards to look good when empty */}
                     {[1,2,3].map(i => (
                         <div key={i} className="h-64 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col p-6 gap-4">
                            <div className="flex gap-4">
                                <div className="w-16 h-16 rounded-full bg-slate-100"></div>
                                <div className="space-y-2 flex-1">
                                    <div className="h-4 bg-slate-100 rounded w-3/4"></div>
                                    <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                                </div>
                            </div>
                            <div className="mt-auto space-y-3">
                                <div className="h-12 bg-slate-100 rounded-xl"></div>
                                <div className="h-10 bg-slate-100 rounded-xl"></div>
                            </div>
                         </div>
                     ))}
                 </div>
            )}
        </div>
    );
};

export const VoterList: React.FC = () => {
  const { voters, addVoter, deleteVoter, importVoters } = useData();
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [selectedVoter, setSelectedVoter] = useState<Voter | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const filteredVoters = useMemo(() => {
    return voters.filter(v => 
        v.Name.toLowerCase().includes(search.toLowerCase()) ||
        v.Voter_No.includes(search) ||
        v.Serial_No.toString().includes(search)
    );
  }, [voters, search]);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setUploading(true);
        setTimeout(async () => {
            await importVoters([
                { Name: 'Imported Voter 1', Name_bn: 'আমদানি ভোটার ১', Voter_No: '999999' },
                { Name: 'Imported Voter 2', Name_bn: 'আমদানি ভোটার ২', Voter_No: '888888' }
            ]);
            setUploading(false);
        }, 1500);
    }
  };

  if (selectedVoter) {
    return <DetailView voter={selectedVoter} onClose={() => setSelectedVoter(null)} />;
  }

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <ListFilter className="text-bd-green" />
                Voter List
            </h1>
            <div className="flex gap-2">
                {user?.role === 'admin' && (
                    <>
                        <button 
                            onClick={() => setIsFormOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-bd-green text-white rounded-lg hover:bg-bd-green/90 transition-colors shadow-sm"
                        >
                            <Plus size={18} /> Add Voter
                        </button>
                        <label className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer shadow-sm">
                            <Upload size={18} /> 
                            {uploading ? 'Importing...' : 'Import CSV'}
                            <input type="file" className="hidden" accept=".csv" onChange={handleImport} disabled={uploading} />
                        </label>
                    </>
                )}
            </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
            <div className="relative">
                <Search className="absolute left-3 top-2.5 text-slate-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Filter list..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-bd-green/20 focus:border-bd-green outline-none transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden animate-fade-in">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Serial No</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Name</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">NID No</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm">Occupation</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredVoters.length > 0 ? (
                            filteredVoters.map((voter) => (
                                <tr key={voter.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-6 py-4 text-slate-600 font-mono">{voter.Serial_No}</td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-slate-900">{voter.Name}</p>
                                            <p className="text-xs text-slate-500 font-bn">{voter.Name_bn}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-mono">{voter.Voter_No}</td>
                                    <td className="px-6 py-4 text-slate-600">{voter.Occupation}</td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => setSelectedVoter(voter)}
                                                className="text-bd-green hover:text-emerald-700 font-medium text-sm px-3 py-1 rounded-md hover:bg-emerald-50 transition-colors"
                                            >
                                                Details
                                            </button>
                                            {user?.role === 'admin' && (
                                                <button 
                                                    onClick={(e) => { e.stopPropagation(); deleteVoter(voter.id); }}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md opacity-0 group-hover:opacity-100 transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                    No voters found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 text-xs text-slate-500 flex justify-between items-center">
                <span>Showing {filteredVoters.length} of {voters.length} records</span>
            </div>
        </div>

        {/* Add Modal */}
        {isFormOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-800">Add New Voter</h3>
                        <button onClick={() => setIsFormOpen(false)}><X size={24} className="text-slate-400 hover:text-slate-600" /></button>
                    </div>
                    <div className="p-6 h-[70vh] overflow-y-auto">
                        <form id="add-voter-form" onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            addVoter({
                                Serial_No: Date.now(),
                                Name: formData.get('Name') as string,
                                Name_bn: formData.get('Name_bn') as string,
                                Voter_No: formData.get('Voter_No') as string,
                                Father_Name: formData.get('Father_Name') as string,
                                Father_Name_bn: formData.get('Father_Name_bn') as string,
                                Mother_Name: formData.get('Mother_Name') as string,
                                Mother_Name_bn: formData.get('Mother_Name_bn') as string,
                                Occupation: formData.get('Occupation') as string,
                                DOB: formData.get('DOB') as string,
                                Address: formData.get('Address') as string,
                                Address_bn: formData.get('Address_bn') as string,
                            });
                            setIsFormOpen(false);
                        }} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Name (English)" name="Name" required />
                                <Input label="Name (Bengali)" name="Name_bn" className="font-bn" required />
                                <Input label="NID No" name="Voter_No" required />
                                <Input label="Date of Birth" name="DOB" type="date" required />
                                <Input label="Father's Name" name="Father_Name" />
                                <Input label="Father's Name (Bn)" name="Father_Name_bn" className="font-bn" />
                                <Input label="Mother's Name" name="Mother_Name" />
                                <Input label="Mother's Name (Bn)" name="Mother_Name_bn" className="font-bn" />
                                <Input label="Occupation" name="Occupation" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label="Address" name="Address" />
                                <Input label="Address (Bn)" name="Address_bn" className="font-bn" />
                            </div>
                        </form>
                    </div>
                    <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                         <button onClick={() => setIsFormOpen(false)} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg">Cancel</button>
                         <button form="add-voter-form" className="px-4 py-2 bg-bd-green text-white rounded-lg hover:bg-bd-green/90">Save Voter</button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};