import SidebarNav from "../components/SidebarNav";

export default function AttendanceLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <SidebarNav />
      <main className="flex-1 ml-64 p-8 lg:p-12">{children}</main>
    </div>
  );
}
