import Link from 'next/link';
import React, { ReactNode } from 'react';

export default function Layout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div>
      <Link href={'/parallel'}>parallel</Link>
      <Link href={'/parallel/setting'}>parallel/setting</Link>
      <Link href={'/parallel/step'}>parallel/step</Link>
      {sidebar}
      {children}
    </div>
  );
}
