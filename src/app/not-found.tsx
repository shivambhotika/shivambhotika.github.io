import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-foreground mb-4">404</h1>
      <p className="text-lg text-slate-600 mb-8">
        This page doesn&apos;t exist. Maybe it was moved or deleted.
      </p>
      <Link
        href="/"
        className="font-mono text-sm text-amber-600 hover:text-amber-500"
      >
        ← Back to home
      </Link>
    </div>
  );
}
