import { ReactNode } from 'react';
import { PanelSidebar } from '@/components/panel/panel-sidebar';
import { PanelHeader } from '@/components/panel/panel-header';

export default function SporcuPanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <PanelSidebar userType="sporcu" />
      <div className="lg:pl-64">
        <PanelHeader />
        <main className="py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
