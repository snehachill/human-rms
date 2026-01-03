export default function LeaveHistory() {
  const history = [
    { type: 'Approved', date: '3.02 AM', status: 'Approved', dot: 'bg-emerald-500' },
    { type: 'UEM', date: '9.02 AM', status: 'Pending', dot: 'bg-orange-400' },
    { type: 'UEM', date: '8.02 AM', status: 'Pending', dot: 'bg-emerald-500' },
  ];

  return (
    <div className="bg-[#F1F5F9] p-8 rounded-3xl min-h-[300px]">
      <h3 className="text-lg font-bold text-slate-800 mb-6">My Recent Leave History</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-slate-400 text-sm border-b border-slate-200">
            <th className="pb-4 font-medium">Type</th>
            <th className="pb-4 font-medium">Date Range</th>
            <th className="pb-4 font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="text-slate-600 text-sm">
          {history.map((item, idx) => (
            <tr key={idx} className="border-b border-slate-200/50">
              <td className="py-4">{item.type}</td>
              <td className="py-4">{item.date}</td>
              <td className="py-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.dot}`}></span>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}