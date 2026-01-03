"use client";
import React from 'react';
import Sidebar from '../components/sidebar';
import LeaveBalance from './LeaveBalance';
import Attendance from './Attendance';
import LeaveHistory from './LeaveHistory';
import Quickaction from './Quickaction';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      <main className="flex-1 p-8 lg:p-12 ml-64">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Welcome back....!!
          </h1>
          <div className="flex items-center gap-4">
             <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-slate-300 border-2 border-white"></div>
                <div className="w-8 h-8 rounded-full bg-slate-400 border-2 border-white"></div>
             </div>
             <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
               S
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <LeaveBalance total={20} remaining={12} />

          <Attendance />

          <div className="bg-white p-6 rounded-2xl border-2 border-orange-100 shadow-sm flex flex-col justify-between h-44">
        <h3 className="text-slate-600 text-sm font-semibold">Upcoming Holidays</h3>
        <div>
          <p className="text-slate-900 font-bold text-lg leading-tight">Republic Day</p>
          <p className="text-xs text-slate-400 font-medium mt-1">(Jan 26)</p>
        </div>
        <div className="w-full h-1.5 bg-orange-50 rounded-full"></div>
      </div>

      <div className="bg-white p-6 rounded-2xl border-2 border-purple-100 shadow-sm flex flex-col justify-between h-44">
        <h3 className="text-slate-600 text-sm font-semibold">Pending Tasks</h3>
        <div>
          <p className="text-slate-900 font-bold text-lg leading-tight">3 Appraisals</p>
          <p className="text-xs text-slate-400 font-medium mt-1">to complete</p>
        </div>
        <div className="w-full h-1.5 bg-purple-50 rounded-full"></div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <LeaveHistory />
      </div>

      <div className="lg:col-span-1">
        <Quickaction />
      </div>
    </div>
  </main>
</div>
  );
}