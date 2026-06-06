import DashboardGrid from "@/components/admin/dashboard/dashboard-grid";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-red-500">Dashboard</h1>

      <DashboardGrid />
    </div>
  );
}
