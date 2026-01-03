import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import dbConnect from "../../lib/connectDb";
import User from "../../models/user";

function getBaseUrl() {
  const url =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXTAUTH_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  return url.replace(/\/$/, "");
}

async function fetchJSON(url, init) {
  const res = await fetch(url, init);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

export default async function TimeOffPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");
  await dbConnect();
  const me = await User.findById(session.user.id).select("role name").lean();

  if (me.role === "admin") {
    const { requests } = await fetchJSON(`${getBaseUrl()}/api/leave/admin`, { cache: 'no-store' });

    return (
      <div className="min-h-screen bg-[#F8FAFC] p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Time Off Requests</h1>
            <p className="text-slate-500 mt-1">Manage and review requests</p>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-xs font-semibold text-slate-500">Pending</p>
              <p className="text-2xl font-bold mt-1 text-amber-600">{requests.filter(r=>r.status==='pending').length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-xs font-semibold text-slate-500">Approved</p>
              <p className="text-2xl font-bold mt-1 text-emerald-600">{requests.filter(r=>r.status==='approved').length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <p className="text-xs font-semibold text-slate-500">Rejected</p>
              <p className="text-2xl font-bold mt-1 text-rose-600">{requests.filter(r=>r.status==='rejected').length}</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500">This Month</p>
                <p className="text-2xl font-bold mt-1 text-indigo-600">{requests.filter(r=>{
                  const d=new Date(r.startDate); const n=new Date(); return d.getMonth()===n.getMonth()&&d.getFullYear()===n.getFullYear();
                }).length}</p>
              </div>
              <svg viewBox="0 0 36 36" className="w-12 h-12">
                <path d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" fill="#EEF2FF" />
                <circle r="16" cx="18" cy="18" fill="none" stroke="#6366F1" strokeWidth="4" strokeDasharray="60 100" strokeLinecap="round" transform="rotate(-90 18 18)" />
              </svg>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="text-left p-3">Employee</th>
                  <th className="text-left p-3">Type</th>
                  <th className="text-left p-3">Period</th>
                  <th className="text-left p-3">Reason</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r._id} className="border-t border-slate-100">
                    <td className="p-3">{r.userId?.name} <span className="text-slate-400 text-xs">{r.userId?.loginID}</span></td>
                    <td className="p-3">{r.type}</td>
                    <td className="p-3">{new Date(r.startDate).toLocaleDateString()} – {new Date(r.endDate).toLocaleDateString()}</td>
                    <td className="p-3 max-w-xs truncate" title={r.reason}>{r.reason || '—'}</td>
                    <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${r.status==='approved'?'bg-emerald-50 text-emerald-700': r.status==='rejected'?'bg-rose-50 text-rose-700':'bg-amber-50 text-amber-700'}`}>{r.status}</span></td>
                    <td className="p-3 space-x-2">
                      <form action={`/api/leave/admin`} method="post" className="inline">
                        <input type="hidden" name="id" value={r._id} />
                        <input type="hidden" name="status" value="approved" />
                      </form>
                      <AdminAction id={r._id} />
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

  // Employee view: list own requests and provide link to apply via Quickaction modal on dashboard
  const { requests } = await fetchJSON(`${getBaseUrl()}/api/leave`, { cache: 'no-store' });
  return (
    <div className="min-h-screen bg-[#F8FAFC] p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">My Time Off</h1>
          <p className="text-slate-500 mt-1">Track your requests and statuses. Use Quick Actions on the dashboard to apply.</p>
        </div>

        {/* Summary + donut */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-semibold text-slate-500">Annual Allowance</p>
            <p className="text-2xl font-bold mt-1 text-slate-900">20 days</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-semibold text-slate-500">Taken</p>
            <p className="text-2xl font-bold mt-1 text-indigo-600">8 days</p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Remaining</p>
              <p className="text-2xl font-bold mt-1 text-emerald-600">12 days</p>
            </div>
            <svg viewBox="0 0 36 36" className="w-12 h-12">
              <path d="M18 2 a 16 16 0 1 1 0 32 a 16 16 0 1 1 0 -32" fill="#ECFDF5" />
              <circle r="16" cx="18" cy="18" fill="none" stroke="#10B981" strokeWidth="4" strokeDasharray="60 100" strokeLinecap="round" transform="rotate(-90 18 18)" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left p-3">Type</th>
                <th className="text-left p-3">Period</th>
                <th className="text-left p-3">Reason</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r._id} className="border-t border-slate-100">
                  <td className="p-3">{r.type}</td>
                  <td className="p-3">{new Date(r.startDate).toLocaleDateString()} – {new Date(r.endDate).toLocaleDateString()}</td>
                  <td className="p-3 max-w-xs truncate" title={r.reason}>{r.reason || '—'}</td>
                  <td className="p-3"><span className={`px-2 py-1 rounded text-xs ${r.status==='approved'?'bg-emerald-50 text-emerald-700': r.status==='rejected'?'bg-rose-50 text-rose-700':'bg-amber-50 text-amber-700'}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

async function AdminAction({ id }) {
  async function update(status) {
    'use server';
    await fetch(`${getBaseUrl()}/api/leave/admin`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
  }
  return (
    <div className="inline-flex gap-2">
      <form action={async () => update('approved')}>
        <button className="px-3 py-1 rounded bg-emerald-600 text-white text-xs hover:bg-emerald-700">Approve</button>
      </form>
      <form action={async () => update('rejected')}>
        <button className="px-3 py-1 rounded bg-rose-600 text-white text-xs hover:bg-rose-700">Reject</button>
      </form>
    </div>
  );
}
