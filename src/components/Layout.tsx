import Header from './Header';
import Footer from './Footer';
import PageTransition from './PageTransition';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--background)' }}>
      <Header />
      <main className="flex-1 w-full px-6 md:px-12 lg:px-20 py-10 flex justify-center">
        <div className="max-w-3xl w-full">
          <PageTransition>{children}</PageTransition>
        </div>
      </main>
      <Footer />
    </div>
  );
}
