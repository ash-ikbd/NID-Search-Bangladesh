import React from 'react';
import { Link } from 'react-router-dom';

export const PublicFooter: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-bd-green flex items-center justify-center text-white font-bold">
                            BD
                        </div>
                        <span className="text-xl font-bold text-slate-900">VoteSearch</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        The official digital voter information system for the Election Commission of Bangladesh. Ensuring transparency, security, and accessibility for all citizens.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li><Link to="/login" className="hover:text-bd-green transition-colors">Voter Search</Link></li>
                        <li><Link to="/api-access" className="hover:text-bd-green transition-colors">API Access</Link></li>
                        <li><Link to="/data-security" className="hover:text-bd-green transition-colors">Data Security</Link></li>
                        <li><Link to="/status" className="hover:text-bd-green transition-colors">Status Check</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Support</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li><Link to="/help" className="hover:text-bd-green transition-colors">Help Center</Link></li>
                        <li><Link to="/docs" className="hover:text-bd-green transition-colors">Documentation</Link></li>
                        <li><Link to="/contact" className="hover:text-bd-green transition-colors">Contact Officials</Link></li>
                        <li><Link to="/report-issue" className="hover:text-bd-green transition-colors">Report Issue</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 mb-4">Legal</h4>
                    <ul className="space-y-2 text-sm text-slate-500">
                        <li><Link to="/privacy" className="hover:text-bd-green transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms" className="hover:text-bd-green transition-colors">Terms of Service</Link></li>
                        <li><Link to="/data-usage" className="hover:text-bd-green transition-colors">Data Usage</Link></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-slate-100 pt-8 text-center text-sm text-slate-400">
                <p>&copy; {new Date().getFullYear()} Bangladesh Election Commission Data Portal. All rights reserved.</p>
            </div>
        </div>
    </footer>
  );
};