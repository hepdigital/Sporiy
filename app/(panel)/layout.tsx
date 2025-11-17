import { ReactNode } from 'react';

export default function PanelLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Panel layout sadece children'ı render eder
  // Ana layout (root) html/body'yi yönetir
  return <>{children}</>;
}
