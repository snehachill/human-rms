"use client"; // Required for interactivity in Next.js
import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, MapPin } from 'lucide-react';

export default function AttendanceCard() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [time, setTime] = useState(new Date());
  const [clockInTime, setClockInTime] = useState(null);

  // Update the digital clock every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClockToggle = () => {
    if (!isClockedIn) {
      setClockInTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
    setIsClockedIn(!isClockedIn);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider">Attendance</h3>
          <p className="text-2xl font-mono font-bold text-slate-900 mt-1">
            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
        </div>
        <div className={`p-2 rounded-lg ${isClockedIn ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
          <Clock size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin size={14} className="text-slate-400" />
          <span className="text-slate-600">Work from Home</span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleClockToggle}
          className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            isClockedIn 
              ? 'bg-red-50 text-red-600 hover:bg-red-100 border border-red-200' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-200'
          }`}
        >
          {isClockedIn ? (
            <>
              <Square size={16} fill="currentColor" /> Clock Out
            </>
          ) : (
            <>
              <Play size={16} fill="currentColor" /> Clock In
            </>
          )}
        </button>

        {/* Post-Clock In Info */}
        {isClockedIn && (
          <div className="pt-2 border-t border-slate-100">
            <p className="text-xs text-slate-500 text-center">
              Clocked in at <span className="font-semibold text-slate-700">{clockInTime}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}