'use client';
import React, { ReactNode } from 'react';

export default function ClinetComponent({ children }: { children: ReactNode }) {
  console.log('클라이언트 컴포넌트!');

  return <div>{children}</div>;
}
