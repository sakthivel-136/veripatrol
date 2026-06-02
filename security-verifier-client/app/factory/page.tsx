'use client';
import { FactoriesTable } from '@/app/components/factory/FactoriesTable';
import { useAuthGuard } from '@/app/services/auth.guard';

export default function FactoryPage() {
  const { authorized } = useAuthGuard();

  if (!authorized) {
    return <div className="p-6 text-white min-h-screen bg-[#07071f] flex items-center justify-center">Checking access...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Factories</h1>
      <FactoriesTable />
    </div>
  );
}
