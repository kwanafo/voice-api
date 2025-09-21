import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Voice API',
  description: 'Backend API and demo app',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}