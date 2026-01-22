import React from 'react';
import { Link } from 'react-router-dom';
import { PublicFooter } from '../components/PublicFooter';
import { Shield, Lock, FileText, Server, Activity, Mail, Phone, MapPin, ChevronRight, AlertCircle, CheckCircle, Search, Terminal } from 'lucide-react';

const PublicLayout: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({ title, subtitle, children }) => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            {/* Simple Static Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-bd-green flex items-center justify-center text-white font-bold">BD</div>
                        <span className="text-xl font-bold text-slate-900">Vote<span className="text-bd-green">Search</span></span>
                    </Link>
                    <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                        <Link to="/" className="text-slate-600 hover:text-bd-green">Home</Link>
                        <Link to="/help" className="text-slate-600 hover:text-bd-green">Help</Link>
                        <Link to="/login" className="px-4 py-2 bg-bd-green text-white rounded-full hover:bg-bd-green/90 transition-colors">Login</Link>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                <div className="bg-slate-900 text-white py-16">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">{title}</h1>
                        {subtitle && <p className="text-slate-400 text-lg">{subtitle}</p>}
                    </div>
                </div>
                <div className="max-w-4xl mx-auto px-4 py-12">
                    {children}
                </div>
            </main>

            <PublicFooter />
        </div>
    );
};

export const PrivacyPolicy: React.FC = () => (
    <PublicLayout title="Privacy Policy" subtitle="How we handle your sensitive electoral data">
        <div className="prose prose-slate max-w-none">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">1. Information Collection</h3>
            <p className="text-slate-600 mb-6">The Bangladesh Election Commission (BEC) collects personal information including Name, Date of Birth, Father's Name, Mother's Name, and Address strictly for the purpose of maintaining an accurate electoral roll. This data is collected during voter registration drives and updated periodically.</p>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-4">2. Use of Information</h3>
            <p className="text-slate-600 mb-6">The collected information is used solely for:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                <li>Verifying voter identity during elections.</li>
                <li>Preventing duplicate registrations.</li>
                <li>Generating the official voter list for polling stations.</li>
                <li>Providing citizens with their own registration details via this portal.</li>
            </ul>

            <h3 className="text-2xl font-bold text-slate-800 mb-4">3. Data Protection</h3>
            <p className="text-slate-600 mb-6">We employ state-of-the-art encryption (AES-256) for data at rest and TLS 1.3 for data in transit. Access to the database is strictly role-based and monitored 24/7. Unauthorized access attempts are logged and prosecuted under the Digital Security Act.</p>
            
            <h3 className="text-2xl font-bold text-slate-800 mb-4">4. Third-Party Sharing</h3>
            <p className="text-slate-600">We do not share your personal data with private entities, advertisers, or foreign agencies. Data is only shared with law enforcement agencies upon receiving a valid court order.</p>
        </div>
    </PublicLayout>
);

export const TermsOfService: React.FC = () => (
    <PublicLayout title="Terms of Service" subtitle="Rules and regulations for using the VoteSearch portal">
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-xl text-slate-800 mb-2">Acceptance of Terms</h3>
                <p className="text-slate-600">By accessing or using the VoteSearch portal, you agree to be bound by these Terms of Service and all applicable laws and regulations of Bangladesh.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-xl text-slate-800 mb-2">Authorized Use</h3>
                <p className="text-slate-600">This portal is intended for:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                    <li>Citizens checking their own voter status.</li>
                    <li>Authorized Election Commission officials managing data.</li>
                    <li>Law enforcement verifying identity (with authorization).</li>
                </ul>
                <p className="mt-2 text-red-600 font-medium">Scraping, automated querying, or bulk data export by unauthorized parties is strictly prohibited.</p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-xl text-slate-800 mb-2">Account Responsibility</h3>
                <p className="text-slate-600">If you are granted an administrative account, you are responsible for maintaining the confidentiality of your credentials. You agree to notify the BEC immediately of any unauthorized use of your account.</p>
            </div>
        </div>
    </PublicLayout>
);

export const DataUsage: React.FC = () => (
    <PublicLayout title="Data Usage Guidelines" subtitle="Understanding how electoral data is utilized">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                <FileText className="text-blue-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Public Record</h3>
                <p className="text-slate-600">The voter list is a public record to ensure transparency in the democratic process. However, sensitive biometric data is never exposed publicly.</p>
            </div>
             <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100">
                <Shield className="text-emerald-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-slate-900 mb-2">Verification Services</h3>
                <p className="text-slate-600">Government and banking sectors may use the NID verification API to authenticate citizen identity for services, strictly with user consent.</p>
            </div>
        </div>
    </PublicLayout>
);

export const HelpCenter: React.FC = () => (
    <PublicLayout title="Help Center" subtitle="Frequently Asked Questions and Guides">
        <div className="space-y-4">
             {[
                 { q: "How do I check my voter registration status?", a: "You can check your status by clicking on 'Voter Search' in the menu. You will need to log in or register an account to perform searches." },
                 { q: "My information is incorrect. How can I fix it?", a: "To correct your information, please visit your local Upazila Election Office with supporting documents (Birth Certificate, SSC Certificate, Citizenship Certificate)." },
                 { q: "I lost my NID card. What should I do?", a: "File a General Diary (GD) at your nearest police station and apply for a re-issue at the Election Commission wing or online portal." },
                 { q: "How long does it take to get a new NID?", a: "Standard processing time is 15-21 working days. Urgent services are available for a fee." }
             ].map((faq, i) => (
                 <div key={i} className="bg-white border border-slate-200 rounded-xl p-6">
                     <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                         <AlertCircle size={18} className="text-bd-green" /> {faq.q}
                     </h3>
                     <p className="text-slate-600 ml-7">{faq.a}</p>
                 </div>
             ))}
        </div>
    </PublicLayout>
);

export const ApiAccess: React.FC = () => (
    <PublicLayout title="API Access" subtitle="Integration for Government & Financial Institutions">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-100 rounded-lg">
                    <Terminal size={32} className="text-slate-700" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">Partner API Program</h2>
                    <p className="text-slate-500">Secure NID verification for authorized partners</p>
                </div>
            </div>
            
            <p className="text-slate-600 mb-6">
                The VoteSearch API provides a RESTful interface for identity verification. Access is restricted to government agencies, banks, and telecom operators licensed by the BTRC.
            </p>
            
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200 mb-8 font-mono text-sm">
                <div className="flex gap-2 text-slate-400 mb-2"># Example Request</div>
                <div className="text-purple-600">POST <span className="text-slate-700">/api/v1/verify</span></div>
                <div className="text-slate-700 mt-2">
                    {`{`} <br/>
                    &nbsp;&nbsp;"nid": "1990269440001",<br/>
                    &nbsp;&nbsp;"dob": "1990-01-01"<br/>
                    {`}`}
                </div>
            </div>

            <button className="bg-bd-green text-white px-6 py-3 rounded-xl font-bold hover:bg-bd-green/90 transition-colors w-full md:w-auto">
                Apply for Developer Access
            </button>
        </div>
    </PublicLayout>
);

export const DataSecurity: React.FC = () => (
    <PublicLayout title="Data Security" subtitle="Our commitment to protecting national identity">
        <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-slate-200 text-center">
                <Lock className="w-12 h-12 text-bd-green mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">End-to-End Encryption</h3>
                <p className="text-sm text-slate-500">All data is encrypted in transit and at rest using industry-standard protocols.</p>
            </div>
             <div className="p-6 bg-white rounded-xl border border-slate-200 text-center">
                <Shield className="w-12 h-12 text-bd-green mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Multi-Factor Auth</h3>
                <p className="text-sm text-slate-500">Administrative access requires biometric and OTP verification.</p>
            </div>
             <div className="p-6 bg-white rounded-xl border border-slate-200 text-center">
                <Server className="w-12 h-12 text-bd-green mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Private Cloud</h3>
                <p className="text-sm text-slate-500">Hosted in a sovereign government data center with air-gapped backups.</p>
            </div>
        </div>
    </PublicLayout>
);

export const StatusCheck: React.FC = () => (
    <PublicLayout title="System Status" subtitle="Real-time operational metrics">
        <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <Activity className="text-bd-green" />
                    <div>
                        <h4 className="font-bold text-slate-900">API Gateway</h4>
                        <p className="text-sm text-slate-500">Latency: 45ms</p>
                    </div>
                </div>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Operational</span>
            </div>
            <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <Server className="text-bd-green" />
                    <div>
                        <h4 className="font-bold text-slate-900">Main Database</h4>
                        <p className="text-sm text-slate-500">Uptime: 99.99%</p>
                    </div>
                </div>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Operational</span>
            </div>
            <div className="flex items-center justify-between bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-4">
                    <Search className="text-bd-green" />
                    <div>
                        <h4 className="font-bold text-slate-900">Search Index</h4>
                        <p className="text-sm text-slate-500">Last synced: 1 min ago</p>
                    </div>
                </div>
                <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase">Operational</span>
            </div>
        </div>
    </PublicLayout>
);

export const ContactOfficials: React.FC = () => (
    <PublicLayout title="Contact Officials" subtitle="Get in touch with the Election Commission">
        <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <MapPin className="text-bd-green mt-1" />
                    <div>
                        <h4 className="font-bold text-slate-900">Headquarters</h4>
                        <p className="text-slate-600">Nirbachan Bhaban, Agargaon<br/>Dhaka-1207, Bangladesh</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Phone className="text-bd-green mt-1" />
                    <div>
                        <h4 className="font-bold text-slate-900">Helpline</h4>
                        <p className="text-slate-600">105 (Toll Free)<br/>+880-2-55007600</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Mail className="text-bd-green mt-1" />
                    <div>
                        <h4 className="font-bold text-slate-900">Email</h4>
                        <p className="text-slate-600">secretary@ecs.gov.bd<br/>info@nidw.gov.bd</p>
                    </div>
                </div>
            </div>
            
            <form className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-bold text-lg mb-2">Send a Message</h3>
                <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-bd-green/20 outline-none" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-bd-green/20 outline-none" />
                <textarea rows={4} placeholder="How can we help?" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-bd-green/20 outline-none"></textarea>
                <button className="w-full bg-bd-green text-white py-3 rounded-lg font-bold hover:bg-bd-green/90 transition-colors">Send Message</button>
            </form>
        </div>
    </PublicLayout>
);

export const ReportIssue: React.FC = () => (
     <PublicLayout title="Report an Issue" subtitle="Found a bug or data error? Let us know.">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-lg">
            <div className="flex items-center gap-3 mb-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg border border-yellow-100">
                <AlertCircle />
                <p className="text-sm">For urgent security vulnerabilities, please email security@ecs.gov.bd directly.</p>
            </div>
            <form className="space-y-6">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Issue Type</label>
                    <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-bd-green/20 outline-none bg-slate-50">
                        <option>Data Error (Incorrect Name/Address)</option>
                        <option>Website Bug / Glitch</option>
                        <option>Login Problem</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-bd-green/20 outline-none bg-slate-50 min-h-[150px]" placeholder="Please describe the issue in detail..."></textarea>
                </div>
                 <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors">Submit Report</button>
            </form>
        </div>
    </PublicLayout>
);

export const Documentation: React.FC = () => (
    <PublicLayout title="Documentation" subtitle="Technical resources for system integrators">
        <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-bold text-xl mb-2 text-bd-green">Getting Started</h3>
                <p className="text-slate-600 mb-4">Learn the basics of the VoteSearch platform and how to set up your account.</p>
                <span className="text-sm font-semibold flex items-center gap-1">Read Guide <ChevronRight size={16}/></span>
            </div>
             <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-bold text-xl mb-2 text-bd-green">API Reference</h3>
                <p className="text-slate-600 mb-4">Detailed endpoints, authentication methods, and response schemas.</p>
                <span className="text-sm font-semibold flex items-center gap-1">View API Docs <ChevronRight size={16}/></span>
            </div>
             <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-bold text-xl mb-2 text-bd-green">Bulk Import Guide</h3>
                <p className="text-slate-600 mb-4">Format specifications for CSV uploads for election officials.</p>
                <span className="text-sm font-semibold flex items-center gap-1">Download Spec <ChevronRight size={16}/></span>
            </div>
             <div className="border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-bold text-xl mb-2 text-bd-green">Security Best Practices</h3>
                <p className="text-slate-600 mb-4">Guidelines for securing your account and handling voter data safely.</p>
                <span className="text-sm font-semibold flex items-center gap-1">Learn More <ChevronRight size={16}/></span>
            </div>
        </div>
    </PublicLayout>
);