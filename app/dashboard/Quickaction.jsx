"use client";
import React, { useState } from 'react';
import { Send, FileText, HelpCircle, User, X } from 'lucide-react';

export default function Quickaction() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const actions = [
    { id: 1, name: 'Apply Leave', icon: <Send size={20} />, color: 'bg-indigo-50 text-indigo-600', onClick: () => setIsModalOpen(true) },
    { id: 2, name: 'My Payslips', icon: <FileText size={20} />, color: 'bg-emerald-50 text-emerald-600', link: '/payroll' },
    { id: 3, name: 'Edit Profile', icon: <User size={20} />, color: 'bg-amber-50 text-amber-600', link: '/profile' },
    { id: 4, name: 'Support', icon: <HelpCircle size={20} />, color: 'bg-rose-50 text-rose-600', link: '/help' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4">Quick Actions</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-slate-50 transition-all group"
          >
            <div className={`p-3 rounded-lg mb-2 group-hover:scale-110 transition-transform ${action.color}`}>
              {action.icon}
            </div>
            <span className="text-sm font-medium text-slate-700">{action.name}</span>
          </button>
        ))}
      </div>

      {/* --- LEAVE REQUEST MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-900">Request Leave</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Leave Type</label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm">
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                  <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                  <input type="date" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Reason</label>
                <textarea rows="3" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Briefly explain your request..."></textarea>
              </div>

              <button 
                type="button" 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}