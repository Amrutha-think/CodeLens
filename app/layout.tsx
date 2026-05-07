import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CodeLens',
  description: 'Smarter Code Reviews for Modern Developers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body>
        {children}
      </body>
    </html>
  );
}
