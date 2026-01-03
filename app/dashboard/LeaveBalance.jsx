"use client";
import React from 'react';

export default function LeaveBalanceCard({ total = 20, remaining = 12 }) {
  // Calculate percentage for the progress bar width
  const percentage = (remaining / total) * 100;

  return (
    <div className="bg-white p-6 rounded-2xl border-2 border-blue-100 shadow-sm flex flex-col justify-between h-40">
      <div>
        <h3 className="text-slate-600 text-sm font-semibold">Leave Balance</h3>
        <div className="mt-2">
          <span className="text-4xl font-bold text-slate-900">{remaining}</span>
          <p className="text-xs text-slate-400 mt-1 font-medium">Days Remaining</p>
        </div>
      </div>

      {/* Progress Bar at the bottom */}
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-700 ease-in-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}