import './globals.css'

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

interface RootLayoutProps {
  children: React.ReactNode;
}
 
export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
